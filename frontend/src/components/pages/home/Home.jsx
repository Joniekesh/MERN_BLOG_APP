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
				<img className="homeImg" src="/assets/home.jpeg" alt="" />
				<div className="postCategories">
					<h2>Categories: </h2>
					<ul className="categoryList">
						{categories.map((cat) => (
							<li className="categoryListItem" key={cat._id}>
								<Link to={`/?cat=${cat.name}`}>
									<button className="catListBtn">{cat.name}</button>
								</Link>
							</li>
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
