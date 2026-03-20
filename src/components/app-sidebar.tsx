"use client"

import * as React from "react"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "@/components/blocks/nav/nav-main"
import { NavUser } from "@/components/blocks/nav/nav-user"
import { TeamSwitcher, type Team } from "@/components/team-switcher"
import { useTeam } from "@/contexts/team-context"
import { useActiveUser } from "@/contexts/active-user-context"
import {
  Folder,
  Network,
  Globe,
  FileText,
  Plus,
  Vault,
  Landmark,
} from "lucide-react"
import avatar4 from "@/components/avatars/avatar_4.png"
import { getAccountsByUser } from "@/lib/demo-data"

type DemoUser = {
  id: string
  name: string
  email: string
  avatar: any
  roles: string[]
}

export const demoTeamUsers: Record<string, DemoUser[]> = {
  "BWE": [
    {
      id: "graham-gilreath",
      name: "Graham Gilreath",
      email: "graham.gilreath@bwe.com",
      avatar: avatar4,
      roles: [],
    },
  ],
}

export const teams: Team[] = [
  {
    name: "Convoy Capital",
    logo: Landmark,
    plan: "Convoy Capital",
  },
]

export function AppSidebar() {
  const { activeTeam, setActiveTeam } = useTeam()
  const { user, organization, activeAccount, setActiveAccountId } = useActiveUser()

  const userAccounts = getAccountsByUser(user, organization)
  const hasSubscription = activeAccount?.legacySubscription ?? false

  const platformItems = [
    { title: "Deals", url: "/deals", icon: FileText },
    { title: "Network", url: "/network", icon: Network },
    { title: "Market", url: "/market", icon: Globe },
    { title: "Files", url: "/files", icon: Folder },
  ]

  const sharedItems = [
    { title: "Vaults", url: "/vaults", icon: Vault },
  ]

  const currentUser = {
    name: user.name,
    email: user.email,
    avatar: user.avatar,
  }

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <TeamSwitcher teams={teams} activeTeam={activeTeam || teams[0]} onTeamChange={setActiveTeam} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={platformItems} label="Platform" linkComponent={Link} disabled={!hasSubscription} />
        {hasSubscription && <NavMain items={[{ title: "Create Deal", url: "/create-deal", icon: Plus }]} label="Actions" linkComponent={Link} />}
        <NavMain items={sharedItems} label="Shared with Me" linkComponent={Link} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={currentUser}
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
