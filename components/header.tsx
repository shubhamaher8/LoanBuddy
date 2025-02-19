"use client";
import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { MenuIcon, X, Building2 } from "lucide-react";

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const menuVariants = {
    open: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    closed: { opacity: 0, x: "100%", transition: { duration: 0.3, ease: "easeInOut" } },
  };

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/compare", label: "Compare Loans" },
    { href: "/get-started", label: "Get Started" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  return (
    <header className="py-4 bg-background/90 backdrop-blur-md transition-all duration-300">
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center"> {/* Container with padding */}
        <Link href="/" className="flex items-center font-bold text-xl">
          <Building2 className="h-6 w-6 mr-2 text-primary" />
          LoanBuddy
        </Link>

        <div className="hidden md:flex md:items-center md:space-x-4">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button variant="ghost" className="hover:bg-foreground/10 transition-colors">
                {item.label}
              </Button>
            </Link>
          ))}
          <div className="flex items-center space-x-4 ml-4 border-l border-foreground/20 pl-4">
            <Link href="/Login">
              <Button variant="ghost" className="hover:bg-foreground/10 transition-colors">Login</Button>
            </Link>
            <Link href="/Register">
              <Button className="hover:bg-foreground/10 transition-colors">Register</Button>
            </Link>
            <ModeToggle />
          </div>
        </div>

        <button
          className="md:hidden text-foreground hover:text-foreground/70 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div> {/* Close container */}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-background/90 backdrop-blur-md z-50" // Remove fixed positioning
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4"> {/* Container for mobile menu */}
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-foreground/60 hover:text-foreground text-lg py-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Button variant="ghost" className="w-full hover:bg-foreground/10 transition-colors">
                    {item.label}
                  </Button>
                </Link>
              ))}
              <div className="border-t border-foreground/20 pt-4 mt-4">
                <Link href="/Login">
                  <Button className="w-full mb-2 hover:bg-foreground/10 transition-colors" variant="outline">
                    Login
                  </Button>
                </Link>
                <Link href="/Register">
                  <Button className="w-full hover:bg-foreground/10 transition-colors">Register</Button>
                </Link>
              </div>
              <div className="pt-4">
                <ModeToggle />
              </div>
            </div> {/* Close container for mobile menu */}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}