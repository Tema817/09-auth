// "use client";

// import type { Metadata } from "next";
// import css from "./Profile.module.css";
// import Link from "next/link";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { getMe } from "@/lib/api/clientApi";
// import { useAuthStore } from "@/lib/store/authStore";
// import ClipLoader from "react-spinners/ClipLoader"; // імпорт спінера

// export const metadata: Metadata = {
//   title: "NoteHub — Profile",
//   description: "User profile page in NoteHub",
//   openGraph: {
//     title: "NoteHub — Profile",
//     description: "User profile page in NoteHub",
//     url: "https://your-vercel-deployment-url/profile",
//     images: [
//       {
//         url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
//         width: 1200,
//         height: 630,
//       },
//     ],
//   },
// };

// export default function ProfilePage() {
//   const { user, setUser } = useAuthStore();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const currentUser = await getMe();
//         setUser(currentUser);
//       } catch (err: unknown) {
//         if (err instanceof Error) {
//           setError(err.message);
//         } else {
//           setError("Failed to load user profile");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, [setUser]);

//   if (loading) {
//     return (
//       <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
//         <ClipLoader color="#36d7b7" size={50} />
//       </div>
//     );
//   }

//   if (error) {
//     return <p className={css.error}>{error}</p>;
//   }

//   if (!user) {
//     return <p className={css.error}>No user data available</p>;
//   }

//   return (
//     <main className={css.mainContent}>
//       <div className={css.profileCard}>
//         <div className={css.header}>
//           <h1 className={css.formTitle}>Profile Page</h1>
//           <Link href="/profile/edit" className={css.editProfileButton}>
//             Edit Profile
//           </Link>
//         </div>

//         <div className={css.avatarWrapper}>
//           <Image
//             src={user.avatar}
//             alt="User Avatar"
//             width={120}
//             height={120}
//             className={css.avatar}
//           />
//         </div>

//         <div className={css.profileInfo}>
//           <p>Username: {user.username}</p>
//           <p>Email: {user.email}</p>
//         </div>
//       </div>
//     </main>
//   );
// }

// import Image from "next/image";
// import css from "./ProfilePage.module.css";
// import Link from "next/link";

// export const metadata = {
//   title: "Profile Page",
//   description: "User profile information",
// };

// export default function ProfilePage() {
//   return (
//     <main className={css.mainContent}>
//       <div className={css.profileCard}>
//         <div className={css.header}>
//           <h1 className={css.formTitle}>Profile Page</h1>
//           <Link href="/profile/edit" className={css.editProfileButton}>Edit Profile</Link>
//         </div>
//         <div className={css.avatarWrapper}>
//           <Image
//             src="https://ac.goit.global/default-avatar.png"
//             alt="User Avatar"
//             width={120}
//             height={120}
//             className={css.avatar}
//           />
//         </div>
//         <div className={css.profileInfo}>
//           <p>Username: your_username</p>
//           <p>Email: your_email@example.com</p>
//         </div>
//       </div>
//     </main>
//   );
// }

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import css from "./ProfilePage.module.css";
import { getMe } from "@/lib/api/serverApi";

export const metadata: Metadata = {
  title: "Profile Page",
  description: "User profile information",
};

export default async function ProfilePage() {
  let user;

  try {
    user = await getMe();
  } catch {
    // Якщо getMe() повернув 401 або іншу помилку
    return (
      <main className={css.mainContent}>
        <p className={css.error}>Unauthorized. Please sign in again.</p>
        <Link href="/sign-in">Go to Sign In</Link>
      </main>
    );
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar ?? "https://ac.goit.global/default-avatar.png"}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}