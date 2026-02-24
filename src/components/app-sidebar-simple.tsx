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
import { useActiveUser } from "@/contexts/active-user-context"
import { useActiveRole } from "@/contexts/mode-context"
import { useTeam } from "@/contexts/team-context"
import {
  Folder,
  Network,
  Globe,
  FileText,
  Plus,
  Vault,
  Landmark,
  Building2,
} from "lucide-react"
import { getAccountsByUser, type AccountType } from "@/lib/demo-data"
import avatar1 from "@/components/avatars/avatar_1.png"
import avatar2 from "@/components/avatars/avatar_2.png"
import avatar4 from "@/components/avatars/avatar_4.png"

type DemoUser = {
  id: string
  name: string
  email: string
  avatar: any
  roles: string[]
}

export const demoTeamUsers: Record<string, DemoUser[]> = {
  "BWE - Profile Switcher": [
    {
      id: "graham-gilreath",
      name: "Graham Gilreath",
      email: "graham.gilreath@bwe.com",
      avatar: avatar4,
      roles: ["Broker", "Lender"],
    },
  ],
  "BWE - Profile Switcher 2": [
    {
      id: "graham-gilreath-2",
      name: "Graham Gilreath",
      email: "graham.gilreath@bwe.com",
      avatar: avatar4,
      roles: ["Broker", "Lender"],
    },
  ],
  "Convoy Capital": [
    {
      id: "frankie-paparella",
      name: "Frankie Paparella",
      email: "frankie@convoy-cap.com",
      avatar: avatar1,
      roles: ["Broker"],
    },
    {
      id: "michael-bucaro",
      name: "Michael Bucaro",
      email: "mtbucaro@convoy-cap.com",
      avatar: avatar2,
      roles: ["Broker"],
    },
  ],
}

const actionItems = [
  {
    title: "Create Deal",
    url: "/create-deal",
    icon: Plus,
  },
]

const brokerNavItems = [
  {
    title: "Deals",
    url: "/deals",
    icon: FileText,
  },
  {
    title: "Network",
    url: "/network",
    icon: Network,
  },
  {
    title: "Market",
    url: "/market",
    icon: Globe,
  },
  {
    title: "Files",
    url: "/files",
    icon: Folder,
  },
]

const sharedItems = [
  {
    title: "Vaults",
    url: "/vaults",
    icon: Vault,
  },
]

// Simple team data for the team switcher
export const teams: Team[] = [
  {
    name: "BWE - Profile Switcher",
    logo: Landmark,
    plan: "BWE - Multiple Accounts",
    types: ["Broker", "Lender"],
    designOption: 1,
    useCase: 'BWE',
  },
  {
    name: "BWE - Profile Switcher 2",
    logo: Landmark,
    plan: "BWE - One Account",
    types: ["Broker", "Lender"],
    designOption: 1,
    useCase: 'BWE',
  },
  {
    name: "Convoy Capital",
    logo: Building2,
    plan: "Convoy - Multi-Team",
    types: ["Broker"],
    designOption: 1,
    useCase: 'Convoy',
  },
]

export function AppSidebar() {
  const { user, organization } = useActiveUser()
  const { activeRole, setActiveRole } = useActiveRole()
  const { activeTeam, setActiveTeam } = useTeam()
  
  // Get user's accounts
  const userAccounts = getAccountsByUser(user, organization)
  
  // Extract available roles from accounts (handling both single and array types)
  const availableRoles: AccountType[] = Array.from(
    new Set(
      userAccounts.flatMap(acc => 
        Array.isArray(acc.type) ? acc.type : [acc.type]
      )
    )
  )
  
  // Navigation items based on active role
  const platformItems = activeRole === 'broker' ? brokerNavItems : []
  const actions = activeRole === 'broker' ? actionItems : []
  
  // Shared items - Lending Profile only for lenders
  const sharedItemsForRole = activeRole === 'lender' 
    ? [
        ...sharedItems,
        {
          title: "Lending Profile",
          url: "/lending-profile",
          icon: Landmark,
        },
      ]
    : sharedItems

  // User data for footer
  const currentUser = {
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    teamIcon: Landmark,
  }

  const roleLabels: Record<AccountType, string> = {
    broker: 'Broker',
    lender: 'Lender',
  }

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <TeamSwitcher teams={teams} activeTeam={activeTeam} onTeamChange={setActiveTeam} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={platformItems} label="Platform" linkComponent={Link} />
        {actions.length > 0 && <NavMain items={actions} label="Actions" linkComponent={Link} />}
        <NavMain items={sharedItemsForRole} label="Shared with Me" linkComponent={Link} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser 
          user={currentUser}
          subhead={availableRoles.length > 1 ? roleLabels[activeRole] : undefined}
          profileSwitcher={availableRoles.length > 1 ? {
            availableProfiles: availableRoles,
            activeProfile: activeRole,
            onProfileChange: setActiveRole,
          } : undefined}
          onSignOut={() => console.log("Sign out")}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
