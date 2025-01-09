import {useState} from "react";

const Login = ({login}) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleLogin = async (event) => {
		event.preventDefault();
		setError('');

		try {
			const loginResult = await login({username, password});

			if (loginResult && loginResult.status === 'error') {
				setError(loginResult.error || 'Login failed');

				setTimeout(() => {
					setError('');
					setUsername('');
					setPassword('');
				}, 3000);
				return;
			}

			setUsername('');
			setPassword('');
		} catch (error) {
			// Handle network errors or unexpected errors
			setError('An unexpected error occurred');

			// Clear error after 2 seconds and refresh page
			setTimeout(() => {
				setError('');
			}, 2000);

			console.error(error);
		}
	}

	return (
		<div className="flex justify-center items-center bg-background h-screen flex-col">
			<div className="w-[350px] h-[360px] bg-custom-white rounded-2xl flex flex-col p-10 items-center">
				<p className="font-header text-4xl font-extrabold mb-5">Quick Count</p>
				<div className="w-full h-full flex flex-col space-y-7">
					<p className="font-header text-3xl text-main">Log In Petugas TPS</p>
					{error && (
						<div className="bg-red-100 absolute border-red-400 text-red-700 px-4 py-3 rounded-2xl" role="alert">
							{error}
						</div>
					)}
					<form onSubmit={handleLogin}>
						<div>
							<p className="font-sans text-[1.1rem] mb-2">Username</p>
							<input
								type="text"
								id="username"
								value={username}
								onChange={({target}) => setUsername(target.value)}
								className="w-full outline outline-[0.1rem] h-12 outline-outline rounded-md px-4 mb-4"
							/>
						</div>
						<div>
							<p className="font-sans text-[1.1rem] mb-2">Password</p>
							<input
								type="password"
								id="password"
								value={password}
								onChange={({target}) => setPassword(target.value)}
								className="w-full outline outline-[0.1rem] h-12 outline-outline rounded-md px-4 mb-4"
							/>
						</div>
						<button
							type="submit"
							className="bg-main h-14 rounded-md text-custom-white text-[1.2rem] w-full mt-6"
						>
							Login
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Login