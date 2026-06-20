import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: `Happy Birthday, Thalu — A Vault of Memories`,
  description: "A private archive of memories, sealed with love and opened just for you.",
  openGraph: {
    title: "Birthday Vault — For Thalu",
    description: "A vault of memories sealed just for you.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Inter:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0, background: "#FFFBEB" }}>
        {children}
      </body>
    </html>
  );
}
