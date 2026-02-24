"use client"

import * as React from "react"
import { 
  grahamGilreath, 
  grahamGilreath2, 
  frankiePaparella,
  bweOrganization, 
  bweOrganization2, 
  convoyOrganization,
  bweTeamMembers, 
  bweTeamMembers2,
  convoyTeamMembers,
  type User, 
  type Organization 
} from "@/lib/demo-data"
import { useTeam } from "@/contexts/team-context"

type ActiveUserContextType = {
  user: User
  organization: Organization
  teamMembers: User[]
  activeUserId: string
  setActiveUserId: (id: string) => void
}

const ActiveUserContext = React.createContext<ActiveUserContextType | null>(null)

export function ActiveUserProvider({ children }: { children: React.ReactNode }) {
  const { activeTeam } = useTeam()
  
  // Select user, org, and team members based on team name
  let user: User
  let organization: Organization
  let teamMembers: User[]
  
  if (activeTeam?.name === "BWE - Profile Switcher 2") {
    user = grahamGilreath2
    organization = bweOrganization2
    teamMembers = bweTeamMembers2
  } else if (activeTeam?.name === "Convoy Capital") {
    user = frankiePaparella
    organization = convoyOrganization
    teamMembers = convoyTeamMembers
  } else {
    user = grahamGilreath
    organization = bweOrganization
    teamMembers = bweTeamMembers
  }
  
  // Set initial activeUserId based on selected user
  const [activeUserId, setActiveUserId] = React.useState(user.id)
  
  // Update activeUserId when team changes
  React.useEffect(() => {
    setActiveUserId(user.id)
  }, [user.id])

  return (
    <ActiveUserContext.Provider value={{ user, organization, teamMembers, activeUserId, setActiveUserId }}>
      {children}
    </ActiveUserContext.Provider>
  )
}

export function useActiveUser() {
  const context = React.useContext(ActiveUserContext)
  if (!context) {
    throw new Error("useActiveUser must be used within an ActiveUserProvider")
  }
  return context
}
