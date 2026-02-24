import { Landmark, Building2, Briefcase } from "lucide-react"
import avatar1 from "@/components/avatars/avatar_1.png"
import avatar2 from "@/components/avatars/avatar_2.png"
import avatar4 from "@/components/avatars/avatar_4.png"

// Core data types
export type AccountType = 'broker' | 'lender'

export interface Account {
  id: string
  name: string
  type: AccountType | AccountType[]
  accountNumber?: string
  members: number
  description: string
  location: string
  about: string
}

export interface Organization {
  id: string
  orgId: string // Display ID like "4381"
  name: string
  logo: string
  aliases: string
  domains: string
  website: string
  location: string
  about: string
  accounts: Account[]
}

export interface User {
  id: string
  userId: string // Display ID like "54642"
  name: string
  email: string
  avatar: any
  accountMemberships: string[] // array of account IDs
  phone: string
  linkedin: string
}

// BWE Organization data
export const bweOrganization: Organization = {
  id: 'bwe',
  orgId: '4381',
  name: 'BWE',
  logo: 'B',
  aliases: 'Bellwether Enterprise, BELLWETHER ENT MTG INVS LLC',
  domains: 'bwecap.com, bwe.com',
  website: 'https://bwe.com',
  location: '1375 E. 9th Street Suite 2400, Cleveland, OH 44114',
  about: 'BWE (Bellwether Enterprise) is a middle-market debt fund based in Cleveland, OH. Originally categorized as "not actively lending," BWE has evolved to operate as both a lender and a broker.\n\nWhen deals don\'t fit their direct lending bucket, they broker them out to external lenders. The organization is deeply embedded in the market with 43 different accounts having BWE as a lender in their CRM.',
  accounts: [
    {
      id: 'bwe-brokerage',
      name: 'BWE Brokerage',
      type: 'broker',
      accountNumber: '10547',
      members: 4,
      description: 'Primary brokerage account for running outreach campaigns and managing placements to external lenders.',
      location: '1375 E. 9th Street Suite 2400, Cleveland, OH 44114',
      about: 'BWE Brokerage specializes in commercial real estate debt placement services. Our team works with borrowers to find optimal financing solutions across a wide network of lenders.\n\nWhen deals don\'t fit our direct lending criteria through BWE Lending, our brokerage team brokers them out to external lenders, ensuring clients receive the best possible financing terms.',
    },
    {
      id: 'bwe-lending',
      name: 'BWE Lending',
      type: 'lender',
      accountNumber: '4381',
      members: 58,
      description: 'Receives inbound placements from other brokers when BWE provides direct financing for deals.',
      location: '1375 E. 9th Street Suite 2400, Cleveland, OH 44114',
      about: 'BWE Lending is a middle-market debt fund providing direct financing for commercial real estate transactions. We focus on deals that align with our lending criteria and portfolio strategy.\n\nOur lending team evaluates incoming loan requests and directly underwrites deals, while maintaining strong relationships with brokers across the market. We are deeply embedded in the CRE lending ecosystem with 43 different accounts having BWE as a lender in their CRM.',
    },
  ],
}

// BWE Organization 2 - Demo 2 with hybrid account model
export const bweOrganization2: Organization = {
  id: 'bwe-2',
  orgId: '4381',
  name: 'BWE',
  logo: 'B',
  aliases: 'Bellwether Enterprise, BELLWETHER ENT MTG INVS LLC',
  domains: 'bwecap.com, bwe.com',
  website: 'https://bwe.com',
  location: '1375 E. 9th Street Suite 2400, Cleveland, OH 44114',
  about: 'BWE (Bellwether Enterprise) is a middle-market debt fund based in Cleveland, OH. Originally categorized as "not actively lending," BWE has evolved to operate as both a lender and a broker.\n\nWhen deals don\'t fit their direct lending bucket, they broker them out to external lenders. The organization is deeply embedded in the market with 43 different accounts having BWE as a lender in their CRM.',
  accounts: [
    {
      id: 'bwe-unified',
      name: 'BWE Brokerage & Lending',
      type: ['broker', 'lender'],
      accountNumber: '10547',
      members: 62,
      description: 'Unified account handling both brokerage and lending operations.',
      location: '1375 E. 9th Street Suite 2400, Cleveland, OH 44114',
      about: 'BWE Brokerage & Lending combines brokerage and lending capabilities into a single account. The team handles both outbound deal placement to external lenders and direct lending from BWE\'s balance sheet.\n\nThis unified approach allows for seamless transitions between brokering and lending roles, providing flexibility in how deals are structured and executed.',
    },
  ],
}

// Graham Gilreath user data - Demo 1 (separate accounts)
export const grahamGilreath: User = {
  id: 'graham-gilreath',
  userId: '54642',
  name: 'Graham Gilreath',
  email: 'graham.gilreath@bwe.com',
  avatar: avatar4,
  accountMemberships: ['bwe-brokerage', 'bwe-lending'], // member of both accounts
  phone: '(917) 216-5517',
  linkedin: 'https://linkedin.com',
}

// Graham Gilreath user data - Demo 2 (hybrid account)
export const grahamGilreath2: User = {
  id: 'graham-gilreath-2',
  userId: '54642',
  name: 'Graham Gilreath',
  email: 'graham.gilreath@bwe.com',
  avatar: avatar4,
  accountMemberships: ['bwe-unified'], // member of one hybrid account
  phone: '(917) 216-5517',
  linkedin: 'https://linkedin.com',
}

// All team members (for Team tab) - Demo 1 (multiple accounts)
export const bweTeamMembers: User[] = [
  grahamGilreath,
  {
    id: 'thomas-smith',
    userId: '54643',
    name: 'Thomas Smith',
    email: 'thomas.smith@bwe.com',
    avatar: avatar4,
    accountMemberships: ['bwe-brokerage', 'bwe-lending'],
    phone: '(615) 881-3415',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'daniel-patton',
    userId: '54644',
    name: 'Daniel Patton',
    email: 'daniel.patton@bwe.com',
    avatar: avatar4,
    accountMemberships: ['bwe-brokerage'],
    phone: '(205) 745-1926',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'henry-high',
    userId: '54645',
    name: 'Henry High',
    email: 'henry.high@bwe.com',
    avatar: avatar4,
    accountMemberships: ['bwe-lending'],
    phone: '(615) 208-3266',
    linkedin: 'https://linkedin.com',
  },
]

// All team members - Demo 2 (one account)
export const bweTeamMembers2: User[] = [
  grahamGilreath2,
]

// Convoy Capital Organization - Multi-team brokerage
export const convoyOrganization: Organization = {
  id: 'convoy',
  orgId: '9960',
  name: 'Convoy Capital',
  logo: 'C',
  aliases: 'Convoy Capital Partners',
  domains: 'convoycapital.com, convoy-cap.com',
  website: 'https://convoycapital.com',
  location: '123 Main Street, New York, NY 10001',
  about: 'Convoy Capital is a multi-team commercial real estate brokerage with regional offices across the United States. Each team operates independently with their own client relationships and deal pipelines while sharing organizational resources and branding.',
  accounts: [
    {
      id: 'convoy-atlanta',
      name: 'Convoy Capital Atlanta',
      type: 'broker',
      accountNumber: '9960',
      members: 1,
      description: 'Atlanta-based brokerage team serving the Southeast region.',
      location: '3344 Peachtree Road NE, Atlanta, GA 30326',
      about: 'Convoy Capital Atlanta specializes in commercial real estate debt placement across the Southeast. Our team focuses on building deep relationships with regional lenders and sponsors, providing clients with access to optimal financing solutions.\n\nWe maintain our own network of lender contacts and sponsor relationships, ensuring client confidentiality and competitive advantage within our market.',
    },
    {
      id: 'convoy-newyork',
      name: 'Convoy Capital New York',
      type: 'broker',
      accountNumber: '9975',
      members: 1,
      description: 'New York-based brokerage team serving the Northeast region.',
      location: '123 Main Street, New York, NY 10001',
      about: 'Convoy Capital New York specializes in commercial real estate debt placement across the Northeast. Our team focuses on building deep relationships with regional lenders and sponsors, providing clients with access to optimal financing solutions.\n\nWe maintain our own network of lender contacts and sponsor relationships, ensuring client confidentiality and competitive advantage within our market.',
    },
  ],
}

// Frankie Paparella - Convoy Atlanta
export const frankiePaparella: User = {
  id: 'frankie-paparella',
  userId: '61844',
  name: 'Frankie Paparella',
  email: 'frankie@convoy-cap.com',
  avatar: avatar1,
  accountMemberships: ['convoy-atlanta'],
  phone: '(404) 555-0123',
  linkedin: 'https://linkedin.com',
}

// Michael Bucaro - Convoy New York
export const michaelBucaro: User = {
  id: 'michael-bucaro',
  userId: '61923',
  name: 'Michael Bucaro',
  email: 'mtbucaro@convoy-cap.com',
  avatar: avatar2,
  accountMemberships: ['convoy-newyork'],
  phone: '(212) 555-0456',
  linkedin: 'https://linkedin.com',
}

// Convoy team members
export const convoyTeamMembers: User[] = [
  frankiePaparella,
  michaelBucaro,
]

// Helper functions
export function getAccountIcon(type: AccountType | AccountType[]) {
  const types = Array.isArray(type) ? type : [type]
  if (types.includes('broker') && types.includes('lender')) {
    return Building2 // Hybrid icon
  }
  return types.includes('broker') ? Briefcase : Landmark
}

export function getAccountColor(type: AccountType | AccountType[]) {
  const types = Array.isArray(type) ? type : [type]
  if (types.includes('broker') && types.includes('lender')) {
    return 'bg-[#3E9B70]' // Use broker color for accounts with both types
  }
  return types.includes('broker') ? 'bg-[#3E9B70]' : 'bg-[#3880E8]'
}

export function getAccountsByUser(user: User, org: Organization): Account[] {
  return org.accounts.filter(account => user.accountMemberships.includes(account.id))
}

export function getUserRole(accountId: string): string {
  const account = bweOrganization.accounts.find(a => a.id === accountId)
  if (!account) return 'Member'
  return account.type === 'broker' ? 'Admin' : 'Lender Contact'
}
