// "use client";

// import { ReactNode, useEffect, useState } from "react";
// import { useAuthStore } from "@/lib/store/authStore";
// import { checkSession, logout } from "@/lib/api/clientApi";
// import { useRouter } from "next/navigation";

// interface Props {
//   children: ReactNode;
// }

// export default function AuthProvider({ children }: Props) {
//   const router = useRouter();
//   const { user, setUser, clearIsAuthenticated } = useAuthStore();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const verifySession = async () => {
//       try {
//         const currentUser = await checkSession();
//         if (currentUser) {
//           setUser(currentUser);
//         } else {
//           clearIsAuthenticated();
//         }
//       } catch {
//         clearIsAuthenticated();
//         await logout();
//         router.push("/sign-in");
//       } finally {
//         setLoading(false);
//       }
//     };

//     verifySession();
//   }, [setUser, clearIsAuthenticated, router]);

//   // 🔎 Додана перевірка: якщо користувач вже є, редіректимо на профіль
//   useEffect(() => {
//     if (user) {
//       router.push("/profile");
//     }
//   }, [user, router]);

//   if (loading) {
//     return <p>Loading...</p>; // можна замінити на спінер
//   }

//   return <>{children}</>;
// }

"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { checkSession } from "@/lib/api/clientApi";
import Loader from "@/components/Loader/Loader";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, clearIsAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const user = await checkSession();
        if (user) {
          setUser(user);
        } else {
          clearIsAuthenticated();
        }
      } catch (error) {
        console.error("Session check failed:", error);
        clearIsAuthenticated();
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, [setUser, clearIsAuthenticated]);

  if (loading) {
    return <Loader />;
  }

  return <>{children}</>;
}