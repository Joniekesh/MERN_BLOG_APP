import "./comment.css";
import { format } from "timeago.js";

const Comment = ({ comment }) => {
	return (
		<>
			<div className="commentWrapper">
				<div className="commentTop">
					<div className="commentUserInfo">
						{comment.avataer ? (
							comment.avatar
						) : (
							<img className="commentImg" src="/assets/profile.jpeg" alt="" />
						)}

						<span className="commentNanme">{comment.name}</span>
					</div>
					<p className="commentItem">{comment.desc} </p>
				</div>
				<div className="commentBottom">
					<span className="commentDate">{format(comment.date)}</span>
				</div>
			</div>
		</>
	);
};

export default Comment;
