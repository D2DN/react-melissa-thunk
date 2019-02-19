import { FETCH_ADDRESS_FROM_MELISSA } from "../actions/actionTypes";

export default function (state = {},action){
	switch (action.type){
		case FETCH_ADDRESS_FROM_MELISSA:
			return action.payload;
		default:
			return state;
	}

}