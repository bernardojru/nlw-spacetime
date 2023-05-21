import "./globals.css";
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjuree,
} from "next/font/google";
import { cookies } from "next/headers";
import { Copyright } from "@/components/Copyright";
import { Hero } from "@/components/Hero";
import { SignIn } from "@/components/SignIn";
import { Profile } from "@/components/Profile";

const roboto = Roboto({ subsets: ["latin"], variable: "--font-roboto" });

const baiJamjuree = BaiJamjuree({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-bai-jamjuree",
});

export const metadata = {
  title: "NLW SpaceTime",
  description:
    "'Uma cápsula do tempo construída com React, Next.js, TailwindCSS e Typescript.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = cookies().has("token");
  return (
    <html lang="pt-br">
      <body
        className={`${roboto.variable} ${baiJamjuree.variable} bg-gray-900 font-sans text-gray-100`}
      >
        <main className="grid min-h-screen grid-cols-2 max-md:grid-cols-1">
          <div className="relative bg-[url(../assets/bg-stars.svg)] bg-cover flex flex-col items-start justify-between overflow-hidden px-28 py-16 border-r border-white/10 max-md:h-screen">
            <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full" />

            <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes" />

            {isAuthenticated ? <Profile /> : <SignIn />}

            <Hero />

            <Copyright />
          </div>
          <div className="flex overflow-y-scroll max-h-screen flex-col bg-[url(../assets/bg-stars.svg)] bg-cover max-md:h-screen">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
