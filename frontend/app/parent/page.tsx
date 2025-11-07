"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { AlertCircle, TrendingUp, CheckCircle2 } from "lucide-react"
import Link from "next/link"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function ParentDashboard() {
  const pendingChores = 2
  const completedChores = 5
  const totalRewards = "0.5"

  return (
    <DashboardLayout role="parent" userName="Sarah">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
        {/* Status Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <motion.div variants={itemVariants}>
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Approvals</p>
                  <p className="text-3xl font-bold text-primary">{pendingChores}</p>
                </div>
                <AlertCircle className="w-10 h-10 text-primary/30" />
              </div>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="p-6 bg-gradient-to-br from-success/10 to-success/5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed This Week</p>
                  <p className="text-3xl font-bold text-success">{completedChores}</p>
                </div>
                <CheckCircle2 className="w-10 h-10 text-success/30" />
              </div>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="p-6 bg-gradient-to-br from-secondary/10 to-secondary/5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Distributed</p>
                  <p className="text-3xl font-bold text-secondary">{totalRewards} ETH</p>
                </div>
                <TrendingUp className="w-10 h-10 text-secondary/30" />
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Create Chore CTA */}
        <motion.div variants={itemVariants}>
          <Card className="p-8 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
            <h2 className="text-2xl font-bold mb-2">Create Your First Chore</h2>
            <p className="mb-6 text-primary-foreground/80">
              Set tasks for your kids and watch them build financial habits while completing real responsibilities.
            </p>
            <Link href="/parent/create">
              <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Create Chore
              </Button>
            </Link>
          </Card>
        </motion.div>

        {/* Recent Chores */}
        <motion.div variants={itemVariants}>
          <h3 className="text-xl font-bold mb-4">Recent Chores</h3>
          <Card className="divide-y">
            {[
              { title: "Clean Bedroom", status: "Pending", child: "Alex", reward: "0.1 ETH" },
              { title: "Do Laundry", status: "Completed", child: "Emma", reward: "0.05 ETH" },
            ].map((chore, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-muted/50 transition">
                <div>
                  <p className="font-semibold">{chore.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {chore.child} • {chore.reward}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    chore.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
                  }`}
                >
                  {chore.status}
                </span>
              </div>
            ))}
          </Card>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  )
}
