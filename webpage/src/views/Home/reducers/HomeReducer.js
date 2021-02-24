export const homeInit = {
    isLoading: false,
    videos: [],
};

export const CHANGE_DATA = "CHANGE_DATA";
export const homeReducer = (state, action) => {
    switch( action.type ) {
        case CHANGE_DATA:
            return {
                ...state,
                ...action.data,
            };
        default:
            throw new Error("unhandled home action");
    }
}