import "./SpotDetails.css";

const SpotDetails = ({ spot }) => {
  console.log(spot);
  return (
    <div>
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
            <p className="callout-rating">{spot.avgStarRating}</p>
          </div>
          <div className="button-container">
          <button>Reserve</button>
          </div>
        </div>
      </div>
      <h3 className="spot-rating">{spot.avgStarRating}</h3>
    </div>
  );
};

export default SpotDetails;
