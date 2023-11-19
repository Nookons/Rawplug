export const defaultStateCartridge = {
    cartridge: [],
}

const FETCH_CARTRIDGE = "FETCH_CARTRIDGE"

export const cartridgeReducer = (state = defaultStateCartridge, action) => {
    switch (action.type) {
        case "FETCH_CARTRIDGE":
            return {...state, cartridge: [...state.cartridge, ...action.payload]};
        case "ADD_CARTRIDGE":
            return {...state, cartridge: [...state.cartridge, action.payload]}
        case "REMOVE_CARTRIDGE":
            return {...state, cartridge: state.cartridge.filter(barrel => barrel.id !== action.payload)}
        default:
            return state
    }
}

export const fetchCartridgeAction = (payload) => ({type: FETCH_CARTRIDGE, payload})

