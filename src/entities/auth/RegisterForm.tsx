import { useForm, SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Button } from 'ui/Buttons/Button'
import { Input } from 'ui/Inputs/Input'
import { emailRegexp, passwordRegexp } from 'shared/lib/constants/regexp'
import { CustomForm, FormWrapper, Heading, StyledLink } from './ui'
import { useRegisterMutation } from './api'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { IAuthCreate } from 'shared/models/auth.interface'
import { IBaseApiErrorResponse } from 'api/types'
import { isAxiosError } from 'axios'

export const RegisterForm = () => {
	const [registerUser, { isSuccess, isLoading, isError, error }] =
		useRegisterMutation()
	const navigate = useNavigate()

	useEffect(() => {
		if (isSuccess) {
			toast.success('Registration is successful')
			navigate('/login')
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

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IAuthCreate>({ mode: 'onChange', reValidateMode: 'onBlur' })

	const submitHandler: SubmitHandler<IAuthCreate> = async (dto, e) => {
		e?.preventDefault()

		try {
			await registerUser(dto)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<FormWrapper>
			<Heading> Register </Heading>
			<CustomForm onSubmit={handleSubmit(submitHandler)}>
				<Input
					{...register('username', {
						required: 'this field is required',
						minLength: {
							value: 4,
							message:
								'name should be at least 4 character length',
						},
					})}
					placeholder="Username"
					label="Username"
					error={errors?.username?.message}
				/>
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
						pattern: {
							value: passwordRegexp,
							message:
								'special symbol required or password not long enough',
						},
					})}
					placeholder="Password"
					label="Password"
					error={errors?.password?.message}
				/>
				<Button type="submit" text="Register" />
			</CustomForm>
			<StyledLink to="/login">Already have account?</StyledLink>
		</FormWrapper>
	)
}
