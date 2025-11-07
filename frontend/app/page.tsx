"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Award, ShieldCheck, Users, TrendingUp } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const floatingVariants = {
  float: {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="text-2xl font-bold text-primary">KidFi</div>
        <div className="flex items-center gap-6">
          <Link href="#how-it-works" className="text-foreground hover:text-primary transition">
            How It Works
          </Link>
          <Link href="#why-kidfi" className="text-foreground hover:text-primary transition">
            Why KidFi
          </Link>
          <appkit-button />
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="px-6 py-16 max-w-7xl mx-auto"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            <motion.h1 className="text-5xl md:text-6xl font-bold text-balance leading-tight" variants={itemVariants}>
              Learn, Earn, and Grow with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">KidFi</span>
            </motion.h1>

            <motion.p className="text-xl text-muted-foreground text-balance" variants={itemVariants}>
              Complete real-life chores. Get paid in crypto. Build financial habits early.
            </motion.p>

            <motion.div className="flex gap-4 flex-wrap" variants={itemVariants}>
              <Link href="/parent">
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg">
                  Launch App
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Illustration */}
          <motion.div className="relative h-96 flex items-center justify-center" variants={itemVariants}>
            <motion.div
              animate="float"
              variants={floatingVariants}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="relative w-64 h-64">
                {/* Main character circle */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary to-primary rounded-full opacity-20 blur-2xl" />

                {/* Kid icon placeholder */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center text-8xl"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                >
                  🧒
                </motion.div>

                {/* Floating coins */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-4xl"
                    style={{
                      left: `${20 + i * 30}%`,
                      top: `${10 + i * 15}%`,
                    }}
                    animate={{
                      y: [0, -30, 0],
                      x: [0, 10, 0],
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.3,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    💰
                  </motion.div>
                ))}

                {/* Sparkles */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={`sparkle-${i}`}
                    className="absolute text-2xl"
                    style={{
                      right: `${15 + i * 10}%`,
                      bottom: `${20 + i * 10}%`,
                    }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{
                      duration: 2,
                      delay: i * 0.4,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    ✨
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* How It Works */}
      <motion.section
        id="how-it-works"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="px-6 py-20 bg-white/50 backdrop-blur"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-16 text-balance"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            How It Works
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "👨‍👩‍👧", title: "Parent Creates a Chore", desc: "Set tasks and rewards" },
              { icon: "🧼", title: "Child Completes Task", desc: "Submit proof of completion" },
              { icon: "💎", title: "Smart Contract Pays", desc: "Get paid instantly" },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <Card className="p-8 text-center hover:shadow-lg transition">
                  <div className="text-6xl mb-4">{step.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Why KidFi */}
      <motion.section
        id="why-kidfi"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="px-6 py-20"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-16 text-balance"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Why KidFi?
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: TrendingUp, title: "Financial Literacy", desc: "Learn money management early" },
              { icon: Award, title: "Responsibility", desc: "Build work ethic and habits" },
              { icon: ShieldCheck, title: "Safe Payments", desc: "Transparent blockchain transfers" },
              { icon: Users, title: "Family Bonding", desc: "Collaborate and celebrate wins" },
            ].map((benefit, i) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="p-6 hover:shadow-lg transition">
                    <Icon className="w-10 h-10 text-primary mb-4" />
                    <h3 className="font-bold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="px-6 py-20 bg-gradient-to-r from-primary/10 to-secondary/10"
      >
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold mb-6 text-balance"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to Start Today?
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground mb-8 text-balance"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Join families building financial habits through real-world responsibility.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/parent">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg">
                Launch KidFi
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-foreground text-card py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">KidFi</h3>
              <p className="text-sm text-card/70">Building financial literacy through chores.</p>
            </div>
            {[
              { title: "Product", links: ["How It Works", "Pricing", "Blog"] },
              { title: "Company", links: ["About", "Blog", "Press"] },
              { title: "Legal", links: ["Privacy", "Terms", "Contact"] },
            ].map((col, i) => (
              <div key={i}>
                <h3 className="font-bold mb-4">{col.title}</h3>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-card/70 hover:text-card transition">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-card/20 pt-8 text-center text-sm text-card/70">
            <p>© 2025 KidFi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
