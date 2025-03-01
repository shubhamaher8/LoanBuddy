"use client";
import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { MenuIcon, X, Building2 } from "lucide-react";
import { Client, Account } from "appwrite"; // ✅ Import Appwrite authentication

export function Header() {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  // ✅ Check authentication status on mount
  React.useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const client = new Client();
        const account = new Account(client);
        const user = await account.get();
        console.log("User session:", user);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("User not logged in:", error);
        setIsLoggedIn(false);
      }
    };

    checkAuthStatus();
  }, []);

  // ✅ Logout function
  const handleLogout = async () => {
    try {
      const client = new Client();
      const account = new Account(client);
      await account.deleteSession("current");
      setIsLoggedIn(false);
      router.refresh(); // Refresh UI
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsOpen(false);
    }
  };

  const menuVariants = {
    open: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    closed: { opacity: 0, x: "100%", transition: { duration: 0.3, ease: "easeInOut" } },
  };

  // Navigation items
  const menuConfig = {
    common: [
      { href: "/", label: "Home" },
      { href: "/compare", label: "Compare Loans" },
    ],
    authenticated: [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/get-started", label: "Getting Started" }, // ✅ Added "Getting Started"
    ],
  };

  const menuItems = [
    ...menuConfig.common,
    ...(isLoggedIn ? menuConfig.authenticated : []),
  ];

  return (
    <header className="py-4 bg-background/90 backdrop-blur-md transition-all duration-300 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <Link href="/" className="flex items-center font-bold text-xl hover:opacity-80 transition-opacity">
          <Building2 className="h-6 w-6 mr-2 text-primary" />
          LoanBuddy
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:space-x-4">
          <div className="flex items-center space-x-4">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button variant="ghost" className="hover:bg-foreground/10">
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4 ml-4 border-l border-foreground/20 pl-4">
            {isLoggedIn ? (
              <>
                <Link href="/get-started">
                  <Button variant="default">Getting Started</Button> {/* ✅ "Getting Started" Button */}
                </Link>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="hover:bg-destructive/10 hover:text-destructive"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/Login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/Register">
                  <Button variant="default">Register</Button>
                </Link>
              </>
            )}
            <ModeToggle />
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-foreground hover:text-foreground/70 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-background/90 backdrop-blur-md z-50 fixed w-full"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="py-2"
                >
                  <Button variant="ghost" className="w-full justify-start">
                    {item.label}
                  </Button>
                </Link>
              ))}

              <div className="border-t border-foreground/20 pt-4 space-y-2">
                {isLoggedIn ? (
                  <>
                    <Link href="/get-started">
                      <Button className="w-full">Getting Started</Button> {/* ✅ "Getting Started" Button */}
                    </Link>
                    <Button className="w-full" variant="destructive" onClick={handleLogout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/Login" onClick={() => setIsOpen(false)}>
                      <Button className="w-full" variant="outline">
                        Login
                      </Button>
                    </Link>
                    <Link href="/Register" onClick={() => setIsOpen(false)}>
                      <Button className="w-full">Register</Button>
                    </Link>
                  </>
                )}
                <div className="pt-4 flex justify-center">
                  <ModeToggle />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
