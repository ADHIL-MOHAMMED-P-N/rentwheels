//to protect route(check nexttauth doc-middleware).
export { default } from "next-auth/middleware";
//matcher take all routes we want to protect
export const config = {
  matcher: ["/vehicles/add", "/profile", "/vehicles/saved", "/messages"],
};
