import NextAuth from "next-auth/next";
import { authOptions } from "@/utils/authOptions";
import nextAuth from "next-auth";

const handler = nextAuth(authOptions);
export { handler as GET, handler as POST }; //use for GET and POST-same as below

/* 
export const GET = handler;
export const POST = handler;
*/
