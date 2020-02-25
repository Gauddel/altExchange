import React from 'react';

class Rates extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            web3 : this.props.web3,
            address : this.props.address,
            currency1Icon : this.props.currency1Icon,
            currency2Icon : this.props.currency2Icon,
            currency1Name : this.props.currency1,
            currency2Name : this.props.currency2,
        }
    }

    GetCurrency1Balance() {

    }

    GetCurrency2Balance() {

    }

    GetCurrencyPairPrice() {
        
    }

    render() {
        return (<div className="container">
            
        </div>)
    }
}

export default Rates;