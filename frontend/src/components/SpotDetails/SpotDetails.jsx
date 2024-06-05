import "./SpotDetails.css";

const SpotDetails = ({ spot }) => {
  console.log(spot)
  return (
    <div>
      <h2 className='spot-title'>{spot.name}</h2>
      <p className='spot-location'>
        {spot.city}, {spot.state}, {spot.country}
      </p>
      <div className='spot-images'>
        {spot.SpotImages.map((image) => (
          <img key={image.id} src={image.url} />
        ))}
      </div>
      <div>
        <h2 className='spot-host'>
          Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
        </h2>
        <p className='spot-description'>{spot.description}</p>
        <div className='spot-callout'>
          <p className='callout-price'>${spot.price} night</p>
          <p className='callout-rating'>{spot.avgStarRating}</p>
          <button>Reserve</button>
        </div>
        <h3 className='spot-rating'>{spot.avgStarRating}</h3>
      </div>
    </div>
  );
};

export default SpotDetails;
