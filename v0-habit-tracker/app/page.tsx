"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Trophy,
  Flame,
  Target,
  CheckCircle2,
  Circle,
  Star,
  Award,
  Bell,
  Book,
  Dumbbell,
  Droplets,
  Moon,
  Coffee,
} from "lucide-react"

// Mock data for habits and progress
const mockHabits = [
  {
    id: 1,
    name: "Drink Water",
    icon: Droplets,
    target: 8,
    completed: 6,
    streak: 12,
    category: "Health",
    color: "bg-blue-500",
    reminders: true,
  },
  {
    id: 2,
    name: "Exercise",
    icon: Dumbbell,
    target: 1,
    completed: 1,
    streak: 7,
    category: "Fitness",
    color: "bg-green-500",
    reminders: true,
  },
  {
    id: 3,
    name: "Read",
    icon: Book,
    target: 30,
    completed: 25,
    streak: 15,
    category: "Learning",
    color: "bg-purple-500",
    reminders: false,
  },
  {
    id: 4,
    name: "Sleep 8h",
    icon: Moon,
    target: 8,
    completed: 7.5,
    streak: 5,
    category: "Health",
    color: "bg-indigo-500",
    reminders: true,
  },
  {
    id: 5,
    name: "Meditate",
    icon: Coffee,
    target: 10,
    completed: 10,
    streak: 21,
    category: "Mindfulness",
    color: "bg-orange-500",
    reminders: true,
  },
]

const weeklyProgress = [
  { day: "Mon", completed: 4, total: 5 },
  { day: "Tue", completed: 5, total: 5 },
  { day: "Wed", completed: 3, total: 5 },
  { day: "Thu", completed: 5, total: 5 },
  { day: "Fri", completed: 4, total: 5 },
  { day: "Sat", completed: 5, total: 5 },
  { day: "Sun", completed: 4, total: 5 },
]

const monthlyStats = [
  { week: "Week 1", habits: 28, streak: 85 },
  { week: "Week 2", habits: 32, streak: 91 },
  { week: "Week 3", habits: 29, streak: 83 },
  { week: "Week 4", habits: 35, streak: 100 },
]

const achievements = [
  { id: 1, name: "First Week", description: "Complete 7 days in a row", earned: true, icon: "🏆" },
  { id: 2, name: "Hydration Hero", description: "Drink 8 glasses of water for 10 days", earned: true, icon: "💧" },
  { id: 3, name: "Bookworm", description: "Read for 30 days straight", earned: false, icon: "📚" },
  { id: 4, name: "Fitness Fanatic", description: "Exercise for 30 days", earned: false, icon: "💪" },
  { id: 5, name: "Zen Master", description: "Meditate for 21 days", earned: true, icon: "🧘" },
]

export default function HabitTracker() {
  const [habits, setHabits] = useState(mockHabits)
  const [selectedDate] = useState(new Date())

  const toggleHabit = (habitId: number) => {
    setHabits(
      habits.map((habit) =>
        habit.id === habitId ? { ...habit, completed: habit.completed === habit.target ? 0 : habit.target } : habit,
      ),
    )
  }

  const toggleReminder = (habitId: number) => {
    setHabits(habits.map((habit) => (habit.id === habitId ? { ...habit, reminders: !habit.reminders } : habit)))
  }

  const totalHabits = habits.length
  const completedHabits = habits.filter((h) => h.completed === h.target).length
  const completionRate = Math.round((completedHabits / totalHabits) * 100)
  const totalStreak = habits.reduce((sum, habit) => sum + habit.streak, 0)
  const level = Math.floor(totalStreak / 50) + 1
  const xpToNextLevel = level * 50 - totalStreak

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-balance">Habit Tracker Dashboard</h1>
          <p className="text-muted-foreground text-pretty">Build better habits, one day at a time</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Progress</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {completedHabits}/{totalHabits}
              </div>
              <p className="text-xs text-muted-foreground">{completionRate}% completion rate</p>
              <Progress value={completionRate} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Level</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Level {level}</div>
              <p className="text-xs text-muted-foreground">{xpToNextLevel} XP to next level</p>
              <Progress value={((totalStreak % 50) / 50) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Streak</CardTitle>
              <Flame className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStreak}</div>
              <p className="text-xs text-muted-foreground">Days of consistency</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Achievements</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {achievements.filter((a) => a.earned).length}/{achievements.length}
              </div>
              <p className="text-xs text-muted-foreground">Badges earned</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="habits" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="habits">Today's Habits</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="reminders">Reminders</TabsTrigger>
          </TabsList>

          <TabsContent value="habits" className="space-y-4">
            <div className="grid gap-4">
              {habits.map((habit) => {
                const Icon = habit.icon
                const progress = (habit.completed / habit.target) * 100
                const isCompleted = habit.completed === habit.target

                return (
                  <Card key={habit.id} className="transition-all hover:shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 rounded-full ${habit.color} text-white`}>
                            <Icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{habit.name}</h3>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <Badge variant="secondary">{habit.category}</Badge>
                              <div className="flex items-center">
                                <Flame className="h-3 w-3 mr-1" />
                                {habit.streak} days
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="text-sm font-medium">
                              {habit.completed}/{habit.target}
                            </div>
                            <Progress value={progress} className="w-20" />
                          </div>
                          <Button
                            variant={isCompleted ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleHabit(habit.id)}
                            className="min-w-[100px]"
                          >
                            {isCompleted ? (
                              <>
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                Done
                              </>
                            ) : (
                              <>
                                <Circle className="h-4 w-4 mr-2" />
                                Mark Done
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Progress</CardTitle>
                  <CardDescription>Habits completed this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      completed: {
                        label: "Completed",
                        color: "hsl(var(--chart-1))",
                      },
                      total: {
                        label: "Total",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyProgress}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="completed" fill="var(--color-completed)" />
                        <Bar dataKey="total" fill="var(--color-total)" opacity={0.3} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Trends</CardTitle>
                  <CardDescription>Habit completion and streak trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      habits: {
                        label: "Habits Completed",
                        color: "hsl(var(--chart-1))",
                      },
                      streak: {
                        label: "Streak %",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyStats}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="habits" stroke="var(--color-habits)" strokeWidth={2} />
                        <Line type="monotone" dataKey="streak" stroke="var(--color-streak)" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className={`transition-all ${achievement.earned ? "bg-accent/10 border-accent" : "opacity-60"}`}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-2">{achievement.icon}</div>
                    <h3 className="font-semibold mb-1">{achievement.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                    {achievement.earned ? (
                      <Badge className="bg-accent text-accent-foreground">
                        <Star className="h-3 w-3 mr-1" />
                        Earned
                      </Badge>
                    ) : (
                      <Badge variant="outline">Locked</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reminders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Reminder Settings</CardTitle>
                <CardDescription>Manage notifications for your habits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {habits.map((habit) => {
                  const Icon = habit.icon
                  return (
                    <div key={habit.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${habit.color} text-white`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium">{habit.name}</h4>
                          <p className="text-sm text-muted-foreground">Daily reminder at 9:00 AM</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <Switch checked={habit.reminders} onCheckedChange={() => toggleReminder(habit.id)} />
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
