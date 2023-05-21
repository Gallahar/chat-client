import { SubmitHandler, useForm } from 'react-hook-form'
import { Input } from 'ui/Inputs/Input'
import { Button } from 'ui/Buttons/Button'
import { CustomForm, Heading, StyledLink, FormWrapper } from './ui'
import { useLoginMutation } from './api'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { IAuthLogin } from 'shared/models/auth.interface'
import { useAppSelector } from 'store'

export const LoginForm = () => {
	const [login, { isError, isSuccess, isLoading, error }] = useLoginMutation()
	const user = useAppSelector((state) => state.userState.user)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IAuthLogin>({
		mode: 'onChange',
		reValidateMode: 'onBlur',
	})

	useEffect(() => {
		if (isSuccess) {
			toast.success('Login successful')
			console.log('navigated to chat window')
			console.log(user?.email)
		}
		if (isError) {
			toast.error(error?.data?.message)
		}
	}, [isLoading])

	const submitHandler: SubmitHandler<IAuthLogin> = async (dto, e) => {
		e?.preventDefault()
		await login(dto)
	}

	return (
		<FormWrapper>
			<Heading> Login </Heading>
			<CustomForm onSubmit={handleSubmit(submitHandler)}>
				<Input
					{...register('email', {
						required: 'this field is required',
					})}
					label="email"
					error={errors.email?.message}
				/>
				<Input
					{...register('password', {
						required: 'this field is required',
					})}
					label="Password"
					error={errors.password?.message}
				/>
				<Button type="submit" text="Login" />
			</CustomForm>
			<StyledLink to="/register">Need an account?</StyledLink>
		</FormWrapper>
	)
}
