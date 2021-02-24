export const signUpDefault = {
    isLoading: false,
    isError: 0,
    signUp: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordCheck: '',
    }
};

export const CHANGE_DATA = "CHANGE_DATA";
export const CHANGE_DATA_STRUCT = "CHANGE_DATA_STRUCT";
export const signUpReducer = (state, action) => {
    switch(action.type) {
        case CHANGE_DATA:
            return { ...state, ...action.data };
        case CHANGE_DATA_STRUCT:
            return { 
                ...state, 
                [action.target]: {
                    ...state[action.target],
                    ...action.data
                    }
                }
        default:
            return state;
    }
};