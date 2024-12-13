import { Poppins as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import StoreProvider from "@/redux/StoreProvider";
import Script from "next/script";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata = {
  metadataBase: new URL("https://www.educationjobs.co.in/"),
  // metadataBase: new URL("http://localhost:3000/"),
  title: "Education Jobs - Your Gateway to Teaching and Non-Teaching Careers",
  description:
    "Welcome to Education Jobs, the ultimate platform for finding teaching and non-teaching jobs in the education sector across India. Explore opportunities and kickstart your career today.",
  keywords: "Cricket, Updates, News",
  openGraph: {
    title: "Education Jobs - Your Gateway to Teaching and Non-Teaching Careers",
    description:
      "Welcome to Education Jobs, the ultimate platform for finding teaching and non-teaching jobs in the education sector across India. Explore opportunities and kickstart your career today.",
    image: "url/opengraph-image.jpg",
  },
  twitter: {
    card: "summary_large_image",
    site: "https://www.educationjobs.co.in/",
    title: "Education Jobs - Your Gateway to Teaching and Non-Teaching Careers",
    description:
      "Welcome to Education Jobs, the ultimate platform for finding teaching and non-teaching jobs in the education sector across India. Explore opportunities and kickstart your career today.",
    image: "url/opengraph-image.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <StoreProvider>
          {" "}
          <div>
            <div className="">{children}</div>
          </div>
          <Toaster />
        </StoreProvider>
      </body>
    </html>
  );
}
