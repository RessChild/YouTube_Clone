export const uploadDefault = {
    title: "",
    description: "",
    thumbnail: null,
    video: null,
};

export const CHANGE_DATA = "CHANGE_DATA";
// export const CHANGE_DATA_STRUCT = "CHANGE_DATA_STRUCT";
export const uploadReducer = (state, action) => {
    switch(action.type) {
        case CHANGE_DATA:
            return { ...state, ...action.data };
        // case CHANGE_DATA_STRUCT:
        //     return { 
        //         ...state, 
        //         [action.target]: {
        //             ...state[action.target],
        //             ...action.data
        //             }
        //         }
        default:
            return state;
    }
};