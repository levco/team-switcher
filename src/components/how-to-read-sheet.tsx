"use client"

import * as React from "react"
import { InfoIcon, ShieldCheck } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export function HowToReadSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm">
          <InfoIcon className="h-4 w-4" />
          How it all works
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md p-0">
        <div className="flex h-full flex-col">
          <SheetHeader className="shrink-0">
            <SheetTitle>How to Read This</SheetTitle>
            <SheetDescription>
              The new access model — no roles, just subscriptions
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-4">
            <div className="flex flex-col gap-6 py-4">

              {/* Platform Features */}
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold">Platform Features Require a Subscription</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Access to Deals, Network, Market, and Files requires an active membership to an Account that has an active subscription. This maps to people who previously had accounts of type <strong className="text-foreground">Broker</strong> or <strong className="text-foreground">Borrower</strong> — we never had Lender or Sponsor-Contact subscriptions.
                </p>
              </div>

              <div className="border-t" />

              {/* Death to roles */}
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold">Role-Based Logic Is Dead</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Once a user is authenticated as having a membership to an Account with a subscription, that's it. All legacy role logic is removed — and with it, a bunch of product complexity.
                </p>
              </div>

              <div className="border-t" />

              {/* CRM Contacts */}
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold">CRM Contacts Can Log In</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Any CRM Contact can log in — just like a Lender Contact always could. But without a membership to an Account with an active subscription, they can't access Platform Features. They land in the same experience as a guest.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We also add new <strong className="text-foreground">Contact & Company Types</strong>. Any <em>Private Company</em> in your network can have a vault shared with them. Any CRM Contact can log in and access what they're entitled to.
                </p>
              </div>

              <div className="border-t" />

              {/* The paywall model */}
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold">The Paywall Model</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Vaults are always accessible.</strong> Platform buttons are paywalled — your account must have an active subscription.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A user with no account membership and a user with a membership to an account that has no active subscription both get the exact same experience: Vaults only, Platform disabled.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Once subscription is confirmed, we still have <strong className="text-foreground">Account-Level Roles</strong> of Broker or Borrower — but that's the only remaining role distinction, and it lives at the deal level, not the nav level.
                </p>
              </div>

              <div className="border-t" />

              {/* Banner */}
              <div className="rounded-lg border border-dashed bg-muted/30 p-4 flex gap-3">
                <ShieldCheck className="h-5 w-5 shrink-0 text-muted-foreground mt-0.5" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">After all of this, role-based logic is dead and everything is dynamic based on a user's subscription.</strong> For now, a subscription grants access to everything. But as we add Credits and give users credit-based subscriptions, the system will neatly recognize their subscription type and make all usage credit-based.
                </p>
              </div>

            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
