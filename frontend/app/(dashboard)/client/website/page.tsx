"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Globe } from "lucide-react"

export default function ClientWebsite() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Website Settings</h1>
        <p className="text-muted-foreground">
          Manage your website configuration
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Domain Settings</CardTitle>
            <CardDescription>Configure your website domain</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="domain">Primary Domain</Label>
              <Input id="domain" placeholder="yourdomain.com" />
            </div>
            <Button>Update Domain</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Website Preview</CardTitle>
            <CardDescription>View your live website</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video border rounded-lg bg-muted flex items-center justify-center">
              <div className="text-center">
                <Globe className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Website preview will appear here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
