import { jwtDecode } from "jwt-decode";

export function decryptToken(token: string): { exp: number; username: string } {
  return jwtDecode(token);
}

export function isValidToken(expirationDate: number): boolean {
  if (Date.now() >= expirationDate * 1000) return false;

  return true;
}
