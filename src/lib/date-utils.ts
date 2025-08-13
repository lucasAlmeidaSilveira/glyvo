import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Fuso horário do Brasil (São Paulo)
const BRAZIL_TIMEZONE = 'America/Sao_Paulo';

/**
 * Converte uma data UTC para o fuso horário do Brasil
 */
export function toBrazilTime(date: Date | string): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  
  // Cria uma nova data no fuso brasileiro usando toLocaleString
  const brazilString = dateObj.toLocaleString('pt-BR', { 
    timeZone: BRAZIL_TIMEZONE 
  });
  
  // Converte de volta para Date
  return new Date(brazilString);
}

/**
 * Converte uma data do fuso brasileiro para UTC
 */
export function toUTC(date: Date): Date {
  // Cria uma nova data em UTC
  const utcDate = new Date(Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  ));
  
  return utcDate;
}

/**
 * Formata uma data para exibição no fuso brasileiro
 */
export function formatBrazilTime(date: Date | string, formatStr: string = 'dd/MM/yyyy HH:mm'): string {
  try {
    const brazilDate = toBrazilTime(date);
    return format(brazilDate, formatStr, { locale: ptBR });
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    // Fallback para formatação básica
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return dateObj.toLocaleString('pt-BR', { 
      timeZone: BRAZIL_TIMEZONE,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}

/**
 * Formata apenas a data (sem hora) para exibição
 */
export function formatBrazilDate(date: Date | string): string {
  try {
    const brazilDate = toBrazilTime(date);
    return format(brazilDate, 'dd/MM/yyyy', { locale: ptBR });
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    // Fallback para formatação básica
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return dateObj.toLocaleDateString('pt-BR', { 
      timeZone: BRAZIL_TIMEZONE,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  }
}

/**
 * Formata apenas a hora para exibição
 */
export function formatBrazilTimeOnly(date: Date | string): string {
  try {
    const brazilDate = toBrazilTime(date);
    return format(brazilDate, 'HH:mm', { locale: ptBR });
  } catch (error) {
    console.error('Erro ao formatar hora:', error);
    // Fallback para formatação básica
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return dateObj.toLocaleTimeString('pt-BR', { 
      timeZone: BRAZIL_TIMEZONE,
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}

/**
 * Cria uma data atual no fuso brasileiro
 */
export function nowBrazil(): Date {
  return toBrazilTime(new Date());
}

/**
 * Cria uma data específica no fuso brasileiro
 */
export function createBrazilDate(year: number, month: number, day: number, hour: number = 0, minute: number = 0): Date {
  const date = new Date(year, month - 1, day, hour, minute);
  return toBrazilTime(date);
}

/**
 * Verifica se uma data é hoje no fuso brasileiro
 */
export function isToday(date: Date | string): boolean {
  try {
    const today = nowBrazil();
    const checkDate = toBrazilTime(date);
    
    return (
      today.getFullYear() === checkDate.getFullYear() &&
      today.getMonth() === checkDate.getMonth() &&
      today.getDate() === checkDate.getDate()
    );
  } catch (error) {
    console.error('Erro ao verificar se é hoje:', error);
    return false;
  }
}

/**
 * Verifica se uma data é ontem no fuso brasileiro
 */
export function isYesterday(date: Date | string): boolean {
  try {
    const yesterday = new Date(nowBrazil());
    yesterday.setDate(yesterday.getDate() - 1);
    
    const checkDate = toBrazilTime(date);
    
    return (
      yesterday.getFullYear() === checkDate.getFullYear() &&
      yesterday.getMonth() === checkDate.getMonth() &&
      yesterday.getDate() === checkDate.getDate()
    );
  } catch (error) {
    console.error('Erro ao verificar se é ontem:', error);
    return false;
  }
}

/**
 * Obtém o offset do fuso horário brasileiro em minutos
 */
export function getBrazilTimezoneOffset(): number {
  try {
    const now = new Date();
    const utc = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
    const brazil = new Date(utc.toLocaleString('pt-BR', { timeZone: BRAZIL_TIMEZONE }));
    
    return (brazil.getTime() - utc.getTime()) / 60000;
  } catch (error) {
    console.error('Erro ao obter offset do fuso horário:', error);
    return 0;
  }
}

/**
 * Converte uma data para string ISO no fuso brasileiro
 */
export function toBrazilISOString(date: Date | string): string {
  try {
    const brazilDate = toBrazilTime(date);
    return brazilDate.toISOString();
  } catch (error) {
    console.error('Erro ao converter para ISO:', error);
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return dateObj.toISOString();
  }
}

/**
 * Cria uma data a partir de uma string ISO no fuso brasileiro
 */
export function fromBrazilISOString(isoString: string): Date {
  try {
    return toBrazilTime(parseISO(isoString));
  } catch (error) {
    console.error('Erro ao criar data a partir de ISO:', error);
    return parseISO(isoString);
  }
}
