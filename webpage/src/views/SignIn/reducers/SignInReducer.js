export const signInDefault = {
    isLoading: false,
    isError: 0,
    signIn: {
        email: '',
        password: '',
    }
};

export const CHANGE_DATA = "CHANGE_DATA";
export const CHANGE_DATA_STRUCT = "CHANGE_DATA_STRUCT";
export const signInReducer = (state, action) => {
    switch(action.type) {
        case CHANGE_DATA:
            return { ...state, ...action.data };
        case CHANGE_DATA_STRUCT:
            return {
                ...state,
                [action.target]: {
                    ...state[action.target],
                    ...action.data,
                }
            }
        default:
            return state;
    }
}