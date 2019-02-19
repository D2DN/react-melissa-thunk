import React , { Component } from 'react';
import PropTypes from 'prop-types';

// import styles
import './App.css';

// import react-redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import action-creator
import { fetchAddressFromMellisa } from './actions/actions';

// import react-autossuggest for autocomplete in the address inputs
import Autosuggest from 'react-autosuggest';

// import bnc-react-components
import { Label } from 'bnc-react-components';

/**
 *
 * @param suggestion return address
 * @returns {*}
 */
function getSuggestionValue (suggestion) {
	return suggestion;
}

/**
 *
 * @param suggestion address extract from Melissa
 * @returns {*}
 */
function renderSuggestion (suggestion) {
	return (
		<span>{ suggestion }</span>
	);
}

function renderLabelAddress(address, suggestion) {
	if (suggestion.length === 0 && address.length > 4) {
		let addressSplit = address.split(',');
		return (
			<div>
				<Label>{ addressSplit[0]}</Label>
				<br/>
				<Label>{ addressSplit[1]}</Label>
			</div>

		);
	}
}



class App extends Component {

	constructor () {
		super();
		this.state = {
			value: '' ,
			suggestions: [],
			address:''
		};
	}


	getSuggestions (value) {
		if ( value === '' || value.length < 4 ) {
			return [];
		}
		this.props.fetchAddressFromMellisa(value);
		// return array of address
		return this.responseMelissaToArray();
	}

	onChange = (event , { newValue }) => {
		this.setState({
			value: newValue,
			address : newValue
		});
	};

	onSuggestionsFetchRequested = ({ value }) => {
		this.setState({
			suggestions: this.getSuggestions(value)
		});

	};

	onSuggestionsClearRequested = () => {
		this.setState({
			suggestions: [],
			value:''
		});
	};

	responseMelissaToArray () {
		let arrayOfAddress = [];
		if ( this.props.address !== undefined ) {
			Array.from(this.props.address).forEach(function (element) {
				arrayOfAddress.push(element.Address.Address);
			});
			return arrayOfAddress;
		}
		return []
	}

	render () {
		const { value , suggestions , address} = this.state;
		const inputProps = {
			placeholder: "Enter your address" ,
			value ,
			onChange: this.onChange,
		};

		return (
			<div>
				<Autosuggest
					suggestions={ suggestions }
					onSuggestionsFetchRequested={ this.onSuggestionsFetchRequested }
					onSuggestionsClearRequested={ this.onSuggestionsClearRequested }
					getSuggestionValue={ getSuggestionValue }
					renderSuggestion={ renderSuggestion }
					inputProps={ inputProps }/>

				{renderLabelAddress(address, suggestions)}

			</div>

		);
	}
}

App.propTypes = {
	address: PropTypes.oneOfType([ PropTypes.array , PropTypes.object ]).isRequired ,
};

function mapStateToProps (state) {
	return {
		address: state.address ,
	};
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators({ fetchAddressFromMellisa } , dispatch);
}

export default connect(mapStateToProps , mapDispatchToProps)(App);


