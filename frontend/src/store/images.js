import { csrfFetch } from "./csrf";

const ADD_SPOT_IMAGE = "SpotImages/addSpotImage";

const addSpotImage = (payload) => ({
  type: ADD_SPOT_IMAGE,
  payload,
});

export const createSpotImage = (id, payload) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${id}/images`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  // console.log(res);
  if (res.ok) {
    const data = await res.json();
    // console.log("spot", spot);
    dispatch(addSpotImage(data));
  }
};

const initialState = {};

const spotImageReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case ADD_SPOT_IMAGE:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    default:
      return state;
  }
};

export default spotImageReducer;
