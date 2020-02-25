import React from 'react';

class ExchangeRates extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            EthBat : 0,
            EthDai : 0,
            EthMkr : 0,
            EthOmg : 0,
            EthZrx : 0,
            EthBatExchangeContract : this.props.EthBatExchangeContract,
            EthDaiExchangeContract : this.props.EthDaiExchangeContract,
            EthMkrExchangeContract : this.props.EthMkrExchangeContract,
            EthOmgExchangeContract : this.props.EthOmgExchangeContract,
            EthZrxExchangeContract : this.props.EthZrxExchangeContract,
        };
    }

    render() {
        return (<div>
            <h1>Test</h1>
        </div>)
    }
}

export default ExchangeRates;