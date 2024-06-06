import { csrfFetch } from "./csrf"

const LOAD_ALL_SPOTS = "spots/loadAllSpots"
const LOAD_SPOT = "spots/loadSpot"


const loadAllSpots = (payload) => ({
    type: LOAD_ALL_SPOTS,
    payload
})

const loadSpot = (payload) => ({
    type: LOAD_SPOT,
    payload
})

export const fetchAllSpots = () => async (dispatch) => {
    const res = await csrfFetch("/api/spots")
    
    if(res.ok){
        const data = await res.json()
        dispatch(loadAllSpots(data))
    }
}

export const fetchSpot = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${id}`)

    if(res.ok){
        const data = await res.json()
        // console.log(data)
        dispatch(loadSpot(data))
    }
}

const initialState = { spotsList: {}, currentSpot: {}, ownedSpots: {}};     //normalizing data

const spotsReducer = (state = initialState, action) => {
    switch (action.type){
        case LOAD_SPOT:
            const currentSpot = {}
            currentSpot[action.payload.id] = action.payload
            return { ...state, currentSpot: { ...currentSpot}}
        case LOAD_ALL_SPOTS:
            const spotsList = {}
            action.payload.Spots.forEach((spot) => {
                spotsList[spot.id] = spot
            });
            return { ...state, spotsList: { ...spotsList}}
        default:
            return state
    }
}

export default spotsReducer;