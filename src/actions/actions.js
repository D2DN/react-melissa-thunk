import { FETCH_ADDRESS_FROM_MELISSA } from './actionTypes';
import axios from 'axios';

export function fetchAddressFromMellisa (value) {
	const request = axios.get(`http://expressentry.melissadata.net/jsonp/GlobalExpressFreeForm?&format=jsonp&id=OTCiavJ8jtOFmsWZ3EMeik**&FF=${value}&country=CA&maxrecords=10`)
	return (dispatch) => {
		request.then( ({data}) => {
			dispatch({ type: FETCH_ADDRESS_FROM_MELISSA , payload: data.d.Results })
		});
	};
}


/*
console.log('action fetchAddressFromMelissa');
const request = axios.get(`http://expressentry.melissadata.net/jsonp/GlobalExpressFreeForm?&format=jsonp&id=OTCiavJ8jtOFmsWZ3EMeik**&FF=${value}&country=CA&maxrecords=10`)
console.log('request= ', request);
return {
	type : FETCH_ADDRESS_FROM_MELISSA,
	payload : request
}*/
