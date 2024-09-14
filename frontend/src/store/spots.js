import { csrfFetch } from "./csrf";

const LOAD_ALL_SPOTS = "spots/loadAllSpots";
const LOAD_SPOT = "spots/loadSpotDetail";
// const LOAD_OWNED_SPOTS = "spots/loadOwnedSpots";
const ADD_SPOT = "spots/addSpot";
const REMOVE_SPOT = "spots/removeSpot";

const loadAllSpots = (payload) => ({
  type: LOAD_ALL_SPOTS,
  payload,
});

// const loadOwnedSpots = (payload) => ({
//   type: LOAD_OWNED_SPOTS,
//   payload,
// });

const loadSpotDetail = (payload) => ({
  type: LOAD_SPOT,
  payload,
});

const addSpot = (payload) => ({
  type: ADD_SPOT,
  payload,
});

export const removeSpot = (id) => ({
  type: REMOVE_SPOT,
  id,
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

export const fetchOwnedSpots = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots/current");

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

export const updateSpot = (id, payload) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${id}`, {
    method: "PUT",
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
  if(res.ok){
    dispatch(removeSpot(id))
  }
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
      newState = {}
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
      newState = {...state}
      // action.payload.Spots.filter(spot => newState[spot.id] !== action.payload)
      delete newState[action.id]
      return newState
    default:
      return state;
  }
};

export default spotsReducer;
