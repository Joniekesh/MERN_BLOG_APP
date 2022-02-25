import "./register.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [error, setError] = useState("");

	const navigate = useNavigate();

	const submitHandler = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setPasswordError("");
			setConfirmPassword("");
			setTimeout(() => {
				setError("");
			}, 5000);
			return setError("Passwords do not match");
		}
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		try {
			const res = await axios.post("/users", { name, email, password }, config);
			localStorage.setItem("token", res.data.token);
			window.location.replace("/");
		} catch (err) {
			const errors = err.response.data.errors;
			if (errors) {
				errors.forEach((error) => setError(error.msg));

				setTimeout(() => {
					setError("");
				}, 5000);
			}
		}
	};
	return (
		<div className="register">
			<div className="container">
				<div className="formWrapper">
					<h2 style={{ margin: "0" }}>Register</h2>
					{error && <span className="error">{error}</span>}
					<form onSubmit={submitHandler}>
						<div className="formGroug">
							<label htmlFor="name">Name:</label>
							<input
								type="text"
								placeholder="Enter your name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
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
							/>
						</div>
						<div className="formGroug">
							<label htmlFor="confirmPassword">Confirm Password:</label>
							<input
								type="password"
								placeholder="Confirm password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								autoComplete="true"
							/>
						</div>
						Already a member?{" "}
						<span className="loginLink">
							<Link to="/login">Login</Link>
						</span>
						<button className="submitBtn" type="submit">
							Register
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
