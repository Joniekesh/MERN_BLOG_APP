import "./sideBar.css";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		const fetchCats = async () => {
			const res = await axios.get("/categories");
			setCategories(res.data);
		};
		fetchCats();
	}, []);

	return (
		<div className="sidebar">
			<div className="sidebarWrapper">
				<p className="aboutMe">ABOUT ME</p>
				<img className="sidebarImg" src="/assets/profile.jpeg" alt="" />
				<p className="sidebarDesc">
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni
					accusantium voluptatum possimus tempora molestias, blanditiis ea
					doloribus error ratione provident.
				</p>
				<div className="sidebarCategories">
					<ul className="sidebarCategoryList">
						{categories.map((category) => (
							<Link to={`/?cat=${category.name}`} key={category._id}>
								<li className="sidebarCategoryListItem">{category.name}</li>
							</Link>
						))}
					</ul>
					<div className="sidebarCatSocial">
						<i
							className=" navbarLeftIcon fab fa-facebook"
							style={{ backgroundColor: "#3b5998" }}
						></i>
						<i
							className=" navbarLeftIcon fab fa-twitter"
							style={{ backgroundColor: "#00acee" }}
						></i>
						<i
							className=" navbarLeftIcon fab fa-instagram"
							style={{ backgroundColor: "#f09433" }}
						></i>
						<i
							className=" navbarLeftIcon fab fa-linkedin"
							style={{ backgroundColor: "#0e76a8" }}
						></i>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SideBar;
