import React from 'react';

class ConnexionComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (<div id="providerMissing">
            <div className="navbar" >
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <a className="button buttonCustom" onClick={() => this.props.connection()}>Connect to Ethereum</a>
        </div>)
    }
}

export default ConnexionComponent;