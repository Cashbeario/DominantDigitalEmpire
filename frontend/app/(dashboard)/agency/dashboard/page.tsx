"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Globe, TrendingUp, DollarSign } from "lucide-react"

export default function AgencyDashboard() {
  const [stats, setStats] = useState({
    totalClients: 0,
    activeWebsites: 0,
    monthlyGrowth: 0,
    revenue: 0,
  })

  useEffect(() => {
    // Simulated stats - in production, fetch from API
    setStats({
      totalClients: 12,
      activeWebsites: 12,
      monthlyGrowth: 15,
      revenue: 2400,
    })
  }, [])

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your agency.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalClients}</div>
            <p className="text-xs text-muted-foreground">Active clients</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Websites</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeWebsites}</div>
            <p className="text-xs text-muted-foreground">Live and running</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{stats.monthlyGrowth}%</div>
            <p className="text-xs text-muted-foreground">From last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.revenue}</div>
            <p className="text-xs text-muted-foreground">Monthly recurring</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your clients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium">New client added</p>
                  <p className="text-xs text-muted-foreground">Acme Corp - 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium">Website deployed</p>
                  <p className="text-xs text-muted-foreground">TechStart Inc - 5 hours ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium">SSL certificate renewed</p>
                  <p className="text-xs text-muted-foreground">Global Trade LLC - 1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <button className="w-full text-left p-3 rounded-md hover:bg-accent transition-colors">
                <p className="text-sm font-medium">Add New Client</p>
                <p className="text-xs text-muted-foreground">Onboard a new client to your agency</p>
              </button>
              <button className="w-full text-left p-3 rounded-md hover:bg-accent transition-colors">
                <p className="text-sm font-medium">View Reports</p>
                <p className="text-xs text-muted-foreground">Generate analytics and insights</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
