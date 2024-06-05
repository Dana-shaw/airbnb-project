import { useDispatch, useSelector } from "react-redux";
import { fetchSpot } from "../../store/spots";
import { useEffect } from "react";
import "./SpotDetailPage.css";

const SpotDetailPage = ({ spot }) => {
  const dispatch = useDispatch();

  const spot = useSelector((state) => state.spots);
  // console.log(spot)

  useEffect(() => {
    dispatch(fetchSpot());
  }, []);

  return <h1>Spot Detail</h1>;
};

export default SpotDetailPage;
