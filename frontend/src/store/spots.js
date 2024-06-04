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

const initialState = { spotsList: {}, currentSpot: {}, ownedSpots: {}};     //normalizing data
// const initialState = {};

const spotsReducer = (state = initialState, action) => {
    switch (action.type){
        case LOAD_SPOTS:
            // console.log(Object.values(action.payload))
            // const newState = {...state}
            const spotsList = {}
            action.payload.Spots.forEach((spot) => {
                spotsList[spot.id] = spot
            });
            // console.log(newState)
            return { ...state, spotsList: { ...spotsList}}
        default:
            return state
    }
}

export default spotsReducer;