import { useSelector } from "react-redux";
import DeleteModalButton from "../DeleteModalButton"
import DeleteSpotModal from "../DeleteSpotModal/DeleteSpotModal";
import "./ReviewDetails.css";

const ReviewDetails = ({ review }) => {
  console.log(review);
  const timestamp = review[0].createdAt;
  const date = new Date(timestamp);
  const options = { year: "numeric", month: "long" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  console.log(formattedDate);

  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="review-container">

        <>
          <h4>{review[0].User.firstName}</h4>
          <p>{formattedDate}</p>
          <p>{review[0].review}</p>
          {sessionUser.id === review.userId ? <DeleteModalButton itemText="Delete" modalComponent={<DeleteSpotModal id={review.spotId}/>}/> : <></>}
        </>

    </div>
  );
};

export default ReviewDetails;
