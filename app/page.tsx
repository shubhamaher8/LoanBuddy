"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, GraduationCap, LineChart } from "lucide-react";
import Image from "next/image";
import HdfcBank from "@/assets/hdfc bank.jpg";
import IciciBank from "@/assets/icici bank.png";
import IdfcBank from "@/assets/idfc.webp";
import SbiBank from "@/assets/sbi.jpg";

export default function Home() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const stats = [
    { label: "Loans Compared", value: "10,000+" },
    { label: "Partner Banks", value: "50+" },
    { label: "Happy Students", value: "5,000+" },
    { label: "Average Savings", value: "₹20,500" },
  ];

  const features = [
    {
      icon: <LineChart className="h-6 w-6" />,
      title: "Compare Rates",
      description: "Find the best interest rates from multiple lenders instantly"
    },
    {
      icon: <Building2 className="h-6 w-6" />,
      title: "Trusted Partners",
      description: "Work with verified and reliable financial institutions"
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Education First",
      description: "Specialized loans designed for students and education"
    }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative pt-20 md:pt-32 pb-16 md:pb-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="text-center"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
              Find Your Perfect Education Loan
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Compare education loans from top lenders and find the best rates for your future. Simple, transparent, and hassle-free.
            </p>
            <Button size="lg" className="group">
              Compare Loans Now
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Stats Banner */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="p-6 rounded-lg bg-card"
              >
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-lg bg-card"
              >
                <div className="text-primary mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Partner Logos */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-semibold text-center mb-12">Trusted by Leading Banks</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60">
            <Image src={HdfcBank} alt="HDFC Bank" width={200} height={100} className="grayscale" />
            <Image src={IciciBank} alt="ICICI Bank" width={200} height={100} className="grayscale" />
            <Image src={IdfcBank} alt="IDFC Bank" width={200} height={100} className="grayscale" />
            <Image src={SbiBank} alt="SBI Bank" width={200} height={100} className="grayscale" />
          </div>
        </div>
      </section>
    </div>
  );
}