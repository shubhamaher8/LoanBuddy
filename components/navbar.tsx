"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { MenuIcon, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const menuVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "100%" },
  };

  return (
    <nav className="fixed w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">LoanBuddy</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link href="/dashboard" className="text-foreground/60 hover:text-foreground">
              Dashboard
            </Link>
            <Link href="/compare" className="text-foreground/60 hover:text-foreground">
              Compare Loans
            </Link>
            <Link href="/about" className="text-foreground/60 hover:text-foreground">
              About
            </Link>
            <Button>Get Started</Button>
            <ModeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className="fixed inset-y-0 right-0 w-full bg-background md:hidden"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
        transition={{ duration: 0.2 }}
      >
        <div className="flex flex-col space-y-4 p-4 pt-20">
          <Link
            href="/dashboard"
            className="text-foreground/60 hover:text-foreground"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            href="/compare"
            className="text-foreground/60 hover:text-foreground"
            onClick={() => setIsOpen(false)}
          >
            Compare Loans
          </Link>
          <Link
            href="/about"
            className="text-foreground/60 hover:text-foreground"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Button onClick={() => setIsOpen(false)}>Get Started</Button>
          <div className="pt-4">
            <ModeToggle />
          </div>
        </div>
      </motion.div>
    </nav>
  );
}