import "./settings.css";
import { useState } from "react";
import axios from "axios";
import Footer from "../../comments/footer/Footer";

const Settings = ({ user }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [file, setFile] = useState("");
	const [password, setPassword] = useState("");
	const [success, setSuccess] = useState("");

	const PF = "http://localhost:5000/images/";

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
			name,
			email,
			password,
		};
		if (file) {
			const data = new FormData();
			const filename = Date.now() + file.name;
			data.append("name", filename);
			data.append("file", file);

			updatedUser.avatar = filename;

			try {
				await axios.post("/upload", data);
			} catch (error) {}
		}

		try {
			const res = axios.put("/users/me", updatedUser, config);
			setTimeout(() => {
				setSuccess("");
			}, 5000);
			setSuccess("Profile Successfully Updated");
			window.location.replace("/");
		} catch (error) {}
	};

	const deleteAccount = async () => {
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		};
		if (window.confirm("Are you SURE? This cannot be UNDONE!")) {
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
							{success && <span className="success">{success}</span>}
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
										src={file ? URL.createObjectURL(file) : PF + user?.avatar}
										alt=""
									/>
									<label htmlFor="fileInput">
										<i className=" fileInputImgIcon far fa-user-circle"></i>
										<input
											type="file"
											id="fileInput"
											style={{ display: "none" }}
											onChange={(e) => setFile(e.target.files[0])}
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
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</div>
								<div className="settingsFormGroup">
									<label htmlFor="name">Email</label>
									<input
										type="email"
										placeholder={user.email}
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
								<div className="settingsFormGroup">
									<label htmlFor="password">Password</label>
									<input
										type="password"
										value={password}
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
