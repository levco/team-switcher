"use client"

import * as React from "react"
import { useHeader } from "@/contexts/header-context"
import { useActiveUser } from "@/contexts/active-user-context"
import { getAccountsByUser, getAccountPalette } from "@/lib/demo-data"
import Image from "next/image"
import { Building2, User, Users, FileText, CreditCard, BarChart3, Plus, Zap, Search, AlertTriangle, AlertCircle, CheckCircle2, RefreshCw, ShoppingCart, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type SettingsTab = 
  | "details" 
  | "org" 
  | "all-members"
  | `${string}-details`
  | `${string}-members`
  | `${string}-usage`
  | `${string}-billing`

export default function SettingsPage() {
  const { setTitle } = useHeader()
  const { user, organization, teamMembers } = useActiveUser()
  
  const [activeTab, setActiveTab] = React.useState<SettingsTab>("details")

  React.useEffect(() => {
    setTitle("Settings")
    return () => setTitle(undefined)
  }, [setTitle])

  // Get user's accounts
  const userAccounts = getAccountsByUser(user, organization)

  const renderContent = () => {
    if (activeTab === "details") {
      return (
        <div className="max-w-2xl">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold">Personal Information</h2>
              <p className="text-sm text-muted-foreground">Update your photo & details.</p>
            </div>
            <span className="font-mono text-xs rounded-md border bg-muted px-2 py-1">
              User {user.userId}
            </span>
          </div>

          <div className="space-y-6">
            {/* Profile Picture & Name */}
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border">
                <Image 
                  src={user.avatar} 
                  alt={user.name} 
                  width={64} 
                  height={64} 
                  className="h-full w-full object-cover" 
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="name" className="text-sm font-medium">Name *</Label>
                <Input id="name" value={user.name} readOnly className="bg-muted mt-2" />
              </div>
            </div>

            <Separator />

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-sm font-medium">Email *</Label>
              <p className="text-xs text-muted-foreground mb-2">Contact support to change your email.</p>
              <Input id="email" value={user.email} readOnly className="bg-muted" />
            </div>

            {/* Job Title */}
            <div>
              <Label htmlFor="jobTitle" className="text-sm font-medium">Job title</Label>
              <Input id="jobTitle" value="Member" readOnly className="bg-muted" />
            </div>

            {/* Mobile Phone */}
            <div>
              <Label htmlFor="mobile" className="text-sm font-medium">Mobile phone</Label>
              <Input id="mobile" value={user.phone} readOnly className="bg-muted" />
            </div>

            {/* LinkedIn */}
            <div>
              <Label htmlFor="linkedin" className="text-sm font-medium">LinkedIn</Label>
              <Input id="linkedin" value={user.linkedin} readOnly className="bg-muted" />
            </div>

            <Separator />

            {/* Account Memberships Section */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Account Memberships</h3>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Account</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userAccounts.map((account) => {
                      const palette = getAccountPalette(account.id)
                      const AccountIcon = palette.icon
                      
                      return (
                        <TableRow key={account.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${palette.bg}`}>
                                <AccountIcon className={`h-4 w-4 ${palette.text}`} />
                              </div>
                              <div>
                                <div className="font-medium">{account.name}</div>
                                {account.accountNumber && (
                                  <div className="text-xs text-muted-foreground">Account {account.accountNumber}</div>
                                )}
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (activeTab === "org") {
      return (
        <div className="max-w-2xl">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold">Organization</h2>
              <p className="text-sm text-muted-foreground">Your organization is the single Organization or Company Name that oversees all users and teams.</p>
            </div>
            <span className="font-mono text-xs rounded-md border bg-muted px-2 py-1">
              Org {organization.orgId}
            </span>
          </div>

          <div className="space-y-6">
            {/* Organization Logo & Name */}
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 shrink-0 flex items-center justify-center rounded-lg border bg-muted">
                <span className="text-2xl font-bold">{organization.logo}</span>
              </div>
              <div className="flex-1">
                <Label htmlFor="orgName" className="text-sm font-medium">Name *</Label>
                <Input id="orgName" value={organization.name} readOnly className="bg-muted mt-2" />
              </div>
            </div>

            <Separator />

            {/* Aliases */}
            <div>
              <Label htmlFor="aliases" className="text-sm font-medium">Aliases</Label>
              <Input 
                id="aliases" 
                value={organization.aliases} 
                readOnly 
                className="bg-muted" 
                placeholder="Organization aliases (optional)"
              />
            </div>

            {/* Website & Domains */}
            <div>
              <Label htmlFor="website" className="text-sm font-medium">Website</Label>
              <Input 
                id="website" 
                value={organization.website} 
                readOnly 
                className="bg-muted" 
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {(organization.domains ?? '').split(', ').filter(Boolean).map((domain, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center rounded-full border px-3 py-1 text-sm"
                  >
                    {domain}
                  </span>
                ))}
                <button 
                  className="inline-flex items-center rounded-full border border-dashed px-3 py-1 text-sm text-muted-foreground hover:bg-muted/50 transition-colors"
                  disabled
                >
                  + Add domain
                </button>
              </div>
            </div>

            <Separator />

            {/* Teams (Accounts) Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Teams (accounts)</h3>
              <p className="text-sm text-muted-foreground mb-4">Teams in this organization.</p>
              
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Account</TableHead>
                      <TableHead>Members</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {organization.accounts.map((account) => {
                      const palette = getAccountPalette(account.id)
                      const AccountIcon = palette.icon
                      
                      return (
                        <TableRow key={account.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${palette.bg}`}>
                                <AccountIcon className={`h-4 w-4 ${palette.text}`} />
                              </div>
                              <div>
                                <div className="font-medium">{account.name}</div>
                                {account.accountNumber && (
                                  <div className="text-xs text-muted-foreground">Account {account.accountNumber}</div>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{account.members}</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (activeTab === "all-members") {
      return (
        <div className="max-w-4xl">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Team Members</h2>
            <p className="text-sm text-muted-foreground">Members of your organization and their account access.</p>
          </div>

          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact Information</TableHead>
                  <TableHead>Accounts</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamMembers.map((member) => {
                  const memberAccounts = getAccountsByUser(member, organization)
                  
                  return (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
                            <Image 
                              src={member.avatar} 
                              alt={member.name} 
                              width={40} 
                              height={40} 
                              className="h-full w-full object-cover" 
                            />
                          </div>
                          <div className="font-medium">{member.name}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{member.email}</div>
                          {member.phone && (
                            <div className="text-muted-foreground">M: {member.phone}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {memberAccounts.map((account) => {
                            const palette = getAccountPalette(account.id)
                            return (
                              <span 
                                key={account.id}
                                className="inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs"
                              >
                                <span className={`h-1.5 w-1.5 rounded-full ${palette.solid}`} />
                                {account.name}
                              </span>
                            )
                          })}
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      )
    }

    // Account Details page
    if (activeTab.endsWith('-details')) {
      const accountId = activeTab.replace('-details', '')
      const account = organization.accounts.find(a => a.id === accountId)
      if (!account) return null

      const palette = getAccountPalette(account.id)
      const AccountIcon = palette.icon

      return (
      <div className="max-w-2xl">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold">Account Details</h2>
            <p className="text-sm text-muted-foreground">Information about this account.</p>
          </div>
          {account.accountNumber && (
            <span className="font-mono text-xs rounded-md border bg-muted px-2 py-1">
              Account {account.accountNumber}
            </span>
          )}
        </div>

        <div className="space-y-6">
          {/* Account Logo & Name */}
          <div className="flex items-center gap-4">
            <div className={`h-16 w-16 shrink-0 flex items-center justify-center rounded-lg ${palette.bg}`}>
              <AccountIcon className={`h-8 w-8 ${palette.text}`} />
            </div>
            <div className="flex-1">
              <Label htmlFor="accountName" className="text-sm font-medium">Account Name *</Label>
              <Input id="accountName" value={account.name} readOnly className="bg-muted mt-2" />
            </div>
          </div>

          <Separator />

          {/* Location */}
          <div>
            <Label htmlFor="location" className="text-sm font-medium">Location</Label>
            <Input 
              id="location" 
              value={account.location} 
              readOnly 
              className="bg-muted" 
            />
          </div>

          <Separator />

          {/* About */}
          <div>
            <Label htmlFor="about" className="text-sm font-medium">About this team</Label>
            <div className="rounded-md border bg-muted p-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {account.about}
            </div>
          </div>
        </div>
      </div>
      )
    }

    // Account Members page
    if (activeTab.endsWith('-members')) {
      const accountId = activeTab.replace('-members', '')
      const account = organization.accounts.find(a => a.id === accountId)
      if (!account) return null
      
      const accountMembers = teamMembers.filter(member => 
        member.accountMemberships.includes(accountId)
      )
      
      return (
        <div className="max-w-4xl">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">{account.name} Members</h2>
            <p className="text-sm text-muted-foreground">Members with access to this account.</p>
          </div>

          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact Information</TableHead>
                  <TableHead>Accounts</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accountMembers.map((member) => {
                  const memberAccounts = getAccountsByUser(member, organization)
                  
                  return (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
                            <Image 
                              src={member.avatar} 
                              alt={member.name} 
                              width={40} 
                              height={40} 
                              className="h-full w-full object-cover" 
                            />
                          </div>
                          <div className="font-medium">{member.name}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{member.email}</div>
                          {member.phone && (
                            <div className="text-muted-foreground">M: {member.phone}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {memberAccounts.map((acc) => {
                            const accPalette = getAccountPalette(acc.id)
                            return (
                              <span 
                                key={acc.id}
                                className="inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs"
                              >
                                <span className={`h-1.5 w-1.5 rounded-full ${accPalette.solid}`} />
                                {acc.name}
                              </span>
                            )
                          })}
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      )
    }

    // Plan & Usage page
    if (activeTab.endsWith('-usage')) {
      const accountId = activeTab.replace('-usage', '')
      const account = organization.accounts.find(a => a.id === accountId)
      if (!account) return null

      const creditsBalance = 1240
      const creditsLow = creditsBalance < 300
      const creditsEmpty = creditsBalance === 0

      const actionCosts = [
        { group: "Originate", actions: [
          { name: "Search lenders", cost: 1 },
          { name: "Run AI match score", cost: 2 },
          { name: "Send outreach email", cost: 1 },
          { name: "Enrich lender profile", cost: 2 },
        ]},
        { group: "Maps", actions: [
          { name: "Search market comps", cost: 1 },
          { name: "Generate comp report", cost: 3 },
          { name: "Run AI summary", cost: 1 },
        ]},
        { group: "Memo", actions: [
          { name: "Generate deal memo", cost: 5 },
          { name: "Regenerate section", cost: 2 },
          { name: "Export to PDF", cost: 1 },
        ]},
      ]

      return (
        <div className="max-w-3xl space-y-6">

          {/* 1) Header Summary Card */}
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-start justify-between mb-5">
              <div>
                <h2 className="text-xl font-semibold">Billing</h2>
                <p className="text-sm text-muted-foreground mt-0.5">Manage your plan, credits, and account billing.</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-700">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Active
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 text-sm mb-5">
              <div>
                <div className="text-xs text-muted-foreground mb-0.5">Current Plan</div>
                <div className="font-medium">Lev Platform + Originate</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-0.5">Account</div>
                <div className="font-medium">{account.name}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-0.5">Renewal</div>
                <div className="font-medium">Renews Apr 30, 2026</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm">
                <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
                Buy credits
              </Button>
              <Button variant="outline" size="sm">Manage plan</Button>
              <Button variant="outline" size="sm">Update payment method</Button>
            </div>
          </div>

          {/* 2) Credits balance + health */}
          <div className={`rounded-lg border p-6 ${creditsEmpty ? 'border-red-300 bg-red-50 dark:bg-red-950/20' : creditsLow ? 'border-amber-300 bg-amber-50 dark:bg-amber-950/20' : 'bg-card'}`}>
            <div className="flex items-start justify-between mb-1">
              <div className="flex items-center gap-2">
                <Zap className={`h-5 w-5 ${creditsEmpty ? 'text-red-500' : creditsLow ? 'text-amber-500' : 'text-muted-foreground'}`} />
                <h3 className="text-base font-semibold">Credits balance</h3>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <RefreshCw className="h-3 w-3" />
                Last updated: just now
              </div>
            </div>
            <div className={`text-4xl font-bold tracking-tight mb-0.5 ${creditsEmpty ? 'text-red-600' : creditsLow ? 'text-amber-600' : ''}`}>
              {creditsBalance.toLocaleString()}
              <span className="text-base font-normal text-muted-foreground ml-2">credits</span>
            </div>
            <div className="text-xs text-muted-foreground mb-4">Shared across your account</div>
            {creditsEmpty && (
              <div className="flex items-center gap-3 rounded-md bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 px-4 py-3 mb-3">
                <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
                <span className="text-sm text-red-700 dark:text-red-400 flex-1">You are out of credits. Actions are blocked until you add more.</span>
                <Button size="sm" variant="destructive">Buy credits</Button>
              </div>
            )}
            {creditsLow && !creditsEmpty && (
              <div className="flex items-center gap-3 rounded-md bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 px-4 py-3 mb-3">
                <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                <span className="text-sm text-amber-700 dark:text-amber-400 flex-1">You are likely to run out soon.</span>
                <Button size="sm" variant="outline">Buy credits</Button>
              </div>
            )}
          </div>

          {/* 3) What you get this period */}
          <div className="rounded-lg border bg-card">
            <div className="px-6 py-4 border-b">
              <h3 className="text-base font-semibold">What&apos;s included this period</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Products on your current subscription</p>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Included</TableHead>
                  <TableHead className="text-right">Remaining</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="font-medium text-sm">Originate Credits</div>
                    <div className="text-xs text-muted-foreground">Base allotment per period</div>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs">Credit</span>
                  </TableCell>
                  <TableCell className="text-right font-medium">1,000</TableCell>
                  <TableCell className="text-right">
                    <span className="font-medium">240</span>
                    <div className="w-full bg-muted rounded-full h-1.5 mt-1.5">
                      <div className="bg-primary h-1.5 rounded-full" style={{width: '24%'}} />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium text-sm">Lev Platform Access</div>
                    <div className="text-xs text-muted-foreground">Pipeline, contacts, documents, checklists</div>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs">Flat</span>
                  </TableCell>
                  <TableCell className="text-right" colSpan={2}>
                    <span className="inline-flex items-center gap-1.5 text-green-700 text-sm">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Included
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium text-sm">Memo Add-on</div>
                    <div className="text-xs text-muted-foreground">AI-generated deal marketing materials</div>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs">Flat</span>
                  </TableCell>
                  <TableCell className="text-right" colSpan={2}>
                    <span className="inline-flex items-center gap-1.5 text-green-700 text-sm">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Included
                    </span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* 4) How credits work */}
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-base font-semibold mb-3">How credits work</h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li className="flex gap-2.5">
                <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">1</span>
                Credits are a <strong className="text-foreground">single balance shared across your account</strong> across all Lev products — Originate, Maps, Memo, and future tools.
              </li>
              <li className="flex gap-2.5">
                <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">2</span>
                Each billable action has a published credit cost (see <button className="underline text-foreground hover:text-primary transition-colors" onClick={() => document.getElementById('action-costs')?.scrollIntoView({behavior: 'smooth'})}>Action costs</button> below).
              </li>
              <li className="flex gap-2.5">
                <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">3</span>
                Before you run an action, Lev shows the cost and <strong className="text-foreground">blocks the action</strong> if you do not have enough credits.
              </li>
              <li className="flex gap-2.5">
                <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">4</span>
                When an action runs successfully, credits are deducted and your balance updates everywhere in real time.
              </li>
            </ul>
          </div>

          {/* 5) Action costs */}
          <div id="action-costs" className="rounded-lg border bg-card">
            <div className="px-6 py-4 border-b flex items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold">Action costs</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Prices may change; latest prices are always shown here.</p>
              </div>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search actions..."
                  className="h-8 w-48 rounded-md border bg-background pl-8 pr-3 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
            </div>
            {actionCosts.map((group) => (
              <div key={group.group}>
                <div className="px-6 py-2 bg-muted/40 border-b">
                  <span className="text-xs font-medium text-muted-foreground">{group.group.toUpperCase()}</span>
                </div>
                {group.actions.map((action, i) => (
                  <div
                    key={action.name}
                    className={`flex items-center justify-between px-6 py-3 text-sm ${i < group.actions.length - 1 ? 'border-b' : ''}`}
                  >
                    <span>{action.name}</span>
                    <span className="flex items-center gap-1 font-medium">
                      <Zap className="h-3 w-3 text-muted-foreground" />
                      {action.cost} {action.cost === 1 ? 'credit' : 'credits'}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>

        </div>
      )
    }

    // Billing & Payments page
    if (activeTab.endsWith('-billing')) {
      const accountId = activeTab.replace('-billing', '')
      const account = organization.accounts.find(a => a.id === accountId)
      if (!account) return null

      const usageHistory = [
        { date: "Mar 18, 2026", action: "Run AI match score", credits: 2, user: "Sarah Chen", product: "Originate" },
        { date: "Mar 18, 2026", action: "Search lenders", credits: 1, user: "Mike Torres", product: "Originate" },
        { date: "Mar 17, 2026", action: "Generate deal memo", credits: 5, user: "Sarah Chen", product: "Memo" },
        { date: "Mar 17, 2026", action: "Search market comps", credits: 1, user: "Jordan Lee", product: "Maps" },
        { date: "Mar 17, 2026", action: "Generate comp report", credits: 3, user: "Mike Torres", product: "Maps" },
        { date: "Mar 16, 2026", action: "Send outreach email", credits: 1, user: "Sarah Chen", product: "Originate" },
        { date: "Mar 16, 2026", action: "Run AI summary", credits: 1, user: "Jordan Lee", product: "Maps" },
        { date: "Mar 15, 2026", action: "Regenerate section", credits: 2, user: "Sarah Chen", product: "Memo" },
        { date: "Mar 15, 2026", action: "Enrich lender profile", credits: 2, user: "Mike Torres", product: "Originate" },
        { date: "Mar 14, 2026", action: "Export to PDF", credits: 1, user: "Sarah Chen", product: "Memo" },
      ]

      const creditPackages = [
        { credits: 500, price: 49, perCredit: "$0.098" },
        { credits: 1000, price: 89, perCredit: "$0.089", popular: true },
        { credits: 5000, price: 399, perCredit: "$0.080" },
      ]

      const productBadgeColor: Record<string, string> = {
        Originate: "bg-blue-500/10 text-blue-700",
        Maps: "bg-emerald-500/10 text-emerald-700",
        Memo: "bg-violet-500/10 text-violet-700",
      }

      return (
        <div className="max-w-3xl space-y-6">

          {/* 6) Usage & history */}
          <div className="rounded-lg border bg-card">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold">Usage history</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Recent credit deductions across your account</p>
              </div>
              <Button variant="outline" size="sm">Export CSV</Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Performed by</TableHead>
                  <TableHead className="text-right">Credits</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usageHistory.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-sm text-muted-foreground whitespace-nowrap">{row.date}</TableCell>
                    <TableCell className="text-sm">{row.action}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${productBadgeColor[row.product] ?? ''}`}>
                        {row.product}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{row.user}</TableCell>
                    <TableCell className="text-right">
                      <span className="flex items-center justify-end gap-1 text-sm font-medium text-red-600">
                        <Zap className="h-3 w-3" />
                        −{row.credits}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="px-6 py-3 border-t flex items-center justify-between text-xs text-muted-foreground">
              <span>Showing 10 of 248 actions this period</span>
              <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                View all <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* 7) Payment methods + invoices */}
          <div className="rounded-lg border bg-card">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <h3 className="text-base font-semibold">Payment method</h3>
              <Button variant="outline" size="sm" disabled>
                <Plus className="h-3.5 w-3.5 mr-1.5" />
                Add card
              </Button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-16 items-center justify-center rounded border bg-white">
                    <span className="text-xs font-bold tracking-wide">VISA</span>
                  </div>
                  <div>
                    <div className="font-medium text-sm">•••• •••• •••• 4242</div>
                    <div className="text-xs text-muted-foreground">Expires 08/2027</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium">Default</span>
                  <Button variant="ghost" size="sm" disabled>Update</Button>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="text-muted-foreground">Billing email</div>
                <div className="font-medium">billing@{organization.name.toLowerCase().replace(/\s+/g, '')}.com</div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card">
            <div className="px-6 py-4 border-b flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-base font-semibold">Invoices</h3>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                  <TableHead className="w-12" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { date: "Jan 31, 2026", desc: "Campaigns — February 2026", amount: "$4,000" },
                  { date: "Dec 31, 2025", desc: "Campaigns — January 2026", amount: "$4,000" },
                  { date: "Nov 30, 2025", desc: "Campaigns — December 2025 (incl. 3,000 overage)", amount: "$4,600" },
                  { date: "May 31, 2025", desc: "Annual — Platform, Deal Prep & Execution (Jun 2025–May 2026)", amount: "$32,000" },
                ].map((row, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-sm text-muted-foreground whitespace-nowrap">{row.date}</TableCell>
                    <TableCell className="text-sm">{row.desc}</TableCell>
                    <TableCell className="text-right text-sm font-medium">{row.amount}</TableCell>
                    <TableCell className="text-right">
                      <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-700">Paid</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" disabled>
                        <FileText className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* 8) Buy credits */}
          <div className="rounded-lg border bg-card">
            <div className="px-6 py-4 border-b flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              <div>
                <h3 className="text-base font-semibold">Buy credits</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm text-muted-foreground mb-4">Credits are added to your account instantly after checkout.</p>
              <div className="grid gap-3 sm:grid-cols-3">
                {creditPackages.map((pkg) => (
                  <div
                    key={pkg.credits}
                    className={`relative rounded-lg border p-4 cursor-pointer transition-colors hover:border-primary/50 ${pkg.popular ? 'border-primary ring-1 ring-primary' : ''}`}
                  >
                    {pkg.popular && (
                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground whitespace-nowrap">
                        Most popular
                      </span>
                    )}
                    <div className="flex items-center gap-1 text-2xl font-bold mb-0.5">
                      <Zap className="h-4 w-4 text-muted-foreground" />
                      {pkg.credits.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground mb-3">credits</div>
                    <div className="text-lg font-semibold">${pkg.price}</div>
                    <div className="text-xs text-muted-foreground mb-4">{pkg.perCredit} per credit</div>
                    <Button className="w-full" size="sm" variant={pkg.popular ? "default" : "outline"} disabled>
                      Buy now
                    </Button>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4 text-center">
                Need a custom volume? <button className="underline hover:text-foreground transition-colors">Contact sales</button>
              </p>
            </div>
          </div>

        </div>
      )
    }

    return null
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex h-full">
        {/* Sidebar Navigation */}
        <div className="w-56 bg-background p-6">
          <nav className="flex flex-col gap-1">
            {/* My Details */}
            <button
              onClick={() => setActiveTab("details")}
              className={`w-full flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                activeTab === "details" ? "bg-muted font-medium" : "hover:bg-muted/50"
              }`}
            >
              <User className="h-4 w-4" />
              My Details
            </button>
            
            {/* Admin Section */}
            <div className="mt-4">
              <div className="px-2 text-xs font-medium text-muted-foreground mb-1">
                Admin
              </div>
              <button
                onClick={() => setActiveTab("org")}
                className={`w-full flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                  activeTab === "org" ? "bg-muted font-medium" : "hover:bg-muted/50"
                }`}
              >
                <Building2 className="h-4 w-4" />
                Organization
              </button>
              <button
                onClick={() => setActiveTab("all-members")}
                className={`w-full flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                  activeTab === "all-members" ? "bg-muted font-medium" : "hover:bg-muted/50"
                }`}
              >
                <Users className="h-4 w-4" />
                All Members
              </button>
            </div>
            
            {/* Account Sections */}
            {userAccounts.map((account) => (
              <div key={account.id} className="mt-4">
                <div className="px-2 text-xs font-medium text-muted-foreground mb-1">
                  {account.name}
                </div>
                <button
                  onClick={() => setActiveTab(`${account.id}-details`)}
                  className={`w-full flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                    activeTab === `${account.id}-details` ? "bg-muted font-medium" : "hover:bg-muted/50"
                  }`}
                >
                  <FileText className="h-4 w-4" />
                  Account Details
                </button>
                <button
                  onClick={() => setActiveTab(`${account.id}-members`)}
                  className={`w-full flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                    activeTab === `${account.id}-members` ? "bg-muted font-medium" : "hover:bg-muted/50"
                  }`}
                >
                  <Users className="h-4 w-4" />
                  Members
                </button>
                <button
                  onClick={() => setActiveTab(`${account.id}-usage`)}
                  className={`w-full flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                    activeTab === `${account.id}-usage` ? "bg-muted font-medium" : "hover:bg-muted/50"
                  }`}
                >
                  <BarChart3 className="h-4 w-4" />
                  Plan & Usage
                </button>
                <button
                  onClick={() => setActiveTab(`${account.id}-billing`)}
                  className={`w-full flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                    activeTab === `${account.id}-billing` ? "bg-muted font-medium" : "hover:bg-muted/50"
                  }`}
                >
                  <CreditCard className="h-4 w-4" />
                  Billing & Payments
                </button>
              </div>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}
