export const defaultStateItems = {
    barrel: [],
    noz: [],
    cartridge: []
}

const FETCH_BARREL = "FETCH_BARREL"
const FETCH_NOZZLE = "FETCH_NOZZLE"

export const itemsReducer = (state = defaultStateItems, action) => {
    switch (action.type) {
        case "FETCH_NOZZLE":
            return {...state, noz: [...action.payload]};
        case "FETCH_BARREL":
            return {...state, barrel: [...action.payload]};
        case "ADD_BARREL":
            return {...state, barrel: [...state.barrel, action.payload]}
        case "REMOVE_BARREL":
            return {...state, barrel: state.barrel.filter(barrel => barrel.id !== action.payload)}
        default:
            return state
    }
}

export const fetchNozzleAction = (payload) => ({type: FETCH_NOZZLE, payload})
export const fetchBarrelAction = (payload) => ({type: FETCH_BARREL, payload})

