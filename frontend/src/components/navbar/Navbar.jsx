import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user }) => {
	const navigate = useNavigate();

	const PF = "http://localhost:5000/images/";

	const logoutHandler = () => {
		localStorage.removeItem("token");
		navigate("/");
		window.location.reload();
	};
	return (
		<div className="navbar">
			<div className="navbarLeft">
				<div className="navbarLeftWrapper">
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

			<div className="navbarCenter">
				<div className="navbarCenterWrapper">
					<ul className="navbarCenterList">
						<Link to="/">
							<li className="navbarCenterListItem ">HOME</li>
						</Link>
						<Link to="/about">
							<li className="navbarCenterListItem navAbout ">ABOUT</li>
						</Link>
						<Link to="/contact">
							<li className="navbarCenterListItem navContact">CONTACT</li>
						</Link>
						<Link to="/write">
							<li className="navbarCenterListItem">WRITE</li>
						</Link>
						{user && (
							<Link to="/">
								<li className="navbarCenterListItem" onClick={logoutHandler}>
									LOGOUT
								</li>
							</Link>
						)}
					</ul>
				</div>
			</div>

			<div className="navbarRight">
				<div className="navbarRightWrapper">
					{user && (
						<Link to="/settings">
							<img
								className="navbarRightImg"
								src={PF + user.avatar || PF + "avatar.jpeg"}
								alt=""
							/>
						</Link>
					)}

					{!user && (
						<ul className="navbarRightList">
							<>
								<Link to="/register">
									<li className="navbarRightListItem">REGISTER</li>
								</Link>
								<Link to="/login">
									<li className="navbarRightListItem">LOGIN</li>
								</Link>
							</>
						</ul>
					)}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
