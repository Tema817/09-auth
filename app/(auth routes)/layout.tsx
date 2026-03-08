// import type { ReactNode } from "react";

// export default function SignInLayout({ children }: { children: ReactNode }) {
//   return (
//     <section>
//       {children}
//     </section>
//   );
// }


"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return <section>{children}</section>;
}