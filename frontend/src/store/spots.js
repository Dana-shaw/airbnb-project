import { csrfFetch } from "./csrf"

const LOAD_SPOTS = "spots/loadAllSpots"
const LOAD_SPOT = "spots/loadSpot"


const loadAllSpots = (payload) => ({
    type: LOAD_SPOTS,
    payload
})

const loadSpot = (payload) => ({
    type: LOAD_SPOT,
    payload
})

// export const selectSpotById = (state, spotId) => {
//     return state.spots[spotId]
// }

export const fetchAllSpots = () => async (dispatch) => {
    const res = await csrfFetch("/api/spots")
    
    if(res.ok){
        const data = await res.json()
        // console.log(data)
        dispatch(loadAllSpots(data))
    }
}

export const fetchSpot = (spotId) => async (dispatch) => {
    // console.log(typeof spotId)
    const res = await csrfFetch(`/api/spots/${spotId}`)

    if(res.ok){
        const data = await res.json()
        // console.log(data)
        dispatch(loadSpot(data))
    }
}

const initialState = { spotsList: {}, currentSpot: {}, ownedSpots: {}};     //normalizing data
// const initialState = {};

const spotsReducer = (state = initialState, action) => {
    switch (action.type){
        case LOAD_SPOT:
            console.log('payload', action.payload)
            // const newState = {...state}
            const currentSpot = {}
            currentSpot[action.payload.id] = action.payload
            // action.payload.Spots.forEach((spot) => {
            //     spotsList[spot.id] = spot
            // });
            // console.log(newState)
            return { ...state, currentSpot: { ...currentSpot}}
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