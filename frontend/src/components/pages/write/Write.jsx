import "./write.css";
import axios from "axios";
import { useState } from "react";
import Footer from "../../comments/footer/Footer";

const Write = ({ user }) => {
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");
	const [file, setFile] = useState("");
	const [category, setCategory] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const submitHandler = async (e) => {
		e.preventDefault();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		};

		const newPost = {
			user: user._id,
			name: user.name,
			avatar: user.avatar,
			title,
			desc,
			category,
		};

		if (file) {
			const data = new FormData();
			const filename = Date.now() + file.name;
			data.append("name", filename);
			data.append("file", file);

			newPost.photo = filename;

			try {
				await axios.post("/upload", data);
			} catch (err) {}
		}

		try {
			const res = await axios.post("/posts", newPost, config);

			setTimeout(() => {
				setSuccess("");
			}, 5000);
			window.location.replace("/post/" + res.data._id);
			return setSuccess("Post succesfully created.");
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
		<div className="write">
			<div className="container">
				<div className="writeWrapper">
					{file && (
						<img className="writeImg" src={URL.createObjectURL(file)} alt="" />
					)}
					<form onSubmit={submitHandler}>
						<div className="writeFormGroup">
							{error && <span className="error">{error}</span>}
							{success && <span className="success">{success}</span>}
							<div>
								<label htmlFor="fileInput">
									<i className=" fileInputIcon fas fa-plus"></i>
									<input
										className="writeFormGroupInput"
										type="file"
										id="fileInput"
										style={{ display: "none" }}
										onChange={(e) => setFile(e.target.files[0])}
									/>
								</label>
							</div>

							<select
								className="categorySelect"
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							>
								<option>* Select Category</option>
								<option value="sports">sports</option>
								<option value="music">music</option>
								<option value="entertainment">entertainment</option>
								<option value="food">food</option>
								<option value="culture">culture</option>
								<option value="tourism">tourism</option>
								<option value="technology">technology</option>
								<option value="agriculture">agriculture</option>
								<option value="education">education</option>
								<option value="lifestyle">lifestyle</option>
								<option value="family">family</option>
								<option value="religion">religion</option>
								<option value="fashion">fashion</option>
								<option value="career">career</option>
								<option value="business">business</option>
								<option value="pets">pets</option>
								<option value="investment">investment</option>
								<option value="automobile">automobile</option>
								<option value="politics">politics</option>
							</select>
							<input
								className="titleInput"
								type="text"
								placeholder="Title"
								autoFocus={true}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</div>
						<textarea
							className="writeTextArea"
							defaultValue="Create a post"
							rows="10"
							onChange={(e) => setDesc(e.target.value)}
						></textarea>
						<div className="writeSubmitBtnDiv">
							<button className="writeSubmitBtn" type="submit">
								Publish
							</button>
						</div>
					</form>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Write;
