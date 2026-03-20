"use client"

import * as React from "react"
import {
  SCENARIOS,
  getAccountsByUser,
  type User,
  type Organization,
  type Account,
} from "@/lib/demo-data"
import { useTeam } from "@/contexts/team-context"

type ActiveUserContextType = {
  user: User
  organization: Organization
  teamMembers: User[]
  activeUserId: string
  setActiveUserId: (id: string) => void
  activeAccountId: string
  setActiveAccountId: (id: string) => void
  activeAccount: Account | undefined
  createAccount: (name: string) => Account
}

const ActiveUserContext = React.createContext<ActiveUserContextType | null>(null)

const FALLBACK_SCENARIO = Object.values(SCENARIOS)[0]

export function ActiveUserProvider({ children }: { children: React.ReactNode }) {
  const { activeTeam } = useTeam()

  const scenario = SCENARIOS[activeTeam?.name ?? ''] ?? FALLBACK_SCENARIO
  const { organization, user, teamMembers } = scenario

  const [activeUserId, setActiveUserId] = React.useState(user.id)
  const [activeAccountId, setActiveAccountId] = React.useState(user.accountMemberships[0] ?? "")
  const [createdAccounts, setCreatedAccounts] = React.useState<Account[]>([])

  React.useEffect(() => {
    setActiveUserId(user.id)
    setActiveAccountId(user.accountMemberships[0] ?? "")
    setCreatedAccounts([])
  }, [user.id])

  const effectiveOrganization = React.useMemo<Organization>(() => ({
    ...organization,
    accounts: [...organization.accounts, ...createdAccounts],
  }), [organization, createdAccounts])

  const effectiveUser = React.useMemo<User>(() => ({
    ...user,
    accountMemberships: [...user.accountMemberships, ...createdAccounts.map(a => a.id)],
  }), [user, createdAccounts])

  const userAccounts = getAccountsByUser(effectiveUser, effectiveOrganization)
  const activeAccount = userAccounts.find(a => a.id === activeAccountId) ?? userAccounts[0]

  function createAccount(name: string): Account {
    const newAccount: Account = {
      id: `created-${Date.now()}`,
      name,
      members: 1,
      description: 'Newly created account.',
      location: '',
      about: '',
      legacySubscription: false,
      creditsFree100: true,
    }
    setCreatedAccounts(prev => [...prev, newAccount])
    setActiveAccountId(newAccount.id)
    return newAccount
  }

  return (
    <ActiveUserContext.Provider value={{
      user: effectiveUser,
      organization: effectiveOrganization,
      teamMembers,
      activeUserId,
      setActiveUserId,
      activeAccountId: activeAccount?.id ?? "",
      setActiveAccountId,
      activeAccount,
      createAccount,
    }}>
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
