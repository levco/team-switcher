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
import { useMode, type UserMode } from "@/contexts/mode-context"
import {
  Folder,
  Network,
  Globe,
  FileText,
  GalleryVerticalEnd,
  Plus,
  Vault,
  Landmark,
} from "lucide-react"
import avatar4 from "@/components/avatars/avatar_4.png"

const actionItems = [
  {
    title: "Create Deal",
    url: "/create-deal",
    icon: Plus,
  },
]

const navItems = [
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

export const teams: Team[] = [
  {
    name: "BWE - Profile Switcher",
    logo: Landmark,
    plan: "Demo",
    types: ["Broker", "Lender"],
    designOption: 1,
    useCase: 'BWE',
  },
  {
    name: "BWE - Profile Switcher 2",
    logo: Landmark,
    plan: "Demo 2",
    types: ["Broker", "Lender"],
    designOption: 1,
    useCase: 'BWE',
  },
]

// Team-specific user data
const teamUsers = {
  "BWE - Profile Switcher": {
    name: "Graham Gilreath",
    email: "graham.gilreath@bwe.com",
    avatar: "",
    teamIcon: Landmark,
  },
  "BWE - Profile Switcher 2": {
    name: "Graham Gilreath",
    email: "graham.gilreath@bwe.com",
    avatar: "",
    teamIcon: Landmark,
  },
}

type DemoUser = {
  id: string
  name: string
  email: string
  avatar: any
  roles: string[]
}

const demoTeamUsers: Record<string, DemoUser[]> = {
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
      id: "graham-gilreath",
      name: "Graham Gilreath",
      email: "graham.gilreath@bwe.com",
      avatar: avatar4,
      roles: ["Broker", "Lender"],
    },
  ],
}

export { teams, demoTeamUsers }

const modeConfig: Record<UserMode, { label: string }> = {
  broker: { label: "Broker" },
  lender: { label: "Lender" },
  borrower: { label: "Borrower" },
}

export function AppSidebar() {
  const { activeTeam, setActiveTeam } = useTeam()
  const { activeUserId } = useActiveUser()
  const { mode, setMode } = useMode()
  
  // Get the selected demo user based on activeUserId
  const allUsers = activeTeam ? demoTeamUsers[activeTeam.name] || [] : []
  const selectedDemoUser = allUsers.find(u => u.id === activeUserId)
  
  // Footer user - use selected demo user if available, otherwise default team user
  const currentUser = selectedDemoUser 
    ? { 
        name: selectedDemoUser.name, 
        email: selectedDemoUser.email,
        avatar: selectedDemoUser.avatar,
        teamIcon: activeTeam?.logo || GalleryVerticalEnd
      }
    : (activeTeam ? (teamUsers[activeTeam.name as keyof typeof teamUsers] || teamUsers["BWE - Profile Switcher"]) : teamUsers["BWE - Profile Switcher"])

  // Get navigation items based on mode (all teams use designOption 1)
  const modeMap: Record<UserMode, string> = {
    broker: 'Broker',
    lender: 'Lender',
    borrower: 'Broker',
  }
  const activeRole = modeMap[mode]
  
  let platformItems = navItems
  let actions = actionItems
  let shared = sharedItems

  // BWE teams filter by mode
  if (activeRole === 'Broker') {
    platformItems = [
      { title: "Deals", url: "/deals", icon: FileText, roles: ["Broker"], tooltip: "Shows deals from BWE Brokerage account only" },
      { title: "Network", url: "/network", icon: Network, roles: ["Broker"], tooltip: "Shows network contacts from BWE Brokerage account only" },
      { title: "Market", url: "/market", icon: Globe, roles: ["Broker"], tooltip: "Shows market data from BWE Brokerage account only" },
      { title: "Files", url: "/files", icon: Folder, roles: ["Broker"], tooltip: "Shows files from BWE Brokerage account only" },
    ]
    actions = [
      { title: "Create Deal", url: "/create-deal", icon: Plus, roles: ["Broker"], tooltip: "Creates deal under BWE Brokerage account" },
    ]
    shared = [
      { title: "Vaults", url: "/vaults", icon: Vault, roles: ["Broker"], tooltip: "Shows vaults shared with BWE Brokerage account only" },
    ]
  } else {
    // Lender mode - NO Network for lenders, but has Lending Profile
    platformItems = []
    actions = []
    shared = [
      { title: "Vaults", url: "/vaults", icon: Vault, roles: ["Lender"], tooltip: "Shows vaults shared with BWE Lending account only" },
      { title: "Lending Profile", url: "/lending-profile", icon: Landmark, roles: ["Lender"], tooltip: "Lending profile and settings" },
    ]
  }

  // All BWE teams have broker and lender modes
  const getAvailableModes = (): UserMode[] => {
    return ['broker', 'lender']
  }

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <TeamSwitcher teams={teams} activeTeam={activeTeam || teams[0]} onTeamChange={setActiveTeam} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={platformItems} label="Platform" linkComponent={Link} />
        {actions.length > 0 && <NavMain items={actions} label="Actions" linkComponent={Link} />}
        <NavMain items={shared} label="Shared with Me" linkComponent={Link} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser 
          user={currentUser}
          subhead={modeConfig[mode].label}
          profileSwitcher={{
            availableProfiles: getAvailableModes(),
            activeProfile: mode,
            onProfileChange: setMode,
          }}
          onSignOut={() => console.log("Sign out")}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
