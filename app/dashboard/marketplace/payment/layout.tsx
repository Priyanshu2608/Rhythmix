import type React from "react"
export default function PaymentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1">{children}</div>
    </div>
  )
}

