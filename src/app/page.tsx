"use client"

import { useTeam } from "@/contexts/team-context"
import { useActiveUser } from "@/contexts/active-user-context"
import Image from "next/image"
import { Building2, Landmark, GalleryVerticalEnd, AudioWaveform, Command, Briefcase } from "lucide-react"
import { getAccountIcon, getAccountColor } from "@/lib/demo-data"
import avatar1 from "@/components/avatars/avatar_1.png"
import avatar2 from "@/components/avatars/avatar_2.png"
import avatar3 from "@/components/avatars/avatar_3.png"
import avatar4 from "@/components/avatars/avatar_4.png"
import avatar5 from "@/components/avatars/avatar_5.png"

export default function DashboardPage() {
  const { activeTeam } = useTeam()

  const useCase = activeTeam?.useCase || 'BWE'
  const designOption = activeTeam?.designOption || 1

  // Map use case + design option to component
  const getUseCaseComponent = () => {
    const key = `${useCase}-${designOption}`
    const components: Record<string, () => JSX.Element> = {
      'BWE-1': BWEDesignOption1,
      'BWE-2': BWEDesignOption2,
      'BWE-3': BWEDesignOption3,
      'Convoy-1': ConvoyDesignOption1,
      'Convoy-2': ConvoyDesignOption2,
      'Convoy-3': ConvoyDesignOption3,
      'Leverage-1': LeverageDesignOption1,
      'Leverage-2': LeverageDesignOption2,
      'Leverage-3': LeverageDesignOption3,
    }
    return components[key] || BWEDesignOption2
  }

  const UseCaseComponent = getUseCaseComponent()

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <UseCaseComponent />
    </div>
  )
}

// Myers Capital Use Case - Scenario 1: Hybrid Lending Model
function MyersCapitalUseCase() {
  return (
    <>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Organization</span>
          <h1 className="text-2xl font-semibold">Myers Capital</h1>
          <p className="text-muted-foreground">
            Direct lender that also brokers deals outside their lending criteria
          </p>
        </div>
        <div className="flex gap-2">
          <span className="inline-flex h-6 items-center gap-1.5 rounded-full border px-3 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3880E8]" />
            Lender
          </span>
          <span className="inline-flex h-6 items-center gap-1.5 rounded-full border px-3 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3E9B70]" />
            Broker
          </span>
        </div>
      </div>

      {/* Accounts */}
      <div>
        <span className="mb-4 block font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Accounts</span>
        <div className="grid gap-3 md:grid-cols-2">
          {/* Myers Capital Lending Account */}
          <div className="rounded-lg border bg-card">
            <div className="flex items-center gap-3 p-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Landmark className="h-4 w-4" />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">Myers Capital Lending</span>
                  <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#3880E8]" />
                    Lender
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  Direct lending operations for deals within Myers Capital's lending criteria.
                </span>
              </div>
            </div>
          </div>

          {/* Myers Capital Brokerage Account */}
          <div className="rounded-lg border bg-card">
            <div className="flex items-center gap-3 p-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Briefcase className="h-4 w-4" />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">Myers Capital Brokerage</span>
                  <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#3E9B70]" />
                    Broker
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  Brokerage operations for deals outside direct lending parameters, placed with external partners.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Users */}
      <div>
        <span className="mb-4 block font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Users</span>
        <div className="grid gap-3 md:grid-cols-2">
          {/* Reed Myers */}
          <div className="rounded-lg border bg-card">
            <div className="flex items-center gap-3 p-2">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <Image src={avatar2} alt="Reed Myers" width={40} height={40} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <span className="text-sm font-semibold">Reed Myers</span>
                <span className="text-xs text-muted-foreground">reed@myerscapital.com</span>
              </div>
            </div>
            <div className="border-t" />
            <div className="bg-background p-2">
              <p className="text-xs leading-relaxed text-muted-foreground">
                Evaluates incoming loan requests and directly underwrites deals that align with Myers Capital's lending criteria and portfolio strategy.
              </p>
            </div>
            <div className="border-t" />
            <div className="flex items-center justify-between bg-muted/50 px-2 py-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-normal text-muted-foreground">User Profile</span>
                <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3880E8]" />
                  Lender
                </span>
              </div>
              <span className="text-xs text-muted-foreground">Myers Capital Lending</span>
            </div>
          </div>

          {/* Maryann Salt */}
          <div className="rounded-lg border bg-card">
            <div className="flex items-center gap-3 p-2">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <Image src={avatar1} alt="Maryann Salt" width={40} height={40} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <span className="text-sm font-semibold">Maryann Salt</span>
                <span className="text-xs text-muted-foreground">msalt@myerscapital.com</span>
              </div>
            </div>
            <div className="border-t" />
            <div className="bg-background p-2">
              <p className="text-xs leading-relaxed text-muted-foreground">
                Takes deals that Reed cannot lend on and brokers them to external lending partners, ensuring clients still receive financing solutions.
              </p>
            </div>
            <div className="border-t" />
            <div className="flex items-center justify-between bg-muted/50 px-2 py-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-normal text-muted-foreground">User Profile</span>
                <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3E9B70]" />
                  Broker
                </span>
              </div>
              <span className="text-xs text-muted-foreground">Myers Capital Brokerage</span>
            </div>
          </div>
        </div>
      </div>

      {/* The Workflow */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">The Workflow</h2>
        <div className="space-y-3 text-sm leading-relaxed">
          <p>
            Myers Capital operates as a direct lender specializing in Hawaii real estate financing. Reed evaluates incoming loan requests and directly underwrites deals that align with the company's lending criteria and portfolio strategy.
          </p>
          <p>
            When Reed identifies opportunities that fall outside Myers Capital's direct lending parameters—whether due to loan size, property type, or risk profile—these deals are seamlessly transitioned to Maryann Salt, the firm's senior broker.
          </p>
          <p>
            Maryann leverages the platform to broker these referral deals to external lending partners, ensuring clients receive financing solutions even when Myers Capital cannot directly service the loan.
          </p>
        </div>
      </div>

      {/* Why This Matters */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">Why This Matters</h2>
        <div className="space-y-3 text-sm leading-relaxed">
          <p>
            This dual-capability model maximizes deal flow conversion while maintaining Myers Capital's underwriting standards. Both Reed and Maryann operate under a single Myers Capital organization account, but each needs access to different features based on their role.
          </p>
          <p>
            Reed needs deal pipeline management and underwriting tools, while Maryann requires outreach campaign features and placement tracking. The platform must support both workflows within the same organization without requiring separate accounts or complex role switching.
          </p>
        </div>
      </div>

    </>
  )
}

// Heritage Bank Use Case
function HeritageBankUseCase() {
  return (
    <>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Organization</span>
          <h1 className="text-2xl font-semibold">Heritage Bank NA</h1>
          <p className="text-muted-foreground">
            Bank that both lends and brokers - user only acts as broker
          </p>
        </div>
        <div className="flex gap-2">
          <span className="inline-flex h-6 items-center gap-1.5 rounded-full border px-3 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3880E8]" />
            Lender
          </span>
          <span className="inline-flex h-6 items-center gap-1.5 rounded-full border px-3 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3E9B70]" />
            Broker
          </span>
        </div>
      </div>

      {/* Users */}
      <div>
        <span className="mb-4 block font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Users</span>
        <div className="grid gap-3 md:grid-cols-2">
          {/* Paul Konsor */}
          <div className="rounded-lg border bg-card">
            <div className="flex items-center gap-3 p-2">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <Image src={avatar3} alt="Paul Konsor" width={40} height={40} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <span className="text-sm font-semibold">Paul Konsor</span>
                <span className="text-xs text-muted-foreground">pkonsor@heritagebankna.com</span>
              </div>
            </div>
            <div className="border-t" />
            <div className="bg-background p-2">
              <p className="text-xs leading-relaxed text-muted-foreground">
                Hired by Heritage Bank to broker commercial real estate deals for clients who bank with them, generating revenue from deals the bank cannot directly service.
              </p>
            </div>
            <div className="border-t" />
            <div className="flex items-center justify-between bg-muted/50 px-2 py-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-normal text-muted-foreground">User Profile</span>
                <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3E9B70]" />
                  Broker
                </span>
              </div>
              <span className="text-xs text-muted-foreground">Heritage Bank Brokerage</span>
            </div>
          </div>
        </div>
      </div>

      {/* The Workflow */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">The Workflow</h2>
        <div className="space-y-3 text-sm leading-relaxed">
          <p>
            Heritage Bank NA operates as a traditional bank that originates loans directly. However, they recognized an opportunity to generate additional revenue from commercial real estate clients who need financing the bank cannot provide.
          </p>
          <p>
            Paul Konsor was hired specifically to act as a broker for these deals. When Heritage Bank clients need CRE financing that falls outside the bank's lending parameters, Paul steps in to broker those deals to external lenders using the platform.
          </p>
          <p>
            While Heritage Bank as an organization has both lending and brokerage capabilities, Paul's role is exclusively focused on the brokerage side. He only needs access to broker-specific features like outreach campaigns and placement tracking.
          </p>
        </div>
      </div>

      {/* Why This Matters */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">Why This Matters</h2>
        <div className="space-y-3 text-sm leading-relaxed">
          <p>
            This scenario demonstrates a company that operates in both capacities (lender and broker), but individual users may only need access to one side of the platform. Paul doesn't need to see incoming placements or lending pipeline features—he only needs the broker toolkit.
          </p>
          <p>
            However, Heritage Bank theoretically has other users who might need visibility into both sides. The platform must support flexible role assignments where some users access only broker features, some only lender features, and potentially some users access both, all within the same organization.
          </p>
        </div>
      </div>

    </>
  )
}

// Leverage Companies Use Case
function LeverageCompaniesUseCase() {
  return (
    <>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Organization</span>
          <h1 className="text-2xl font-semibold">Leverage Companies / Brick City Capital</h1>
          <p className="text-muted-foreground">
            Two companies, same ownership and team - residential DSCR lenders
          </p>
        </div>
        <div className="flex gap-2">
          <span className="inline-flex h-6 items-center gap-1.5 rounded-full border px-3 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3880E8]" />
            Lender
          </span>
        </div>
      </div>

      {/* Users */}
      <div>
        <span className="mb-4 block font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Users</span>
        <div className="grid gap-3 md:grid-cols-2">
          {/* JP Helan */}
          <div className="rounded-lg border bg-card">
            <div className="flex items-center gap-3 p-2">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <Image src={avatar4} alt="JP Helan" width={40} height={40} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <span className="text-sm font-semibold">JP Helan</span>
                <span className="text-xs text-muted-foreground">jphelan@brkcty.com</span>
              </div>
            </div>
            <div className="border-t" />
            <div className="bg-background p-2">
              <p className="text-xs leading-relaxed text-muted-foreground">
                Lender at Brick City Capital specializing in residential DSCR loans. Part of the shared team across both companies.
              </p>
            </div>
            <div className="border-t" />
            <div className="flex items-center justify-between bg-muted/50 px-2 py-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-normal text-muted-foreground">User Profile</span>
                <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3880E8]" />
                  Lender
                </span>
              </div>
              <span className="text-xs text-muted-foreground">Brick City Capital</span>
            </div>
          </div>

          {/* Ian */}
          <div className="rounded-lg border bg-card">
            <div className="flex items-center gap-3 p-2">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <Image src={avatar5} alt="Ian Rodriguez" width={40} height={40} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <span className="text-sm font-semibold">Ian Rodriguez</span>
                <span className="text-xs text-muted-foreground">ian@leveragecompanies.com</span>
              </div>
            </div>
            <div className="border-t" />
            <div className="bg-background p-2">
              <p className="text-xs leading-relaxed text-muted-foreground">
                Lender at Leverage Companies specializing in residential DSCR loans. Part of the shared team across both companies.
              </p>
            </div>
            <div className="border-t" />
            <div className="flex items-center justify-between bg-muted/50 px-2 py-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-normal text-muted-foreground">User Profile</span>
                <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3880E8]" />
                  Lender
                </span>
              </div>
              <span className="text-xs text-muted-foreground">Leverage Companies</span>
            </div>
          </div>
        </div>
      </div>

      {/* The Workflow */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">The Workflow</h2>
        <div className="space-y-3 text-sm leading-relaxed">
          <p>
            Leverage Companies owns Brick City Capital, and while they are technically two separate legal entities, they operate as a single unified team. Both companies specialize in residential DSCR (Debt Service Coverage Ratio) loans and share the same team page on their respective websites.
          </p>
          <p>
            JP and Ian work across both organizations seamlessly. They evaluate incoming loan requests, underwrite DSCR deals, and manage a shared pipeline. From an operational standpoint, the distinction between which company brand is used depends on the specific deal or client relationship, not on separate teams or workflows.
          </p>
          <p>
            The companies evaluated using Lev to broker deals they couldn't lend on directly, but ultimately determined that the volume of deals requiring brokerage didn't justify the expense at this time. For now, they operate purely as lenders across both entities.
          </p>
        </div>
      </div>

      {/* Why This Matters */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">Why This Matters</h2>
        <div className="space-y-3 text-sm leading-relaxed">
          <p>
            This scenario highlights the complexity of multi-organization structures where separate legal entities share the same team, branding, and operational workflows. The platform needs to accommodate users who work across multiple organizations under common ownership without forcing them to maintain completely separate accounts or switch contexts constantly.
          </p>
          <p>
            While Ken Kaplan's scenario (from the earlier discussion) involved different businesses with distinct teams and branding, Leverage Companies represents a different pattern: unified operations across multiple corporate entities. The technical challenge is determining whether these should be treated as one organization with multiple DBA names, or separate organizations with shared team access.
          </p>
        </div>
      </div>

    </>
  )
}

// Northmarq Use Case
function NorthmarqUseCase() {
  return (
    <>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Organization</span>
          <h1 className="text-2xl font-semibold">Northmarq</h1>
        </div>
        <div className="flex gap-2">
          <span className="inline-flex h-6 items-center gap-1.5 rounded-full border px-3 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3E9B70]" />
            Broker
          </span>
          <span className="inline-flex h-6 items-center gap-1.5 rounded-full border px-3 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3880E8]" />
            Lender
          </span>
        </div>
      </div>

      {/* Accounts */}
      <div>
        <span className="mb-4 block font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Accounts</span>
        <div className="grid gap-3 md:grid-cols-2">
          {/* Northmarq Brokerage Account */}
          <div className="rounded-lg border bg-card">
            <div className="flex items-center gap-3 p-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Briefcase className="h-4 w-4" />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">Northmarq Brokerage</span>
                  <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#3E9B70]" />
                    Broker
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  Primary brokerage account for running outreach campaigns and managing placements to external lenders.
                </span>
              </div>
            </div>
          </div>

          {/* Northmarq Lending Account */}
          <div className="rounded-lg border bg-card">
            <div className="flex items-center gap-3 p-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Landmark className="h-4 w-4" />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">Northmarq Lending</span>
                  <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#3880E8]" />
                    Lender
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  Receives inbound placements from other brokers when Northmarq provides direct financing for deals.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Users */}
      <div>
        <span className="mb-4 block font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Users</span>
        <div className="grid gap-3 md:grid-cols-2">
          {/* David Henney */}
          <div className="rounded-lg border bg-card">
            <div className="flex items-center gap-3 p-2">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <Image src={avatar3} alt="David Henney" width={40} height={40} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <span className="text-sm font-semibold">David Henney</span>
                <span className="text-xs text-muted-foreground">dhenney@northmarq.com</span>
              </div>
            </div>
            <div className="border-t" />
            <div className="bg-background p-2">
              <p className="text-xs leading-relaxed text-muted-foreground">
                User across both accounts. Acts as broker on brokerage deals and as lender contact when Northmarq provides direct financing.
              </p>
            </div>
            <div className="border-t" />
            <div className="flex items-center justify-between bg-muted/50 px-2 py-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-normal text-muted-foreground">User Profile</span>
                <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3E9B70]" />
                  Broker
                </span>
              </div>
              <span className="text-xs text-muted-foreground">Northmarq Brokerage</span>
            </div>
            <div className="border-t" />
            <div className="flex items-center justify-between bg-muted/50 px-2 py-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-normal text-muted-foreground">User Profile</span>
                <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3880E8]" />
                  Lender
                </span>
              </div>
              <span className="text-xs text-muted-foreground">Northmarq Lending</span>
            </div>
          </div>
        </div>
      </div>

      {/* The Use Case */}
      <div>
        <span className="mb-4 block font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">The Use Case</span>
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium">Broker who also acts as lender contact - dual role within one organization</h3>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              Northmarq is already a paying customer as a Broker with a Broker Account that David belongs to. Because they also do lending, they have a lending profile as part of the Northmarq organization. David wants to be listed as the primary contact where he receives inquiries from other brokers and borrowers reaching out to Northmarq's lending division.
            </p>
            <p>
              To handle this, we create a 2nd account for Northmarq's Lending division, and David belongs to both accounts. This allows David to work on brokered deals—running outreach campaigns and managing placements to external lenders—while also receiving and evaluating inbound placements when other brokers send deals to Northmarq for direct financing.
            </p>
            <p>
              This scenario demonstrates the need for flexible role assignment at the individual user level. David operates in both capacities within the same organization. When brokering, he needs outreach tools and placement tracking. When acting as a lender contact, he needs to see incoming placements and respond to deal submissions. The platform must support this dual-role workflow without requiring him to manually switch modes or maintain completely separate organizational boundaries.
            </p>
          </div>
        </div>
      </div>

    </>
  )
}

// ============================================================================
// DESIGN OPTION 1: PROFILE SWITCHER
// ============================================================================

// BWE Design Option 1 - Profile Switcher
function BWEDesignOption1() {
  const { organization } = useActiveUser()
  
  return (
    <>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Organization</span>
          <h1 className="text-2xl font-semibold">{organization.name}</h1>
        </div>
        <div className="flex gap-2">
          <span className="inline-flex h-6 items-center gap-1.5 rounded-full border px-3 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3E9B70]" />
            Broker
          </span>
          <span className="inline-flex h-6 items-center gap-1.5 rounded-full border px-3 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3880E8]" />
            Lender
          </span>
        </div>
      </div>

      {/* Accounts */}
      <div>
        <span className="mb-4 block font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Accounts</span>
        <div className="grid gap-3 md:grid-cols-2">
          {organization.accounts.map((account) => {
            const AccountIcon = getAccountIcon(account.type)
            const accountColor = getAccountColor(account.type)
            const types = Array.isArray(account.type) ? account.type : [account.type]
            
            return (
              <div key={account.id} className="rounded-lg border bg-card">
                <div className="flex items-center gap-3 p-2">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${accountColor}/20`}>
                    <AccountIcon className={`h-4 w-4 ${accountColor.replace('bg-', 'text-')}`} />
                  </div>
                  <div className="flex flex-1 flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">{account.name}</span>
                      {account.accountNumber && (
                        <span className="font-mono text-xs rounded-md border bg-muted px-1.5 py-0.5">
                          {account.accountNumber}
                        </span>
                      )}
                      {types.map((type) => (
                        <span key={type} className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                          <span className={`h-1.5 w-1.5 rounded-full ${type === 'broker' ? 'bg-[#3E9B70]' : 'bg-[#3880E8]'}`} />
                          {type === 'broker' ? 'Broker' : 'Lender'}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {account.description}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Users */}
      <div>
        <span className="mb-4 block font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Users</span>
        <div className="grid gap-3 md:grid-cols-2">
          {/* Graham Gilreath */}
          <div className="rounded-lg border bg-card">
            <div className="flex items-center gap-3 p-2">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <Image src={avatar4} alt="Graham Gilreath" width={40} height={40} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">Graham Gilreath</span>
                  <span className="font-mono text-xs rounded-md border bg-muted px-1.5 py-0.5">
                    54642
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">graham.gilreath@bwe.com</span>
              </div>
            </div>
            <div className="border-t" />
            <div className="bg-background p-2">
              <p className="text-xs leading-relaxed text-muted-foreground">
                {organization.accounts.length > 1 
                  ? "User across both accounts. Uses mode switcher in sidebar footer to toggle between Broker Mode (BWE Brokerage features) and Lender Mode (BWE Lending features)."
                  : "User with access to both broker and lender features through a single hybrid account. Uses mode switcher to toggle between Broker Mode and Lender Mode within the same account."}
              </p>
            </div>
            <div className="border-t" />
            {organization.accounts.map((account) => {
              const accountColor = getAccountColor(account.type)
              const types = Array.isArray(account.type) ? account.type : [account.type]
              
              return types.map((type) => (
                <div key={`${account.id}-${type}`}>
                  <div className="flex items-center justify-between bg-muted/50 px-2 py-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-normal text-muted-foreground">User Profile</span>
                      <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                        <span className={`h-1.5 w-1.5 rounded-full ${type === 'broker' ? 'bg-[#3E9B70]' : 'bg-[#3880E8]'}`} />
                        {type === 'broker' ? 'Broker' : 'Lender'}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">{account.name}</span>
                  </div>
                  {types.length > 1 && type !== types[types.length - 1] && <div className="border-t" />}
                </div>
              ))
            })}
          </div>
        </div>
      </div>

      {/* The Use Case */}
      <div>
        <span className="mb-4 block font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">The Use Case</span>
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium">Lender who also acts as broker - dual role evolution within one organization</h3>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              BWE is an Enterprise customer that operates as both a lender and a broker. Very often they have deals sent to them, the deal doesn't fit their bucket, and they then try to broker it out to other lenders. Graham Gilreath's email (graham.gilreath@bwe.com) was already in Lev as a lender contact when BWE began evaluating the platform for brokerage services.
            </p>
            
            {organization.accounts.length > 1 ? (
              <>
                <p>
                  <strong>Multiple Accounts Model:</strong> We create a 2nd account for BWE's Brokerage division, and Graham belongs to both accounts via separate User Profiles. This allows Graham to work on brokered deals—running outreach campaigns and managing placements to external lenders—while also receiving and evaluating inbound placements when other brokers send deals to BWE for direct financing.
                </p>
                <p>
                  <strong>How Profile Switcher works:</strong> Graham uses the mode switcher in the sidebar footer to toggle between Broker Mode and Lender Mode. This switches which account he's operating under—all the data changes.
                </p>
                <p>
                  <strong>In Broker Mode (BWE Brokerage account):</strong> Sidebar shows Create Deal, Deals, Network, Market, Files, and Vaults. ALL data shown is from the BWE Brokerage account only—his broker deals, broker network contacts, broker files, broker market data, vaults shared with the brokerage account.
                </p>
                <p>
                  <strong>In Lender Mode (BWE Lending account):</strong> Sidebar shows only Vaults and Lending Profile. ALL data shown is from the BWE Lending account only—vaults shared with the lending account. Broker features (Deals, Network, Market, Files, Create Deal) are completely hidden.
                </p>
                <p>
                  <strong>Key limitation:</strong> Graham can't see data from both accounts simultaneously. When he's in Broker Mode looking at his broker deals, he can't see his lender network contacts at the same time. He must switch modes to view different account data. This is the simplest implementation but requires manual mode switching to move between account contexts.
                </p>
              </>
            ) : (
              <>
                <p>
                  <strong>One Account Model:</strong> We create a single account (BWE Unified) with multiple types (both Broker and Lender). Graham belongs to this one account with access to both roles. This allows Graham to work on brokered deals and handle lender operations all within the same account context.
                </p>
                <p>
                  <strong>How Profile Switcher works:</strong> Graham uses the mode switcher in the sidebar footer to toggle between Broker Mode and Lender Mode, but the underlying account doesn't change—only the visible features change.
                </p>
                <p>
                  <strong>In Broker Mode:</strong> Sidebar shows Create Deal, Deals, Network, Market, Files, and Vaults. All data shown is from the BWE Unified account filtered to broker-specific features.
                </p>
                <p>
                  <strong>In Lender Mode:</strong> Sidebar shows only Vaults and Lending Profile. All data shown is from the same BWE Unified account but filtered to lender-specific features.
                </p>
                <p>
                  <strong>Key difference:</strong> Since the account has multiple types, there's no "Lending Details" section in the settings. The account serves both purposes, so lending configuration would be handled differently rather than per-account level. This model is simpler from an account management perspective but less granular for role-specific settings.
                </p>
              </>
            )}
          </div>
        </div>
      </div>

    </>
  )
}

// Convoy Design Option 1 - Profile Switcher
function ConvoyDesignOption1() {
  return (
    <>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Organization</span>
          <h1 className="text-2xl font-semibold">Convoy Capital</h1>
          <p className="text-muted-foreground">
            Multi-team brokerage with separate accounts for data privacy
          </p>
        </div>
        <div className="flex gap-2">
          <span className="inline-flex h-6 items-center gap-1.5 rounded-full border px-3 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3E9B70]" />
            Broker
          </span>
        </div>
      </div>

      {/* Accounts */}
      <div>
        <span className="mb-4 block font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Accounts</span>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border bg-card">
            <div className="flex items-center gap-3 p-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Briefcase className="h-4 w-4" />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">Convoy Austin</span>
                  <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#3E9B70]" />
                    Broker
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  Tyler's brokerage team. One of 8 separate teams under Convoy Capital.
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card opacity-50">
            <div className="flex items-center gap-3 p-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Briefcase className="h-4 w-4" />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">Convoy Dallas</span>
                  <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#3E9B70]" />
                    Broker
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  Another team under Convoy. Tyler doesn't belong to this account.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User */}
      <div>
        <span className="mb-4 block font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">User</span>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border bg-card">
            <div className="flex items-center gap-3 p-2">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <Image src={avatar2} alt="Tyler Bradford" width={40} height={40} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <span className="text-sm font-semibold">Tyler Bradford</span>
                <span className="text-xs text-muted-foreground">tyler@convoycapital.com</span>
              </div>
            </div>
            <div className="border-t" />
            <div className="bg-background p-2">
              <p className="text-xs leading-relaxed text-muted-foreground">
                Admin of Convoy Capital organization. Belongs to Convoy Austin team account for his personal brokerage work. Has org-level visibility across all 8 teams.
              </p>
            </div>
            <div className="border-t" />
            <div className="flex items-center justify-between bg-muted/50 px-2 py-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-normal text-muted-foreground">User Profile</span>
                <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3E9B70]" />
                  Broker
                </span>
              </div>
              <span className="text-xs text-muted-foreground">Convoy Austin</span>
            </div>
          </div>
        </div>
      </div>

      {/* The Use Case */}
      <div>
        <span className="mb-4 block font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">The Use Case</span>
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium">Multi-team brokerage with separate accounts for data privacy</h3>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              Convoy Capital operates with 8 separate broker teams under one organization. Each team wants their lender and sponsor contacts protected from the other teams. However, brokers can still collaborate when they co-broker deals together—they can CC each other and add teammates to deal teams when needed.
            </p>
            <p>
              Tyler Bradford is the admin who has org-level visibility across all 8 teams. He also has his own broker team account (Convoy Austin) for his personal brokerage operations.
            </p>
            <p>
              <strong>How Profile Switcher works:</strong> Since Tyler only has one role (Broker), there's no profile switcher in the footer—he's always in Broker Mode. Tyler sees all broker features consistently.
            </p>
            <p>
              <strong>Sidebar behavior:</strong> All features show data from Convoy Austin account only:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><strong>Green dot (Broker):</strong> Create Deal, Deals, Network, Market, Files - shows data from Convoy Austin only</li>
              <li><strong>Green dot (Broker):</strong> Vaults - shows vaults shared with Convoy Austin only</li>
            </ul>
            <p>
              <strong>Key simplification:</strong> For single-role organizations, Design Option 1 works like a standard broker experience. The multi-team structure adds organizational complexity but not profile switching complexity.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

// Leverage Companies Design Option 1 - Profile Switcher
function LeverageDesignOption1() {
  return (
    <>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Organization</span>
          <h1 className="text-2xl font-semibold">Leverage Companies / Brick City Capital</h1>
          <p className="text-muted-foreground">
            Design Option 1: Lender-Only (No Mode Switching Needed)
          </p>
        </div>
        <div className="flex gap-2">
          <span className="inline-flex h-6 items-center gap-1.5 rounded-full border px-3 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3880E8]" />
            Lender
          </span>
        </div>
      </div>

      {/* How It Works */}
      <div className="rounded-lg border bg-muted/30 p-4">
        <h3 className="mb-3 text-sm font-semibold">How It Works for Lender-Only</h3>
        <div className="space-y-2 text-sm leading-relaxed">
          <p>
            JP and Ian only have access to <strong className="text-blue-600">Lender Mode</strong>. Since both entities are lender-only, there's no mode switcher—they're always in lender mode.
          </p>
          <p>
            They see lender features (Network, Vaults) and work seamlessly across both Brick City Capital and Leverage Companies without needing to switch modes.
          </p>
          <p className="text-xs text-muted-foreground">
            <strong>Note:</strong> This demonstrates how Design Option 1 works for lender-only organizations—straightforward and focused.
          </p>
        </div>
      </div>

      {/* Users */}
      <div>
        <span className="mb-4 block font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Users</span>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border bg-card">
            <div className="flex items-center gap-3 p-2">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <Image src={avatar4} alt="JP Helan" width={40} height={40} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <span className="text-sm font-semibold">JP Helan</span>
                <span className="text-xs text-muted-foreground">jphelan@brkcty.com</span>
              </div>
            </div>
            <div className="border-t" />
            <div className="flex items-center justify-between bg-muted/50 px-2 py-1.5">
              <span className="text-xs font-normal text-muted-foreground">Always in:</span>
              <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3880E8]" />
                Lender Mode
              </span>
            </div>
          </div>

          <div className="rounded-lg border bg-card">
            <div className="flex items-center gap-3 p-2">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <Image src={avatar5} alt="Ian Rodriguez" width={40} height={40} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <span className="text-sm font-semibold">Ian Rodriguez</span>
                <span className="text-xs text-muted-foreground">ian@leveragecompanies.com</span>
              </div>
            </div>
            <div className="border-t" />
            <div className="flex items-center justify-between bg-muted/50 px-2 py-1.5">
              <span className="text-xs font-normal text-muted-foreground">Always in:</span>
              <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3880E8]" />
                Lender Mode
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Why This Approach */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">Why This Approach</h2>
        <div className="space-y-3 text-sm leading-relaxed">
          <p>
            For lender-only organizations like Leverage Companies, Design Option 1 keeps things simple—one mode, one consistent experience across both legal entities.
          </p>
          <p>
            The multi-entity structure (Brick City + Leverage Co) doesn't add complexity to the mode switching because both operate in the same lender mode.
          </p>
        </div>
      </div>
    </>
  )
}

// ============================================================================
// DESIGN OPTION 2: UNIFIED EXPERIENCE
// ============================================================================

// BWE Design Option 2 - Unified Experience
function BWEDesignOption2() {
  return (
    <>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Organization</span>
          <h1 className="text-2xl font-semibold">BWE</h1>
        </div>
        <div className="flex gap-2">
          <span className="inline-flex h-6 items-center gap-1.5 rounded-full border px-3 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3E9B70]" />
            Broker
          </span>
          <span className="inline-flex h-6 items-center gap-1.5 rounded-full border px-3 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3880E8]" />
            Lender
          </span>
        </div>
      </div>

      {/* Accounts */}
      <div>
        <span className="mb-4 block font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Accounts</span>
        <div className="grid gap-3 md:grid-cols-2">
          {/* BWE Brokerage Account */}
          <div className="rounded-lg border bg-card">
            <div className="flex items-center gap-3 p-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Briefcase className="h-4 w-4" />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">BWE Brokerage</span>
                  <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#3E9B70]" />
                    Broker
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  Primary brokerage account for running outreach campaigns and managing placements to external lenders.
                </span>
              </div>
            </div>
          </div>

          {/* BWE Lending Account */}
          <div className="rounded-lg border bg-card">
            <div className="flex items-center gap-3 p-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Landmark className="h-4 w-4" />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">BWE Lending</span>
                  <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#3880E8]" />
                    Lender
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  Receives inbound placements from other brokers when BWE provides direct financing for deals.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Users */}
      <div>
        <span className="mb-4 block font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Users</span>
        <div className="grid gap-3 md:grid-cols-2">
          {/* Graham Gilreath */}
          <div className="rounded-lg border bg-card">
            <div className="flex items-center gap-3 p-2">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <Image src={avatar4} alt="Graham Gilreath" width={40} height={40} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <span className="text-sm font-semibold">Graham Gilreath</span>
                <span className="text-xs text-muted-foreground">graham.gilreath@bwe.com</span>
              </div>
            </div>
            <div className="border-t" />
            <div className="bg-background p-2">
              <p className="text-xs leading-relaxed text-muted-foreground">
                User across both accounts. Acts as broker on brokerage deals and as lender contact when BWE provides direct financing.
              </p>
            </div>
            <div className="border-t" />
            <div className="flex items-center justify-between bg-muted/50 px-2 py-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-normal text-muted-foreground">User Profile</span>
                <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3E9B70]" />
                  Broker
                </span>
              </div>
              <span className="text-xs text-muted-foreground">BWE Brokerage</span>
            </div>
            <div className="border-t" />
            <div className="flex items-center justify-between bg-muted/50 px-2 py-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-normal text-muted-foreground">User Profile</span>
                <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3880E8]" />
                  Lender
                </span>
              </div>
              <span className="text-xs text-muted-foreground">BWE Lending</span>
            </div>
          </div>
        </div>
      </div>

      {/* The Use Case */}
      <div>
        <span className="mb-4 block font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">The Use Case</span>
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium">Lender who also acts as broker - dual role evolution within one organization</h3>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              BWE is an Enterprise customer that operates as both a lender and a broker. Very often they have deals sent to them, the deal doesn't fit their bucket, and they then try to broker it out to other lenders. Graham Gilreath's email (graham.gilreath@bwe.com) was already in Lev as a lender contact when BWE began evaluating the platform for brokerage services.
            </p>
            <p>
              To handle this, we create a 2nd account for BWE's Brokerage division, and Graham belongs to both accounts. This allows Graham to work on brokered deals—running outreach campaigns and managing placements to external lenders—while also receiving and evaluating inbound placements when other brokers send deals to BWE for direct financing.
            </p>
            <p>
              <strong>Sidebar behavior:</strong> Graham sees all features from both accounts in one unified view. Role indicators (colored dots) appear next to each feature:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><strong>Green dot (Broker only):</strong> Create Deal, Deals, Market, Files - only shows data from BWE Brokerage account</li>
              <li><strong>Green + Blue dots (Both):</strong> Network, Vaults - aggregates data from both BWE Brokerage and BWE Lending accounts</li>
            </ul>
            <p>
              <strong>Key benefit:</strong> Graham can see and access all features simultaneously without switching modes. When he clicks on Deals, it shows his broker deals. When he accesses Network or Vaults, it shows contacts and vaults from both accounts aggregated together.
            </p>
          </div>
        </div>
      </div>

    </>
  )
}

// Convoy Design Option 2 - Unified Experience
function ConvoyDesignOption2() {
  return (
    <>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Organization</span>
          <h1 className="text-2xl font-semibold">Convoy Capital</h1>
          <p className="text-muted-foreground">
            Multi-team brokerage with separate accounts for data privacy
          </p>
        </div>
        <div className="flex gap-2">
          <span className="inline-flex h-6 items-center gap-1.5 rounded-full border px-3 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3E9B70]" />
            Broker
          </span>
        </div>
      </div>

      {/* Accounts */}
      <div>
        <span className="mb-4 block font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Accounts</span>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border bg-card">
            <div className="flex items-center gap-3 p-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Briefcase className="h-4 w-4" />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">Convoy Austin</span>
                  <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#3E9B70]" />
                    Broker
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  Tyler's brokerage team. One of 8 separate teams under Convoy Capital.
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card opacity-50">
            <div className="flex items-center gap-3 p-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Briefcase className="h-4 w-4" />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">Convoy Dallas</span>
                  <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#3E9B70]" />
                    Broker
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  Another team under Convoy. Tyler doesn't belong to this account.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User */}
      <div>
        <span className="mb-4 block font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">User</span>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border bg-card">
            <div className="flex items-center gap-3 p-2">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <Image src={avatar2} alt="Tyler Bradford" width={40} height={40} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <span className="text-sm font-semibold">Tyler Bradford</span>
                <span className="text-xs text-muted-foreground">tyler@convoycapital.com</span>
              </div>
            </div>
            <div className="border-t" />
            <div className="bg-background p-2">
              <p className="text-xs leading-relaxed text-muted-foreground">
                Admin of Convoy Capital organization. Belongs to Convoy Austin team account for his personal brokerage work. Has org-level visibility across all 8 teams.
              </p>
            </div>
            <div className="border-t" />
            <div className="flex items-center justify-between bg-muted/50 px-2 py-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-normal text-muted-foreground">User Profile</span>
                <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3E9B70]" />
                  Broker
                </span>
              </div>
              <span className="text-xs text-muted-foreground">Convoy Austin</span>
            </div>
          </div>
        </div>
      </div>

      {/* The Use Case */}
      <div>
        <span className="mb-4 block font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">The Use Case</span>
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium">Multi-team brokerage with separate accounts for data privacy</h3>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              Convoy Capital operates with 8 separate broker teams under one organization. Each team wants their lender and sponsor contacts protected from the other teams. However, brokers can still collaborate when they co-broker deals together—they can CC each other and add teammates to deal teams when needed.
            </p>
            <p>
              Tyler Bradford is the admin who has org-level visibility across all 8 teams. He also has his own broker team account (Convoy Austin) for his personal brokerage operations.
            </p>
            <p>
              <strong>How Unified Experience works:</strong> Since Tyler only has one role (Broker), he sees all broker features. The sidebar shows standard broker navigation without role indicators (no dual-role complexity like BWE).
            </p>
            <p>
              <strong>Sidebar behavior:</strong> All features show data from Convoy Austin account only (Tyler's specific team):
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Create Deal, Deals, Network, Market, Files - shows data from Convoy Austin only</li>
              <li>Vaults - shows vaults shared with Convoy Austin only</li>
            </ul>
            <p>
              <strong>Key benefit:</strong> The platform supports organizational hierarchy where Tyler can be an admin with org-level management visibility while also being a member of a specific team (Convoy Austin) for his day-to-day brokerage work.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

// Leverage Companies Design Option 2 - Unified Experience
function LeverageDesignOption2() {
  return (
    <>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Organization</span>
          <h1 className="text-2xl font-semibold">Leverage Companies / Brick City Capital</h1>
          <p className="text-muted-foreground">
            Two legal entities, same team - residential DSCR lenders
          </p>
        </div>
        <div className="flex gap-2">
          <span className="inline-flex h-6 items-center gap-1.5 rounded-full border px-3 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3880E8]" />
            Lender
          </span>
        </div>
      </div>

      {/* Accounts */}
      <div>
        <span className="mb-4 block font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Accounts</span>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border bg-card">
            <div className="flex items-center gap-3 p-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Landmark className="h-4 w-4" />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">Brick City Capital</span>
                  <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#3880E8]" />
                    Lender
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  Residential DSCR lending under Brick City brand.
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card">
            <div className="flex items-center gap-3 p-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Landmark className="h-4 w-4" />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">Leverage Companies</span>
                  <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#3880E8]" />
                    Lender
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  Residential DSCR lending under Leverage Companies brand.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Users */}
      <div>
        <span className="mb-4 block font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Users</span>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border bg-card">
            <div className="flex items-center gap-3 p-2">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <Image src={avatar4} alt="JP Helan" width={40} height={40} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <span className="text-sm font-semibold">JP Helan</span>
                <span className="text-xs text-muted-foreground">jphelan@brkcty.com</span>
              </div>
            </div>
            <div className="border-t" />
            <div className="bg-background p-2">
              <p className="text-xs leading-relaxed text-muted-foreground">
                Lender specializing in residential DSCR loans. Works across both entities as part of the shared team.
              </p>
            </div>
            <div className="border-t" />
            <div className="flex items-center justify-between bg-muted/50 px-2 py-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-normal text-muted-foreground">User Profile</span>
                <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3880E8]" />
                  Lender
                </span>
              </div>
              <span className="text-xs text-muted-foreground">Brick City Capital</span>
            </div>
          </div>

          <div className="rounded-lg border bg-card">
            <div className="flex items-center gap-3 p-2">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <Image src={avatar5} alt="Ian Rodriguez" width={40} height={40} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <span className="text-sm font-semibold">Ian Rodriguez</span>
                <span className="text-xs text-muted-foreground">ian@leveragecompanies.com</span>
              </div>
            </div>
            <div className="border-t" />
            <div className="bg-background p-2">
              <p className="text-xs leading-relaxed text-muted-foreground">
                Lender specializing in residential DSCR loans. Works across both entities as part of the shared team.
              </p>
            </div>
            <div className="border-t" />
            <div className="flex items-center justify-between bg-muted/50 px-2 py-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-normal text-muted-foreground">User Profile</span>
                <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3880E8]" />
                  Lender
                </span>
              </div>
              <span className="text-xs text-muted-foreground">Leverage Companies</span>
            </div>
          </div>
        </div>
      </div>

      {/* The Workflow */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">The Workflow</h2>
        <div className="space-y-3 text-sm leading-relaxed">
          <p>
            Leverage Companies owns Brick City Capital. While technically two separate legal entities, they operate as a single unified team specializing in residential DSCR loans.
          </p>
          <p>
            JP and Ian work seamlessly across both organizations, evaluating loan requests, underwriting deals, and managing a shared pipeline. The choice of which brand to use depends on the specific deal or client relationship, not on separate operational workflows.
          </p>
          <p>
            Both companies share the same team page on their websites, reflecting their unified operations despite being distinct legal entities.
          </p>
        </div>
      </div>

      {/* Why This Matters */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">Why This Matters</h2>
        <div className="space-y-3 text-sm leading-relaxed">
          <p>
            This shows a multi-entity/DBA structure where separate legal companies share the same team and operations. It's different from Convoy (separate teams) and BWE (dual roles).
          </p>
          <p>
            The platform must accommodate users who work across multiple corporate entities under common ownership without forcing completely separate account management or constant context switching.
          </p>
        </div>
      </div>
    </>
  )
}

// ============================================================================
// DESIGN OPTION 3: PERSON-CENTRIC ARCHITECTURE
// ============================================================================

// BWE Design Option 3 - Person-Centric
function BWEDesignOption3() {
  return (
    <>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Organization</span>
          <h1 className="text-2xl font-semibold">BWE</h1>
        </div>
        <div className="flex gap-2">
          <span className="inline-flex h-6 items-center gap-1.5 rounded-full border px-3 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3E9B70]" />
            Broker
          </span>
          <span className="inline-flex h-6 items-center gap-1.5 rounded-full border px-3 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3880E8]" />
            Lender
          </span>
        </div>
      </div>

      {/* Accounts */}
      <div>
        <span className="mb-4 block font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Accounts</span>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border bg-card">
            <div className="flex items-center gap-3 p-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Briefcase className="h-4 w-4" />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">BWE Brokerage</span>
                  <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#3E9B70]" />
                    Broker
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  Primary brokerage account for running outreach campaigns and managing placements to external lenders.
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card">
            <div className="flex items-center gap-3 p-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Landmark className="h-4 w-4" />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">BWE Lending</span>
                  <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#3880E8]" />
                    Lender
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  Receives inbound placements from other brokers when BWE provides direct financing for deals.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Person */}
      <div>
        <span className="mb-4 block font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Person</span>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border bg-card">
            <div className="flex items-center gap-3 p-2">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <Image src={avatar4} alt="Graham Gilreath" width={40} height={40} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <span className="text-sm font-semibold">Graham Gilreath</span>
                <span className="text-xs text-muted-foreground">graham.gilreath@bwe.com</span>
              </div>
            </div>
            <div className="border-t" />
            <div className="bg-background p-2">
              <p className="text-xs leading-relaxed text-muted-foreground">
                User across both accounts. Global Person identity exists independently of accounts, with 2 Memberships linking to BWE Brokerage and BWE Lending.
              </p>
            </div>
            <div className="border-t" />
            <div className="bg-muted/50 px-2 py-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-normal text-muted-foreground">Person ID</span>
                <span className="font-mono text-xs">person_gg_001</span>
              </div>
            </div>
            <div className="border-t" />
            <div className="flex items-center justify-between bg-muted/50 px-2 py-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-normal text-muted-foreground">Membership</span>
                <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3E9B70]" />
                  Broker
                </span>
              </div>
              <span className="text-xs text-muted-foreground">BWE Brokerage</span>
            </div>
            <div className="border-t" />
            <div className="flex items-center justify-between bg-muted/50 px-2 py-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-normal text-muted-foreground">Membership</span>
                <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3880E8]" />
                  Lender
                </span>
              </div>
              <span className="text-xs text-muted-foreground">BWE Lending</span>
            </div>
          </div>
        </div>
      </div>

      {/* The Use Case */}
      <div>
        <span className="mb-4 block font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">The Use Case</span>
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium">Lender who also acts as broker - dual role evolution within one organization</h3>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              BWE is an Enterprise customer that operates as both a lender and a broker. Very often they have deals sent to them, the deal doesn't fit their bucket, and they then try to broker it out to other lenders. Graham Gilreath's email (graham.gilreath@bwe.com) was already in Lev as a lender contact when BWE began evaluating the platform for brokerage services.
            </p>
            <p>
              To handle this, we create a 2nd account for BWE's Brokerage division, and Graham's Person has Memberships to both accounts. This allows Graham to work on brokered deals—running outreach campaigns and managing placements to external lenders—while also receiving and evaluating inbound placements when other brokers send deals to BWE for direct financing.
            </p>
            <p>
              <strong>Person-Centric Architecture:</strong> Graham's global Person identity (person_gg_001) exists independently. Two Memberships link this Person to BWE Brokerage and BWE Lending accounts. Account_user is only used for authentication. This architecture unifies the login story: Person + accounts_users = can log in.
            </p>
            <p>
              <strong>Key benefit:</strong> The Person already exists from CRM, so letting a CRM contact log in is just creating an accounts_users record. Adding a CRM contact as a deal team member becomes simple—their Person already exists, deal_users.person_id links them directly. No need to create accounts or "memberships" for someone to participate in a deal.
            </p>
            <p>
              <strong>Sidebar behavior:</strong> Identical to Design Option 2. Graham sees all features from both accounts with role indicators:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><strong>Green dot (Broker only):</strong> Create Deal, Deals, Market, Files - only shows data from BWE Brokerage account</li>
              <li><strong>Green + Blue dots (Both):</strong> Network, Vaults - aggregates data from both BWE Brokerage and BWE Lending accounts</li>
            </ul>
            <p>
              <strong>UX:</strong> From Graham's perspective, this works identically to Design Option 2. The difference is purely in the underlying data model (Person + Membership vs User Profile).
            </p>
          </div>
        </div>
      </div>

    </>
  )
}

// Convoy Design Option 3 - Person-Centric
function ConvoyDesignOption3() {
  return (
    <>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Organization</span>
          <h1 className="text-2xl font-semibold">Convoy Capital</h1>
        </div>
        <div className="flex gap-2">
          <span className="inline-flex h-6 items-center gap-1.5 rounded-full border px-3 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3E9B70]" />
            Broker
          </span>
        </div>
      </div>

      {/* Accounts */}
      <div>
        <span className="mb-4 block font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Accounts</span>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border bg-card">
            <div className="flex items-center gap-3 p-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Briefcase className="h-4 w-4" />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">Convoy Austin</span>
                  <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#3E9B70]" />
                    Broker
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  Tyler's brokerage team. One of 8 separate teams under Convoy Capital.
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card opacity-50">
            <div className="flex items-center gap-3 p-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Briefcase className="h-4 w-4" />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">Convoy Dallas</span>
                  <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#3E9B70]" />
                    Broker
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  Another team under Convoy. Tyler doesn't belong to this account.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Person */}
      <div>
        <span className="mb-4 block font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Person</span>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border bg-card">
            <div className="flex items-center gap-3 p-2">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <Image src={avatar2} alt="Tyler Bradford" width={40} height={40} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <span className="text-sm font-semibold">Tyler Bradford</span>
                <span className="text-xs text-muted-foreground">tyler@convoycapital.com</span>
              </div>
            </div>
            <div className="border-t" />
            <div className="bg-background p-2">
              <p className="text-xs leading-relaxed text-muted-foreground">
                Admin of Convoy Capital organization. Belongs to Convoy Austin team account for his personal brokerage work. Has org-level visibility across all 8 teams.
              </p>
            </div>
            <div className="border-t" />
            <div className="bg-muted/50 px-2 py-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-normal text-muted-foreground">Person ID</span>
                <span className="font-mono text-xs">person_tb_001</span>
              </div>
            </div>
            <div className="border-t" />
            <div className="flex items-center justify-between bg-muted/50 px-2 py-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-normal text-muted-foreground">Membership</span>
                <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3E9B70]" />
                  Broker
                </span>
              </div>
              <span className="text-xs text-muted-foreground">Convoy Austin</span>
            </div>
          </div>
        </div>
      </div>

      {/* The Use Case */}
      <div>
        <span className="mb-4 block font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">The Use Case</span>
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium">Multi-team brokerage with separate accounts for data privacy</h3>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              Convoy Capital operates with 8 separate broker teams under one organization. Each team wants their lender and sponsor contacts protected from the other teams. However, brokers can still collaborate when they co-broker deals together—they can CC each other and add teammates to deal teams when needed.
            </p>
            <p>
              Tyler Bradford is the admin who has org-level visibility across all 8 teams. He also has his own broker team account (Convoy Austin) for his personal brokerage operations.
            </p>
            <p>
              <strong>Person-Centric Architecture:</strong> Tyler's global Person identity (person_tb_001) exists independently. A single Membership links this Person to Convoy Austin account. Account_user is only for authentication. Admin privileges are tied to the Person entity, not to memberships.
            </p>
            <p>
              <strong>Sidebar behavior:</strong> All features show data from Convoy Austin account only (Tyler's specific team):
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Create Deal, Deals, Network, Market, Files - shows data from Convoy Austin only</li>
              <li>Vaults - shows vaults shared with Convoy Austin only</li>
            </ul>
            <p>
              <strong>Key benefit:</strong> Person-centric model simplifies identity management. Everything flows from the Person entity—admin status, account access, all centralized.
            </p>
            <p>
              <strong>UX:</strong> From Tyler's perspective, this works identically to Design Option 2. The difference is purely in the underlying data model (Person + Membership vs User Profile).
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

// Leverage Companies Design Option 3 - Person-Centric
function LeverageDesignOption3() {
  return (
    <>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Organization</span>
          <h1 className="text-2xl font-semibold">Leverage Companies / Brick City Capital</h1>
          <p className="text-muted-foreground">
            Design Option 3: Person-Centric Multi-Entity
          </p>
        </div>
        <div className="flex gap-2">
          <span className="inline-flex h-6 items-center gap-1.5 rounded-full border px-3 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3880E8]" />
            Lender
          </span>
        </div>
      </div>

      {/* Architecture Explanation */}
      <div className="rounded-lg border bg-muted/30 p-4">
        <h3 className="mb-3 text-sm font-semibold">Person-Centric Multi-Entity Structure</h3>
        <div className="space-y-2 text-sm leading-relaxed">
          <p>
            Each person (JP and Ian) has their own <strong>Person</strong> entity with a single <strong>Membership</strong> to their respective account, but both work under the same organizational umbrella.
          </p>
          <p className="font-mono text-xs">
            Organization → Account (Brick City / Leverage Co) → Person (person_id) → Account_User
          </p>
          <p className="text-xs text-muted-foreground">
            <strong>Multi-entity simplicity:</strong> Each legal entity has its own account, each person has one membership, but they all collaborate seamlessly.
          </p>
        </div>
      </div>

      {/* Persons */}
      <div>
        <span className="mb-4 block font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Persons</span>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border bg-card">
            <div className="flex items-center gap-3 p-2">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <Image src={avatar4} alt="JP Helan" width={40} height={40} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <span className="text-sm font-semibold">JP Helan</span>
                <span className="text-xs text-muted-foreground">jphelan@brkcty.com</span>
              </div>
            </div>
            <div className="border-t" />
            <div className="bg-background p-2">
              <p className="text-xs leading-relaxed text-muted-foreground">
                Central identity with membership to Brick City Capital account.
              </p>
            </div>
            <div className="border-t" />
            <div className="bg-muted/50 px-2 py-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-normal text-muted-foreground">Person ID</span>
                <span className="font-mono text-xs">person_jp_001</span>
              </div>
            </div>
            <div className="border-t" />
            <div className="flex items-center justify-between bg-muted/50 px-2 py-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-normal text-muted-foreground">Membership</span>
                <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3880E8]" />
                  Lender
                </span>
              </div>
              <span className="text-xs text-muted-foreground">Brick City Capital</span>
            </div>
          </div>

          <div className="rounded-lg border bg-card">
            <div className="flex items-center gap-3 p-2">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <Image src={avatar5} alt="Ian Rodriguez" width={40} height={40} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <span className="text-sm font-semibold">Ian Rodriguez</span>
                <span className="text-xs text-muted-foreground">ian@leveragecompanies.com</span>
              </div>
            </div>
            <div className="border-t" />
            <div className="bg-background p-2">
              <p className="text-xs leading-relaxed text-muted-foreground">
                Central identity with membership to Leverage Companies account.
              </p>
            </div>
            <div className="border-t" />
            <div className="bg-muted/50 px-2 py-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-normal text-muted-foreground">Person ID</span>
                <span className="font-mono text-xs">person_ir_001</span>
              </div>
            </div>
            <div className="border-t" />
            <div className="flex items-center justify-between bg-muted/50 px-2 py-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-normal text-muted-foreground">Membership</span>
                <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3880E8]" />
                  Lender
                </span>
              </div>
              <span className="text-xs text-muted-foreground">Leverage Companies</span>
            </div>
          </div>
        </div>
      </div>

      {/* Why This Architecture */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">Why This Architecture</h2>
        <div className="space-y-3 text-sm leading-relaxed">
          <p>
            The Person-centric model handles multi-entity structures elegantly. Each person has their own Person entity and a single membership to their specific account, but both can collaborate across organizational boundaries because their identities are centralized.
          </p>
          <p>
            This makes it simple to share deals, contacts, and data across Brick City Capital and Leverage Companies without complex account linking or profile management.
          </p>
        </div>
      </div>
    </>
  )
}
