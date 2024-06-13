import { csrfFetch } from "./csrf";

const LOAD_ALL_SPOTS = "spots/loadAllSpots";
const LOAD_OWNED_SPOTS = "spots/loadOwnedSpots";
const LOAD_SPOT = "spots/loadSpot";
const ADD_SPOT = "spots/addSpot";

const loadAllSpots = (payload) => ({
  type: LOAD_ALL_SPOTS,
  payload,
});

const loadOwnedSpots = (payload) => ({
  type: LOAD_OWNED_SPOTS,
  payload,
});

const loadSpot = (payload) => ({
  type: LOAD_SPOT,
  payload,
});

export const addSpot = (payload) => ({
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

export const fetchOwnedSpots = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots/current");

  if (res.ok) {
    const data = await res.json();
    dispatch(loadOwnedSpots(data));
  }
};

export const createSpot = (payload) => async (dispatch, getState) => {
  const res = await csrfFetch("/api/spots", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  // console.log(res);
  if (res.ok) {
    const data = await res.json();
    // console.log("spot", spot);
    dispatch(addSpot(data));
  }
};

const initialState = { spotsList: [], currentSpot: {}, ownedSpots: [] }; //normalizing data

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    //spot detail
    case LOAD_SPOT:
      console.log(action);
      return { ...state, currentSpot: action.payload };
    //landing page
    case LOAD_ALL_SPOTS:
      return { ...state, spotsList: [...action.payload.Spots] };
    case LOAD_OWNED_SPOTS:
      console.log(action)
      return { ...state, ownedSpots: [...action.payload] };
    case ADD_SPOT:
      console.log(state.ownedSpots);
      return { ...state, ownedSpots: [...state.ownedSpots, action.payload] };
    default:
      return state;
  }
};

export default spotsReducer;
