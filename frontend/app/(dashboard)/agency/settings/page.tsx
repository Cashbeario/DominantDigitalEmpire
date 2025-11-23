"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AgencySettings() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your agency settings
        </p>
      </div>

      <div className="grid gap-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Agency Profile</CardTitle>
            <CardDescription>Update your agency information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="agency-name">Agency Name</Label>
              <Input id="agency-name" placeholder="Acme Digital Agency" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="custom-domain">Custom Domain</Label>
              <Input id="custom-domain" placeholder="portal.acme.com" />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Branding</CardTitle>
            <CardDescription>Customize your white-label branding</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="primary-color">Primary Color</Label>
              <Input id="primary-color" type="color" defaultValue="#3b82f6" />
            </div>
            <Button>Update Branding</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
