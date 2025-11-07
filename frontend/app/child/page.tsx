"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Zap, Award, TrendingUp } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function ChildDashboard() {
  const xpEarned = 3
  const tokensEarned = "0.15"
  const streakDays = 5

  return (
    <DashboardLayout role="child" userName="Alex">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
        {/* Gamification Stats */}
        <div className="grid md:grid-cols-3 gap-4">
          <motion.div variants={itemVariants}>
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Chores This Week</p>
                  <p className="text-3xl font-bold text-primary">{xpEarned}</p>
                </div>
                <Zap className="w-10 h-10 text-primary/30" />
              </div>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="p-6 bg-gradient-to-br from-success/10 to-success/5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Earned</p>
                  <p className="text-3xl font-bold text-success">{tokensEarned} ETH</p>
                </div>
                <Award className="w-10 h-10 text-success/30" />
              </div>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="p-6 bg-gradient-to-br from-secondary/10 to-secondary/5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Current Streak</p>
                  <p className="text-3xl font-bold text-secondary">{streakDays} days</p>
                </div>
                <TrendingUp className="w-10 h-10 text-secondary/30" />
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Available Chores */}
        <motion.div variants={itemVariants}>
          <h3 className="text-xl font-bold mb-4">Available Chores</h3>
          <div className="space-y-4">
            {[
              { title: "Wash Dishes", reward: "0.05 ETH", difficulty: "Easy" },
              { title: "Vacuum Living Room", reward: "0.1 ETH", difficulty: "Medium" },
            ].map((chore, i) => (
              <Card key={i} className="p-4 hover:shadow-lg transition">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold">{chore.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {chore.reward} • {chore.difficulty}
                    </p>
                  </div>
                  <Button size="sm">Accept</Button>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Active Chores */}
        <motion.div variants={itemVariants}>
          <h3 className="text-xl font-bold mb-4">My Active Chores</h3>
          <Card className="divide-y">
            {[{ title: "Clean Bedroom", reward: "0.1 ETH", status: "In Progress" }].map((chore, i) => (
              <div key={i} className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold">{chore.title}</p>
                  <p className="text-sm text-muted-foreground">{chore.status}</p>
                </div>
                <Button size="sm" variant="outline">
                  Submit Proof
                </Button>
              </div>
            ))}
          </Card>
        </motion.div>

        {/* Badges Section */}
        <motion.div variants={itemVariants}>
          <h3 className="text-xl font-bold mb-4">Your Badges</h3>
          <div className="grid grid-cols-4 gap-4">
            {["🥇", "🧹", "💪", "⭐"].map((badge, i) => (
              <Card key={i} className="p-4 text-center hover:shadow-lg transition">
                <div className="text-3xl mb-2">{badge}</div>
                <p className="text-xs font-medium">Badge</p>
              </Card>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  )
}
