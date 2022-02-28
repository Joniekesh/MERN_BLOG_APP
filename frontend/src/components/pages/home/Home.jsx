import "./home.css";
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Posts from "../../posts/Posts";
import SideBar from "../../sidebar/SideBar";
import axios from "axios";
import Footer from "../../comments/footer/Footer";

const Home = () => {
	const [posts, setPosts] = useState([]);
	const [categories, setCategories] = useState([]);

	const { search } = useLocation();

	const PF = "http://localhost:5000/images/";

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const res = await axios.get("/posts" + search);
				setPosts(res.data);
			} catch (error) {}
		};
		fetchPosts();
	}, [search]);

	useEffect(() => {
		const fetchCats = async () => {
			const res = await axios.get("/categories");
			setCategories(res.data);
		};
		fetchCats();
	}, []);

	return (
		<div className="home">
			<div className="container">
				<div className="logoContainer">
					<span className="logoSm">MERN STACK</span>
					<span className="logoLg">BLOG</span>
				</div>
				<img className="homeImg" src={PF + "home.jpeg"} alt="" />
				<div className="postCategories">
					<h2>Categories: </h2>
					<ul className="categoryList">
						{categories.map((cat) => (
							<Link to={`/?cat=${cat.name}`} key={cat._id}>
								<li className="categoryListItem" key={cat._id}>
									<button className="catListBtn">{cat.name}</button>
								</li>
							</Link>
						))}
					</ul>
				</div>
				<div className="postsContainer">
					<Posts posts={posts} />
					<SideBar />
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Home;
