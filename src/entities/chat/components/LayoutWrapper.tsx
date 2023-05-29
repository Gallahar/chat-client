import { Container } from "entities/auth/ui"
import { ReactNode } from "react"

interface IChatContainerProps {
    children: ReactNode
}



export const LayoutWrapper = ({children}:IChatContainerProps) => {
  return <Container>{children}</Container>
}