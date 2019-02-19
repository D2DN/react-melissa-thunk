import { combineReducers } from 'redux';

/*TODO FOR DEVELOPERS: Please add all your reducer here*/
import MelissaReducer from './MelissaReducer';

const rootReducer = combineReducers({
	address : MelissaReducer
});

export default rootReducer;
