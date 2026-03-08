// import { NextRequest, NextResponse } from "next/server";

// // Список приватних маршрутів
// const privateRoutes = ["/profile", "/notes"];

// // Список публічних маршрутів
// const publicRoutes = ["/sign-in", "/sign-up"];

// export default function proxy(req: NextRequest) {
//   const token = req.cookies.get("token")?.value || null;
//   const { pathname } = req.nextUrl;

//   // Якщо користувач неавторизований і йде на приватну сторінку → редірект на /sign-in
//   if (!token && privateRoutes.some((route) => pathname.startsWith(route))) {
//     return NextResponse.redirect(new URL("/sign-in", req.url));
//   }

//   // Якщо користувач авторизований і йде на публічну сторінку → редірект на /profile
//   if (token && publicRoutes.some((route) => pathname.startsWith(route))) {
//     return NextResponse.redirect(new URL("/profile", req.url));
//   }

//   // Інакше дозволяємо доступ
//   return NextResponse.next();
// }

// // Вказуємо, на які маршрути застосовується proxy
// export const config = {
//   matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
// };

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { cookies } from "next/headers";
// import { checkSession } from "@/lib/api/serverApi";

// export async function middleware(req: NextRequest) {
//   const cookieStore = await cookies();
//   const accessToken = cookieStore.get("accessToken")?.value;
//   const refreshToken = cookieStore.get("refreshToken")?.value;

//   const { pathname } = req.nextUrl;

//   const isAuthRoute = pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");
//   const isPrivateRoute = pathname.startsWith("/profile") || pathname.startsWith("/notes");

//   // Якщо користувач авторизований і йде на публічний маршрут → редірект на головну
//   if (isAuthRoute && accessToken) {
//     return NextResponse.redirect(new URL("/", req.url));
//   }

//   // Якщо користувач заходить на приватний маршрут
//   if (isPrivateRoute) {
//     if (!accessToken) {
//       if (refreshToken) {
//         const sessionValid = await checkSession();
//         if (!sessionValid) {
//           return NextResponse.redirect(new URL("/sign-in", req.url));
//         }
//       } else {
//         return NextResponse.redirect(new URL("/sign-in", req.url));
//       }
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { checkSession } from "@/lib/api/serverApi";

export async function proxy(req: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const { pathname } = req.nextUrl;

  const isAuthRoute = pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");
  const isPrivateRoute = pathname.startsWith("/profile") || pathname.startsWith("/notes");

  // Якщо користувач авторизований і йде на публічний маршрут → редірект на головну
  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Якщо користувач заходить на приватний маршрут
  if (isPrivateRoute) {
    if (!accessToken) {
      if (refreshToken) {
        const sessionValid = await checkSession();
        if (!sessionValid) {
          return NextResponse.redirect(new URL("/sign-in", req.url));
        }
      } else {
        return NextResponse.redirect(new URL("/sign-in", req.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};