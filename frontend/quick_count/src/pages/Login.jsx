const Login = () => {
	return (
		<div className="flex justify-center items-center bg-background h-screen">
			<div className="w-[350px] h-[350px] bg-custom-white rounded-2xl flex flex-col p-10 items-center">
				<p className="font-header text-4xl font-extrabold mb-5">Quick Count</p>
				<div className="w-full h-full flex flex-col space-y-7">
					<p className="font-header text-3xl text-main">Log In</p>
					<div>
						<p className="font-sans text-[1.1rem]">Username</p>
						<input type="text" className="w-full outline outline-[0.1rem] h-12 outline-outline rounded-md"/>
					</div>
					<div>
						<p className="font-sans text-[1.1rem]">Password</p>
						<input type="text" className="w-full outline outline-[0.1rem] h-12 outline-outline rounded-md"/>
					</div>
					<button className="bg-main h-14 rounded-md text-custom-white text-[1.2rem]">Login</button>
				</div>

			</div>

		</div>
	)
}

export default Login