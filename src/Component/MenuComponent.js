import React from 'react';

class MenuComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (<div id="providerMissing">
            <br/>
            <br/>
            <br/>
            <br/>
            <div id="menu">
                <div id="choice1">
                    <a className="button buttonCustom" onClick={() => this.props.deposit()}>Deposit</a>
                </div>
                <div id="choice2">
                    <a className="button buttonCustom" onClick={() => this.props.trade()}>Trade</a>
                </div>
            </div>
        </div>
        )
    }
}

export default MenuComponent;