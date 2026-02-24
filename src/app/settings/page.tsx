"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useHeader } from "@/contexts/header-context"
import { useActiveUser } from "@/contexts/active-user-context"
import { useActiveRole } from "@/contexts/mode-context"
import { getAccountsByUser, getUserRole, getAccountIcon, getAccountColor } from "@/lib/demo-data"
import Image from "next/image"
import { Building2, User, Briefcase, Users, Info, Plus, FileText, Upload, CreditCard, BarChart3 } from "lucide-react"
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type SettingsTab = 
  | "details" 
  | "org" 
  | "all-members"
  | `${string}-details`
  | `${string}-members`
  | `${string}-usage`
  | `${string}-billing`

export default function SettingsPage() {
  const router = useRouter()
  const { setTitle } = useHeader()
  const { user, organization, teamMembers } = useActiveUser()
  const { activeRole } = useActiveRole()
  
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
              <Input id="jobTitle" value={activeRole === 'broker' ? 'Broker' : 'Lender'} readOnly className="bg-muted" />
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
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Your Role</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userAccounts.map((account) => {
                      const AccountIcon = getAccountIcon(account.type)
                      const accountColor = getAccountColor(account.type)
                      const types = Array.isArray(account.type) ? account.type : [account.type]
                      
                      return (
                        <TableRow key={account.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${accountColor}/20`}>
                                <AccountIcon className={`h-4 w-4 ${accountColor.replace('bg-', 'text-')}`} />
                              </div>
                              <div>
                                <div className="font-medium">{account.name}</div>
                                {account.accountNumber && (
                                  <div className="text-xs text-muted-foreground">Account {account.accountNumber}</div>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1.5">
                              {types.map((type, idx) => (
                                <span key={type} className="inline-flex items-center gap-1.5 text-sm">
                                  <span className={`h-1.5 w-1.5 rounded-full ${type === 'broker' ? 'bg-[#3E9B70]' : 'bg-[#3880E8]'}`} />
                                  {type === 'broker' ? 'Broker' : 'Lender'}
                                  {idx < types.length - 1 && <span className="text-muted-foreground">,</span>}
                                </span>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {getUserRole(account.id)}
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
                {organization.domains.split(', ').map((domain, index) => (
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
                      <TableHead>Type</TableHead>
                      <TableHead>Members</TableHead>
                      <TableHead className="text-right">Your Role</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {organization.accounts.map((account) => {
                      const AccountIcon = getAccountIcon(account.type)
                      const accountColor = getAccountColor(account.type)
                      const isMember = userAccounts.find(a => a.id === account.id)
                      const types = Array.isArray(account.type) ? account.type : [account.type]
                      
                      return (
                        <TableRow key={account.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${accountColor}/20`}>
                                <AccountIcon className={`h-4 w-4 ${accountColor.replace('bg-', 'text-')}`} />
                              </div>
                              <div>
                                <div className="font-medium">{account.name}</div>
                                {account.accountNumber && (
                                  <div className="text-xs text-muted-foreground">Account {account.accountNumber}</div>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1.5">
                              {types.map((type, idx) => (
                                <span key={type} className="inline-flex items-center gap-1.5 text-sm">
                                  <span className={`h-1.5 w-1.5 rounded-full ${type === 'broker' ? 'bg-[#3E9B70]' : 'bg-[#3880E8]'}`} />
                                  {type === 'broker' ? 'Broker' : 'Lender'}
                                  {idx < types.length - 1 && <span className="text-muted-foreground">,</span>}
                                </span>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>{account.members}</TableCell>
                          <TableCell className="text-right font-medium">
                            {isMember ? getUserRole(account.id) : '—'}
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
                  <TableHead>Role</TableHead>
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
                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                          Admin
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {memberAccounts.map((account) => {
                            const accountColor = getAccountColor(account.type)
                            return (
                              <span 
                                key={account.id}
                                className="inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs"
                              >
                                <span className={`h-1.5 w-1.5 rounded-full ${accountColor}`} />
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

      const AccountIcon = getAccountIcon(account.type)
      const accountColor = getAccountColor(account.type)
      const types = Array.isArray(account.type) ? account.type : [account.type]

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
            <div className={`h-16 w-16 shrink-0 flex items-center justify-center rounded-lg ${accountColor}/20`}>
              <AccountIcon className={`h-8 w-8 ${accountColor.replace('bg-', 'text-')}`} />
            </div>
            <div className="flex-1">
              <Label htmlFor="accountName" className="text-sm font-medium">Account Name *</Label>
              <Input id="accountName" value={account.name} readOnly className="bg-muted mt-2" />
            </div>
          </div>

          <Separator />

          {/* Account Type */}
          <div>
            <Label htmlFor="accountType" className="text-sm font-medium">Account Type</Label>
            <div className="mt-2 flex items-center gap-2">
              {types.map((type) => (
                <span key={type} className="inline-flex h-6 items-center gap-1.5 rounded-full border px-3 text-xs font-medium">
                  <span className={`h-1.5 w-1.5 rounded-full ${type === 'broker' ? 'bg-[#3E9B70]' : 'bg-[#3880E8]'}`} />
                  {type === 'broker' ? 'Broker' : 'Lender'}
                </span>
              ))}
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
                  <TableHead>Role</TableHead>
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
                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                          Admin
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {memberAccounts.map((acc) => {
                            const accColor = getAccountColor(acc.type)
                            return (
                              <span 
                                key={acc.id}
                                className="inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs"
                              >
                                <span className={`h-1.5 w-1.5 rounded-full ${accColor}`} />
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
      
      return (
        <div className="max-w-4xl">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Plan & Usage</h2>
            <p className="text-sm text-muted-foreground">Review your current plan and track usage across your workflows.</p>
          </div>
          
          <div className="space-y-6">
            {/* Platform Subscription */}
            <div className="rounded-lg border bg-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-base font-semibold mb-1">Platform Subscription</h3>
                  <p className="text-sm text-muted-foreground">$20,000 / year</p>
                </div>
                <span className="inline-flex items-center rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-700">
                  Active
                </span>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2 mb-4">
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">12 active seats</div>
                    <div className="text-xs text-muted-foreground">Manage access from Users & Permissions</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">Renews May 30, 2026</div>
                    <div className="text-xs text-muted-foreground">102 days remaining</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <div className="text-xs font-medium text-muted-foreground mb-3">INCLUDED FEATURES</div>
                <div className="grid gap-2 md:grid-cols-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-600">✓</span>
                    <span>Pipeline management</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-600">✓</span>
                    <span>Contact management</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-600">✓</span>
                    <span>Document storage, sharing & collaboration</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-600">✓</span>
                    <span>Checklists for deal preparation & closing</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Workflows */}
            <div>
              <div className="text-xs font-medium text-muted-foreground mb-3">WORKFLOWS</div>
              
              {/* Campaigns */}
              <div className="rounded-lg border bg-card p-4 mb-3">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-semibold">Campaigns</h3>
                      <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-700">
                        Active
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">Email outreach to source new business and maintain relationships</p>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Actions used - Resets Mar 1</span>
                    <div className="text-right">
                      <div className="font-medium">8,420 / 20,000 per month</div>
                      <div className="text-xs text-muted-foreground">Price: $4,000 / month</div>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '42%'}}></div>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    Overage rate: $200 / 1,000 actions • 8 users
                  </div>
                </div>
              </div>

              {/* Deal Prep */}
              <div className="rounded-lg border bg-card p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-semibold">Deal Prep</h3>
                      <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-700">
                        Active
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">Use AI to generate polished marketing materials in minutes</p>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Memos created</span>
                    <div className="text-right">
                      <div className="font-medium">15 / 15 per year</div>
                      <div className="text-xs text-muted-foreground">Price: $2,000 / year</div>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{width: '100%'}}></div>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    Overage rate: $133 / memo
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    // Billing & Payments page
    if (activeTab.endsWith('-billing')) {
      const accountId = activeTab.replace('-billing', '')
      const account = organization.accounts.find(a => a.id === accountId)
      if (!account) return null
      
      return (
        <div className="max-w-4xl">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Billing & Payments</h2>
            <p className="text-sm text-muted-foreground">View invoices, manage payment methods, and track credits.</p>
          </div>
          
          <div className="space-y-6">
            {/* Payment Methods */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold">Payment Methods</h3>
                <Button variant="outline" size="sm" disabled>
                  <Plus className="h-4 w-4 mr-2" />
                  Add card
                </Button>
              </div>
              
              <div className="rounded-lg border bg-card p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-16 items-center justify-center rounded border bg-white">
                      <span className="text-xs font-bold">VISA</span>
                    </div>
                    <div>
                      <div className="font-medium text-sm">•••• •••• •••• 4242</div>
                      <div className="text-xs text-muted-foreground">Expires 08/2027</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium">
                      Default
                    </span>
                    <Button variant="ghost" size="sm" disabled>
                      Update
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Credits */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-base font-semibold">Credits</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">These balances are reflected in your Plan & Usage consumption totals.</p>
              
              <div className="rounded-lg border bg-card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm mb-1">Execution</div>
                    <div className="text-xs text-muted-foreground">Added Jan 9, 2026 - Expires May 30, 2026</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">1 deal</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Invoices */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-base font-semibold">Invoices</h3>
              </div>
              
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Jan 31, 2026</TableCell>
                      <TableCell>Campaigns — February 2026</TableCell>
                      <TableCell className="text-right">$4,000</TableCell>
                      <TableCell className="text-right">
                        <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-700">
                          Paid
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" disabled>
                          <FileText className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Dec 31, 2025</TableCell>
                      <TableCell>Campaigns — January 2026</TableCell>
                      <TableCell className="text-right">$4,000</TableCell>
                      <TableCell className="text-right">
                        <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-700">
                          Paid
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" disabled>
                          <FileText className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Nov 30, 2025</TableCell>
                      <TableCell>Campaigns — December 2025 (incl. 3,000 overage actions)</TableCell>
                      <TableCell className="text-right">$4,600</TableCell>
                      <TableCell className="text-right">
                        <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-700">
                          Paid
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" disabled>
                          <FileText className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>May 31, 2025</TableCell>
                      <TableCell>Annual — Platform, Deal Prep & Execution (Jun 2025 – May 2026)</TableCell>
                      <TableCell className="text-right">$32,000</TableCell>
                      <TableCell className="text-right">
                        <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-700">
                          Paid
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" disabled>
                          <FileText className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
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
