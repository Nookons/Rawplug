export const defaultStateBarrel = {
    barrel: [],
}

const ADD_MANY_CUSTOMERS = "ADD_MANY_CUSTOMERS"
const REMOVE_COPY = "REMOVE_COPY"

export const barrelReducer = (state = defaultStateBarrel, action) => {
    switch (action.type) {
        case "REMOVE_COPY":
            return {...state, barrel: state.barrel.filter(barrel => barrel.id === barrel.id)}
        case "ADD_MANY_CUSTOMERS":
            return {
                ...state,
                barrel: [...state.barrel, ...action.payload],
            };
        case "ADD_BARREL":
            return {...state, barrel: [...state.barrel, action.payload]}
        case "REMOVE_BARREL":
            return {...state, barrel: state.barrel.filter(barrel => barrel.id !== action.payload)}
        default:
            return state
    }
}

export const addManyCustomersAction = (payload) => ({type: ADD_MANY_CUSTOMERS, payload})
export const removeBarrelAction = (payload) => ({type: REMOVE_COPY, payload})

