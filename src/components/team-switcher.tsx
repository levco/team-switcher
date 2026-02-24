"use client"

import * as React from "react"
import { ChevronsUpDown, Command } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useActiveUser } from "@/contexts/active-user-context"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import { demoTeamUsers } from "@/components/app-sidebar-simple"

export type Team = {
  name: string
  logo: React.ElementType
  plan: string
  types?: string[]
  designOption: 1 | 2 | 3
  useCase: 'BWE' | 'Convoy' | 'Leverage'
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

  const users = activeTeam ? demoTeamUsers[activeTeam.name] || [] : []
  const selectedUser = users.find(u => u.id === activeUserId)

  // Group teams by use case
  const groupedTeams = teams.reduce((acc, team) => {
    if (!acc[team.useCase]) {
      acc[team.useCase] = []
    }
    acc[team.useCase].push(team)
    return acc
  }, {} as Record<string, Team[]>)

  const useCaseOrder: Array<'BWE' | 'Convoy' | 'Leverage'> = ['BWE', 'Convoy', 'Leverage']
  const useCaseLabels: Record<'BWE' | 'Convoy' | 'Leverage', string> = {
    BWE: 'BWE',
    Convoy: 'Convoy Capital',
    Leverage: 'Leverage Companies',
  }

  const designOptionLabel = (option: 1 | 2 | 3) => {
    const labels = {
      1: 'D1',
      2: 'D2',
      3: 'D3',
    }
    return labels[option]
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push("/")}
            className="flex flex-1 items-center gap-2 rounded-md px-2 py-1.5 hover:bg-sidebar-accent"
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg border bg-background">
              <span className="text-sm font-semibold">
                {designOptionLabel(activeTeam.designOption)}
              </span>
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{activeTeam.useCase}</span>
              <span className="truncate text-xs text-muted-foreground">
                {activeTeam.plan}
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
            className="w-[--radix-dropdown-menu-trigger-width] min-w-64 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            {useCaseOrder.map((useCaseKey, groupIndex) => {
              const useCaseTeams = groupedTeams[useCaseKey] || []
              if (useCaseTeams.length === 0) return null

              return (
                <div key={useCaseKey}>
                  {groupIndex > 0 && <DropdownMenuSeparator />}
                  <DropdownMenuLabel className="text-xs text-muted-foreground">
                    {useCaseLabels[useCaseKey]}
                  </DropdownMenuLabel>
                  {useCaseTeams.map((team) => {
                    const teamUserList = demoTeamUsers[team.name] || []
                    
                    if (teamUserList.length > 1) {
                      // Team with multiple users - show as submenu
                      return (
                        <DropdownMenuSub key={team.name}>
                          <DropdownMenuSubTrigger className="gap-2 p-2">
                            <div className="flex size-6 items-center justify-center rounded-sm border bg-background">
                              <span className="text-xs font-semibold">
                                {designOptionLabel(team.designOption)}
                              </span>
                            </div>
                            <span className="flex-1">{team.plan}</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuSubContent className="min-w-48">
                            {teamUserList.map((user) => (
                              <DropdownMenuItem
                                key={user.id}
                                onClick={() => {
                                  onTeamChange(team)
                                  setActiveUserId(user.id)
                                }}
                                className="gap-2 p-2"
                              >
                                <div className="h-6 w-6 shrink-0 overflow-hidden rounded-full">
                                  <Image src={user.avatar} alt={user.name} width={24} height={24} className="h-full w-full object-cover" />
                                </div>
                                <div className="flex flex-1 flex-col">
                                  <span className="text-sm">{user.name}</span>
                                  <span className="text-xs text-muted-foreground">{user.roles.join(", ")}</span>
                                </div>
                                {activeUserId === user.id && activeTeam.name === team.name && <span className="ml-auto text-xs">✓</span>}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuSubContent>
                        </DropdownMenuSub>
                      )
                    } else if (teamUserList.length === 1) {
                      // Team with single user - direct selection
                      const user = teamUserList[0]
                      return (
                        <DropdownMenuItem
                          key={team.name}
                          onClick={() => {
                            onTeamChange(team)
                            setActiveUserId(user.id)
                          }}
                          className="gap-2 p-2"
                        >
                          <div className="flex size-6 items-center justify-center rounded-sm border bg-background">
                            <span className="text-xs font-semibold">
                              {designOptionLabel(team.designOption)}
                            </span>
                          </div>
                          <span className="flex-1">{team.plan}</span>
                          {activeTeam.name === team.name && <span className="ml-auto text-xs">✓</span>}
                        </DropdownMenuItem>
                      )
                    }
                    return null
                  })}
                </div>
              )
            })}
          </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
