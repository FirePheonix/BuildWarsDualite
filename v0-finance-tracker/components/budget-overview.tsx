"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Plus } from "lucide-react"
import type { Budget } from "@/app/page"
import { AddBudgetModal } from "@/components/add-budget-modal"

interface BudgetOverviewProps {
  budgets: Budget[]
  setBudgets: (budgets: Budget[]) => void
}

export function BudgetOverview({ budgets, setBudgets }: BudgetOverviewProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const addBudget = (budget: Omit<Budget, "id" | "spent">) => {
    const newBudget = {
      ...budget,
      id: Date.now().toString(),
      spent: 0,
    }
    setBudgets([...budgets, newBudget])
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Budget Overview</CardTitle>
          <Button size="sm" onClick={() => setIsAddModalOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Budget
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {budgets.length > 0 ? (
              budgets.map((budget) => {
                const percentage = (budget.spent / budget.limit) * 100
                const isOverBudget = percentage > 100

                return (
                  <div key={budget.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{budget.category}</span>
                      <span className="text-sm text-muted-foreground">
                        ${budget.spent.toLocaleString()} / ${budget.limit.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={Math.min(percentage, 100)} className={`h-2 ${isOverBudget ? "bg-red-100" : ""}`} />
                    {isOverBudget && (
                      <p className="text-sm text-red-600">
                        Over budget by ${(budget.spent - budget.limit).toLocaleString()}
                      </p>
                    )}
                  </div>
                )
              })
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No budgets set. Create your first budget to track spending.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <AddBudgetModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={addBudget} />
    </>
  )
}
