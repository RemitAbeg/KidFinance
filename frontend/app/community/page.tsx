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

export default function CommunityPage() {
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
          <h1 className="text-5xl font-bold mb-4 text-balance">🏆 Community Leaderboard</h1>
          <p className="text-xl text-muted-foreground text-balance">See who's earning and building the best habits!</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 mb-12 text-center"
        >
          <p className="text-3xl font-bold mb-2">24 families completed 78 chores this week!</p>
          <p className="text-muted-foreground">That's 3.9 ETH earned and distributed across our community.</p>
        </motion.div>

        {/* Leaderboard */}
        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden">
            <div className="px-6 py-4 bg-card border-b font-semibold flex items-center justify-between">
              <div className="flex-1">Rank</div>
              <div className="flex-1">Name</div>
              <div className="flex-1">Chores</div>
              <div className="flex-1 text-right">Earned</div>
            </div>
            <div className="divide-y">
              {[
                { rank: 1, name: "Alex M.", chores: 15, earned: "0.75 ETH", medal: "🥇" },
                { rank: 2, name: "Jordan K.", chores: 12, earned: "0.60 ETH", medal: "🥈" },
                { rank: 3, name: "Casey L.", chores: 11, earned: "0.55 ETH", medal: "🥉" },
                { rank: 4, name: "Sam P.", chores: 9, earned: "0.45 ETH", medal: "⭐" },
                { rank: 5, name: "Taylor H.", chores: 8, earned: "0.40 ETH", medal: "✨" },
              ].map((entry) => (
                <div
                  key={entry.rank}
                  className="px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition"
                >
                  <div className="flex-1 font-semibold">{entry.medal}</div>
                  <div className="flex-1">{entry.name}</div>
                  <div className="flex-1 text-muted-foreground">{entry.chores}</div>
                  <div className="flex-1 text-right font-semibold text-success">{entry.earned}</div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Community Stats */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            { label: "Active Families", value: "24" },
            { label: "Total Chores Completed", value: "156" },
            { label: "Total ETH Distributed", value: "7.8" },
          ].map((stat, i) => (
            <Card key={i} className="p-6 text-center">
              <p className="text-4xl font-bold text-primary mb-2">{stat.value}</p>
              <p className="text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
