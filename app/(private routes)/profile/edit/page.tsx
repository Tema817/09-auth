// "use client";

// import type { Metadata } from "next";
// import { useState } from "react";
// import css from "./EditProfilePage.module.css";
// import { updateMe } from "@/lib/api/clientApi";
// import { useAuthStore } from "@/lib/store/authStore";
// import { useRouter } from "next/navigation";

// export const metadata: Metadata = {
//   title: "NoteHub — Edit Profile",
//   description: "Edit your NoteHub profile information.",
//   openGraph: {
//     title: "NoteHub — Edit Profile",
//     description: "Edit your NoteHub profile information.",
//     url: "https://your-vercel-deployment-url/profile/edit",
//     images: [
//       {
//         url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
//         width: 1200,
//         height: 630,
//       },
//     ],
//   },
// };

// export default function EditProfilePage() {
//   const router = useRouter();
//   const { user, setUser } = useAuthStore();
//   const [username, setUsername] = useState(user?.username || "");
//   const [error, setError] = useState<string | null>(null);

//   const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError(null);

//     try {
//       const updatedUser = await updateMe({ username });
//       setUser(updatedUser);
//       router.push("/profile"); // повертаємося на сторінку профілю
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         setError(err.message);
//       } else {
//         setError("Failed to update profile. Please try again.");
//       }
//     }
//   };

//   return (
//     <main className={css.mainContent}>
//       <form className={css.form} onSubmit={handleSubmit}>
//         <h1 className={css.formTitle}>Edit Profile</h1>

//         <div className={css.formGroup}>
//           <label htmlFor="username">Username</label>
//           <input
//             id="username"
//             type="text"
//             name="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className={css.input}
//             required
//           />
//         </div>

//         <div className={css.actions}>
//           <button type="submit" className={css.saveButton}>
//             Save
//           </button>
//           <button
//             type="button"
//             className={css.cancelButton}
//             onClick={() => router.push("/profile")}
//           >
//             Cancel
//           </button>
//         </div>

//         {error && <p className={css.error}>{error}</p>}
//       </form>
//     </main>
//   );
// }

// import css from "./Profile.module.css";

// export const metadata = {
//   title: "NoteHub — Profile",
//   description: "User profile page",
// };

// export default function ProfilePage() {
//   return (
//     <main className={css.mainContent}>
//       <div className={css.profileCard}>
//         <div className={css.header}>
//           <h1 className={css.formTitle}>Profile Page</h1>
//           <a href="/profile/edit" className={css.editProfileButton}>Edit Profile</a>
//         </div>
//         <div className={css.avatarWrapper}>
//           <img src="Avatar" alt="User Avatar" width={120} height={120} className={css.avatar} />
//         </div>
//         <div className={css.profileInfo}>
//           <p>Username: your_username</p>
//           <p>Email: your_email@example.com</p>
//         </div>
//       </div>
//     </main>
//   );
// }


// "use client";

// import { SyntheticEvent, useState, useEffect } from "react";
// import css from "./EditProfile.module.css";
// import { getMe, updateMe } from "@/lib/api/clientApi";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { useAuthStore } from "@/lib/store/authStore";

// export default function EditProfilePage() {
//   const router = useRouter();
//   const { user, setUser } = useAuthStore();
//   const [username, setUsername] = useState(user?.username || "");
//   const [error, setError] = useState<string | null>(null);

//   // Якщо стор ще порожній, підтягуємо дані користувача
//   useEffect(() => {
//       const fetchUser = async () => {
//           if (!user) {
//               try {
//                   const currentUser = await getMe();
//                   setUser(currentUser);
//                   setUsername(currentUser.username);
//               } catch (err: unknown) {
//                   if (err instanceof Error) {
//                       setError(err.message);
//                   } else {
//                       setError("Failed to load user data");
//                   }
//               }
//           };
//       }
//     fetchUser();
//   }, [user, setUser]);

//   const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError(null);

//     try {
//       const updatedUser = await updateMe({ username });
//       setUser(updatedUser);
//       router.push("/profile"); // редірект після успішного оновлення
//     } catch (err: any) {
//       setError("Failed to update profile");
//     }
//   };

//   const handleCancel = () => {
//     router.push("/profile");
//   };

//   return (
//     <main className={css.mainContent}>
//       <div className={css.profileCard}>
//         <h1 className={css.formTitle}>Edit Profile</h1>

//         {user?.avatar && (
//           <Image
//             src={user.avatar}
//             alt="User Avatar"
//             width={120}
//             height={120}
//             className={css.avatar}
//           />
//         )}

//         <form className={css.profileInfo} onSubmit={handleSubmit}>
//           <div className={css.usernameWrapper}>
//             <label htmlFor="username">Username:</label>
//             <input
//               id="username"
//               type="text"
//               className={css.input}
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>

//           <p>Email: {user?.email}</p>

//           <div className={css.actions}>
//             <button type="submit" className={css.saveButton}>
//               Save
//             </button>
//             <button
//               type="button"
//               className={css.cancelButton}
//               onClick={handleCancel}
//             >
//               Cancel
//             </button>
//           </div>

//           {error && <p className={css.error}>{error}</p>}
//         </form>
//       </div>
//     </main>
//   );
// }

"use client";

import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getMe, updateMe } from "@/lib/api/clientApi";
import css from "./EditProfilePage.module.css";
import Image from "next/image";
import Link from "next/link";

export default function EditProfilePage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getMe();
      setUsername(user.username);
      setEmail(user.email);
      setAvatar(user.avatar);
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateMe(username);
      router.push("/profile");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
              <h1 className={css.formTitle}>Edit Profile</h1>
                        <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        <Image src={avatar} alt="User Avatar" width={120} height={120} className={css.avatar} />
        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <p>Email: {email}</p>
          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>Save</button>
            <button type="button" className={css.cancelButton} onClick={() => router.push("/profile")}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}