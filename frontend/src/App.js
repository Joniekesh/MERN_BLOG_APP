import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./components/pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import SinglePost from "./components/pages/singlePost/SinglePost";
import Write from "./components/pages/write/Write";
import Register from "./components/pages/register/Register";
import Login from "./components/pages/login/Login";
import Settings from "./components/pages/settings/Settings";
import About from "./components/pages/about/About";
import Contact from "./components/pages/contact/Contact";

const token = localStorage.getItem("token");

function App() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const getUser = async () => {
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			};

			if (token) {
				try {
					const res = await axios.get("/auth/me", config);
					setUser(res.data);
				} catch (error) {
					console.log(error);
				}
			}
		};
		getUser();
	}, [token]);

	return (
		<Router>
			<Navbar user={user} />
			<Routes>
				<Route exact path="/" element={<Home />}></Route>
				<Route
					path="/post/:postId"
					element={<SinglePost user={user} />}
				></Route>
				<Route path="/about" element={<About />}></Route>
				<Route path="/contact" element={<Contact />}></Route>
				<Route
					path="/write"
					element={!user ? <Navigate to="/login" /> : <Write user={user} />}
				></Route>
				<Route
					path="/settings"
					element={!user ? <Navigate to="/login" /> : <Settings user={user} />}
				></Route>
				<Route
					path="/register"
					element={user ? <Navigate to="/" /> : <Register />}
				></Route>
				<Route
					path="/login"
					element={user ? <Navigate to="/" /> : <Login />}
				></Route>
			</Routes>
		</Router>
	);
}

export default App;
