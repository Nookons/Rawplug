export const defaultStateBarrel = {
    barrel: [],
}

const FETCH_BARREL = "FETCH_BARREL"

export const barrelReducer = (state = defaultStateBarrel, action) => {
    switch (action.type) {
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

export const fetchBarrelAction = (payload) => ({type: FETCH_BARREL, payload})

