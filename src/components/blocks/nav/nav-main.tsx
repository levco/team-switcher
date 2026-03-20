"use client"

import * as React from "react"
import { ChevronRight, Zap, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
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
import { Button } from "@/components/ui/button"

const ACTIVE_TOOLTIP = "Available to anyone with a legacy subscription, with zero role logic. Everything is scoped to the account — i.e. that account's Deals, Network, Files. Specifying your role on a Deal is at the Deal level."
const DISABLED_TOOLTIP = "Blocked by Paywall — requires membership to an account with a legacy subscription (legacy_subscription: true)."

export interface NavMainProps {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    roles?: string[]
    tooltip?: string
    /** Per-item disabled override. When set, takes precedence over the group-level disabled prop. */
    disabled?: boolean
    items?: { title: string; url: string; isActive?: boolean }[]
  }[]
  /** Optional group label rendered above the nav items */
  label?: string
  /** Optional actions rendered at the top of the group (e.g. a "Quick Create" button) */
  actions?: React.ReactNode
  /** Link component to use for navigation. Defaults to "a". Pass next/link's Link for client-side routing. */
  linkComponent?: React.ElementType
  /** When true, all items render as disabled (no subscription) */
  disabled?: boolean
  /** When true, show active/disabled tooltips on each item */
  showAccessTooltips?: boolean
}

export function NavMain({
  items,
  label,
  actions,
  linkComponent: LinkComponent = "a",
  disabled = false,
  showAccessTooltips = false,
}: NavMainProps) {
  const [upgradeOpen, setUpgradeOpen] = React.useState(false)

  if (items.length === 0 && !actions) {
    return null
  }

  return (
    <>
      <SidebarGroup>
        {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
        <SidebarGroupContent className="flex flex-col gap-2">
          {actions && (
            <SidebarMenu>
              <SidebarMenuItem className="flex items-center gap-2">
                {actions}
              </SidebarMenuItem>
            </SidebarMenu>
          )}
          <SidebarMenu>
            {items.map((item) => {
              const itemDisabled = item.disabled !== undefined ? item.disabled : disabled
              return item.items?.length ? (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild isActive={subItem.isActive}>
                              <LinkComponent href={subItem.url}>
                                <span>{subItem.title}</span>
                              </LinkComponent>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : itemDisabled ? (
                // Disabled: tooltip + click opens upgrade dialog
                <SidebarMenuItem key={item.title}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton
                        asChild
                        className="opacity-50 cursor-pointer"
                      >
                        <div onClick={() => setUpgradeOpen(true)}>
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                        </div>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs">
                      {item.tooltip ?? DISABLED_TOOLTIP}
                    </TooltipContent>
                  </Tooltip>
                </SidebarMenuItem>
              ) : showAccessTooltips ? (
                // Active with tooltip
                <SidebarMenuItem key={item.title}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton asChild isActive={item.isActive}>
                        <LinkComponent href={item.url}>
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                        </LinkComponent>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs">
                      {item.tooltip ?? ACTIVE_TOOLTIP}
                    </TooltipContent>
                  </Tooltip>
                </SidebarMenuItem>
              ) : item.tooltip ? (
                // Active with item-level tooltip (always shown, no showAccessTooltips required)
                <SidebarMenuItem key={item.title}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton asChild isActive={item.isActive}>
                        <LinkComponent href={item.url}>
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                        </LinkComponent>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs">
                      {item.tooltip}
                    </TooltipContent>
                  </Tooltip>
                </SidebarMenuItem>
              ) : (
                // Active, no tooltip
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.isActive}>
                    <LinkComponent href={item.url}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </LinkComponent>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <Dialog open={upgradeOpen} onOpenChange={setUpgradeOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/10">
                <Zap className="h-4 w-4 text-amber-500" />
              </div>
              <DialogTitle>Upgrade to Lev Pro</DialogTitle>
            </div>
            <DialogDescription>
              This feature requires a legacy subscription. Upgrade to unlock Deals, Network, Market, Files, and more.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2 pt-2">
            <Button className="w-full" onClick={() => setUpgradeOpen(false)}>
              <Zap className="h-4 w-4 mr-2" />
              Upgrade Now
            </Button>
            <Button variant="ghost" className="w-full" onClick={() => setUpgradeOpen(false)}>
              Maybe later
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
