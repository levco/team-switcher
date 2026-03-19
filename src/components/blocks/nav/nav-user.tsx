"use client"

import * as React from "react"
import {
  ChevronsUpDown,
  User,
  Settings,
  LogOut,
  type LucideIcon,
} from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { getAccountPalette, type Account } from "@/lib/demo-data"

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

export interface NavUserProps {
  user: {
    name: string
    email: string
    avatar: string | any
    teamIcon?: LucideIcon
  }
  /** Currently active account */
  activeAccount?: Account
  /** All accounts available to the user. Omit or pass undefined to hide account switcher. */
  availableAccounts?: Account[]
  /** Called when user picks an account from the switcher */
  onAccountChange?: (accountId: string) => void
  /** When provided, renders a "Log out" item with a separator. */
  onSignOut?: () => void
}

export function NavUser({
  user,
  activeAccount,
  availableAccounts,
  onAccountChange,
  onSignOut,
}: NavUserProps) {
  const { isMobile } = useSidebar()
  const router = useRouter()
  const initials = getInitials(user.name)

  const activePalette = activeAccount ? getAccountPalette(activeAccount.id) : null

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="relative">
                {user.avatar && typeof user.avatar === 'object' ? (
                  <div className="h-8 w-8 shrink-0 overflow-hidden rounded-lg">
                    <Image src={user.avatar} alt={user.name} width={32} height={32} className="h-full w-full object-cover" />
                  </div>
                ) : (
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
                  </Avatar>
                )}
                {activePalette && (
                  <span className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full ${activePalette.solid} ring-2 ring-sidebar`} />
                )}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {activeAccount?.name ?? user.email}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                {user.avatar && typeof user.avatar === 'object' ? (
                  <div className="h-8 w-8 shrink-0 overflow-hidden rounded-lg">
                    <Image src={user.avatar} alt={user.name} width={32} height={32} className="h-full w-full object-cover" />
                  </div>
                ) : (
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
                  </Avatar>
                )}
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            {availableAccounts && availableAccounts.length > 1 && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {availableAccounts.map((account) => {
                    const palette = getAccountPalette(account.id)
                    const AccountIcon = palette.icon
                    return (
                      <DropdownMenuItem
                        key={account.id}
                        onClick={() => onAccountChange?.(account.id)}
                      >
                        <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${palette.bg}`}>
                          <AccountIcon className={`h-4 w-4 ${palette.text}`} />
                        </div>
                        {account.name}
                        {activeAccount?.id === account.id && <span className="ml-auto">✓</span>}
                      </DropdownMenuItem>
                    )
                  })}
                </DropdownMenuGroup>
              </>
            )}

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/settings')}>
              <User />
              Account
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/settings')}>
              <Settings />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onSignOut}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
