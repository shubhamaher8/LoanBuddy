"use client";
import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { MenuIcon, X, Building2 } from "lucide-react";

export function Header() {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  // State to track whether user is logged in
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  
  // Check login status when component mounts
  React.useEffect(() => {
    // Check if user is logged in (e.g., from localStorage, cookies, or context)
    const checkLoginStatus = () => {
      // This is where you'd check your auth state
      // For example: const token = localStorage.getItem('token');
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };
    
    checkLoginStatus();
    
    // You might also want to subscribe to auth state changes here
    // For example with an event listener or auth context
  }, []);
  
  const handleLogout = () => {
    // Clear auth token/session
    localStorage.removeItem('token');
    // Update state
    setIsLoggedIn(false);
    // Redirect to home page
    router.push('/');
    // Close mobile menu if open
    setIsOpen(false);
  };

  const menuVariants = {
    open: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    closed: { opacity: 0, x: "100%", transition: { duration: 0.3, ease: "easeInOut" } },
  };

  // Common menu items that show regardless of login state
  const commonMenuItems = [
    { href: "/", label: "Home" },
    { href: "/compare", label: "Compare Loans" },
  ];
  
  // Menu items that show only when logged in
  const loggedInMenuItems = [
    { href: "/dashboard", label: "Dashboard" },
    ...commonMenuItems
  ];
  
  // Menu items that show only when logged out
  const loggedOutMenuItems = [
    ...commonMenuItems
  ];
  
  // Use the appropriate menu items based on login state
  const menuItems = isLoggedIn ? loggedInMenuItems : loggedOutMenuItems;

  return (
    <header className="py-4 bg-background/90 backdrop-blur-md transition-all duration-300">
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
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
            {isLoggedIn ? (
              <>
                <Link href="/get-started">
                  <Button variant="ghost" className="hover:bg-foreground/10 transition-colors">
                    Get Started
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="hover:bg-foreground/10 transition-colors"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/Login">
                  <Button variant="ghost" className="hover:bg-foreground/10 transition-colors">
                    Login
                  </Button>
                </Link>
                <Link href="/Register">
                  <Button className="hover:bg-foreground/10 transition-colors">
                    Register
                  </Button>
                </Link>
              </>
            )}
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
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-background/90 backdrop-blur-md z-50"
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
                  className="text-foreground/60 hover:text-foreground text-lg py-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Button variant="ghost" className="w-full hover:bg-foreground/10 transition-colors">
                    {item.label}
                  </Button>
                </Link>
              ))}
              <div className="border-t border-foreground/20 pt-4 mt-4">
                {isLoggedIn ? (
                  <>
                    <Link href="/get-started" onClick={() => setIsOpen(false)}>
                      <Button className="w-full mb-2 hover:bg-foreground/10 transition-colors" variant="outline">
                        Get Started
                      </Button>
                    </Link>
                    <Button 
                      className="w-full hover:bg-foreground/10 transition-colors"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <Button className="w-full mb-2 hover:bg-foreground/10 transition-colors" variant="outline">
                        Login
                      </Button>
                    </Link>
                    <Link href="/register" onClick={() => setIsOpen(false)}>
                      <Button className="w-full hover:bg-foreground/10 transition-colors">
                        Register
                      </Button>
                    </Link>
                  </>
                )}
              </div>
              <div className="pt-4">
                <ModeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}