import { Landmark, Building2, Briefcase, Warehouse, Globe, type LucideIcon } from "lucide-react"
import avatar1 from "@/components/avatars/avatar_1.png"
import avatar2 from "@/components/avatars/avatar_2.png"
import avatar3 from "@/components/avatars/avatar_3.png"
import avatar4 from "@/components/avatars/avatar_4.png"

// Core data types

export interface Account {
  id: string
  name: string
  accountNumber?: string
  members: number
  description: string
  location: string
  about: string
  subscription: boolean
}

export interface Organization {
  id: string
  orgId: string
  name: string
  logo: string
  hasLenderPrograms: boolean
  accounts: Account[]
  aliases?: string
  domains?: string
  website?: string
  location?: string
  about?: string
}

export interface User {
  id: string
  userId: string
  name: string
  email: string
  avatar: any
  accountMemberships: string[]
  phone: string
  linkedin: string
}

export interface DemoScenario {
  organization: Organization
  user: User
  teamMembers: User[]
  title: string
  description: string
}

// Palette: deterministic per-account color + icon
export type AccountPalette = {
  bg: string
  text: string
  solid: string
  icon: LucideIcon
}

const ACCOUNT_PALETTES: AccountPalette[] = [
  { bg: 'bg-[#3E9B70]/20', text: 'text-[#3E9B70]', solid: 'bg-[#3E9B70]', icon: Briefcase },
  { bg: 'bg-[#3880E8]/20', text: 'text-[#3880E8]', solid: 'bg-[#3880E8]', icon: Landmark },
  { bg: 'bg-[#E87438]/20', text: 'text-[#E87438]', solid: 'bg-[#E87438]', icon: Building2 },
  { bg: 'bg-[#9B3E9B]/20', text: 'text-[#9B3E9B]', solid: 'bg-[#9B3E9B]', icon: Warehouse },
  { bg: 'bg-[#9B7A3E]/20', text: 'text-[#9B7A3E]', solid: 'bg-[#9B7A3E]', icon: Globe },
]

function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0
  }
  return hash
}

export function getAccountPalette(accountId: string): AccountPalette {
  const index = hashString(accountId) % ACCOUNT_PALETTES.length
  return ACCOUNT_PALETTES[index]
}

// ─── Convoy Capital ───────────────────────────────────────────────────────────
// Org: has lender programs, 2 accounts (both subscribed), 1 user in both

const convoyOrg: Organization = {
  id: 'convoy',
  orgId: '9960',
  name: 'Convoy Capital',
  logo: 'C',
  hasLenderPrograms: true,
  accounts: [
    {
      id: 'convoy-boston',
      name: 'Convoy Boston',
      accountNumber: '9960',
      members: 4,
      description: 'Primary brokerage account running outreach campaigns and managing deal placements.',
      location: '3344 Peachtree Road NE, Atlanta, GA 30326',
      about: 'Convoy Capital Brokerage handles commercial real estate debt placement across the Southeast.',
      subscription: true,
    },
    {
      id: 'convoy-nyc',
      name: 'Convoy New York',
      accountNumber: '9975',
      members: 3,
      description: 'Direct lending arm providing financing for deals that fit internal credit criteria.',
      location: '3344 Peachtree Road NE, Atlanta, GA 30326',
      about: 'Convoy Capital Lending evaluates and directly underwrites commercial real estate transactions.',
      subscription: true,
    },
  ],
}

const frankiePaparella: User = {
  id: 'frankie-paparella',
  userId: '61844',
  name: 'Frankie Paparella',
  email: 'frankie@convoy-cap.com',
  avatar: avatar1,
  accountMemberships: ['convoy-boston', 'convoy-nyc'],
  phone: '(404) 555-0123',
  linkedin: 'https://linkedin.com',
}

export const convoyScenario: DemoScenario = {
  organization: convoyOrg,
  user: frankiePaparella,
  teamMembers: [frankiePaparella],
  title: "An enterprise Customer with multiple accounts, that also has a Lender Profile",
  description: "A user at one of our traditional customer accounts. Convoy is what we'd consider a \"Broker Customer that's also a Lender\" — one of the complicated enterprise cases with multiple accounts, each with their own members, siloed deals, network, and their own subscription. In this new world, being a member of any active subscription means they could create deals as a Broker, as a Borrower, and soon as a Lender if they wanted to. Frankie can create deals in both accounts, getting charged for usage based on the account he's actively in. He can view any Vault shared with him as a Lender Contact, a Broker, or a Borrower — it's just Vaults that have been shared with Frankie's email.",
}

// ─── Custom Capital ───────────────────────────────────────────────────────────
// Org: no lender programs, 1 account (subscribed), 1 user

const customOrg: Organization = {
  id: 'custom',
  orgId: '7741',
  name: 'Custom Capital',
  logo: 'CC',
  hasLenderPrograms: false,
  accounts: [
    {
      id: 'custom-main',
      name: 'Custom Capital',
      accountNumber: '7741',
      members: 2,
      description: 'Single-account brokerage focused on mid-market commercial real estate transactions.',
      location: '200 Park Avenue, New York, NY 10166',
      about: 'Custom Capital is a boutique commercial real estate brokerage operating in the Northeast.',
      subscription: true,
    },
  ],
}

const alexMorgan: User = {
  id: 'alex-morgan',
  userId: '72301',
  name: 'Alex Morgan',
  email: 'alex@customcapital.com',
  avatar: avatar2,
  accountMemberships: ['custom-main'],
  phone: '(212) 555-0199',
  linkedin: 'https://linkedin.com',
}

export const customScenario: DemoScenario = {
  organization: customOrg,
  user: alexMorgan,
  teamMembers: [alexMorgan],
  title: "A traditional, normal customer. The most normal use case",
  description: "Traditional customer setup. Whether they're a broker customer or borrower customer, they're now just a customer. 1 account, where the Org & Account are 1:1. They can create deals and manage their network as a broker, borrower, or whatever they want. If they needed multiple accounts they could add them. If they needed a Lender Profile, they could add it.",
}

// ─── Scenario registry ────────────────────────────────────────────────────────

// ─── steve12@gmail.com ────────────────────────────────────────────────────────
// No org, no account — all platform features disabled, no lending section

const noOrg: Organization = {
  id: 'no-org',
  orgId: '—',
  name: '—',
  logo: '?',
  hasLenderPrograms: false,
  accounts: [],
}

const steveUser: User = {
  id: 'steve',
  userId: '00001',
  name: 'steve12@gmail.com',
  email: 'steve12@gmail.com',
  avatar: avatar3,
  accountMemberships: [],
  phone: '',
  linkedin: '',
}

export const steveScenario: DemoScenario = {
  organization: noOrg,
  user: steveUser,
  teamMembers: [steveUser],
  title: "A user who saw a LinkedIn post and made an account from one of our Tools like the Trust Center",
  description: "What we're calling a guest. Only super relevant right now because we haven't built an onboarding flow. There are entry points to users creating an account from something like the Trust Center, but there's no step to prompt them to create an Org and Account — so there's no way for them to have a subscription or anything. As soon as they want to become a customer, someone would make them an account, which creates the Org. In a future state, we hope to push everyone through an Account-Creation Onboarding Flow.",
}

// ─── Pathfinder Bank ──────────────────────────────────────────────────────────
// Has lender programs, 1 account with subscription: false

const pathfinderOrg: Organization = {
  id: 'pathfinder',
  orgId: '5521',
  name: 'Pathfinder Bank',
  logo: 'P',
  hasLenderPrograms: true,
  accounts: [
    {
      id: 'pathfinder-main',
      name: 'Pathfinder Bank',
      accountNumber: '5521',
      members: 1,
      description: 'Commercial lending division managing inbound deal flow from brokers.',
      location: '100 Federal Street, Boston, MA 02110',
      about: 'Pathfinder Bank is a regional commercial real estate lender focused on the Northeast market.',
      subscription: false,
    },
  ],
}

const alisonHa: User = {
  id: 'alison-ha',
  userId: '83712',
  name: 'Alison Xuan Ha',
  email: 'alison.ha@pathfinderbank.com',
  avatar: avatar4,
  accountMemberships: ['pathfinder-main'],
  phone: '(617) 555-0144',
  linkedin: 'https://linkedin.com',
}

export const pathfinderScenario: DemoScenario = {
  organization: pathfinderOrg,
  user: alisonHa,
  teamMembers: [alisonHa],
  title: "A 'Lender Contact' that has been added to our Lender Universe by Jake, and gets suggested as the Contact on Deals",
  description: "A Lender Contact — the example of a CRM Contact's experience. They are tied to an org, and we can decide if we're going to create accounts for them and how it will work, although that may add complexity (should all JP Morgan employees share a master account?). If we go the no-account route, they are essentially a guest. We can show them Vaults, and we could show Lender Programs via the Org their user is tied to via Person. But they would need an Account and then a Subscription to access everything.",
}

// ─── TD Bank ──────────────────────────────────────────────────────────────────
// Has lender programs, NO accounts — user exists at org level only

const tdBankOrg: Organization = {
  id: 'td-bank',
  orgId: '3847',
  name: 'TD Bank',
  logo: 'TD',
  hasLenderPrograms: true,
  accounts: [],
  aliases: 'Toronto-Dominion Bank',
  website: 'https://www.td.com',
  domains: 'td.com',
  location: 'Latham, NY',
}

const johnStroligo: User = {
  id: 'john-stroligo',
  userId: '44821',
  name: 'John Stroligo',
  email: 'john.stroligo@td.com',
  avatar: avatar2,
  accountMemberships: [],
  phone: '(914) 409-8455',
  linkedin: 'https://linkedin.com',
}

export const tdBankScenario: DemoScenario = {
  organization: tdBankOrg,
  user: johnStroligo,
  teamMembers: [johnStroligo],
  title: "A Lender Contact at a large bank — org exists, but no account has been created",
  description: "John is a Regional Vice President at TD Bank. He exists in Lev because Jake added TD Bank to the Lender Universe and John as a person. The org (TD Bank) that Jake linked him to has Lender Programs, but no Account has ever been created for him — so he has no subscription, no access to platform features, and no account-scoped anything. This is the purest version of the 'no-account' question: the org exists, lender programs are visible, but without an Account there's no home for Deals, Network, or Files.",
}

export const SCENARIOS: Record<string, DemoScenario> = {
  'Convoy Capital': convoyScenario,
  'Custom Capital': customScenario,
  'steve12@gmail.com': steveScenario,
  'Pathfinder Bank': pathfinderScenario,
  'TD Bank': tdBankScenario,
}

// Helper functions
export function getAccountsByUser(user: User, org: Organization): Account[] {
  return org.accounts.filter(account => user.accountMemberships.includes(account.id))
}
