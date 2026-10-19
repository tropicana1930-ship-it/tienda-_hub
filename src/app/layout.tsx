import type { ReactNode } from "react";
export const metadata = { title: "TiendaHub", description: "Plataforma multi-vendedor" };
export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="es"><body style={{ fontFamily: "system-ui", margin: "2rem auto", maxWidth: 960, padding: "0 1rem" }}>{children}</body></html>;
}
