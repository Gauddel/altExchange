import React from 'react';
import Web3 from 'web3';

class Exchange extends React.Component {

    factoryABI = [{"name":"NewExchange","inputs":[{"type":"address","name":"token","indexed":true},{"type":"address","name":"exchange","indexed":true}],"anonymous":false,"type":"event"},{"name":"initializeFactory","outputs":[],"inputs":[{"type":"address","name":"template"}],"constant":false,"payable":false,"type":"function","gas":35725},{"name":"createExchange","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"address","name":"token"}],"constant":false,"payable":false,"type":"function","gas":187911},{"name":"getExchange","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"address","name":"token"}],"constant":true,"payable":false,"type":"function","gas":715},{"name":"getToken","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"address","name":"exchange"}],"constant":true,"payable":false,"type":"function","gas":745},{"name":"getTokenWithId","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"uint256","name":"token_id"}],"constant":true,"payable":false,"type":"function","gas":736},{"name":"exchangeTemplate","outputs":[{"type":"address","name":"out"}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":633},{"name":"tokenCount","outputs":[{"type":"uint256","name":"out"}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":663}];

    exchangeABI = [{"name": "TokenPurchase", "inputs": [{"type": "address", "name": "buyer", "indexed": true}, {"type": "uint256", "name": "eth_sold", "indexed": true}, {"type": "uint256", "name": "tokens_bought", "indexed": true}], "anonymous": false, "type": "event"}, {"name": "EthPurchase", "inputs": [{"type": "address", "name": "buyer", "indexed": true}, {"type": "uint256", "name": "tokens_sold", "indexed": true}, {"type": "uint256", "name": "eth_bought", "indexed": true}], "anonymous": false, "type": "event"}, {"name": "AddLiquidity", "inputs": [{"type": "address", "name": "provider", "indexed": true}, {"type": "uint256", "name": "eth_amount", "indexed": true}, {"type": "uint256", "name": "token_amount", "indexed": true}], "anonymous": false, "type": "event"}, {"name": "RemoveLiquidity", "inputs": [{"type": "address", "name": "provider", "indexed": true}, {"type": "uint256", "name": "eth_amount", "indexed": true}, {"type": "uint256", "name": "token_amount", "indexed": true}], "anonymous": false, "type": "event"}, {"name": "Transfer", "inputs": [{"type": "address", "name": "_from", "indexed": true}, {"type": "address", "name": "_to", "indexed": true}, {"type": "uint256", "name": "_value", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "Approval", "inputs": [{"type": "address", "name": "_owner", "indexed": true}, {"type": "address", "name": "_spender", "indexed": true}, {"type": "uint256", "name": "_value", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "setup", "outputs": [], "inputs": [{"type": "address", "name": "token_addr"}], "constant": false, "payable": false, "type": "function", "gas": 175875}, {"name": "addLiquidity", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "min_liquidity"}, {"type": "uint256", "name": "max_tokens"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": true, "type": "function", "gas": 82605}, {"name": "removeLiquidity", "outputs": [{"type": "uint256", "name": "out"}, {"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "amount"}, {"type": "uint256", "name": "min_eth"}, {"type": "uint256", "name": "min_tokens"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": false, "type": "function", "gas": 116814}, {"name": "__default__", "outputs": [], "inputs": [], "constant": false, "payable": true, "type": "function"}, {"name": "ethToTokenSwapInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "min_tokens"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": true, "type": "function", "gas": 12757}, {"name": "ethToTokenTransferInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "min_tokens"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}], "constant": false, "payable": true, "type": "function", "gas": 12965}, {"name": "ethToTokenSwapOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": true, "type": "function", "gas": 50455}, {"name": "ethToTokenTransferOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}], "constant": false, "payable": true, "type": "function", "gas": 50663}, {"name": "tokenToEthSwapInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_eth"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": false, "type": "function", "gas": 47503}, {"name": "tokenToEthTransferInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_eth"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}], "constant": false, "payable": false, "type": "function", "gas": 47712}, {"name": "tokenToEthSwapOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "eth_bought"}, {"type": "uint256", "name": "max_tokens"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": false, "type": "function", "gas": 50175}, {"name": "tokenToEthTransferOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "eth_bought"}, {"type": "uint256", "name": "max_tokens"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}], "constant": false, "payable": false, "type": "function", "gas": 50384}, {"name": "tokenToTokenSwapInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_tokens_bought"}, {"type": "uint256", "name": "min_eth_bought"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "token_addr"}], "constant": false, "payable": false, "type": "function", "gas": 51007}, {"name": "tokenToTokenTransferInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_tokens_bought"}, {"type": "uint256", "name": "min_eth_bought"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}, {"type": "address", "name": "token_addr"}], "constant": false, "payable": false, "type": "function", "gas": 51098}, {"name": "tokenToTokenSwapOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "max_tokens_sold"}, {"type": "uint256", "name": "max_eth_sold"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "token_addr"}], "constant": false, "payable": false, "type": "function", "gas": 54928}, {"name": "tokenToTokenTransferOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "max_tokens_sold"}, {"type": "uint256", "name": "max_eth_sold"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}, {"type": "address", "name": "token_addr"}], "constant": false, "payable": false, "type": "function", "gas": 55019}, {"name": "tokenToExchangeSwapInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_tokens_bought"}, {"type": "uint256", "name": "min_eth_bought"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "exchange_addr"}], "constant": false, "payable": false, "type": "function", "gas": 49342}, {"name": "tokenToExchangeTransferInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_tokens_bought"}, {"type": "uint256", "name": "min_eth_bought"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}, {"type": "address", "name": "exchange_addr"}], "constant": false, "payable": false, "type": "function", "gas": 49532}, {"name": "tokenToExchangeSwapOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "max_tokens_sold"}, {"type": "uint256", "name": "max_eth_sold"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "exchange_addr"}], "constant": false, "payable": false, "type": "function", "gas": 53233}, {"name": "tokenToExchangeTransferOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "max_tokens_sold"}, {"type": "uint256", "name": "max_eth_sold"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}, {"type": "address", "name": "exchange_addr"}], "constant": false, "payable": false, "type": "function", "gas": 53423}, {"name": "getEthToTokenInputPrice", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "eth_sold"}], "constant": true, "payable": false, "type": "function", "gas": 5542}, {"name": "getEthToTokenOutputPrice", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}], "constant": true, "payable": false, "type": "function", "gas": 6872}, {"name": "getTokenToEthInputPrice", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}], "constant": true, "payable": false, "type": "function", "gas": 5637}, {"name": "getTokenToEthOutputPrice", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "eth_bought"}], "constant": true, "payable": false, "type": "function", "gas": 6897}, {"name": "tokenAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1413}, {"name": "factoryAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1443}, {"name": "balanceOf", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "address", "name": "_owner"}], "constant": true, "payable": false, "type": "function", "gas": 1645}, {"name": "transfer", "outputs": [{"type": "bool", "name": "out"}], "inputs": [{"type": "address", "name": "_to"}, {"type": "uint256", "name": "_value"}], "constant": false, "payable": false, "type": "function", "gas": 75034}, {"name": "transferFrom", "outputs": [{"type": "bool", "name": "out"}], "inputs": [{"type": "address", "name": "_from"}, {"type": "address", "name": "_to"}, {"type": "uint256", "name": "_value"}], "constant": false, "payable": false, "type": "function", "gas": 110907}, {"name": "approve", "outputs": [{"type": "bool", "name": "out"}], "inputs": [{"type": "address", "name": "_spender"}, {"type": "uint256", "name": "_value"}], "constant": false, "payable": false, "type": "function", "gas": 38769}, {"name": "allowance", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "address", "name": "_owner"}, {"type": "address", "name": "_spender"}], "constant": true, "payable": false, "type": "function", "gas": 1925}, {"name": "name", "outputs": [{"type": "bytes32", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1623}, {"name": "symbol", "outputs": [{"type": "bytes32", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1653}, {"name": "decimals", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1683}, {"name": "totalSupply", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1713}];
    web3;
    factoryAddress = '0xf5D915570BC477f9B8D6C0E980aA81757A3AaC36';
    factoryContract;
    currency2Contract;

    constructor(props) {
        super(props);
        this.state = {
            token : this.props.token,
            exchange : this.props.exchange,
            currency1IconPath : this.props.currency1IconPath,
            currency2IconPath : this.props.currency2IconPath,
            abi : this.props.abi,
            currency1 : this.props.currency1,
            currency2 : this.props.currency2,
            currency2Balance : 0,
            currency1Balance : 0, // change it to currency1
            currency1AmountToExchange : 0,
            currency2AmountToExchange : 0,
            exchangeRate : 0,
        };

        this.web3 = new Web3(window.ethereum);
        this.factoryContract = new this.web3.eth.Contract(this.factoryABI, this.factoryAddress);
        console.log(this.factoryContract);
        this.currency2Contract = new this.web3.eth.Contract(this.state.abi,this.state.token);

        this.getCurrency1FromCurrency2 = this.getCurrency1FromCurrency2.bind(this);
        this.getCurrency2FromCurrency1 = this.getCurrency2FromCurrency1.bind(this);
        this.handleCurrency1AmountToExchange = this.handleCurrency1AmountToExchange.bind(this);
        this.handleCurrency2AmountToExchange = this.handleCurrency2AmountToExchange.bind(this);
        this.approveTokensTransfer = this.approveTokensTransfer.bind(this);

        this.getBalance = this.getBalance.bind(this);
        this.getBalance();
    }

    getBalance() {
        this.web3.eth.getAccounts().then((accounts) => {
            var mainAccount = accounts[0];
            this.web3.eth.getBalance(mainAccount).then((balance) => {
                this.setState({currency1Balance : Math.round(this.web3.utils.fromWei(balance.toString(), 'ether')* 1000)/1000})});
            this.currency2Contract.methods.balanceOf(mainAccount).call().then((balance) => {
                this.setState({currency2Balance :Math.round(this.web3.utils.fromWei(balance.toString(), 'ether')* 1000)/1000});
                });
            });
            this.factoryContract.methods.getExchange(this.state.token).call().then((exchangeAddress) => {
                const exchangeContract = new this.web3.eth.Contract(this.exchangeABI, exchangeAddress);
                exchangeContract.methods.getEthToTokenInputPrice(this.web3.utils.toWei('1', 'ether')).call().then((price) => {
                    this.setState({
                        exchangeRate : Math.round(this.web3.utils.fromWei(price, 'ether')* 100)/100,
                    })
                });
            });
    }

    getCurrency2FromCurrency1() {
        this.getBalance();
        this.factoryContract.methods.getExchange(this.state.token).call().then((exchangeAddress) => {
            console.log('ADDRESS',exchangeAddress)
            const exchangeContract = new this.web3.eth.Contract(this.exchangeABI, exchangeAddress);
            console.log('ADDRESS2',exchangeAddress)

            var optionGasEstimate = {
                from : this.web3.currentProvider.selectedAddress,
                value : this.web3.utils.toWei(this.state.currency1AmountToExchange, 'ether')
            };
            exchangeContract.methods.getEthToTokenOutputPrice(this.web3.utils.toWei(this.state.currency1AmountToExchange, 'ether')).call().then((price) => {
               exchangeContract.methods.ethToTokenTransferInput(price, Date.now() + 120, this.web3.currentProvider.selectedAddress).estimateGas(optionGasEstimate).then((gasToPay) => {
                console.log(gasToPay);
                    var optionSend = {
                            from : this.web3.currentProvider.selectedAddress,
                            gasLimit : gasToPay,
                            value : this.web3.utils.toWei(this.state.currency1AmountToExchange, 'ether'),
                        };
                    exchangeContract.methods.ethToTokenTransferInput(price, Date.now() + 120, this.web3.currentProvider.selectedAddress).send(optionSend).then((res) => {
                            console.log(res);
                        }).catch((err) => {
                            console.log(err);
                        });
                    });
            });
        })
    }

    approveTokensTransfer() {
        return this.factoryContract.methods.getExchange(this.state.token).call().then((exchangeAddress) => {

            var optionGasEstimate = {
                from : this.web3.currentProvider.selectedAddress
            };
            console.log('Amount to be approved', this.web3.utils.toWei(this.state.currency2AmountToExchange, 'ether'));
            return this.currency2Contract.methods.approve(exchangeAddress, this.web3.utils.toWei(this.state.currency2AmountToExchange, 'ether')).estimateGas(optionGasEstimate).then((gasEstimate) => {
                console.log(gasEstimate);
                
                var optionSend = {
                    from : this.web3.currentProvider.selectedAddress,
                    gasLimit : gasEstimate,
                }

                return this.currency2Contract.methods.approve(exchangeAddress, this.web3.utils.toWei(this.state.currency2AmountToExchange, 'ether')).send(optionSend).then((res) => {
                    console.log(res);
                    this.getCurrency1FromCurrency2();
                })
            });

        });
    }

    getCurrency1FromCurrency2() {
        this.getBalance();
            this.factoryContract.methods.getExchange(this.state.token).call().then((exchangeAddress) => {
                const exchangeContract = new this.web3.eth.Contract(this.exchangeABI, exchangeAddress);
    
                this.currency2Contract.methods.allowance(this.web3.currentProvider.selectedAddress, exchangeAddress).call().then((balance) => {
                    console.log('balance approver', balance)
                    console.log('montant de transfer', this.web3.utils.toWei(this.state.currency2AmountToExchange, 'ether'))
                    console.log(balance > this.web3.utils.toWei(this.state.currency2AmountToExchange, 'ether'))
                });
                var optionGasEstimate = {
                    from : this.web3.currentProvider.selectedAddress,
                };

                exchangeContract.methods.getTokenToEthInputPrice(this.state.currency2AmountToExchange).call().then((price) => {
                    console.log(price);
                    exchangeContract.methods.tokenToEthSwapInput(this.web3.utils.toWei(this.state.currency2AmountToExchange, 'ether'), this.web3.utils.toWei(price, 'ether'), Date.now() + 120).estimateGas(optionGasEstimate).then((gasToPay) => {
                        console.log(gasToPay)
                        var optionSend = {
                            from : this.web3.currentProvider.selectedAddress,
                            gasLimit : gasToPay
                        }
                        exchangeContract.methods.tokenToEthSwapInput(this.web3.utils.toWei(this.state.currency2AmountToExchange, 'ether'), this.web3.utils.toWei(price, 'ether'), Date.now() + 120).send(optionSend).then((res) => {
                            console.log(res);
                        }).catch((err) => {
                            console.log(err);
                        });
                    });
                });
            });       
    }

    handleCurrency1AmountToExchange(events) {
        if(parseFloat(events.target.value) % 1 !== 0) {
            alert('Cents not authorize!');
            return;
        }
        this.setState({
            currency1AmountToExchange : events.target.value,
        });
    }

    handleCurrency2AmountToExchange(events) {
        if(parseFloat(events.target.value) % 1 !== 0) {
            alert('Cents not authorize!');
            return;
        }
        this.setState({
            currency2AmountToExchange : events.target.value,
        });
    }

    render() {
        return (<section className="hero">
                <div className="hero-body">
                    <h1 className="title">
                        Uniswap Exchange
                    </h1>
                    <div className="container">
                        <a className="image aCustom is-32x32" >

                        <img src={this.state.currency2IconPath} width="30" height="36"></img>
                            
                        </a>
                    </div>
                    <div className="container contCust has-text-centered has-text-justified">
                    <p className="has-text-weight-semibold pCustom">{this.state.exchangeRate}</p>
                    </div>
                    <h3>Get {this.state.currency2} from {this.state.currency1}</h3>
                    <div className="field">
                        <div className="control">
                            <input className="input is-primary" type="text" value={this.state.currency1AmountToExchange} onChange={this.handleCurrency1AmountToExchange}/>
                        </div>
                        <br/>
                        <button className="button" onClick={() => this.getCurrency2FromCurrency1()}>Get</button>
                    </div>
                    <h3>{this.state.currency2} Balance : {this.state.currency2Balance}</h3>
                    <br/>
                    <h3>Get {this.state.currency1} from {this.state.currency2}</h3>
                    <div className="field">
                        <div className="control">
                            <input className="input is-primary" type="text" value={this.state.currency2AmountToExchange} onChange={this.handleCurrency2AmountToExchange}/>
                        </div>
                        <br/>
                        <button className="button" onClick={() => this.approveTokensTransfer()}>Get</button>
                    </div>
                    <h3>{this.state.currency1} Balance : {this.state.currency1Balance}</h3>
                </div>
            </section>);
    }
}

export default Exchange;