import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/lib/StoreProvider";
import ThemeProvider from "@/contexts/ThemeProvider";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: "Frontend Task - Campaign Management",
  description: "Campaign Management Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${inter.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full font-sans antialiased">
        <ThemeProvider>
          <StoreProvider>{children}</StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
