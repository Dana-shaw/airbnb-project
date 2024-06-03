import { csrfFetch } from "./csrf"

const LOAD_SPOTS = "spots/loadSpots"

const loadSpots = (payload) => ({
    type: LOAD_SPOTS,
    payload
})

export const fetchSpots = () => async (dispatch) => {
    const res = await csrfFetch("/api/spots")

    if(res.ok){
        const data = await res.json()
        console.log(data)
        dispatch(loadSpots(data))
    }
}

// const initialState = { spotsList: {}, currentSpot: {}};
const initialState = {};

const spotsReducer = (state = initialState, action) => {
    switch (action.type){
        case LOAD_SPOTS:
            // console.log(Object.values(action.payload))
            const newState = {...state}
            action.payload.Spots.forEach((spot) => {
                newState[spot.id] = spot
            });
            // console.log(newState)
            return newState
        default:
            return state
    }
}

export default spotsReducer;