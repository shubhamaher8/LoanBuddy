"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function LoanDetailsPage() {
  const [loan] = useState({
    name: "Education Loan Scheme",
    lender: "State Bank of India",
    interestRate: "8.5% p.a.",
    processingFee: "1% of loan amount (Non-refundable)",
    loanAmount: "₹50,000 - ₹20,00,000",
    tenure: "1 - 10 years",
    eligibility: [
      "Indian Citizen",
      "18 - 35 years of age",
      "Minimum 50% marks in graduation",
      "Admission in recognized institution",
    ],
    documents: [
      "Mark sheets of all previous degrees",
      "ITR returns for the last 2 years",
      "Aadhaar Card, PAN Card",
    ],
  });

  return (
    <div className="container mx-auto px-4 py-8 bg-sky-100 text-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-8">Loan Details: {loan.name}</h1>
        <Card className="bg-white shadow-2xl rounded-xl p-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">{loan.lender}</CardTitle>
            <CardDescription className="text-gray-600">Flexible repayment and competitive rates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-700">Category</TableHead>
                  <TableHead className="text-gray-700">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="text-gray-900">Interest Rate</TableCell>
                  <TableCell className="text-gray-900">{loan.interestRate}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-gray-900">Processing Fee</TableCell>
                  <TableCell className="text-gray-900">{loan.processingFee}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-gray-900">Loan Amount</TableCell>
                  <TableCell className="text-gray-900">{loan.loanAmount}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-gray-900">Repayment Tenure</TableCell>
                  <TableCell className="text-gray-900">{loan.tenure}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <h2 className="text-xl font-semibold mt-6">Eligibility Criteria</h2>
            <ul className="list-disc pl-5 space-y-2">
              {loan.eligibility.map((item, index) => (
                <li key={index} className="text-gray-900">{item}</li>
              ))}
            </ul>
            <h2 className="text-xl font-semibold mt-6">Required Documents</h2>
            <ul className="list-disc pl-5 space-y-2">
              {loan.documents.map((item, index) => (
                <li key={index} className="text-gray-900">{item}</li>
              ))}
            </ul>
            <div className="mt-8 flex gap-4">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">Apply Now</Button>
              <Button variant="outline" className="text-gray-900 hover:text-blue-500">Check Eligibility</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}