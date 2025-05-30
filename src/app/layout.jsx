import { Geist, Geist_Mono } from "next/font/google";
import {
  ClerkProvider,
  ClerkLoaded,
  SignInButton,
  SignIn,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";
import Link from "next/link";
import { FaArrowRightToBracket, FaList } from "react-icons/fa6";

import { getUserData, isAdmin } from "@/lib/utils";

import { User, addUser } from "../db/db.js";
import { FaArtstation } from "react-icons/fa";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "CleanArt",
    template: "%s | CleanArt",
  },
  description: "",
};

export default async function RootLayout({ children }) {
  let admin;
  const user = await getUserData();
  if (user) {
    const userExists = await User.findOne({ clerkId: user.clerkId });
    if (!userExists) await addUser(user);
    admin = await isAdmin();
  }

  return (
    <ClerkProvider>
      <html lang="en" className="bg-[#141626]">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased h-full bg-[#141626]`}
        >
          <ClerkLoaded>
            <div className="bg-[#141626]">
              {/* Navbar */}
              <div className="backdrop-blur-lg z-50 fixed w-full border-b border-gray-700  p-2 px-3">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                  <Link href={"/home"}>
                    <div className="flex flex-row gap-2 items-center">
                      <div className="top-icon flex items-center justify-center rounded-xl">
                        <FaArtstation size={20} color="b353fa" />
                      </div>

                      <h1 className="top-text text-xl font-bold text-[#d373ff] flex flex-row">
                        <div className="text-white">Clean</div>
                        <div>Art</div>
                      </h1>
                    </div>
                  </Link>

                  <div className="clerk-buttons flex flex-row gap-1">
                    <SignedOut>
                      <SignInButton mode="modal">
                        <div className="items-center bg-[#000000] border- transition-all border-gray-700 hover:bg-[#272529] flex flex-row gap-2 text-white px-3 py-1 rounded-2xl">
                          <FaArrowRightToBracket size={12} />
                          <div className="text-xs">Sign In</div>
                        </div>
                      </SignInButton>
                    </SignedOut>

                    <SignedIn>
                      {admin ? (
                        <Link href={"/orders"}>
                          <div className="rounded-full bg-black items-center flex-row text-center gap-2 flex itemscenter justify-center transition-all mr-2 active:bg-gray-600 p-1 px-3">
                            <FaList size={12} color="white" />
                            <div className="text-white text-">Orders</div>
                          </div>
                        </Link>
                      ) : null}
                      <UserButton
                        showName
                        appearance={{
                          elements: { userButtonBox: { color: "#ddd" } },
                        }}
                      />
                    </SignedIn>
                  </div>
                </div>
              </div>

              <div className="">{children}</div>
              {/* {children} */}
            </div>
          </ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  );
}
