"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { CalendarDays, FileCheck, Calculator, Clock } from "lucide-react";
import { databases } from "@/lib/appwrite"; // Import Appwrite

const requiredDocuments = [
  { name: "Government-issued ID", required: true },
  { name: "Proof of Income", required: true },
  { name: "Bank Statements (3 months)", required: true },
  { name: "Tax Returns", required: false },
  { name: "Employment Verification", required: true },
  { name: "Proof of Address", required: true },
];

const eligibilityCriteria = [
  { criterion: "Age", requirement: "18 years or older" },
  { criterion: "Income", requirement: "Minimum ₹30,000 annually" },
  { criterion: "Credit Score", requirement: "Minimum 650" },
  { criterion: "Residency", requirement: "Indian resident or citizen" },
];

export default function GetStartedPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loanAmount, setLoanAmount] = useState("50000");
  const [loanTerm, setLoanTerm] = useState("60");
  const [interestRate, setInterestRate] = useState("5.75");

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const form = e.currentTarget;  // Add this line - store form reference

    try {
      const formData = new FormData(form);  // Use form instead of e.currentTarget
      const data = {
        fullName: formData.get("fullName"),
        email: formData.get("email"),
        phoneNumber: formData.get("phoneNumber"), // Matches DB field
        annualIncome: parseInt(formData.get("annualIncome") as string, 10), // Parse as integer
      };

      // Validation
      if (!data.fullName || !data.email || !data.phoneNumber || !data.annualIncome ) {
        throw new Error("Please fill all required fields");
      }

      // Send to Appwrite
      await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
        "unique()",
        data
      );

      // Success
      form.reset();
      alert("Form submitted successfully!");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "An error occurred. Please try again.");
      } else {
        setError("An error occurred. Please try again.");
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-sky-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Title */}
        <h1 className="text-3xl font-bold mb-8">Get Started</h1>

        {/* Application Process */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Application Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                icon: FileCheck,
                title: "Submit Documents",
                description: "Upload required documentation",
              },
              {
                icon: Calculator,
                title: "Review Options",
                description: "Compare available loan offers",
              },
              {
                icon: Clock,
                title: "Quick Approval",
                description: "Get approved within 24-48 hours",
              },
              {
                icon: CalendarDays,
                title: "Receive Funds",
                description: "Get funds deposited to your account",
              },
            ].map((step, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="text-primary mb-4">
                    <step.icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Required Documents & Eligibility */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Required Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Required Documents</CardTitle>
              <CardDescription>
                Please prepare the following documents for your application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Required</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requiredDocuments.map((doc, index) => (
                    <TableRow key={index}>
                      <TableCell>{doc.name}</TableCell>
                      <TableCell>
                        {doc.required ? (
                          <span className="text-primary">Required</span>
                        ) : (
                          <span className="text-muted-foreground">Optional</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Eligibility Criteria */}
          <Card>
            <CardHeader>
              <CardTitle>Eligibility Criteria</CardTitle>
              <CardDescription>
                Check if you meet our basic eligibility requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Criterion</TableHead>
                    <TableHead>Requirement</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {eligibilityCriteria.map((criteria, index) => (
                    <TableRow key={index}>
                      <TableCell>{criteria.criterion}</TableCell>
                      <TableCell>{criteria.requirement}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Pre-qualification Form */}
        <Card>
          <CardHeader>
            <CardTitle>Pre-qualification Form</CardTitle>
            <CardDescription>
              Fill out this form to check your loan eligibility
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    required
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    name="phoneNumber"
                    required
                  />
                </div>

                {/* Annual Income */}
                <div className="space-y-2">
                  <Label htmlFor="annualIncome">Annual Income</Label>
                  <Input
                    id="annualIncome"
                    type="number"
                    name="annualIncome"
                    required
                  />
                </div>

                {/* Loan Purpose */}
                <div className="space-y-2">
                  <Label htmlFor="loanPurpose">Loan Purpose</Label>
                  <Select name="loanPurpose">
                    <SelectTrigger>
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="education">Education</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-center space-x-2 mt-4">
                <Checkbox
                  id="terms"
                  name="terms"
                  required
                />
                <Label htmlFor="terms">
                  I agree to the terms and conditions and consent to credit check
                </Label>
              </div>

              {/* Error Message */}
              {error && <p className="text-red-500 mt-4">{error}</p>}

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
      </motion.div>
    </div>
  );
}