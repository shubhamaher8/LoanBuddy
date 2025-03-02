"use client";

import { databases } from "@/lib/appwrite"; // Import Appwrite
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const faqs = [
  {
    question: "How do I compare loan offers?",
    answer:
      "Use our loan comparison tool to compare different offers from our partner banks.",
  },
  {
    question: "What documents do I need?",
    answer:
      "Typically, you need proof of identity, proof of income, and bank statements.",
  },
];

const businessHours = [
  { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
  { day: "Saturday", hours: "10:00 AM - 2:00 PM" },
  { day: "Sunday", hours: "Closed" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const data = {
      Name: formData.name,
      Email: formData.email,
      Subject: formData.subject,
      Message: formData.message,
    };

    // Validation
    if (!data.Name || !data.Email || !data.Subject || !data.Message) {
      setError("Please fill all required fields");
      setIsLoading(false);
      return;
    }

    try {
      // Send to Appwrite
      await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_1!,
        "unique()",
        data
      );
      // Reset form
      setFormData({ name: "", email: "", subject: "", message: "" });
      alert("Form submitted successfully!");
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 bg-sky-100">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold">Get in Touch</h1>
        <p className="text-lg text-gray-600 mt-2">
          Have questions? We're here to help!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
            <CardDescription>We will respond as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="Name">Name</Label>
                  <Input
                    id="Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="Email">Email</Label>
                  <Input
                    id="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="Subject">Subject</Label>
                <Input
                  id="Subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="Message">Message</Label>
                <Textarea
                  id="Message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="mt-6 bg-blue-600 hover:bg-blue-700 w-full md:w-auto"
              >
                {isLoading ? "Submitting..." : "Submit Pre-qualification"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card>
          <CardHeader>
            <CardTitle>Our Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="flex items-center gap-2">
              <Mail size={20} /> support@loanbuddy.com
            </p>
            <p className="flex items-center gap-2">
              <Phone size={20} /> +91 98765 43210
            </p>
            <p className="flex items-center gap-2">
              <MapPin size={20} /> Mumbai, India
            </p>
            <div>
              <h3 className="font-semibold">Business Hours</h3>
              {businessHours.map((bh, index) => (
                <p key={index} className="flex items-center gap-2">
                  <Clock size={18} /> {bh.day}: {bh.hours}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-center mb-6">FAQs</h2>
        <Accordion type="single" collapsible>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
