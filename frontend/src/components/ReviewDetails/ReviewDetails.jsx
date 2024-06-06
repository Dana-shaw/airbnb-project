import "./ReviewDetails.css";

const ReviewDetails = ({ review }) => {
  //   console.log(typeof review.createdAt);
  const timestamp = review.createdAt;
  const date = new Date(timestamp);
  const options = { year: "numeric", month: "long" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
//   console.log(formattedDate);

  return (
    <div>
      <div>
        <h4>{review.User.firstName}</h4>
        <p>{formattedDate}</p>
      </div>
      <div>
        <p>{review.review}</p>
      </div>
    </div>
  );
};

export default ReviewDetails;
