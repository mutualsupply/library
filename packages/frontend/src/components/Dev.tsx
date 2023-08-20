import { PropsWithChildren } from "react"
import { isDev } from "../lib/env"

interface DevProps {
  children: React.ReactNode
}

export default function Dev({ children }: DevProps) {
  if (isDev()) {
    return <>{children}</>
  }
  return null
}
