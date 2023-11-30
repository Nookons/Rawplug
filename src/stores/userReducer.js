export const defaultStateUser = {
    status: false,
    email: null,
    uid: null,
    emailVerified: null,
    providerData: null,
    position: null,
}

const USER_ENTER = "USER_ENTER"
const USER_GET = "USER_GET"
const USER_LOGOUT = "USER_LOGOUT"

export const userReducer = (state = defaultStateUser, action) => {
    switch (action.type) {
        case "USER_GET":
            return {...state,
                status: true,
                email: action.payload.user.email,
                uid:  action.payload.user.uid,
                emailVerified: action.payload.user.emailVerified,
                providerData: action.payload.user.providerData[0]
            }
        case "USER_ENTER":
            return {...state,
                status: true,
                email: action.payload.user.email,
                uid:  action.payload.user.uid,
                emailVerified: action.payload.user.emailVerified,
                providerData: action.payload.user.providerData[0],
                position: 'Leader'
            }
        case "USER_LOGOUT":
            return {...state,
                status: false,
                email: null,
                uid:  null,
                emailVerified: null,
                providerData: null,
                position: null
            }
        default:
            return state
    }
}

export const userEnterAction    = (payload) => ({type: USER_ENTER, payload})
export const userLogOutAction   = (payload) => ({type: USER_LOGOUT, payload})
export const userGetAction      = (payload) => ({type: USER_GET, payload})

