"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { databases } from "@/lib/appwrite"; // Import Appwrite

export function Footer() {
  const [formData, setFormData] = useState({ email: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const data = { Email: formData.email };

    if (!data.Email) {
      setError("Please fill all required fields");
      setIsLoading(false);
      return;
    }

    try {
      await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_3!,
        "unique()",
        data
      );
      // Reset form
      setFormData({ email: "" });
      alert("Form submitted successfully!");
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/compare", label: "Compare Loans" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
    { href: "/get-started", label: "Get Started" },
  ];
  const legalLinks = [
    { href: "/", label: "Privacy Policy" },
    { href: "/", label: "Terms of Service" },
    { href: "/", label: "Cookie Policy" },
    { href: "/", label: "Sitemap" },
  ];
  const socialLinks = [
    { icon: FaFacebook, href: "#", label: "Facebook" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaLinkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-sky-50 text-gray-900 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">LoanBuddy</h3>
            <p className="text-gray-600">
              Helping you find the perfect loan for your needs. Compare rates, apply online, and get expert advice.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-gray-600 hover:text-blue-500 transition-colors"
                  aria-label={label}
                >
                  <Icon className="h-6 w-6" />
                </Link>
              ))}
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-blue-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Legal */}
          <div>
            <h3 className="text-xl font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-blue-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="text-gray-600 mb-4">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ email: e.target.value })}
                className="max-w-[200px] bg-white text-gray-900 border-gray-300"
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-blue-500 hover:bg-blue-600 text-white border-none"
              >
                <FaEnvelope className="h-4 w-4 mr-2" />
                {isLoading ? "Submitting..." : "Subscribe"}
              </Button>
            </form>
            {error && <p className="mt-2 text-red-500">{error}</p>}
          </div>
        </div>
        <div className="border-t mt-12 pt-8 text-center text-gray-600">
          <p>&copy; {currentYear} LoanBuddy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}