import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState,useRef } from "react";
import { useParams } from "react-router-dom";
import { fetchReviews } from "../../store/reviews";
import ReviewDetails from "../ReviewDetails/ReviewDetails";
import { FaStar } from "react-icons/fa";
import "./SpotDetails.css";
import OpenModalButton from "../OpenModalButton";
import ReviewFormModal from "../ReviewFormModal/ReviewFormModal";

const SpotDetails = ({ Owner, ownerId, SpotImages, avgStarRating, city, country, description, name, numReviews, price, state }) => {
  //   console.log(spot);
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [noReviews, setNoReviews] = useState(false);

  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);


  const sessionUser = useSelector((state) => state.session.user);
  const reviews = Object.values(useSelector((state) => state.reviews));
  const userReviews = reviews.filter((review) => review.userId === sessionUser.id);
  console.log(reviews)
  // console.log(reviews)

  useEffect(() => {
    dispatch(fetchReviews(spotId))
      .catch((error) => {
        if (error.status === 404) {
          setNoReviews(true);
        }
      })
      .then(() => setIsLoaded(true));
  }, [dispatch, spotId]);

  return isLoaded ? (
    <div className="page">
      <h2 className="spot-title">{name}</h2>
      <p className="spot-location">
        {city}, {state}, {country}
      </p>
      <div className="spot-images">
        {SpotImages.map((image) => (
          <img
            key={image.id}
            src={image.url}
            className={`preview-${image.preview}`}
          />
        ))}
      </div>
      <div className="details-container">
        <div className="details-text">
          <h2 className="spot-host">
            Hosted by {Owner.firstName} {Owner.lastName}
          </h2>
          <p className="spot-description">{description}</p>
        </div>
        <div className="callout-container">
          <div className="callout-text">
            <p className="callout-price">${price} night</p>
            <p className="callout-rating">
              <FaStar />
              {avgStarRating
                ? Math.round(avgStarRating * 100) / 100
                : "New"}{" "}
              {numReviews ? "・" + numReviews : ""}{" "}
              {numReviews === 0
                ? ""
                : numReviews > 1
                ? "reviews"
                : "review"}
            </p>
          </div>
          <div className="button-container">
            <button className="button">Reserve</button>
          </div>
        </div>
      </div>
      <div>
        <h3 className="spot-rating">
          <FaStar />
          {avgStarRating
            ? Math.round(avgStarRating * 100) / 100
            : "New"}{" "}
          {numReviews ? "・" + numReviews : ""}{" "}
          {numReviews === 0
            ? ""
            : numReviews > 1
            ? "reviews"
            : "review"}
        </h3>
        <div>
          {sessionUser &&  sessionUser.id !== ownerId ? (
            <OpenModalButton
              itemText="Leave a Review!"
              onButtonClick={closeMenu}
              modalComponent={<ReviewFormModal spotId={spotId}/>}
            />
          ) : sessionUser &&  userReviews.length === 0 ? (
            userReviews.map((review) => {
              review.spotId !== spotId && (
                <OpenModalButton
                  itemText="Leave a Review!"
                  onButtonClick={closeMenu}
                  modalComponent={<ReviewFormModal />}
                />
              );
            })
          ): <></>}
          {reviews.map((review) => (
            <ReviewDetails key={review.id} review={[review]} />
          ))}
        </div>
      </div>
    </div>
  ) : (
    <h3>Loading...</h3>
  );
};

export default SpotDetails;
