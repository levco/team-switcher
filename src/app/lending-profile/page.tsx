"use client"

import * as React from "react"
import { useHeader } from "@/contexts/header-context"
import { Plus, FileText, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function LendingProfilePage() {
  const { setTitle } = useHeader()

  React.useEffect(() => {
    setTitle("Lending Profile")
    return () => setTitle(undefined)
  }, [setTitle])

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div className="max-w-2xl">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Lending Profile</h2>
          <p className="text-sm text-muted-foreground">Manage lending programs and marketing materials</p>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border divide-y">
            {/* Programs */}
            <Dialog>
              <DialogTrigger asChild>
                <button className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors w-full">
                  <div className="flex-1 text-left">
                    <div className="font-medium text-sm mb-1">Programs</div>
                    <div className="text-sm text-muted-foreground">Loan programs and products offered</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">3 programs</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </div>
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Lending Programs</DialogTitle>
                  <DialogDescription>
                    Loan programs and products offered
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 md:grid-cols-2 mt-4">
                  {/* Program 1 */}
                  <div className="rounded-lg border bg-card p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="font-semibold text-sm">Permanent Financing</h3>
                      <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-700">
                        Verified Program
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Loan Amount</span>
                        <span className="font-medium">$1M-20M</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Loan Type</span>
                        <span className="font-medium">Permanent</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Property Location</span>
                        <span className="font-medium">California, Illinois +4</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Asset Type</span>
                        <span className="font-medium">Multifamily, Office +3</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Capital Source</span>
                        <span className="font-medium">Balance Sheet</span>
                      </div>
                    </div>
                  </div>

                  {/* Program 2 */}
                  <div className="rounded-lg border bg-card p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="font-semibold text-sm">Bridge Financing</h3>
                      <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-700">
                        Verified Program
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Loan Amount</span>
                        <span className="font-medium">$500K-10M</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Loan Type</span>
                        <span className="font-medium">Bridge</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Property Location</span>
                        <span className="font-medium">Nationwide</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Asset Type</span>
                        <span className="font-medium">Multifamily, Retail</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Capital Source</span>
                        <span className="font-medium">Credit Facility</span>
                      </div>
                    </div>
                  </div>

                  {/* Program 3 */}
                  <div className="rounded-lg border bg-card p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="font-semibold text-sm">Construction Loans</h3>
                      <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-700">
                        Verified Program
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Loan Amount</span>
                        <span className="font-medium">$2M-50M</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Loan Type</span>
                        <span className="font-medium">Construction</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Property Location</span>
                        <span className="font-medium">Texas, Florida</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Asset Type</span>
                        <span className="font-medium">Multifamily</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Capital Source</span>
                        <span className="font-medium">Balance Sheet</span>
                      </div>
                    </div>
                  </div>

                  {/* Add New Program */}
                  <button className="rounded-lg border-2 border-dashed p-4 flex flex-col items-center justify-center gap-2 hover:bg-muted/50 transition-colors min-h-[200px]">
                    <Plus className="h-6 w-6 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">Add New Program</span>
                  </button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Tear Sheets */}
            <Dialog>
              <DialogTrigger asChild>
                <button className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors w-full">
                  <div className="flex-1 text-left">
                    <div className="font-medium text-sm mb-1">Tear Sheets</div>
                    <div className="text-sm text-muted-foreground">Marketing materials and product sheets</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">5 sheets</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </div>
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Tear Sheets</DialogTitle>
                  <DialogDescription>
                    Marketing materials and product sheets
                  </DialogDescription>
                </DialogHeader>
                
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-muted-foreground">5 files uploaded</p>
                    <Button variant="outline" size="sm" disabled>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload New
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {[
                      { name: 'BWE Lending Overview 2026.pdf', size: '2.4 MB', date: 'Feb 15, 2026' },
                      { name: 'Permanent Loan Program.pdf', size: '1.8 MB', date: 'Feb 10, 2026' },
                      { name: 'Bridge Financing Terms.pdf', size: '1.2 MB', date: 'Feb 5, 2026' },
                      { name: 'Construction Loan Details.pdf', size: '3.1 MB', date: 'Jan 28, 2026' },
                      { name: 'Rate Sheet Q1 2026.pdf', size: '856 KB', date: 'Jan 15, 2026' },
                    ].map((file, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">{file.name}</div>
                          <div className="text-xs text-muted-foreground">{file.size} • {file.date}</div>
                        </div>
                        <Button variant="ghost" size="sm" disabled>
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  )
}
