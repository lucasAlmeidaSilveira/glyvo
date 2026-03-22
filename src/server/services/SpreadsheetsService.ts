import 'server-only'

import chromium from '@sparticuz/chromium'
import puppeteer from 'puppeteer'

import { query } from '@/server/db/index'
import { getBucket } from '@/server/lib/firebaseAdmin'
import type { Reading, Spreadsheet } from '@/server/types'

interface SpreadsheetRow {
  Data: string
  Jejum: number | string
  '2 horas após café': number | string
  'Antes do almoço': number | string
  '2 Horas após almoço': number | string
  'Antes do jantar': number | string
  '2 Horas após jantar': number | string
  'Antes de dormir': number | string
  '3 horas': number | string
}

const PDF_CONFIG = {
  format: 'A4' as const,
  landscape: true,
  printBackground: true,
  margin: {
    top: '0.5cm',
    right: '0.1cm',
    bottom: '0.5cm',
    left: '0.1cm',
  },
}

const MEAL_MAPPING: Record<string, keyof Omit<SpreadsheetRow, 'Data'>> = {
  Jejum: 'Jejum',
  '2 horas após café': '2 horas após café',
  'Antes do almoço': 'Antes do almoço',
  '2 Horas após almoço': '2 Horas após almoço',
  'Antes do jantar': 'Antes do jantar',
  '2 Horas após jantar': '2 Horas após jantar',
  'Antes de dormir': 'Antes de dormir',
  '3 horas': '3 horas',
}

export const createSpreadsheet = async (
  userId: string,
  startDate: string,
  endDate: string,
) => {
  const userName = await getUserName(userId)
  const readings = await getReadingsForRange(userId, startDate, endDate)

  const readingsByDate = groupReadingsByDate(readings)
  const spreadsheetData = createSpreadsheetData(readingsByDate)

  const url = await generateAndUploadPdf(
    userId,
    startDate,
    endDate,
    spreadsheetData,
    userName,
  )

  return url
}

async function getUserName(userId: string): Promise<string> {
  const result = await query(
    'SELECT name FROM users WHERE id = $1 AND deleted = 0',
    [userId],
  )
  return result.rows[0]?.name || 'Usuário'
}

async function getReadingsForRange(
  userId: string,
  startDate: string,
  endDate: string,
): Promise<Reading[]> {
  const startDateFormatted = `${startDate}T00:00:00`
  const endDateFormatted = `${endDate}T23:59:59`
  const result = await query(
    'SELECT * FROM readings WHERE user_id = $1 AND date BETWEEN $2 AND $3 AND deleted = 0 ORDER BY date',
    [userId, startDateFormatted, endDateFormatted],
  )
  return result.rows as Reading[]
}

function groupReadingsByDate(readings: Reading[]): Map<string, Reading[]> {
  const grouped = new Map<string, Reading[]>()

  readings.forEach((reading) => {
    const date = new Date(reading.date).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })

    if (!grouped.has(date)) {
      grouped.set(date, [])
    }
    grouped.get(date)!.push(reading)
  })

  return grouped
}

function createSpreadsheetData(
  readingsByDate: Map<string, Reading[]>,
): SpreadsheetRow[] {
  const spreadsheetData: SpreadsheetRow[] = []

  readingsByDate.forEach((readings, date) => {
    const formattedDate = formatDate(date)
    const row = createEmptyRow(formattedDate)

    readings.forEach((reading) => {
      const columnKey = MEAL_MAPPING[reading.meal]
      if (columnKey) {
        row[columnKey] = reading.value
      }
    })

    spreadsheetData.push(row)
  })

  return spreadsheetData
}

function createEmptyRow(date: string): SpreadsheetRow {
  return {
    Data: date,
    Jejum: '',
    '2 horas após café': '',
    'Antes do almoço': '',
    '2 Horas após almoço': '',
    'Antes do jantar': '',
    '2 Horas após jantar': '',
    'Antes de dormir': '',
    '3 horas': '',
  }
}

function formatDate(date: string): string {
  const [day, month] = date.split('/')
  return `${day}/${month}`
}

async function generateAndUploadPdf(
  userId: string,
  startDate: string,
  endDate: string,
  data: SpreadsheetRow[],
  userName: string,
): Promise<string> {
  const fileName = `glicemia_${userId}_${startDate}_${endDate}.pdf`

  try {
    const pdfBuffer = await generatePdfBuffer(data, userName)

    const file = getBucket().file(`spreadsheets/${fileName}`)
    await file.save(pdfBuffer, {
      contentType: 'application/pdf',
      public: true,
    })

    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: '03-01-2100',
    })

    await saveSpreadsheetReference(userId, startDate, endDate, url, userName)

    return url
  } catch (error) {
    console.error('Erro ao gerar e fazer upload do PDF:', error)
    throw error
  }
}

async function generatePdfBuffer(
  data: SpreadsheetRow[],
  userName: string,
): Promise<Buffer> {
  const htmlContent = generateHtmlFromData(data, userName)

  const isProduction = process.env.NODE_ENV === 'production'

  const launchOptions: {
    headless: boolean
    args: string[]
    executablePath?: string
  } = {
    headless: true,
    args: chromium.args,
  }

  if (isProduction) {
    if ('setGraphicsMode' in chromium) {
      ;(chromium as { setGraphicsMode: boolean }).setGraphicsMode = false
    }
    launchOptions.executablePath = await chromium.executablePath()
  } else {
    launchOptions.args = [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process',
      '--disable-gpu',
      '--disable-background-timer-throttling',
      '--disable-backgrounding-occluded-windows',
      '--disable-renderer-backgrounding',
      '--disable-extensions',
      '--disable-default-apps',
    ]
  }

  const browser = await puppeteer.launch(launchOptions)

  try {
    const page = await browser.newPage()
    // HTML é 100% inline (sem assets externos). `networkidle0` costuma estourar timeout
    // no headless porque o Chromium quase nunca fica “idle” o tempo exigido.
    await page.setContent(htmlContent, {
      waitUntil: 'domcontentloaded',
      timeout: 60_000,
    })

    const pdfBuffer = await page.pdf({ ...PDF_CONFIG })
    return Buffer.from(pdfBuffer)
  } finally {
    await browser.close()
  }
}

async function saveSpreadsheetReference(
  userId: string,
  startDate: string,
  endDate: string,
  pdfUrl: string,
  userName: string,
): Promise<void> {
  try {
    await query(
      `INSERT INTO spreadsheets (user_id, url, start_date, end_date) 
       VALUES ($1, $2, $3, $4)`,
      [userId, pdfUrl, startDate, endDate],
    )
    console.log(`Planilha de ${userName} salva no banco de dados`)
  } catch (error) {
    console.error('Erro ao salvar referência da planilha:', error)
    throw error
  }
}

function generateHtmlFromData(data: SpreadsheetRow[], userName: string): string {
  const headers = Object.keys(data[0] || {})

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        ${getHtmlStyles(headers.length)}
      </style>
    </head>
    <body>
      <div class="box-title">
        <h1>Controle de Glicemia</h1>
        <span>Paciente: ${userName}</span>
      </div>
      <table>
        <thead>
          <tr>
            ${headers.map((h) => `<th>${h}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${data
            .map(
              (row) => `
            <tr>
              ${headers
                .map(
                  (header) =>
                    `<td>${row[header as keyof SpreadsheetRow] || ''}</td>`,
                )
                .join('')}
            </tr>
          `,
            )
            .join('')}
        </tbody>
      </table>
    </body>
    </html>
  `
}

function getHtmlStyles(columnCount: number): string {
  return `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; padding: 0px 16px; }
    .box-title { width: 100%; display: flex; align-items: center; justify-content: space-between; }
    h1 { font-size: 20px; text-transform: uppercase; text-decoration: underline; }
    span { font-size: 16px; font-weight: bold; margin-bottom: 10px; }
    table { width: 100%; border-collapse: collapse; table-layout: fixed; }
    th { border: 1px solid #000; padding: 8px; text-align: center; font-size: 14px; background-color: #D3D3D3; font-weight: bold; width: calc(100% / ${columnCount}); }
    td { border: 1px solid #000; padding: 8px; text-align: center; font-size: 16px; width: calc(100% / ${columnCount}); }
    tr:nth-child(even) { background-color: #f9f9f9; }
  `
}

export const listSpreadsheets = async (userId: string) => {
  const result = await query(
    'SELECT * FROM spreadsheets WHERE user_id = $1 AND deleted = 0',
    [userId],
  )
  return result.rows as Spreadsheet[]
}

export async function getSpreadsheet(
  userId: string,
  startDate: string,
  endDate: string,
): Promise<Spreadsheet> {
  const result = await query(
    'SELECT * FROM spreadsheets WHERE user_id = $1 AND start_date = $2 AND end_date = $3 AND deleted = 0',
    [userId, startDate, endDate],
  )
  return result.rows[0] as Spreadsheet
}
