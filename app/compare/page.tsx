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
import { Slider } from "@/components/ui/slider";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const loanTypes = [
  { value: "personal", label: "Education Loan" },
  { value: "mortgage", label: "Study Abroad" },
];

const creditScores = [
  { value: "excellent", label: "Excellent (750+)" },
  { value: "good", label: "Good (700-749)" },
  { value: "fair", label: "Fair (650-699)" },
  { value: "poor", label: "Poor (Below 650)" },
];

export default function ComparePage() {
  const [loanType, setLoanType] = useState("personal");
  const [loanAmount, setLoanAmount] = useState(50000);
  const [creditScore, setCreditScore] = useState("good");
  const [term, setTerm] = useState(60);

  const chartData = {
    labels: ['Bank A', 'Bank B', 'Bank C'],
    datasets: [
      {
        label: 'Monthly Payment',
        data: [450, 475, 460],
        backgroundColor: 'rgba(37, 99, 235, 0.5)',
      },
      {
        label: 'Total Interest',
        data: [5400, 5700, 5520],
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
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
        text: 'Loan Comparison',
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-8">Compare Loans</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Loan Parameters */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Loan Parameters</CardTitle>
              <CardDescription>Customize your loan search</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Loan Type</Label>
                <Select value={loanType} onValueChange={setLoanType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select loan type" />
                  </SelectTrigger>
                  <SelectContent>
                    {loanTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Loan Amount</Label>
                <div className="space-y-4">
                  <Slider
                    value={[loanAmount]}
                    onValueChange={(value) => setLoanAmount(value[0])}
                    max={100000}
                    step={1000}
                  />
                  <Input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Credit Score</Label>
                <Select value={creditScore} onValueChange={setCreditScore}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select credit score" />
                  </SelectTrigger>
                  <SelectContent>
                    {creditScores.map((score) => (
                      <SelectItem key={score.value} value={score.value}>
                        {score.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Loan Term (months)</Label>
                <div className="space-y-4">
                  <Slider
                    value={[term]}
                    onValueChange={(value) => setTerm(value[0])}
                    max={360}
                    step={12}
                  />
                  <Input
                    type="number"
                    value={term}
                    onChange={(e) => setTerm(Number(e.target.value))}
                  />
                </div>
              </div>

              <Button className="w-full">Find Loans</Button>
            </CardContent>
          </Card>

          {/* Comparison Results */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Comparison Results</CardTitle>
              <CardDescription>Compare loan offers from different lenders</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="table">
                <TabsList className="mb-4">
                  <TabsTrigger value="table">Table View</TabsTrigger>
                  <TabsTrigger value="chart">Chart View</TabsTrigger>
                </TabsList>

                <TabsContent value="table">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Lender</TableHead>
                        <TableHead>Interest Rate</TableHead>
                        <TableHead>Monthly Payment</TableHead>
                        <TableHead>Total Cost</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Bank A</TableCell>
                        <TableCell>5.75%</TableCell>
                        <TableCell>₹450</TableCell>
                        <TableCell>₹27,000</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Apply</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Bank B</TableCell>
                        <TableCell>6.25%</TableCell>
                        <TableCell>₹475</TableCell>
                        <TableCell>₹28,500</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Apply</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Bank C</TableCell>
                        <TableCell>5.90%</TableCell>
                        <TableCell>₹460</TableCell>
                        <TableCell>₹27,600</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Apply</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="chart">
                  <div className="h-[400px]">
                    <Bar data={chartData} options={chartOptions} />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}