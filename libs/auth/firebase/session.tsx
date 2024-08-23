import { importX509, jwtVerify } from 'jose';
import 'server-only';

let publicKeys: any;

export async function decrypt(jwtToken: string) {
  if (!publicKeys) {
    const res = await fetch('https://www.googleapis.com/service_accounts/v1/metadata/x509/securetoken@system.gserviceaccount.com');
    publicKeys = await res.json();
  }
  const decodedToken = await jwtVerify(
    jwtToken,
    async (header, _alg) => {
      if (header.kid) {
        const x509Cert = publicKeys[header.kid];
        const publicKey = await importX509(x509Cert, "RS256");
        return publicKey
      } else {
        throw new Error("No kid header claim");
      }
    },
    {
      issuer: `https://securetoken.google.com/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`,
      audience: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      algorithms: ["RS256"],
    },
  );
  return decodedToken.payload;
}
