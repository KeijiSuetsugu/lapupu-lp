import { cookies } from 'next/headers';

const SESSION_COOKIE = 'admin_session';
const SESSION_VALUE = 'lapupu_admin_authenticated';

export function isAuthenticated(): boolean {
  const cookieStore = cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  return session?.value === SESSION_VALUE;
}

export function createSessionToken(): string {
  return SESSION_VALUE;
}

export const SESSION_COOKIE_NAME = SESSION_COOKIE;
