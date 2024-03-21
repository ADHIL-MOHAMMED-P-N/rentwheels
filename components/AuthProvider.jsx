/* session provider use reacr provider which is not going to work in server component, so make it client comp, then import in layout(so no need to change layout to client compo)  */

"use client";
import { SessionProvider } from "next-auth/react";
const AuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
