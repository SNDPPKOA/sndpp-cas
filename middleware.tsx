import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;
  const { pathname } = request.nextUrl;

  console.log("✅ Middleware running:", pathname);
  console.log("🔐 Token value:", token);

  // ✅ Allow public access to homepage or auth pages
  if (pathname === "/" || pathname === "/signup" || pathname === "/login") {
    return NextResponse.next();
  }

  // 🚫 Block access if no token
  if (!token) {
    console.log("⛔ No token. Redirecting to /");
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ✅ Admin-only routes
  const adminRoutes = [
    "/dashboard",
    "/members",
    "/attendance",
    "/attendanceReport",
    "/inactive",
    "/birthday",
    "/liturgicalObj",
    "/sacraments",
    "/vesselsVestments",
    "/[id]",
  ];
  if (
    adminRoutes.some(
      (route) => pathname === route || pathname.startsWith(route + "/")
    )
  ) {
    if (token !== "admin-token") {
      console.log("⛔ Not admin. Redirecting to /");
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // ✅ Officer-only routes
  const officerRoutes = ["/attendanceOfficers"];
  if (
    officerRoutes.some(
      (route) => pathname === route || pathname.startsWith(route + "/")
    )
  ) {
    if (token !== "officer-token") {
      console.log("⛔ Not officer. Redirecting to /");
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // ✅ Regular user-only routes
  const userRoutes = [
    "/dashboardUsers",
    "/memberUsers",
    "/vesselsVestments",
    "/userProfile",
  ];
  if (
    userRoutes.some(
      (route) => pathname === route || pathname.startsWith(route + "/")
    )
  ) {
    if (token !== "user-token") {
      console.log("⛔ Not a regular user. Redirecting to /");
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

// ✅ Matcher (leave as is — middleware still only applies to these routes)
export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/attendance",
    "/attendance/:path*",
    "/attendanceOfficers",
    "/attendanceOfficers/:path*",
    "/attendanceReport",
    "/attendanceReport/:path*",
    "/birthday",
    "/birthday/:path*",
    "/dashboardUsers",
    "/dashboardUsers/:path*",
    "/inactive",
    "/inactive/:path*",
    "/liturgicalObj",
    "/liturgicalObj/:path*",
    "/members",
    "/members/:path*",
    "/memberUsers",
    "/memberUsers/:path*",
    "/sacraments",
    "/sacraments/:path*",
    "/userProfile",
    "/userProfile/:path*",
    "/vesselsVestments",
    "/vesselsVestments/:path*",
  ],
};

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get("authToken")?.value || "";
//   const path = request.nextUrl.pathname;

//   console.log("✅ Middleware running:", path);
//   console.log("🔐 Token value:", token);

//   // 🚫 Block all protected routes if no token
//   const protectedRoutes = [
//     "/dashboard",
//     "/members",
//     "/inactive",
//     "/vesselsVestments",
//     "/attendanceOfficers",
//     "/attendanceReport",
//     "/birthday",
//     "/dashboardUsers",
//     "/memberUsers",
//     "/liturgicalObj",
//     "/userProfile",
//     "/sacraments",
//     "/attendance",
//   ];

//   if (protectedRoutes.some((route) => path.startsWith(route))) {
//     if (!token) {
//       console.log("⛔ No token. Redirecting to /");
//       return NextResponse.redirect(new URL("/", request.url));
//     }

//     // Admin-only
//     if (
//       ["/dashboard", "/members", "/inactive", "/vesselsVestments"].some(
//         (route) => path.startsWith(route)
//       ) &&
//       token !== "admin-token"
//     ) {
//       return NextResponse.redirect(new URL("/", request.url));
//     }

//     // Officer-only
//     if (
//       ["/attendanceOfficers", "/attendanceReport", "/birthday"].some((route) =>
//         path.startsWith(route)
//       ) &&
//       token !== "officer-token"
//     ) {
//       return NextResponse.redirect(new URL("/", request.url));
//     }

//     // Regular user-only
//     if (
//       [
//         "/dashboardUsers",
//         "/memberUsers",
//         "/liturgicalObj",
//         "/userProfile",
//         "/sacraments",
//         "/attendance",
//       ].some((route) => path.startsWith(route)) &&
//       token !== "user-token"
//     ) {
//       return NextResponse.redirect(new URL("/", request.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
// };
