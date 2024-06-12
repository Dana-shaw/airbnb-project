import { csrfFetch } from "./csrf"

const LOAD_REVIEWS = "reviews/loadReviews"

const loadReviews = (payload) => ({
    type: LOAD_REVIEWS,
    payload
})

export const fetchReviews = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${id}/reviews`)

    if(res.ok){
        const data = await res.json()
        // console.log(data)
        dispatch(loadReviews(data))
    }
}

const initialState = { reviewsList: {}, userReviews: {}};     //normalizing data

const reviewsReducer = (state = initialState, action) => {
    switch (action.type){
        case LOAD_REVIEWS:
            const reviewsList = {}
            // console.log(action.payload)
            action.payload.Reviews.forEach((review) => {
                reviewsList[review.id] = review
            });
            return { ...state, reviewsList: { ...reviewsList}}
        default:
            return state
    }
}

export default reviewsReducer;