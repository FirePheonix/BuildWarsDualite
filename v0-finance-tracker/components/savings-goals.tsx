"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Plus } from "lucide-react"
import type { SavingsGoal } from "@/app/page"
import { AddSavingsGoalModal } from "@/components/add-savings-goal-modal"

interface SavingsGoalsProps {
  goals: SavingsGoal[]
  setGoals: (goals: SavingsGoal[]) => void
}

export function SavingsGoals({ goals, setGoals }: SavingsGoalsProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const addGoal = (goal: Omit<SavingsGoal, "id" | "current">) => {
    const newGoal = {
      ...goal,
      id: Date.now().toString(),
      current: 0,
    }
    setGoals([...goals, newGoal])
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Savings Goals</CardTitle>
          <Button size="sm" onClick={() => setIsAddModalOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Goal
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {goals.length > 0 ? (
              goals.map((goal) => {
                const percentage = (goal.current / goal.target) * 100
                const daysLeft = Math.ceil(
                  (new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                )

                return (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{goal.name}</span>
                      <span className="text-sm text-muted-foreground">
                        ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={Math.min(percentage, 100)} className="h-2" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{percentage.toFixed(1)}% complete</span>
                      <span>{daysLeft > 0 ? `${daysLeft} days left` : "Deadline passed"}</span>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No savings goals set. Create your first goal to start saving.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <AddSavingsGoalModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={addGoal} />
    </>
  )
}
