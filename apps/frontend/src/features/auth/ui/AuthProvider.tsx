'use client';
import { createContext, use, type PropsWithChildren } from 'react';
import { SessionValidationResult } from '../lib/session';

const AuthContext = createContext<SessionValidationResult>({
  user: null,
  session: null,
});

type TAuthProvider = PropsWithChildren<SessionValidationResult>;

export function AuthProvider({ children, ...result }: TAuthProvider) {
  return <AuthContext.Provider value={result}>{children}</AuthContext.Provider>;
}

export const useAuth = () => use(AuthContext);
