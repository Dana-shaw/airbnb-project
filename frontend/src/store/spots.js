import { csrfFetch } from "./csrf";

const LOAD_ALL_SPOTS = "spots/loadAllSpots";
const LOAD_SPOT = "spots/loadSpotDetail";
const ADD_SPOT = "spots/addSpot";
const REMOVE_SPOT = "spots/removeSpot";

const loadAllSpots = (payload) => ({
  type: LOAD_ALL_SPOTS,
  payload,
});

const loadSpotDetail = (payload) => ({
  type: LOAD_SPOT,
  payload,
});

const addSpot = (payload) => ({
  type: ADD_SPOT,
  payload,
});

export const removeSpot = (payload) => ({
  type: REMOVE_SPOT,
  payload,
});

export const fetchSpotDetail = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${id}`);

  if (res.ok) {
    const data = await res.json();
    // console.log(data)
    dispatch(loadSpotDetail(data));
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
  // console.log(res);
  if (res.ok) {
    const data = await res.json();
    console.log("data", data);
    dispatch(addSpot(data));
    return data
  }
};

export const deleteSpot = (id) => async (dispatch) => {
  console.log(id)
  const res = await csrfFetch(`/api/spots/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json"}
  })
  dispatch(removeSpot(id))
}

const initialState = {};

const spotsReducer = (state = initialState, action) => {
  let newState
  switch (action.type) {
    //spot detail
    // case LOAD_SPOT:
    //   // console.log(action);
    //   return { ...state, currentSpot: action.payload };
    //landing page
    case LOAD_ALL_SPOTS:
      newState = {...state}
      action.payload.Spots.forEach(spot => newState[spot.id] = spot)
      return newState
    case LOAD_SPOT:
      newState = {...state}
      newState[action.payload.id] = action.payload
      return newState
    case ADD_SPOT:
      newState = {...state}
      newState[action.payload.id] = action.payload
      return newState
    case REMOVE_SPOT:
      // console.log(action.payload);
      return {...state, allSpots: [...state.allSpots.filter(spot => spot.id !== action.payload)], ownedSpots: [...state.ownedSpots.filter(spot => spot.id !== action.payload)]}
    default:
      return state;
  }
};

export default spotsReducer;
