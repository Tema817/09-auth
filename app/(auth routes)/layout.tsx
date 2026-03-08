// import type { ReactNode } from "react";

// export default function SignInLayout({ children }: { children: ReactNode }) {
//   return (
//     <section>
//       {children}
//     </section>
//   );
// }


export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
