import type { ReactNode } from "react"

interface SummaryProps {
  children: ReactNode
}

export const Summary = ({children}: SummaryProps) => (
  <div className="card bg-base-100 shadow-xl border border-base-300">
    <div className="card-body p-6">
      <h2 className="card-title justify-center text-xl font-bold">
        Workout Summary
      </h2>
      <div className="divider my-2"></div>
      {children}
    </div>
  </div>
)
