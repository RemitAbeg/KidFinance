"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto border-b">
        <Link href="/" className="text-2xl font-bold text-primary">
          KidFi
        </Link>
        <Link href="/">
          <Button variant="outline">Back Home</Button>
        </Link>
      </nav>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-6 py-16"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-balance">About KidFi</h1>
          <p className="text-xl text-muted-foreground text-balance">
            Teaching kids financial responsibility through fun, real-world tasks.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div variants={itemVariants} className="mb-16">
          <Card className="p-8 bg-gradient-to-r from-primary/5 to-secondary/5">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground text-balance">
              KidFi combines family collaboration, transparent blockchain payments, and gamified progress tracking to
              make financial literacy fun. We believe kids learn best by doing real work and seeing real rewards.
            </p>
          </Card>
        </motion.div>

        {/* Values */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Trust", desc: "Built on transparent blockchain technology" },
              { title: "Fun", desc: "Learning should be engaging and rewarding" },
              { title: "Family", desc: "Strengthening bonds through collaboration" },
            ].map((value, i) => (
              <Card key={i} className="p-6">
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.desc}</p>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div variants={itemVariants}>
          <h2 className="text-3xl font-bold mb-8">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Alex Chen", role: "Founder & CEO", emoji: "👨‍💼" },
              { name: "Jordan Lee", role: "CTO", emoji: "👩‍💻" },
              { name: "Casey Brown", role: "Community Lead", emoji: "👩‍🤝‍👨" },
            ].map((member, i) => (
              <Card key={i} className="p-6 text-center">
                <div className="text-6xl mb-4">{member.emoji}</div>
                <h3 className="font-bold mb-1">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Links */}
        <motion.div variants={itemVariants} className="mt-16 text-center space-y-4">
          <h2 className="text-2xl font-bold">Connect With Us</h2>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button variant="outline">GitHub</Button>
            <Button variant="outline">Twitter</Button>
            <Button variant="outline">Discord</Button>
            <Button variant="outline">Email</Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
