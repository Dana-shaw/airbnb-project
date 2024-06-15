import "./ReviewDetails.css";

const ReviewDetails = ({ review }) => {
  console.log(review.Reviews);
  // const timestamp = review.createdAt;
  // const date = new Date(timestamp);
  // const options = { year: "numeric", month: "long" };
  // const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  //   console.log(formattedDate);

  return (
    <div className="review-list">
      <div className="review-container">
        {review.Reviews.map((review) => (
          <>
            <h4>{review.User.firstName}</h4>
            <p>{review.review}</p>
          </>
        ))}
      </div>
    </div>
  );
};

export default ReviewDetails;
