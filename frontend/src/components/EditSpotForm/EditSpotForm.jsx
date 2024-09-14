import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateSpot } from "../../store/spots";

const EditSpotForm = () => {
  const { spotId } = useParams();
  const navigate = useNavigate();
  const spot = Object.values(useSelector((state) => state.spots)).filter(
    (spot) => spot.id === parseInt(spotId)
  );
  // const spot = ownedSpots.filter((spot) => spot.id === parseInt(spotId))
  console.log(spot[0]);

  const [country, setCountry] = useState(spot[0].country);
  const [address, setAddress] = useState(spot[0].address);
  const [city, setCity] = useState(spot[0].city);
  const [state, setState] = useState(spot[0].state);
  const [lat, setLat] = useState(spot[0].lat);
  const [lng, setLng] = useState(spot[0].lng);
  const [description, setDescription] = useState(spot[0].description);
  const [name, setName] = useState(spot[0].name);
  const [price, setPrice] = useState(spot[0].price);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  //   const navigate = useNavigate();

  //   const spot = useSelector((state) => state.spots.ownedSpots);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};

    

    if (!country) {
      errors.country = "Country is required";
    }

    if (!address) {
      errors.address = "Address is required";
    }

    if (!city) {
      errors.city = "City is required";
    }

    if (!state) {
      errors.state = "State is required";
    }

    if (!lat) {
      errors.lat = "Latitude is required";
    }

    if (!lng) {
      errors.lng = "Longitude is required";
    }

    if (!description || description.length < 30) {
      errors.description = "Description needs a minimum of 30 characters";
    }

    if (!name) {
      errors.name = "Name is required";
    }

    if (!price) {
      errors.price = "Price is required";
    }


    if (Object.values(errors).length) {
      setErrors(errors);
      return;
    }

    const payload = {
      country,
      address,
      city,
      state,
      lat,
      lng,
      description,
      name,
      price,
    };

    // console.log(previewImageUrl)
    const editSpot = await dispatch(updateSpot(spotId, payload))
      // console.log(editSpot)
      

    navigate(`/spots/${editSpot.id}`);
  };


  return (
    <div>
      <h1>Create a new Spot</h1>
      <form onSubmit={handleSubmit}>
        <div className="location-container">
          <h3>Where&apos;s your place located?</h3>
          <p>
            Guests will only get your exact address once they book a
            reservation.
          </p>
          <div>
            <div>
              <label>Country</label>
              <span className="errors-ctn">{errors.country}</span>
            </div>
            <input
              type="text"
              onChange={(e) => setCountry(e.target.value)}
              value={country}
              placeholder="Country"
            />
          </div>
          <div>
            <div>
              <label>Street Address</label>
              <span className="errors-ctn">{errors.address}</span>
            </div>
            <input
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              placeholder="Address"
            />
          </div>
          <div>
            <div>
              <label>City</label>
              <span className="errors-ctn">{errors.city}</span>
            </div>
            <input
              type="text"
              onChange={(e) => setCity(e.target.value)}
              value={city}
              placeholder="City"
            />
            <span> , </span>
            <div>
              <label>State</label>
              <span className="errors-ctn">{errors.state}</span>
            </div>
            <input
              type="text"
              onChange={(e) => setState(e.target.value)}
              value={state}
              placeholder="State"
            />
          </div>
          <div>
            <div>
              <label>Latitude</label>
              <span className="errors-ctn">{errors.lat}</span>
            </div>
            <input
              type="text"
              onChange={(e) => setLat(e.target.value)}
              value={lat > 0 ? lat : ""}
              placeholder="Latitude"
            />
            <span> , </span>
            <div>
              <label>Longitude</label>
              <span className="errors-ctn">{errors.lng}</span>
            </div>
            <input
              type="number"
              step="any"
              min="-180"
              max="180"
              onChange={(e) => setLng(e.target.value)}
              value={lng > 0 ? lng : ""}
              placeholder="Longitude"
            />
          </div>
        </div>
        <div className="description-container">
          <div>
            <h3>Describe your place to guests</h3>
            <p>
              Mention the best features of your space, any special amenities
              like fast wifi or parking, and what you love about the
              neighborhood.
            </p>
          </div>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder="Description"
            rows={7}
          ></textarea>
          <div className="errors-ctn">{errors.description}</div>
        </div>
        <div className="title-container">
          <div>
            <h3>Create a title for your spot</h3>
            <p>
              Catch guests&apos; attention with a spot title that highlights what
              makes your place special.
            </p>
          </div>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Name of your spot"
          />
          <div className="errors-ctn">{errors.name}</div>
        </div>
        <div className="price-container">
          <div>
            <h3>Set a base price for your spot</h3>
            <p>
              Competitive pricing can help your listing stand out and rank
              higher in search results.
            </p>
            <span>
              $
              <input
                onChange={(e) => setPrice(e.target.value)}
                value={price > 0 ? price : ""}
                placeholder="Price per night (USD)"
              />
            </span>
            <div className="errors-ctn">{errors.price}</div>
          </div>
        </div>
        <button>Update Spot</button>
      </form>
    </div>
  );
};

export default EditSpotForm;
