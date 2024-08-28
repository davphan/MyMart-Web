import 'server-only'
import { JWTPayload, SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.log('Failed to verify session')
  }
}

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session = await encrypt({ userId, expiresAt })

  cookies().set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

export async function updateSession() {
  const session = cookies().get('session')?.value
  const payload = await decrypt(session)

  if (!session || !payload) {
    return null
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  cookies().set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  })
}

export function deleteSession() {
  cookies().delete('session')
}

// import { importX509, jwtVerify } from 'jose';
// import 'server-only';

// let publicKeys: any;

// export async function decrypt(jwtToken: string) {
//   if (!publicKeys) {
//     const res = await fetch('https://www.googleapis.com/service_accounts/v1/metadata/x509/securetoken@system.gserviceaccount.com');
//     publicKeys = await res.json();
//   }
//   const decodedToken = await jwtVerify(
//     jwtToken,
//     async (header, _alg) => {
//       if (header.kid) {
//         const x509Cert = publicKeys[header.kid];
//         const publicKey = await importX509(x509Cert, "RS256");
//         return publicKey
//       } else {
//         throw new Error("No kid header claim");
//       }
//     },
//     {
//       issuer: `https://securetoken.google.com/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`,
//       audience: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//       algorithms: ["RS256"],
//     },
//   );
//   return decodedToken.payload;
// }
