export const defaultStateItems = {
    barrel: [],
    noz: [],
    cartridge: []
}

const FETCH_BARREL = "FETCH_BARREL"
const FETCH_NOZZLE = "FETCH_NOZZLE"
const FETCH_CARTRIDGE = "FETCH_CARTRIDGE"

export const itemsReducer = (state = defaultStateItems, action) => {
    switch (action.type) {
        case "FETCH_CARTRIDGE":
            return {...state, cartridge: [...action.payload]};
        case "FETCH_NOZZLE":
            return {...state, noz: [...action.payload]};
        case "FETCH_BARREL":
            return {...state, barrel: [...action.payload]};
        case "ADD_BARREL":
            return {...state, barrel: [...state.barrel, action.payload]}
        case "REMOVE_BARREL":
            return {...state, barrel: state.barrel.filter(barrel => barrel.id !== action.payload.id)}
        case "REMOVE_NOZ":
            return {...state, noz: state.noz.filter(noz => noz.id !== action.payload.id)}
        case "REMOVE_CARTRIDGE":
            return {...state, cartridge: state.cartridge.filter(cartridge => cartridge.id !== action.payload.id)}
        default:
            return state
    }
}

export const fetchCartridgeAction   = (payload) => ({type: FETCH_CARTRIDGE, payload})
export const fetchNozzleAction      = (payload) => ({type: FETCH_NOZZLE, payload})
export const fetchBarrelAction      = (payload) => ({type: FETCH_BARREL, payload})

