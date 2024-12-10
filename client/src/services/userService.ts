// 'use server';
// import { cookies } from "next/headers";
// import * as jose from 'jose';
// import { CookieKey } from "../Constants";
// import { AttributeStatus } from "@/app/lib/directoryUser";
// import { PersonUser } from "@/app/lib/personUser";

// export async function getUserFromCookie(): Promise<PersonUser | undefined> {
//   const cookieLookup = await cookies();
//   console.log("COOKIE LOOKUP: " + cookieLookup);
//   const jwt = (await cookieLookup).get(CookieKey.JWT_TOKEN);
//   const audience = (await cookieLookup).get(CookieKey.AUDIENCE);
//   const issuer = (await cookieLookup).get(CookieKey.ISSUER);
//   console.log("JWT: " + jwt);
//   console.log("AUD: " + audience);
//   console.log("ISSSUER: " + issuer);
//   if (!jwt || !audience || !issuer) return;

//   const JWKS = jose.createRemoteJWKSet(new URL('https://auth.snowse.duckdns.org/realms/advanced-frontend/protocol/openid-connect/certs'))

//   const { payload, protectedHeader } = await jose.jwtVerify(jwt.value, JWKS, {
//     issuer: issuer.value,
//     audience: audience.value,
//   })

//   console.log("PROTECTED HEADER: " + JSON.stringify(protectedHeader))
//   console.log("PAYLOAD" + JSON.stringify(payload))

//   console.log({
//     id: payload.sub,
//     first_name: payload.given_name,
//     last_name: payload.family_name,
//     phone: "",
//     email: payload.email,
//     created_at: new Date(payload.iat ?? 0 * 1000),
//     first_name_status: AttributeStatus.WEB_VISIBLE,
//     last_name_status: AttributeStatus.WEB_VISIBLE,
//     phone_status: AttributeStatus.PRIVATE,
//     email_status: AttributeStatus.WEB_VISIBLE,
//   });

//   if (!payload.sub || !payload.iat || typeof payload.given_name !== "string" || typeof payload.family_name !== "string" || typeof payload.email !== "string") return;

//   return {
//     id: payload.sub,
//     first_name: payload.given_name,
//     last_name: payload.family_name,
//     phone: "",
//     email: payload.email,
//     created_at: new Date(payload.iat * 1000),
//     first_name_status: AttributeStatus.WEB_VISIBLE,
//     last_name_status: AttributeStatus.WEB_VISIBLE,
//     phone_status: AttributeStatus.PRIVATE,
//     email_status: AttributeStatus.WEB_VISIBLE,
//   }
// }