import { FETCH_USER } from "../actions/types";

// eslint-disable-next-line
export default function(state = null, action) { 
    switch(action.type) {
        case FETCH_USER:
            return action.payload || false;
        default:
            return state;
    }
}