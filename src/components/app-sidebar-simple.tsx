"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { NavMain } from "@/components/blocks/nav/nav-main"
import { NavUser } from "@/components/blocks/nav/nav-user"
import { TeamSwitcher, type Team } from "@/components/team-switcher"
import { useActiveUser } from "@/contexts/active-user-context"
import { useTeam } from "@/contexts/team-context"
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
  DialogDescription,
} from "@/components/ui/dialog"
import { Folder, Network, Globe, FileText, Vault, Building2, Landmark, Sparkles } from "lucide-react"
import { SCENARIOS, getAccountsByUser, getAccountPalette } from "@/lib/demo-data"

const sharedItems = [
  {
    title: "Vaults",
    url: "/vaults",
    icon: Vault,
    tooltip: "The Vault Page is available to any user, showing any Vaults that user's email address was specifically invited to. It is role agnostic, and does not require an account or subscription.",
  },
]

// Derive teams array directly from SCENARIOS — no hardcoding
export const teams: Team[] = Object.keys(SCENARIOS).map((name) => ({
  name,
  logo: Building2,
  plan: name,
}))

export const demoTeamUsers: Record<string, { id: string; name: string; email: string; avatar: any }[]> =
  Object.fromEntries(
    Object.entries(SCENARIOS).map(([name, scenario]) => [
      name,
      scenario.teamMembers.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        avatar: u.avatar,
      })),
    ])
  )

function LenderProgramsNavItem() {
  const { user, organization } = useActiveUser()
  const [open, setOpen] = React.useState(false)

  const userAccounts = getAccountsByUser(user, organization)

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Lending</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <Tooltip>
              <TooltipTrigger asChild>
                <SidebarMenuButton asChild onClick={() => setOpen(true)} className="cursor-pointer">
                  <div>
                    <Landmark />
                    <span>Lender Programs</span>
                  </div>
                </SidebarMenuButton>
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-xs">
                Conditional on user's relation to an Org that has Lender Attributes. In the world without roles, any Org (like the Rente Group) could have Lender Attributes. Click for more details.
              </TooltipContent>
            </Tooltip>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-start justify-between gap-3">
              <DialogTitle>Lender Programs</DialogTitle>
              <span className="inline-flex shrink-0 items-center rounded-full bg-red-500/10 px-2.5 py-0.5 text-xs font-semibold text-red-600 border border-red-200">
                NOT SCOPED
              </span>
            </div>
            <DialogDescription className="leading-relaxed">
              We can add Lender Attributes to any org in the backend. But to do this at scale, we need a way to draw the connection between the logged-in user and their belonging to an Org that has Lender Programs / Attributes. That connection could be via the Person record, the Account membership, or TBD — this is the open question.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center gap-0">
            {/* User card */}
            <div className="w-full rounded-lg border bg-card">
              <div className="flex items-center gap-3 p-4">
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <Image src={user.avatar} alt={user.name} width={40} height={40} className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{user.name}</span>
                    <span className="font-mono text-xs rounded-md border bg-muted px-1.5 py-0.5">{user.userId}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{user.email}</span>
                </div>
              </div>
              {userAccounts.length > 0 && (
                <>
                  <div className="border-t" />
                  {userAccounts.map((account, i) => {
                    const palette = getAccountPalette(account.id)
                    const AccountIcon = palette.icon
                    return (
                      <div
                        key={account.id}
                        className={`flex items-center justify-between px-4 py-2 bg-muted/40${i < userAccounts.length - 1 ? ' border-b' : ''}`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded ${palette.bg}`}>
                            <AccountIcon className={`h-3 w-3 ${palette.text}`} />
                          </div>
                          <span className="text-xs font-medium">{account.name}</span>
                        </div>
                        {account.accountNumber && (
                          <span className="font-mono text-xs text-muted-foreground">{account.accountNumber}</span>
                        )}
                      </div>
                    )
                  })}
                </>
              )}
            </div>

            {/* Dotted connector */}
            <div className="flex flex-col items-center py-1">
              <div className="w-px h-6 border-l-2 border-dashed border-border" />
            </div>

            {/* Org card */}
            <div className="w-full rounded-lg border bg-card">
              <div className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-muted">
                  <span className="text-sm font-bold">{organization.logo}</span>
                </div>
                <div className="flex flex-1 flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{organization.name}</span>
                    <span className="font-mono text-xs rounded-md border bg-muted px-1.5 py-0.5">Org {organization.orgId}</span>
                  </div>
                  {organization.hasLenderPrograms && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Landmark className="h-3 w-3" />
                      Has Lender Programs
                    </div>
                  )}
                </div>
              </div>
              <div className="border-t" />
              <div className="flex items-center justify-between px-4 py-2 bg-muted/40">
                <span className="text-xs font-medium">Lender Programs</span>
                <span className="font-mono text-xs text-muted-foreground">3</span>
              </div>
            </div>

            {/* Lender Search scope note */}
            <div className="flex flex-col items-start mt-2">
              <p className="text-xs font-semibold text-foreground mb-2">Adding Lenders from Lender Search shows:</p>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>
                  <strong className="text-foreground">Suggested:</strong> Any Lender that we've created as an org with Lender Attributes. They may have never been matched, never been added as a Private Company — but the Org exists with Lender Attributes.
                </li>
                <li>
                  <strong className="text-foreground">My Network:</strong> Any Lender that you've said is a Lender at the Private Company level.
                </li>
              </ul>
              <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-dashed">
                That is the scope of people eligible to see and edit Lender Programs.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export function AppSidebar() {
  const { user, organization, activeAccount, setActiveAccountId } = useActiveUser()
  const { activeTeam, setActiveTeam } = useTeam()

  const userAccounts = getAccountsByUser(user, organization)
  const hasLegacySubscription = activeAccount?.legacySubscription ?? false
  const hasCredits = activeAccount?.creditsFree100 ?? false

  const platformItems = [
    { title: "Deals", url: "/deals", icon: FileText },
    { title: "Network", url: "/network", icon: Network },
    { title: "Market", url: "/market", icon: Globe },
    { title: "Files", url: "/files", icon: Folder },
    {
      title: "Originate",
      url: "/originate",
      icon: Sparkles,
      disabled: !hasCredits,
      tooltip: "Eligible to anyone with an account, which anyone can make. Creating an account instantly grants you 100 credits on a free subscription.",
    },
  ]

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <TeamSwitcher teams={teams} activeTeam={activeTeam} onTeamChange={setActiveTeam} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={platformItems}
          label="Platform"
          linkComponent={Link}
          disabled={!hasLegacySubscription}
          showAccessTooltips={hasLegacySubscription || hasCredits}
        />
        <NavMain items={sharedItems} label="Shared with Me" linkComponent={Link} />
        {organization.hasLenderPrograms && <LenderProgramsNavItem />}
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-col gap-0.5 px-2 pb-1">
          <Link href="#" className="rounded-md px-2 py-1.5 text-xs text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors">
            Trust Center
          </Link>
          <Link href="#" className="rounded-md px-2 py-1.5 text-xs text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors">
            Map Builder
          </Link>
        </div>
        <NavUser
          user={{ name: user.name, email: user.email, avatar: user.avatar }}
          activeAccount={activeAccount}
          availableAccounts={userAccounts.length > 1 ? userAccounts : undefined}
          onAccountChange={setActiveAccountId}
          onSignOut={() => console.log("Sign out")}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
