import "./ReviewDetails.css";

const ReviewDetails = ({ review }) => {
  //   console.log(typeof review.createdAt);
  const timestamp = review.createdAt;
  const date = new Date(timestamp);
  const options = { year: "numeric", month: "long" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
//   console.log(formattedDate);

  return (
    <div className="review-list">
      <div className="review-container">
        <h4 className="review-user">{review.User.firstName}</h4>
        <p className="review-date">{formattedDate}</p>
        <p className="review-text">{review.review}</p>
      </div>
    </div>
  );
};

export default ReviewDetails;
