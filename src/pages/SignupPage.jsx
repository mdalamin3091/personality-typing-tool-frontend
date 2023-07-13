import { useEffect, useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../redux/features/user/userApi";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/user/userSlice";

const SignupPage = () => {
	const [userName, setUsername] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [signup, { data, isSuccess, isError, error }] = useSignupMutation();

	const handleSubmit = (e) => {
		e.preventDefault();
		const signupData = { name: userName, email, password };
		signup(signupData);
	};

	useEffect(() => {
		if (isSuccess && data) {
			navigate("/");
			dispatch(setUser(data.data));
			toast.success(data.message);
		} else if (isError) {
			toast.error(error.data.message)
		}
	}, [isSuccess, data, isError]);

	return (
		<div className="max-w-md md:max-w-lg m-auto p-5 my-12">
			<div className="w-48 md:w-72 mx-auto">
				<img
					src="https://placehold.co/400x400?text=App+Logo"
					alt="Logo"
					className="object-cover rounded-full max-w-60 mx-auto"
				/>
			</div>

			<form onSubmit={handleSubmit} className="p-2 my-8">
				<div className="flex flex-col gap-y-4">
					<div className="w-full">
						<Input
							label="Username"
							className="rounded-none"
							value={userName}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</div>
					<div className="w-full">
						<Input
							label="Email"
							type="email"
							value={email}
							className="rounded-none"
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className="w-full">
						<Input
							type="password"
							label="Password"
							value={password}
							className="rounded-none"
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<p className="text-right py-2">
							<Link to="/login">Login</Link>
						</p>
					</div>
				</div>

				<div className="mx-5">
					<Button type="submit" className="w-full bg-black mt-8 rounded-full">
						Sign up
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignupPage;
