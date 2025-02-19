"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building2, Award, Users, Shield } from "lucide-react";

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "CEO",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&auto=format",
    bio: "15+ years of experience in fintech and banking",
  },
  {
    name: "Shubham Aher",
    role: "CTO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format",
    bio: "Former VP of Engineering at major financial institutions",
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Customer Success",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&auto=format",
    bio: "Dedicated to creating exceptional customer experiences",
  },
];

const timeline = [
  {
    year: "2020",
    title: "Company Founded",
    description: "LoanBuddy was established with a mission to simplify loan comparison",
  },
  {
    year: "2021",
    title: "Platform Launch",
    description: "Successfully launched our loan comparison platform",
  },
  {
    year: "2022",
    title: "Major Partnerships",
    description: "Partnered with 50+ leading financial institutions",
  },
  {
    year: "2023",
    title: "Award Recognition",
    description: "Named 'Best Loan Comparison Platform' by FinTech Magazine",
  },
];

const testimonials = [
  {
    name: "David Wilson",
    role: "Small Business Owner",
    content: "LoanBuddy helped me find the perfect business loan with competitive rates. The process was smooth and transparent.",
    image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop&auto=format",
  },
  {
    name: "Lisa Thompson",
    role: "First-time Homebuyer",
    content: "Thanks to LoanBuddy, I saved thousands on my mortgage. Their comparison tools made it easy to find the best deal.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&auto=format",
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Mission Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">Our Mission</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            At LoanBuddy, we're committed to making loan comparison simple, transparent, and accessible to everyone. Our platform helps you make informed financial decisions with confidence.
          </p>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Building2, title: "Transparency", description: "Clear and honest information" },
              { icon: Award, title: "Excellence", description: "Commitment to quality service" },
              { icon: Users, title: "Customer First", description: "Your success is our priority" },
              { icon: Shield, title: "Trust", description: "Security you can rely on" },
            ].map((value, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="text-primary mb-4">
                    <value.icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text-xl mb-1">{member.name}</h3>
                    <p className="text-primary mb-2">{member.role}</p>
                    <p className="text-muted-foreground">{member.bio}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Timeline Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Journey</h2>
          <div className="max-w-3xl mx-auto">
            {timeline.map((event, index) => (
              <div key={index} className="flex mb-8 last:mb-0">
                <div className="mr-4 text-primary font-bold">{event.year}</div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">{event.title}</h3>
                  <p className="text-muted-foreground">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-8">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <div>
                      <p className="mb-4">{testimonial.content}</p>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </motion.div>
    </div>
  );
}