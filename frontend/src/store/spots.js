import { csrfFetch } from "./csrf";

const LOAD_ALL_SPOTS = "spots/loadAllSpots";
const LOAD_SPOT = "spots/loadSpot";
export const ADD_SPOT = "spots/addSpot";

const loadAllSpots = (payload) => ({
  type: LOAD_ALL_SPOTS,
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

// export const createSpot = (payload) => async (dispatch) => {
  
// };

const initialState = { spotsList: [], currentSpot: {}, ownedSpots: [] }; //normalizing data

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    //spot detail
    case LOAD_SPOT:
      console.log(action)
      return { ...state, currentSpot: action.payload };
    //landing page
    case LOAD_ALL_SPOTS:
      return { ...state, spotsList: [ ...action.payload.Spots ] };
    case ADD_SPOT:
      return {...state, ownedSpots: [...ownedSpots, action.payload]}
    default:
      return state;
  }
};

export default spotsReducer;
