import React from 'react';

class MissingProviderComponent extends React.Component {
 constructor(props) {
     super(props);
 }

 render() {
     return (<div id="providerMissing">
     <br/>
     <br/>
     <h1 className="title">
             Provider Missing
         </h1>
     <br/>
     <br/>
     <br/>
     <a className="button buttonCustom" href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=fr">Install MetaMask</a>
     <br/>
     <br/>
     <a className="button buttonCustom" href="https://play.google.com/store/apps/details?id=im.status.ethereum&hl=fr">Install Status.im for Mobile</a>
     <br/>
     <br/>
     <a className="button buttonCustom" href="https://wallet.coinbase.com/">Install Coinbase Wallet for Mobile</a>
 </div>)
 }
}

export default MissingProviderComponent;