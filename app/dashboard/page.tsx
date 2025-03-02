"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { account } from "../../lib/appwrite";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const loanData = [
  { bank: "Education First Bank", rate: "5.75%", emi: "₹450", tenure: "10 years" },
  { bank: "Future Scholar Finance", rate: "6.25%", emi: "₹475", tenure: "15 years" },
  { bank: "Academic Trust Bank", rate: "5.90%", emi: "₹460", tenure: "12 years" },
  { bank: "Student Success Bank", rate: "6.10%", emi: "₹470", tenure: "10 years" },
];

const chartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Interest Rates Trend",
      data: [5.75, 5.80, 5.85, 5.82, 5.78, 5.75],
      borderColor: "#2563EB",
      tension: 0.4,
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Interest Rate Trends',
    },
  },
  maintainAspectRatio: false, 
};

export default function Dashboard() {
  const [sortBy, setSortBy] = useState("rate");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function getUser() {
      try {
        const user = await account.get();
        setUserName(user.name); 
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
    getUser();
  }, []);

  return (
    <div className="container mx-auto px-4 pt-24 pb-16 bg-sky-100 text-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
       <h1 className="text-3xl font-bold mb-8">Loan Dashboard</h1> 
       <h2 className="text-3xl font-bold mb-8">
          {userName ? `Hello, ${userName}!` : "Loading..."}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white rounded-xl p-6">
            <CardHeader>
              <CardTitle>Active Applications</CardTitle>
              <CardDescription>Your current loan applications</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-500">3</p>
            </CardContent>
          </Card>
          <Card className="bg-white rounded-xl p-6">
            <CardHeader>
              <CardTitle>Average Interest Rate</CardTitle>
              <CardDescription>Across all applications</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-500">5.95%</p>
            </CardContent>
          </Card>
          <Card className="bg-white rounded-xl p-6">
            <CardHeader>
              <CardTitle>Potential Savings</CardTitle>
              <CardDescription>Based on best available rates</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-500">₹20,500</p>
            </CardContent>
          </Card>
        </div>
        <Card className="bg-white rounded-xl p-6 mb-8">
          <CardHeader>
            <CardTitle>Interest Rate Trends</CardTitle>
            <CardDescription>Historical interest rates over time</CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            <Line data={chartData} options={chartOptions} />
          </CardContent>
        </Card>
        <Card className="bg-white rounded-xl p-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Available Loans</CardTitle>
              <CardDescription>Compare different loan options</CardDescription>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rate">Interest Rate</SelectItem>
                  <SelectItem value="emi">EMI</SelectItem>
                  <SelectItem value="tenure">Tenure</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">Export</Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-700">Bank</TableHead>
                  <TableHead className="text-gray-700">Interest Rate</TableHead>
                  <TableHead className="text-gray-700">Monthly EMI</TableHead>
                  <TableHead className="text-gray-700">Tenure</TableHead>
                  <TableHead className="text-gray-700">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loanData.map((loan, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium text-gray-900">{loan.bank}</TableCell>
                    <TableCell className="text-gray-900">{loan.rate}</TableCell>
                    <TableCell className="text-gray-900">{loan.emi}</TableCell>
                    <TableCell className="text-gray-900">{loan.tenure}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="text-gray-900 hover:text-blue-500">
                        Compare
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}