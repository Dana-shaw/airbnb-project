import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState,useRef } from "react";
import { useParams } from "react-router-dom";
import { fetchReviews } from "../../store/reviews";
import ReviewDetails from "../ReviewDetails/ReviewDetails";
import { FaStar } from "react-icons/fa";
import "./SpotDetails.css";
import OpenModalButton from "../OpenModalButton";
import ReviewFormModal from "../ReviewFormModal/ReviewFormModal";

const SpotDetails = ({ spot }) => {
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


  const reviews = useSelector((state) => state.reviews);
  const userReviews = useSelector((state) => state.reviews.userReviews);
  const sessionUser = useSelector((state) => state.session.user);


  useEffect(() => {
    dispatch(fetchReviews(spotId))
      .catch((error) => {
        if (error.status === 404) {
          setNoReviews(true);
        }
      })
      .then(() => setIsLoaded(true));
  }, []);

  return isLoaded ? (
    <div className="page">
      <h2 className="spot-title">{spot.name}</h2>
      <p className="spot-location">
        {spot.city}, {spot.state}, {spot.country}
      </p>
      <div className="spot-images">
        {spot.SpotImages.map((image) => (
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
            Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
          </h2>
          <p className="spot-description">{spot.description}</p>
        </div>
        <div className="callout-container">
          <div className="callout-text">
            <p className="callout-price">${spot.price} night</p>
            <p className="callout-rating">
              <FaStar />
              {spot.avgStarRating
                ? Math.round(spot.avgStarRating * 100) / 100
                : "New"}{" "}
              {spot.numReviews ? "・" + spot.numReviews : ""}{" "}
              {spot.numReviews === 0
                ? ""
                : spot.numReviews > 1
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
          {spot.avgStarRating
            ? Math.round(spot.avgStarRating * 100) / 100
            : "New"}{" "}
          {spot.numReviews ? "・" + spot.numReviews : ""}{" "}
          {spot.numReviews === 0
            ? ""
            : spot.numReviews > 1
            ? "reviews"
            : "review"}
        </h3>
        <div>
          {Object.keys(userReviews).length === 0 ? (
            <OpenModalButton
              itemText="Leave a Review!"
              onButtonClick={closeMenu}
              modalComponent={<ReviewFormModal />}
            />
          ) : (
            Object.values(userReviews).map((review) => {
              review.spotId !== spotId && (
                <OpenModalButton
                  itemText="Leave a Review!"
                  onButtonClick={closeMenu}
                  modalComponent={<ReviewFormModal />}
                />
              );
            })
          )}
          {Object.values(reviews.reviewsList).map((review) => (
            <ReviewDetails key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  ) : (
    <h3>Loading...</h3>
  );
};

export default SpotDetails;
