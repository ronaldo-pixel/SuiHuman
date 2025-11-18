'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { LayoutWrapper } from '@/components/shared/layout-wrapper'
import { ChevronRight, Trash2, LogOut } from 'lucide-react'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    privacyPublic: true,
    allowMessages: true,
    dataCollection: false,
  })

  const handleToggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] })
  }

  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-slide-in-top">
            Settings
          </h1>

          {/* Account Settings */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Account</h2>
            <div className="space-y-4">
              <Card className="bg-card/50 backdrop-blur-sm border-border/30 p-6 animate-fade-in-scale">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-sm text-muted-foreground">alice@example.com</p>
                  </div>
                  <Button variant="outline">Change</Button>
                </div>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/30 p-6 animate-fade-in-scale" style={{ animationDelay: '50ms' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Password</h3>
                    <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
                  </div>
                  <Button variant="outline">Change</Button>
                </div>
              </Card>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
            <div className="space-y-4">
              <Card className="bg-card/50 backdrop-blur-sm border-border/30 p-6 animate-fade-in-scale" style={{ animationDelay: '100ms' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Email Notifications</h3>
                    <p className="text-sm text-muted-foreground">Get updates via email</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={() => handleToggle('emailNotifications')}
                  />
                </div>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/30 p-6 animate-fade-in-scale" style={{ animationDelay: '150ms' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Push Notifications</h3>
                    <p className="text-sm text-muted-foreground">Get instant notifications</p>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={() => handleToggle('pushNotifications')}
                  />
                </div>
              </Card>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Privacy</h2>
            <div className="space-y-4">
              <Card className="bg-card/50 backdrop-blur-sm border-border/30 p-6 animate-fade-in-scale" style={{ animationDelay: '200ms' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Public Profile</h3>
                    <p className="text-sm text-muted-foreground">Make your profile public</p>
                  </div>
                  <Switch
                    checked={settings.privacyPublic}
                    onCheckedChange={() => handleToggle('privacyPublic')}
                  />
                </div>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/30 p-6 animate-fade-in-scale" style={{ animationDelay: '250ms' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Allow Messages</h3>
                    <p className="text-sm text-muted-foreground">Allow anyone to message you</p>
                  </div>
                  <Switch
                    checked={settings.allowMessages}
                    onCheckedChange={() => handleToggle('allowMessages')}
                  />
                </div>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/30 p-6 animate-fade-in-scale" style={{ animationDelay: '300ms' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Data Collection</h3>
                    <p className="text-sm text-muted-foreground">Allow analytics collection</p>
                  </div>
                  <Switch
                    checked={settings.dataCollection}
                    onCheckedChange={() => handleToggle('dataCollection')}
                  />
                </div>
              </Card>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-red-500">Danger Zone</h2>
            <div className="space-y-4">
              <Card className="bg-red-500/5 border border-red-500/30 p-6 animate-slide-in-bottom">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Delete Account</h3>
                    <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                  </div>
                  <Button variant="destructive" className="gap-2">
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                </div>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/30 p-6 animate-slide-in-bottom" style={{ animationDelay: '50ms' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Logout</h3>
                    <p className="text-sm text-muted-foreground">Sign out of your account</p>
                  </div>
                  <Button variant="outline" className="gap-2">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
}
