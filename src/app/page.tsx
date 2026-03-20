"use client"

import { useActiveUser } from "@/contexts/active-user-context"
import { useTeam } from "@/contexts/team-context"
import Image from "next/image"
import { Landmark, BookOpen, Info, Sparkles, UserPlus, Minus, Plus, Zap } from "lucide-react"
import { getAccountPalette, getAccountsByUser, SCENARIOS } from "@/lib/demo-data"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import * as React from "react"

// ─── Plan definitions ────────────────────────────────────────────────────────

const PLANS = {
  free: {
    id: "free",
    name: "Free",
    price: "$0",
    priceSub: "no credit card needed",
    creditsLabel: "100 credits",
    creditsSub: "one-time, per account",
    creditsPerSeat: 100,
    pricePerSeat: 0,
    subscriptionName: "FreeCredits100",
  },
  premium: {
    id: "premium",
    name: "Premium",
    price: "$49",
    priceSub: "per seat / month",
    creditsLabel: "4,000 credits",
    creditsSub: "per seat / month",
    creditsPerSeat: 4000,
    pricePerSeat: 49,
    subscriptionName: "Pro",
  },
} as const

type PlanId = keyof typeof PLANS

// ─── Subscription badge (reused pattern) ─────────────────────────────────────

function SubBadge({ label, active }: { label: string; active: boolean }) {
  return active ? (
    <span className="inline-flex h-5 items-center gap-1.5 rounded-full bg-green-500/10 px-2 text-xs font-medium text-green-700">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
      </span>
      {label}
    </span>
  ) : (
    <span className="inline-flex h-5 items-center gap-1.5 rounded-full bg-muted px-2 text-xs font-medium text-muted-foreground">
      <span className="h-2 w-2 rounded-full border border-muted-foreground/40" />
      {label}
    </span>
  )
}

// ─── First Login Dialog ───────────────────────────────────────────────────────

function FirstLoginDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { createAccount } = useActiveUser()
  const [plan, setPlan] = React.useState<PlanId>("free")
  const [seats, setSeats] = React.useState(1)
  const [accountName, setAccountName] = React.useState("")

  const selectedPlan = PLANS[plan]
  const totalCredits = selectedPlan.creditsPerSeat * seats
  const totalPrice = selectedPlan.pricePerSeat * seats

  function handleClose() {
    onOpenChange(false)
    setPlan("free")
    setSeats(1)
    setAccountName("")
  }

  function handleCreate() {
    if (!accountName.trim()) return
    createAccount(accountName.trim())
    handleClose()
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose() }}>
      <DialogContent className="sm:max-w-xl p-0 overflow-hidden gap-0">

        {/* ── Header ── */}
        <div className="px-6 pt-6 pb-4 border-b">
          <DialogTitle className="text-base font-semibold">Create Account</DialogTitle>
          <p className="text-xs text-muted-foreground mt-0.5">Choose a plan and name your account.</p>
        </div>

        {/* ── Plan + setup ── */}
        <div className="flex flex-col gap-4 px-6 py-5">

            {/* Plan radio cards */}
            <div className="grid grid-cols-2 gap-2.5">
              {(Object.values(PLANS) as typeof PLANS[PlanId][]).map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPlan(p.id as PlanId)}
                  className={`relative flex flex-col gap-1 rounded-lg border p-3.5 text-left transition-all ${
                    plan === p.id
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "border-border bg-card hover:bg-muted/40"
                  }`}
                >
                  {/* Radio dot */}
                  <div className={`absolute top-3 right-3 h-4 w-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                    plan === p.id ? "border-primary" : "border-muted-foreground/40"
                  }`}>
                    {plan === p.id && <div className="h-1.5 w-1.5 rounded-full bg-primary" />}
                  </div>
                  <span className="text-sm font-semibold pr-6">{p.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold leading-none">{p.price}</span>
                    <SubBadge label={p.subscriptionName} active />
                  </div>
                  <span className="text-xs text-muted-foreground">{p.priceSub}</span>
                  <div className="mt-1.5 pt-1.5 border-t">
                    <span className="text-xs font-medium">{p.creditsLabel}</span>
                    <span className="text-xs text-muted-foreground ml-1">{p.creditsSub}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Account name */}
            <Input
              placeholder="Account name  (e.g. Acme Capital)"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="h-9"
              autoFocus
            />

            {/* Seats + credits calculator card */}
            <div className="rounded-lg border bg-muted/30 divide-y">
              {/* Seats row */}
              <div className="flex items-center justify-between px-4 py-2.5">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-sm text-muted-foreground cursor-default underline decoration-dashed underline-offset-2">
                      Seats
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="max-w-xs">
                    You can invite users at any time. Each seat gets its own credits allocation.
                  </TooltipContent>
                </Tooltip>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSeats(s => Math.max(1, s - 1))}
                    className="flex h-6 w-6 items-center justify-center rounded border bg-background text-muted-foreground hover:bg-muted transition-colors"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-6 text-center text-sm font-medium">{seats}</span>
                  <button
                    onClick={() => setSeats(s => s + 1)}
                    className="flex h-6 w-6 items-center justify-center rounded border bg-background text-muted-foreground hover:bg-muted transition-colors"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {/* Credits per seat */}
              <div className="flex items-center justify-between px-4 py-2.5">
                <span className="text-sm text-muted-foreground">Credits / seat</span>
                <span className="text-sm font-medium">{selectedPlan.creditsPerSeat.toLocaleString()}</span>
              </div>

              {/* Total credits */}
              <div className="flex items-center justify-between px-4 py-2.5">
                <span className="text-sm text-muted-foreground">Total credits</span>
                <span className="text-sm font-semibold">{totalCredits.toLocaleString()}
                  <span className="text-xs font-normal text-muted-foreground ml-1">
                    {plan === "free" ? "one-time" : "/ month"}
                  </span>
                </span>
              </div>

              {/* Total price */}
              <div className="flex items-center justify-between px-4 py-2.5">
                <span className="text-sm font-medium">Total price</span>
                <span className="text-sm font-semibold">
                  {totalPrice === 0 ? "$0" : `$${totalPrice.toLocaleString()}`}
                  <span className="text-xs font-normal text-muted-foreground ml-1">
                    {plan === "free" ? "free forever" : "/ month"}
                  </span>
                </span>
              </div>
            </div>

            {/* Ad-hoc credits banner */}
            <div className="flex items-center gap-2.5 rounded-lg border border-dashed px-3.5 py-2.5 text-xs text-muted-foreground">
              <Zap className="h-3.5 w-3.5 shrink-0 text-amber-500" />
              Additional credits can be purchased ad hoc at any time from your account billing settings.
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={handleClose}>Cancel</Button>
              <Button size="sm" onClick={handleCreate} disabled={!accountName.trim()}>
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                Create account
              </Button>
            </div>
          </div>

      </DialogContent>
    </Dialog>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <UseCaseView />
    </div>
  )
}

function UseCaseView() {
  const { organization, teamMembers } = useActiveUser()
  const { activeTeam } = useTeam()
  const [firstLoginOpen, setFirstLoginOpen] = React.useState(false)

  const scenario = SCENARIOS[activeTeam?.name ?? '']

  return (
    <>
      {/* USE CASE TITLE */}
      {scenario?.title && (
        <div className="flex items-center gap-1.5 text-sm font-light">
          <BookOpen className="h-4 w-4 shrink-0" />
          <span className="font-medium">The Use Case: </span>{scenario.title}
        </div>
      )}

      {/* ORGANIZATION */}
      <div>
        <span className="mb-3 block font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Organization</span>
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold">{organization.name}</h1>
              <span className="font-mono text-xs rounded-md border bg-muted px-1.5 py-0.5">
                Org {organization.orgId}
              </span>
            </div>
            {organization.hasLenderPrograms && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Landmark className="h-3.5 w-3.5" />
                Has Lender Programs
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3.5 w-3.5 cursor-default" />
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-xs">
                    We identify a &quot;Lender&quot; via the Org&apos;s Lender Attributes. So to identify &quot;Lender Users&quot;, we need a way to match from User → Person → Org.
                  </TooltipContent>
                </Tooltip>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ACCOUNTS */}
      <div>
        <span className="mb-3 block font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Accounts</span>
        <div className="grid gap-3 md:grid-cols-2">
          {organization.accounts.length === 0 ? (
            <div className="rounded-lg border border-dashed bg-[repeating-linear-gradient(45deg,transparent,transparent_6px,hsl(var(--muted)/0.4)_6px,hsl(var(--muted)/0.4)_7px)]">
              <div className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-dashed bg-background" />
                <div className="flex flex-1 flex-col gap-0.5">
                  <span className="text-sm font-semibold text-muted-foreground">No account</span>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    No account has been created for this user.
                  </p>
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      onClick={() => setFirstLoginOpen(true)}
                    >
                      <UserPlus className="h-3.5 w-3.5 mr-1.5" />
                      First Login
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="max-w-xs">
                    Click here to see how accounts will be created on these users&apos; next login.
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          ) : (
            organization.accounts.map((account) => {
              const palette = getAccountPalette(account.id)
              const AccountIcon = palette.icon

              return (
                <div key={account.id} className="rounded-lg border bg-card">
                  <div className="flex items-start gap-3 p-4">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${palette.bg}`}>
                      <AccountIcon className={`h-5 w-5 ${palette.text}`} />
                    </div>
                    <div className="flex flex-1 flex-col gap-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold">{account.name}</span>
                        {account.accountNumber && (
                          <span className="font-mono text-xs rounded-md border bg-muted px-1.5 py-0.5">
                            {account.accountNumber}
                          </span>
                        )}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            {account.legacySubscription ? (
                              <span className="inline-flex h-5 cursor-default items-center gap-1.5 rounded-full bg-green-500/10 px-2 text-xs font-medium text-green-700">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                                </span>
                                LegacySubscription
                              </span>
                            ) : (
                              <span className="inline-flex h-5 cursor-default items-center gap-1.5 rounded-full bg-muted px-2 text-xs font-medium text-muted-foreground">
                                <span className="h-2 w-2 rounded-full border border-muted-foreground/40" />
                                No LegacySubscription
                              </span>
                            )}
                          </TooltipTrigger>
                          <TooltipContent side="bottom" className="max-w-xs">
                            Traditional Lev Subscription that all current customers are on
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            {account.creditsFree100 ? (
                              <span className="inline-flex h-5 cursor-default items-center gap-1.5 rounded-full bg-green-500/10 px-2 text-xs font-medium text-green-700">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                                </span>
                                FreeCredits100
                              </span>
                            ) : (
                              <span className="inline-flex h-5 cursor-default items-center gap-1.5 rounded-full bg-muted px-2 text-xs font-medium text-muted-foreground">
                                <span className="h-2 w-2 rounded-full border border-muted-foreground/40" />
                                No FreeCredits100
                              </span>
                            )}
                          </TooltipTrigger>
                          <TooltipContent side="bottom" className="max-w-xs">
                            The free subscription given to anybody who signs up for Lev Originate, gives them 100 credits to use for free.
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {account.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* USERS */}
      <div>
        <span className="mb-3 block font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Users</span>
        <div className="grid gap-3 md:grid-cols-2">
          {teamMembers.map((member) => {
            const memberAccounts = getAccountsByUser(member, organization)

            return (
              <div key={member.id} className="rounded-lg border bg-card">
                <div className="flex items-center gap-3 p-4">
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">{member.name}</span>
                      <span className="font-mono text-xs rounded-md border bg-muted px-1.5 py-0.5">
                        {member.userId}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">{member.email}</span>
                  </div>
                </div>

                {memberAccounts.length > 0 && (
                  <>
                    <div className="border-t" />
                    {memberAccounts.map((account, i) => {
                      const palette = getAccountPalette(account.id)
                      const AccountIcon = palette.icon
                      return (
                        <div
                          key={account.id}
                          className={`flex items-center justify-between px-4 py-2 bg-muted/40${i < memberAccounts.length - 1 ? ' border-b' : ''}`}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded ${palette.bg}`}>
                              <AccountIcon className={`h-3 w-3 ${palette.text}`} />
                            </div>
                            <span className="text-xs font-medium">{account.name}</span>
                          </div>
                          {account.accountNumber && (
                            <span className="font-mono text-xs text-muted-foreground">
                              {account.accountNumber}
                            </span>
                          )}
                        </div>
                      )
                    })}
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* USE CASE DESCRIPTION */}
      {scenario?.description && (
        <div className="rounded-lg border border-dashed bg-muted/30 px-4 py-3">
          <p className="text-sm text-muted-foreground leading-relaxed">{scenario.description}</p>
        </div>
      )}

      <FirstLoginDialog open={firstLoginOpen} onOpenChange={setFirstLoginOpen} />
    </>
  )
}
