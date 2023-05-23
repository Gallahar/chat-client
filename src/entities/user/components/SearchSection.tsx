import { Input } from 'ui/Inputs/Input'
import { ChangeEvent, useState } from 'react'
import { useDebounce } from 'shared/hooks/useDebounce'
import { useFindUserQuery } from '../api'
import { Button } from 'ui/Buttons/Button'
import { UserCard } from './UserCard'
import styled from 'styled-components'


const SectionWrapper = styled.section`
	display: grid;
	grid-template-rows: max-content max-content;
	gap: 20px;
`

const SearchWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 110px;
	gap: 10px;
	border-bottom: 1px solid lightgrey;
	border-top: 1px solid lightgrey;
	padding: 10px 0;
	> button {
		font-size: 15px;
		padding: 5px;

		&:active {
			transform: scale(0.98);
		}
	}
`

const UsersContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: 20px;
`





export const SearchSection = () => {
	const [type, setType] = useState(false)
	const [search, setSearch] = useState('')
	const value = useDebounce(search, 400)
	const { data, isLoading } = useFindUserQuery({ value, type })

	const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value)
	}

	const onClickType = () => {
		setType(!type)
	}


	return (
		<SectionWrapper>
			<SearchWrapper>
				<Input
					onChange={onChangeInput}
					value={search}
					placeholder="Find user"
				/>
				<Button
					onClick={onClickType}
					text={`find by : ${type ? 'email' : 'name'}`}
				/>
			</SearchWrapper>
			<UsersContainer>
				{data &&
					data.map((user) => <UserCard key={user._id} user={user} />)}
			</UsersContainer>
		</SectionWrapper>
	)
}
