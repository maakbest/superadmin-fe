import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '../../redux/store'
import { authApiResponseError, loginUser, resetAuth } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import AuthLayout from '../../components/AuthPageLayout/AuthLayout'
import AuthContainer from '../../components/AuthPageLayout/AuthContainer'
import VerticalForm from '../../components/VerticalForm'
import FormInput from '../../components/FormInput'
import { getAuthSession } from '@/utils/storage'
import { error } from 'console'
import DismissibleAlert from '../ui/DismissibleAlert'
import { AuthActionTypes } from '@/redux/auth/constants'

interface UserData {
	username: string
	password: string
}

const BottomLink = () => (
	<div className="text-center my-4">
		<p className="text-muted">
			Don&apos;t have an account?&nbsp;
			<Link to="/auth/register" className="text-muted ms-1 link-offset-3 underline underline-offset-4">
				<b>Sign Up</b>
			</Link>
		</p>
	</div>
)

const PasswordInputChild = () => (
	<Link to="/auth/recover-password" className="text-muted text-xs underline decoration-dashed underline-offset-4">
		Forgot your password?
	</Link>
)

const Login = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch<AppDispatch>()
	const [tempError, setTempError] = useState(false)
	// @ts-ignore
	const { user, userLoggedIn, loading, error } = useSelector((state: RootState) => ({
		user: state.Auth.user,
		loading: state.Auth.loading,
		error: state.Auth.error,
		userLoggedIn: state.Auth.userLoggedIn,
	}))

	const session = getAuthSession()
	const token = session?.token

	// ✅ run only once when component mounts
	useEffect(() => {
		dispatch(resetAuth())
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [resetAuth])

	const schemaResolver = yupResolver(
		yup.object().shape({
			username: yup.string().required('Please enter Email'),
			password: yup.string().required('Please enter Password'),
		})
	)

	const onSubmit = (formData: UserData) => {
		dispatch(loginUser(formData.username, formData.password))
	}

	// const location = useLocation()
	// const redirectUrl = location?.search?.slice(6) || '/'

	// ✅ Redirect only when token exists (or userLoggedIn)
	useEffect(() => {
		if (token) {
			navigate('/', { replace: true })
		}
	}, [token, navigate])

	return (
		<AuthContainer>
			{error && <DismissibleAlert isVisible={error} variant="danger" message={error} onclose={() => dispatch(authApiResponseError(AuthActionTypes.LOGIN_USER, ''))} />}
			<AuthLayout authTitle="Sign In" helpText="Enter your email address and password to access admin panel.">
				<VerticalForm<UserData> onSubmit={onSubmit} resolver={schemaResolver}>
					<FormInput label="Email Address" type="email" name="username" className="form-input" placeholder="Enter your email" containerClass="mb-6 space-y-2" labelClassName="font-semibold text-gray-500" required />

					<FormInput label="Password" type="password" name="password" placeholder="Enter your password" className="form-input rounded-e-none" containerClass="mb-6 space-y-2" labelClassName="font-semibold text-gray-500" labelContainerClassName="flex justify-between items-center mb-2" required />
					{/* <PasswordInputChild />
					</FormInput> */}

					{/* <FormInput label="Remember me" type="checkbox" name="checkbox" className="form-checkbox rounded text-primary" containerClass="mb-6" labelClassName="ms-2" defaultChecked /> */}

					<div className="text-center mb-6">
						<button className="btn bg-primary text-white" type="submit" disabled={loading}>
							Log In
						</button>
					</div>
				</VerticalForm>
			</AuthLayout>
		</AuthContainer>
	)
}

export default Login
