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

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const token = req.cookies.get("token"); // кука з бекенду
  const { pathname } = req.nextUrl;

  const isAuthRoute = pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");
  const isPrivateRoute = pathname.startsWith("/profile") || pathname.startsWith("/notes");

  // Якщо користувач неавторизований і йде на приватний маршрут → редірект на /sign-in
  if (!token && isPrivateRoute) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // Якщо користувач авторизований і йде на публічний маршрут → редірект на /profile
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};