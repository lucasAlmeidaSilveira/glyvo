import 'server-only'

import admin from 'firebase-admin'

let initialized = false

function ensureFirebaseAdmin() {
  if (initialized) return

  const privateKey = process.env.NEXT_PUBLIC_FIREBASE_PRIVATEKEY?.replace(
    /\\n/g,
    '\n',
  )

  if (
    !process.env.NEXT_PUBLIC_FIREBASE_PROJECTID ||
    !process.env.NEXT_PUBLIC_FIREBASE_CLIENTEMAIL ||
    !privateKey
  ) {
    throw new Error(
      'Credenciais do Firebase Admin ausentes (PROJECTID, CLIENTEMAIL, PRIVATEKEY).',
    )
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
      clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENTEMAIL,
      privateKey,
    }),
    storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET}`,
  })
  initialized = true
}

export function getBucket() {
  ensureFirebaseAdmin()
  return admin.storage().bucket()
}
