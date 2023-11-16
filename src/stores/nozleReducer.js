export const defaultStateNoz = {
    noz: [],
}

const FETCH_NOZ = "FETCH_NOZ"

export const nozReducer = (state = defaultStateNoz, action) => {
    switch (action.type) {
        case "FETCH_NOZ":
            return {...state, noz: [...state.noz, ...action.payload]};
        case "ADD_NOZ":
            return {...state, noz: [...state.noz, action.payload]}
        case "REMOVE_NOZ":
            return {...state, noz: state.noz.filter(barrel => barrel.id !== action.payload)}
        default:
            return state
    }
}

export const fetchNozAction = (payload) => ({type: FETCH_NOZ, payload})

