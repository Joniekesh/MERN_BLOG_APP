import "./contact.css";
import Footer from "../../footer/Footer";
import { useRef } from "react";
import { useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
	const formRef = useRef();
	const [done, setDone] = useState(false);

	const SERVICE = process.env.REACT_APP_EMAILJS_SERVICE_KEY;

	const TEMPLATE = process.env.REACT_APP_EMAILJS_TEMPLATE_KEY;
	const USER = process.env.REACT_APP_EMAILJS_USER_ID;

	const onSubmitHandler = (e) => {
		e.preventDefault();

		emailjs.sendForm(SERVICE, TEMPLATE, formRef.current, USER).then(
			(result) => {
				console.log(result.text);
				setDone(true);
			},
			(error) => {
				console.log(error.text);
			}
		);
	};
	return (
		<>
			<div className="contact">
				<div className="container">
					<div className="contactWrapper">
						<h2>Contact The Admin</h2>
						<div className="contactInfoWrapper">
							<form
								ref={formRef}
								onSubmit={onSubmitHandler}
								className="contactLeft"
							>
								<input type="text" placeholder="Name" name="user_name" />
								<input type="email" placeholder="Email" name="user_email" />
								<input type="text" placeholder="Subject" name="user_subject" />
								<textarea placeholder="Message" rows="5" name="message" />
								<button className="contactBtn" type="submit">
									SEND
								</button>
								{done && (
									<span style={{ color: "green" }}>
										Email sent.You will receive a reply soon.
										<br />
										Thank You!
									</span>
								)}
							</form>
							<div className="contactRight">
								<div className="contactRightAddress">
									<div className="contactPhone">
										<i className="fa-solid fa-phone phone"></i>
										<span>+234 8012 3456 789</span>
									</div>
									<div className="contactEmail">
										<i className="fa-solid fa-envelope email"></i>
										<span>okorojohndarlington@gmail.com</span>
									</div>
								</div>
								<div className="contactSocialIconWrapper">
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
				</div>
				<Footer />
			</div>
		</>
	);
};

export default Contact;
