import { SubmitHandler, useForm } from 'react-hook-form'
import { Input } from 'ui/Inputs/Input'
import { Button } from 'ui/Buttons/Button'
import { CustomForm, Heading, StyledLink, FormWrapper } from './ui'
import { useLoginMutation } from './api'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { IAuthLogin } from 'shared/models/auth.interface'
import { isAxiosError } from 'axios'
import { IBaseApiErrorResponse } from 'api/types'
import { emailRegexp } from 'shared/lib/constants/regexp'
import { useNavigate } from 'react-router-dom'

export const LoginForm = () => {
	const [login, { isError, isSuccess, isLoading, error }] = useLoginMutation()
	const navigate = useNavigate()

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
			navigate('/chats')
		}
		if (isError) {
			if (!isAxiosError(error)) {
				const currentError = error as IBaseApiErrorResponse
				if (Array.isArray(currentError.data.message)) {
					currentError.data.message.forEach((message) =>
						toast.error(message)
					)
				} else {
					toast.error(currentError.data.message)
				}
			}
		}
	}, [isLoading])

	const submitHandler: SubmitHandler<IAuthLogin> = (dto, e) => {
		e?.preventDefault()
		login(dto)
	}

	return (
		<FormWrapper>
			<Heading> Login </Heading>
			<CustomForm onSubmit={handleSubmit(submitHandler)}>
				<Input
					{...register('email', {
						required: 'this field is required',
						pattern: {
							value: emailRegexp,
							message: 'email must be an email',
						},
					})}
					placeholder="Email address"
					label="Email address"
					error={errors?.email?.message}
				/>
				<Input
					{...register('password', {
						required: 'this field is required',
						minLength: {
							value: 6,
							message:
								'Password cannot be less than 6 characters!',
						},
					})}
					placeholder="Password"
					label="Password"
					error={errors?.password?.message}
				/>
				<Button type="submit" text="Login" />
			</CustomForm>
			<StyledLink to="/register">Need an account?</StyledLink>
		</FormWrapper>
	)
}
