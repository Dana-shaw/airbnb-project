import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createSpot } from "../../store/spots";
import { createSpotImage } from "../../store/images";
import "./CreateSpotForm.css";

const CreateSpotForm = () => {
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const [imageUrl1, setImageUrl1] = useState("");
  const [imageUrl2, setImageUrl2] = useState("");
  const [imageUrl3, setImageUrl3] = useState("");
  const [imageUrl4, setImageUrl4] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const spotDetail = useSelector((state) => state.spots);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};

    const imageRegex = /[^\s]+(.*?).(jpg|jpeg|png|JPG|JPEG|PNG)$/;

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

    if (lat && (lat > 90 || lat < -90)) {
      errors.lat = "Latitude must be within -90 and 90";
    }

    if (lng && (lng > 180 || lat < -180)) {
      errors.lng = "Longitude must be within -180 and 180";
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

    if (!previewImageUrl) {
      errors.previewImageUrl = "Preview image is required";
    } else if (!imageRegex.test(previewImageUrl)) {
      errors.previewImageUrl = "Image URL must end in .png, .jpg, or .jpeg";
    }

    if (imageUrl1 && !imageRegex.test(imageUrl1)) {
      errors.imageUrl1 = "Image URL must end in .png, .jpg, or .jpeg";
    }

    if (imageUrl2 && !imageRegex.test(imageUrl2)) {
      errors.imageUrl2 = "Image URL must end in .png, .jpg, or .jpeg";
    }

    if (imageUrl3 && !imageRegex.test(imageUrl3)) {
      errors.imageUrl3 = "Image URL must end in .png, .jpg, or .jpeg";
    }

    if (imageUrl4 && !imageRegex.test(imageUrl4)) {
      errors.imageUrl4 = "Image URL must end in .png, .jpg, or .jpeg";
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
    
    console.log(previewImageUrl)
    const newSpot = await dispatch(createSpot(payload))
    // console.log(newSpot)
    .then((data) => {
      dispatch(createSpotImage(data.id, {url: previewImageUrl, preview: true}))
      return data
    })
    .then((data) => {
      if(imageUrl1){
      dispatch(createSpotImage(data.id, {url: imageUrl1, preview: true}))
      }
      return data
    })
    .then((data) => {
      if(imageUrl2){
      dispatch(createSpotImage(data.id, {url: imageUrl2, preview: true}))
      }
      return data
    })
    .then((data) => {
      if(imageUrl3){
      dispatch(createSpotImage(data.id, {url: imageUrl3, preview: true}))
      }
      return data
    })
    .then((data) => {
      if(imageUrl4){
      dispatch(createSpotImage(data.id, {url: imageUrl4, preview: true}))
      }
      return data
    })
    // .then(dispatch(createSpotImage(imageUrl1)))
    // .then(dispatch(createSpotImage(imageUrl2)))
    // .then(dispatch(createSpotImage(imageUrl3)))
    // .then(dispatch(createSpotImage(imageUrl4)))
    // dispatch(fetchSpotDetail());
    console.log(newSpot)
    navigate(`/spots/${newSpot.id}`);
    // reset();
    // console.log(data);
  };


  return (
    <div className="page">
      <h1 className="title">Create a new Spot</h1>
      <form onSubmit={handleSubmit} className="form-container">
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
              value={lat}
              placeholder="Latitude"
            />
            <span> , </span>
            <div>
              <label>Longitude</label>
              <span className="errors-ctn">{errors.lng}</span>
            </div>
            <input
              type="text"
              onChange={(e) => setLng(e.target.value)}
              value={lng}
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
        <div className="images-container">
          <div>
            <h3>Liven up your spot with photos</h3>
            <p>Submit at least one photo to publish your spot.</p>
          </div>
          <div>
            <input
              onChange={(e) => setPreviewImageUrl(e.target.value)}
              value={previewImageUrl}
              placeholder="Preview Image URL"
            />
            <div className="errors-ctn">{errors.previewImageUrl}</div>
          </div>
          <div>
            <input
              onChange={(e) => setImageUrl1(e.target.value)}
              value={imageUrl1}
              placeholder="Image URL"
            />
            <div className="errors-ctn">{errors.imageUrl1}</div>
          </div>
          <div>
            <input
              onChange={(e) => setImageUrl2(e.target.value)}
              value={imageUrl2}
              placeholder="Image URL"
            />
            <div className="errors-ctn">{errors.imageUrl2}</div>
          </div>
          <div>
            <input
              onChange={(e) => setImageUrl3(e.target.value)}
              value={imageUrl3}
              placeholder="Image URL"
            />
            <div className="errors-ctn">{errors.imageUrl3}</div>
          </div>
          <div>
            <input
              onChange={(e) => setImageUrl4(e.target.value)}
              value={imageUrl4}
              placeholder="Image URL"
            />
            <div className="errors-ctn">{errors.imageUrl4}</div>
          </div>
        </div>
        <button className="submit-button">Create Spot</button>
      </form>
    </div>
  );
};

export default CreateSpotForm;
