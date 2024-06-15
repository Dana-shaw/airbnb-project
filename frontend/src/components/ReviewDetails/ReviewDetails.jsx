import "./ReviewDetails.css";

const ReviewDetails = ({ review }) => {
  // console.log(review.Reviews[0].createdAt);
  const timestamp = review.Reviews[0].createdAt;
  const date = new Date(timestamp);
  const options = { year: "numeric", month: "long" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  // console.log(formattedDate);

  return (
    <div className="review-container">
      {review.Reviews.map((review) => (
        <>
          <h4>{review.User.firstName}</h4>
          <p>{formattedDate}</p>
          <p>{review.review}</p>
        </>
      ))}
    </div>
  );
};

export default ReviewDetails;
