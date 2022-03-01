import "./login.css";

import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const onsubmitHandler = async (e) => {
		e.preventDefault();

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		try {
			const res = await axios.post("/auth", { email, password }, config);
			localStorage.setItem("token", res.data.token);
			window.location.replace("/");
		} catch (err) {
			const errors = err.response.data.errors;

			if (errors) {
				errors.forEach((error) => setError(error.msg));
			}
			setTimeout(() => {
				setError("");
			}, 5000);
		}
	};

	return (
		<div className="login">
			<div className="container">
				<div className="formWrapper">
					<h2 style={{ margin: "0" }}>Login</h2>
					{error && <span className="error">{error}</span>}
					<form onSubmit={onsubmitHandler}>
						<div className="formGroug">
							<label htmlFor="email">Email:</label>
							<input
								type="email"
								placeholder="Enter your email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="formGroug">
							<label htmlFor="password">Password:</label>
							<input
								type="password"
								placeholder="Enter your password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>{" "}
						</div>
						Not yet a member?{" "}
						<span className="loginLink">
							<Link to="/register">Register</Link>
						</span>
						<button className="submitBtn" type="submit">
							Login
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
