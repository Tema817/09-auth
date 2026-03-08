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

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { cookies } from "next/headers";
// import { checkSession } from "@/lib/api/serverApi";

// export async function proxy(req: NextRequest) {
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

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { cookies } from "next/headers";
// import { nextServer } from "@/lib/api/api"; // напряму axios-інстанс

// export async function proxy(req: NextRequest) {
//   const cookieStore = await cookies();
//   const accessToken = cookieStore.get("accessToken")?.value;
//   const refreshToken = cookieStore.get("refreshToken")?.value;

//   const { pathname } = req.nextUrl;

//   const isAuthRoute = pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");
//   const isPrivateRoute = pathname.startsWith("/profile") || pathname.startsWith("/notes");

//   if (isAuthRoute && accessToken) {
//     return NextResponse.redirect(new URL("/", req.url));
//   }

//   if (isPrivateRoute) {
//     if (!accessToken) {
//       if (refreshToken) {
//         // Викликаємо бекенд напряму, щоб отримати повну відповідь з заголовками
//         const response = await nextServer.get("/auth/session", { withCredentials: true });

//         if (!response.data) {
//           return NextResponse.redirect(new URL("/sign-in", req.url));
//         }

//         // Якщо бекенд повернув нові токени у Set-Cookie
//         const res = NextResponse.next();
//         const setCookieHeader = response.headers["set-cookie"];
//         if (setCookieHeader) {
//           // Тут треба розпарсити куки і записати їх у res.cookies
//           // Наприклад, якщо бекенд повертає "accessToken=...; Path=/; HttpOnly"
//           setCookieHeader.forEach((cookieStr: string) => {
//             const [nameValue] = cookieStr.split(";");
//             const [name, value] = nameValue.split("=");
//             res.cookies.set(name.trim(), value.trim(), { httpOnly: true, path: "/" });
//           });
//         }
//         return res;
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
import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export async function proxy(req: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const { pathname } = req.nextUrl;

  const isAuthRoute =
    pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");
  const isPrivateRoute =
    pathname.startsWith("/profile") || pathname.startsWith("/notes");

  // Якщо користувач вже автентифікований, не пускаємо на sign-in/sign-up
  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isPrivateRoute) {
    if (!accessToken) {
      if (refreshToken) {
        const response = await checkSession();

        if (!response?.data) {
          return NextResponse.redirect(new URL("/sign-in", req.url));
        }

        const res = NextResponse.next();
        const setCookieHeader = response.headers?.["set-cookie"];

        if (setCookieHeader) {
          const cookiesArray = Array.isArray(setCookieHeader)
            ? setCookieHeader
            : [setCookieHeader];

          cookiesArray.forEach((cookieStr) => {
            const parts = cookieStr.split(";").map((p) => p.trim());

            const [nameValue] = parts;
            const [name, value] = nameValue.split("=");

            const options: Partial<ResponseCookie> = {};

            parts.slice(1).forEach((attr) => {
              const [k, v] = attr.split("=");
              switch (k.toLowerCase()) {
                case "httponly":
                  options.httpOnly = true;
                  break;
                case "secure":
                  options.secure = true;
                  break;
                case "samesite":
                  if (v) {
                    const val = v.toLowerCase();
                    if (["strict", "lax", "none"].includes(val)) {
                      options.sameSite = val as "strict" | "lax" | "none";
                    }
                  }
                  break;
                case "expires":
                  if (v) options.expires = new Date(v);
                  break;
                case "path":
                  if (v) options.path = v;
                  break;
              }
            });

            if (value) {
              res.cookies.set(name, value, options);
            }
          });
        }

        // 🔑 Додана перевірка: якщо після поновлення користувач на публічному маршруті
        if (isAuthRoute) {
          return NextResponse.redirect(new URL("/", req.url));
        }

        return res;
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
