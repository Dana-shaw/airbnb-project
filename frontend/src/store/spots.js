import { csrfFetch } from "./csrf";

const LOAD_ALL_SPOTS = "spots/loadAllSpots";
const LOAD_SPOT = "spots/loadSpot";
const ADD_SPOT = "spots/addSpot";

const loadAllSpots = (payload) => ({
  type: LOAD_ALL_SPOTS,
  payload,
});

const loadSpot = (payload) => ({
  type: LOAD_SPOT,
  payload,
});

const addSpot = (payload) => ({
  type: ADD_SPOT,
  payload,
});

export const fetchSpot = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${id}`);
  
  if (res.ok) {
    const data = await res.json();
    // console.log(data)
    dispatch(loadSpot(data));
  }
};

export const fetchAllSpots = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots");

  if (res.ok) {
    const data = await res.json();
    dispatch(loadAllSpots(data));
  }
};

export const createSpot = (payload) => async (dispatch) => {
  const res = await csrfFetch("/api/spots", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    const data = await res.json();
    console.log('data', data)
    dispatch(addSpot(data));
    return data;
  }
};

const initialState = { spotsList: {}, currentSpot: {}, ownedSpots: {} }; //normalizing data

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOT:
      const currentSpot = {};
      currentSpot[action.payload.id] = action.payload;
      return { ...state, currentSpot: { ...currentSpot } };
    case LOAD_ALL_SPOTS:
      const spotsList = {};
      action.payload.Spots.forEach((spot) => {
        spotsList[spot.id] = spot;
      });
      return { ...state, spotsList: { ...spotsList } };
    case ADD_SPOT:
      const newSpot = []
      newSpot[action.payload.id] = action.payload;
      return newSpot;
    default:
      return state;
  }
};

export default spotsReducer;
