export const defaultStateActions = {
    action: [],
}

const FETCH_ACTIONS = "FETCH_ACTIONS"

export const actionsReducer = (state = defaultStateActions, action) => {
    switch (action.type) {
        case "FETCH_ACTIONS":
            return {...state, action: [...state.action, ...action.payload]}
        case "ADD_ACTION":
            return {
                ...state, action: [...state.action,
                    {
                        id: action.payload.id,
                        by: 'Kolomiiets Dmytro',
                        actionType: action.payload.actionType,
                        timeStamp: action.payload.timeStamp
                    }]
            };
        case "REMOVE_ACTION":
            return {...state, action: state.action.filter(barrel => barrel.id !== action.payload)}
        default:
            return state
    }
}

export const addActionAction = (payload) => ({type: FETCH_ACTIONS, payload})


