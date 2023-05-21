import { FC, ReactNode } from 'react'
import { Container } from './ui'


interface IAuthContainer {
	children: ReactNode
}


export const AuthContainer: FC<IAuthContainer> = ({ children }) => {
	return <Container>{children}</Container>
}
