import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = "reviews/loadReviews";
const ADD_REVIEW = "reviews/addReview";
const REMOVE_REVIEW = "reviews/deleteReview";

const loadReviews = (payload) => ({
  type: LOAD_REVIEWS,
  payload,
});

const addReview = (payload) => ({
  type: ADD_REVIEW,
  payload,
});

const removeReview = (id) => ({
  type: REMOVE_REVIEW,
  id,
});

export const fetchReviews = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadReviews(data));
  }
};

export const createReview = (spotId, payload) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(addReview(data));
    return data
  }
};

export const updateReview = (id, payload) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    // console.log(res);
    if (res.ok) {
      const data = await res.json();
      console.log("data", data);
      dispatch(addReview(data)); 
      return data
    }
  };

export const deleteReview = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api//reviews/${reviewId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    // const data = await res.json();
    dispatch(removeReview(reviewId));
  }
};

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_REVIEWS:
      newState = {};
      action.payload.Reviews.forEach(
        (review) => (newState[review.id] = review)
      );
      return newState;
    case ADD_REVIEW:
        newState = {...state}
        console.log(action)
        newState[action.payload.id] = action.payload
        return newState
    case REMOVE_REVIEW:
      newState = {...state}
      delete newState[action.id]
      return newState
    default:
      return state;
  }
};

export default reviewsReducer;
