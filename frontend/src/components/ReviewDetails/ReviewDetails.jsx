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

//   export function formatReleaseDate(date) {
//     return new Date(date).toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//     });
// }

  const sessionUser = useSelector((state) => state.session.user);
  // console.log(sessionUser)

  return (
    <>
      {review && (
        <div className="review-container">
          <h4 className="review-user">{review.User?.firstName || sessionUser.firstName}</h4>
          <p className="review-date">{formattedDate}</p>
          <p className="review">{review.review}</p>
          {sessionUser?.id === review.userId ? (
            <span>
              <DeleteModalButton
                itemText="Delete"
                modalComponent={<DeleteReviewModal id={review.id} />}
              />{" "}
            </span>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};

export default ReviewDetails;
