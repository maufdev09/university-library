"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Book, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "../darkModeButton";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const Header = () => {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
        >
          <Book className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            University Library
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-200 font-medium",
                pathname === link.href && "text-primary font-semibold",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <ModeToggle />
          <Button
            onClick={() => setIsLoggedIn(!isLoggedIn)}
            variant={isLoggedIn ? "outline" : "default"}
          >
            {isLoggedIn ? "Logout" : "Login"}
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="h-6 w-6 text-gray-900 dark:text-white" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-[300px] sm:w-[400px] bg-white dark:bg-gray-900"
          >
            <SheetHeader>
              <SheetTitle className="flex items-center space-x-2 text-gray-900 dark:text-white">
                <Book className="h-6 w-6 text-primary" />
                <span>University Library</span>
              </SheetTitle>

              <div className="mt-5">
                <ModeToggle />
              </div>
            </SheetHeader>

            <div className="flex flex-col space-y-4 mt-4">
              {navLinks.map((link) => (
                <SheetClose asChild key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-gray-700 dark:text-gray-300 hover:text-primary py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition",
                      pathname === link.href && "text-primary bg-primary/10",
                    )}
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))}

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  onClick={() => setIsLoggedIn(!isLoggedIn)}
                  className="w-full"
                  variant={isLoggedIn ? "outline" : "default"}
                >
                  {isLoggedIn ? "Logout" : "Login"}
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
