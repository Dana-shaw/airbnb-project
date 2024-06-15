import { csrfFetch } from "./csrf"

const LOAD_REVIEWS = "reviews/loadReviews"
const ADD_REVIEW = "reviews/addReview"
const DELETE_REVIEW = "reviews/deleteReview"

const loadReviews = (payload) => ({
    type: LOAD_REVIEWS,
    payload
})

const addReview = (payload) => ({
    type: ADD_REVIEW,
    payload
})

const removeReview = (index) => ({
    type: DELETE_REVIEW,
    payload: index
})

export const fetchReviews = (spotId) => async (dispatch, getState) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if(res.ok){
        const data = await res.json()
        // console.log(data)
        dispatch(loadReviews(data))
    }
}

export const createReview = (spotId, payload) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    })

    if(res.ok) {
        const data = await res.json()
        dispatch(addReview(spotId, data))
    }
}

export const deleteReview = (reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api//reviews/${reviewId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })

    if(res.ok) {
        const data = await res.json()
        dispatch(removeReview(reviewId))
    }
}

const initialState = { reviewsList: [], userReviews: []};     //normalizing data

const reviewsReducer = (state = initialState, action) => {
    switch (action.type){
        case LOAD_REVIEWS:
            return { ...state, reviewsList: [ ...state.reviewsList, action.payload]}
        case ADD_REVIEW:
            return { ...state, userReviews: [ ...state.userReviews, action.payload]}
        case DELETE_REVIEW:
            return { ...state, userReviews: { ...state.userReviews.filter(userReview => userReview.id !== action.payload)}}
        default:
            return state
    }
}

export default reviewsReducer;