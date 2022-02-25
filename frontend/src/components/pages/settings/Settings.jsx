import "./settings.css";
import { useState } from "react";
import axios from "axios";
import Footer from "../../comments/footer/Footer";

const Settings = ({ user }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [avatar, setAvatar] = useState("");
	const [password, setPassword] = useState("");

	const handleUpdate = async (e) => {
		e.preventDefault();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		};

		const updatedUser = {
			user: user._id,
			name: user.name || name,
			email: user.email || email,
			avatar: user.avatar || avatar,
			password: user.password || password,
		};

		const res = await axios.put("/users/me", updatedUser, config);
		console.log(res.user);
	};

	const deleteAccount = async () => {
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		};
		if (window.confirm("Are you SURE? This cannot be undone!")) {
			try {
				await axios.delete("/users", config);
				window.location.replace("/");
			} catch (error) {}
		}
	};

	return (
		<div className="settings">
			<div className="container">
				<div className="settingsWrapper">
					<div className="settingsLeftWrapper">
						<div className="settingsTop">
							<span className="settingsTopText">Update Your Account</span>
							<span className="settinggsDeleteAccount" onClick={deleteAccount}>
								Delete Account
							</span>
						</div>
						<form>
							<div className="settingsCenter">
								<span className="settingsCenterText">Profile Picture</span>
								<div className="settingsCenterImgDiv">
									<img
										className="settingsCenterImgDivImg"
										src="/assets/profile.jpeg"
										alt=""
									/>
									<label htmlFor="fileInput">
										<i className=" fileInputImgIcon far fa-user-circle"></i>
										<input
											type="file"
											id="fileInput"
											style={{ display: "none" }}
											onChange={(e) => setAvatar(e.target.files[0])}
										/>
									</label>
								</div>
							</div>
							<div className="settingsBottom">
								<div className="settingsFormGroup">
									<label htmlFor="name">Name</label>
									<input
										type="text"
										placeholder={user.name}
										onChange={(e) => setName(e.target.value)}
									/>
								</div>
								<div className="settingsFormGroup">
									<label htmlFor="name">Email</label>
									<input
										type="email"
										placeholder={user.email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
								<div className="settingsFormGroup">
									<label htmlFor="password">Password</label>
									<input
										type="password"
										onChange={(e) => setPassword(e.target.value)}
									/>
								</div>
								<button className="settingsBottomButton" onClick={handleUpdate}>
									Update
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Settings;
