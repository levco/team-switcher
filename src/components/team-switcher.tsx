"use client"

import * as React from "react"
import { ChevronsUpDown } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useActiveUser } from "@/contexts/active-user-context"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import { demoTeamUsers } from "@/components/app-sidebar-simple"
import { SCENARIOS } from "@/lib/demo-data"

export type Team = {
  name: string
  logo: React.ElementType
  plan: string
}

export function TeamSwitcher({
  teams,
  activeTeam,
  onTeamChange,
}: {
  teams: Team[]
  activeTeam: Team
  onTeamChange: (team: Team) => void
}) {
  const { isMobile } = useSidebar()
  const router = useRouter()
  const { activeUserId, setActiveUserId } = useActiveUser()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push("/")}
            className="flex flex-1 items-center gap-2 rounded-md px-2 py-1.5 hover:bg-sidebar-accent"
          >
            <div className="flex aspect-square size-8 shrink-0 overflow-hidden rounded-lg border bg-background">
              {activeTeam && demoTeamUsers[activeTeam.name]?.[0]?.avatar ? (
                <Image
                  src={demoTeamUsers[activeTeam.name][0].avatar}
                  alt={demoTeamUsers[activeTeam.name][0].name}
                  width={32}
                  height={32}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="m-auto text-sm font-bold">{activeTeam.name.charAt(0)}</span>
              )}
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">
                {demoTeamUsers[activeTeam.name]?.[0]?.name ?? activeTeam.name}
              </span>
              <span className="truncate text-xs text-muted-foreground">
                {demoTeamUsers[activeTeam.name]?.[0]?.email ?? ''}
              </span>
            </div>
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-sidebar-accent">
                <ChevronsUpDown className="size-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              {teams.map((team) => {
                const teamUserList = demoTeamUsers[team.name] || []
                const singleUser = teamUserList[0]
                const orgName = SCENARIOS[team.name]?.organization.name
                const orgLabel = !orgName || orgName === '—' ? 'Guest' : orgName
                return (
                  <DropdownMenuItem
                    key={team.name}
                    onClick={() => {
                      onTeamChange(team)
                      if (singleUser) setActiveUserId(singleUser.id)
                    }}
                    className="gap-2 p-2"
                  >
                    <div className="h-6 w-6 shrink-0 overflow-hidden rounded-full">
                      {singleUser?.avatar ? (
                        <Image src={singleUser.avatar} alt={singleUser.name} width={24} height={24} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-muted text-xs font-semibold">
                          {team.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col">
                      <span className="text-sm font-medium">{singleUser?.name ?? team.name}</span>
                      <span className="text-xs text-muted-foreground">{orgLabel}</span>
                    </div>
                    {activeTeam.name === team.name && <span className="ml-auto text-xs">✓</span>}
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
