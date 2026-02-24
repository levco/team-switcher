"use client"

import * as React from "react"
import type { Team } from "@/components/team-switcher"
import { Landmark } from "lucide-react"
import { teams } from "@/components/app-sidebar-simple"

type TeamContextType = {
  activeTeam: Team
  setActiveTeam: (team: Team) => void
}

const TeamContext = React.createContext<TeamContextType | null>(null)

export function TeamProvider({ children }: { children: React.ReactNode }) {
  const [activeTeam, setActiveTeam] = React.useState<Team>(teams[0])

  return (
    <TeamContext.Provider value={{ activeTeam, setActiveTeam }}>
      {children}
    </TeamContext.Provider>
  )
}

export function useTeam() {
  const context = React.useContext(TeamContext)
  if (!context) {
    throw new Error("useTeam must be used within a TeamProvider")
  }
  return context
}
