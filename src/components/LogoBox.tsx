import { Link } from 'react-router-dom'

//image
import logo from '@/assets/images/logo.png'
// import logoSm from '@/assets/images/logo-sm.png'
// import logoDark from '@/assets/images/logo-dark.png'

const LogoBox = () => {
	return (
		<>
			<Link to="/" className="logo-box">
				<div className="logo-light">
					<div className="flex items-center gap-2 logo-lg">
						<img src={logo} className="logo-lg h-[50px]" alt="Light logo" />
						<h3 className="text-[24px] font-bold text-white">Best</h3>
					</div>
					<img src={logo} className="logo-sm h-[25px]" alt="Small logo" />
				</div>

				<div className="logo-dark">
					<div className="flex items-center gap-2 logo-lg">
						<img src={logo} className="logo-lg h-[50px]" alt="Dark logo" />
						<h3 className="text-[24px] font-bold text-black">Best</h3>
					</div>
					<img src={logo} className="logo-sm h-[22px]" alt="Small logo" />
				</div>
			</Link>
		</>
	)
}

export default LogoBox
