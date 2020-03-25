import React from 'react';

class CurrencyPairsComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>
            <div className={this.props.dropdownListClass()}>
                    <div className="dropdown-trigger">
                        <button className="button dropdownButton" aria-haspopup="true" aria-controls="dropdown-menu" onClick={() => this.props.dropdownListClicked()}>
                        <span>{this.props.GetSelectionText()}</span>
                        <span className="icon is-small">
                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                        </span>
                        </button>
                    </div>
                    <div className="dropdown-menu" id="dropdown-menu" role="menu">
                        <div className="dropdown-content dropdownMenu">
                        <a className={this.props.ethBatClass()} onClick={() => this.props.ethBatSelection()}>
                            ETH/BAT
                        </a>
                        <a className={this.props.ethDaiClass()} onClick={() => this.props.ethDaiSelection()}>
                            ETH/DAI
                        </a>
                        <a className={this.props.ethMkrClass()} onClick={() => this.props.ethMkrSelection()}>
                            ETH/MKR
                        </a>
                        <a className={this.props.ethOmgClass()} onClick={() => this.props.ethOmgSelection()}>
                            ETH/OMG
                        </a>
                        <a className={this.props.ethZrxClass()} onClick={() => this.props.ethZrxSelection()}>
                            ETH/ZRX
                        </a>
                        </div>
                    </div>
            </div>
        </div>);
    }
}

export default CurrencyPairsComponent;