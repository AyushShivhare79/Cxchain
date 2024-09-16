import { withAuth } from "next-auth/middleware";
import authOptions from "./app/lib/auth";

export { default } from "next-auth/middleware";

export const config = { matcher: ["/dashboard/:path*", "/api/transfer"] };
// secret: process.env.NEXTAUTH_SECRET;



// export default withAuth({
//   cookies: authOptions.cookies,
//   pages: authOptions.pages,
// });
