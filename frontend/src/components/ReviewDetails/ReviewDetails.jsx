import { useSelector } from "react-redux";
import DeleteModalButton from "../DeleteModalButton";
import DeleteReviewModal from "../DeleteReviewModal/DeleteReviewModal";
import "./ReviewDetails.css";

const ReviewDetails = ({ review }) => {
  console.log(review);
  const timestamp = review.createdAt;
  const date = new Date(timestamp);
  const options = { year: "numeric", month: "long" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  // console.log(formattedDate);

  const sessionUser = useSelector((state) => state.session.user);
  console.log(sessionUser)

  return (
    <div className="review-container">
      {review && (
        <>
          <h4>{review.User.firstName || sessionUser.firstName}</h4>
          <p>{formattedDate}</p>
          <p>{review.review}</p>
          {sessionUser.id === review.userId ? (
            <span>
              <DeleteModalButton
                itemText="Delete"
                modalComponent={<DeleteReviewModal id={review.id} />}
              />{" "}
            </span>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
};

export default ReviewDetails;
