// "use client"

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import css from "./Header.module.css";

// export default function Header() {
//     const pathname = usePathname();
    
//     return (
//         <header className={css.header}>
//             <Link href="/" aria-label="Home">
//                 NoteHub
//             </Link>
//             <nav aria-label="Main Navigation">
//                 <ul className={css.navigation}>
//                     <li>
//                         <Link
//                             href="/"
//                             className={pathname === "/" ? css.active : ""}>
//                             Home
//                         </Link>
//                     </li>
//                     <li>
//                         <Link
//                             href="/notes/filter/all"
//                             className={pathname.startsWith("/notes/filter") ? css.active : ""}>
//                             Notes
//                         </Link>
//                     </li>
//                 </ul>
//             </nav>
//         </header>
//     );
// }

// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import css from "./Header.module.css";
// import { useAuthStore } from "@/lib/store/authStore";
// import { logout } from "@/lib/api/clientApi";

// export default function Header() {
//   const pathname = usePathname();
//   const router = useRouter();
//   const { user, clearIsAuthenticated } = useAuthStore();

//   const handleLogout = async () => {
//     await logout();
//     clearIsAuthenticated();
//     router.push("/sign-in");
//   };

//   return (
//     <header className={css.header}>
//       <Link href="/" aria-label="Home">
//         NoteHub
//       </Link>
//       <nav aria-label="Main Navigation">
//         <ul className={css.navigation}>
//           <li>
//             <Link
//               href="/"
//               className={pathname === "/" ? css.active : ""}
//             >
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link
//               href="/notes/filter/all"
//               className={pathname.startsWith("/notes/filter") ? css.active : ""}
//             >
//               Notes
//             </Link>
//           </li>

//           {/* 🔎 Умовний рендеринг */}
//           {!user ? (
//             <>
//               <li>
//                 <Link
//                   href="/sign-in"
//                   className={pathname === "/sign-in" ? css.active : ""}
//                 >
//                   Sign in
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/sign-up"
//                   className={pathname === "/sign-up" ? css.active : ""}
//                 >
//                   Sign up
//                 </Link>
//               </li>
//             </>
//           ) : (
//             <>
//               <li>
//                 <span className={css.username}>Hello, {user.username}</span>
//               </li>
//               <li>
//                 <button onClick={handleLogout} className={css.logoutButton}>
//                   Logout
//                 </button>
//               </li>
//             </>
//           )}
//         </ul>
//       </nav>
//     </header>
//   );
// }

// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import css from "./Header.module.css";
// import { useAuthStore } from "@/lib/store/authStore";
// import { logout } from "@/lib/api/clientApi";

// export default function Header() {
//   const pathname = usePathname();
//   const router = useRouter();
//   const { user, clearIsAuthenticated } = useAuthStore();

//   const handleLogout = async () => {
//     await logout();
//     clearIsAuthenticated();
//     router.push("/sign-in");
//   };

//   return (
//     <header className={css.header}>
//       <Link href="/" aria-label="Home">
//         NoteHub
//       </Link>
//       <nav aria-label="Main Navigation">
//         <ul className={css.navigation}>
//           {/* 🔎 Якщо користувач НЕ авторизований → показуємо Sign in / Sign up */}
//           {!user ? (
//             <>
//               <li>
//                 <Link
//                   href="/sign-in"
//                   className={pathname === "/sign-in" ? css.active : ""}
//                 >
//                   Sign in
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/sign-up"
//                   className={pathname === "/sign-up" ? css.active : ""}
//                 >
//                   Sign up
//                 </Link>
//               </li>
//             </>
//           ) : (
//             <>
//               {/* 🔎 Якщо користувач авторизований → показуємо Home / Notes + Logout */}
//               <li>
//                 <Link
//                   href="/"
//                   className={pathname === "/" ? css.active : ""}
//                 >
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/notes/filter/all"
//                   className={pathname.startsWith("/notes/filter") ? css.active : ""}
//                 >
//                   Notes
//                 </Link>
//               </li>
//               <li>
//                 <span className={css.username}>Hello, {user.username}</span>
//               </li>
//               <li>
//                 <button onClick={handleLogout} className={css.logoutButton}>
//                   Logout
//                 </button>
//               </li>
//             </>
//           )}
//         </ul>
//       </nav>
//     </header>
//   );
// }

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./Header.module.css";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
import { useAuthStore } from "@/lib/store/authStore";

export default function Header() {
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();

  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          {isAuthenticated && (
            <>
              <li>
                <Link
                  href="/"
                  className={pathname === "/" ? css.active : ""}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/notes/filter/all"
                  className={pathname.startsWith("/notes/filter") ? css.active : ""}
                >
                  Notes
                </Link>
              </li>
            </>
          )}
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
}
