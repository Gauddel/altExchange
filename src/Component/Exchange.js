import React from 'react';
import Web3 from 'web3';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import BalanceComponent from './BalanceComponent';
import { timingSafeEqual } from 'crypto';

class Exchange extends React.Component {

    factoryABI = [{"name":"NewExchange","inputs":[{"type":"address","name":"token","indexed":true},{"type":"address","name":"exchange","indexed":true}],"anonymous":false,"type":"event"},{"name":"initializeFactory","outputs":[],"inputs":[{"type":"address","name":"template"}],"constant":false,"payable":false,"type":"function","gas":35725},{"name":"createExchange","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"address","name":"token"}],"constant":false,"payable":false,"type":"function","gas":187911},{"name":"getExchange","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"address","name":"token"}],"constant":true,"payable":false,"type":"function","gas":715},{"name":"getToken","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"address","name":"exchange"}],"constant":true,"payable":false,"type":"function","gas":745},{"name":"getTokenWithId","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"uint256","name":"token_id"}],"constant":true,"payable":false,"type":"function","gas":736},{"name":"exchangeTemplate","outputs":[{"type":"address","name":"out"}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":633},{"name":"tokenCount","outputs":[{"type":"uint256","name":"out"}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":663}];

    exchangeABI = [{"name": "TokenPurchase", "inputs": [{"type": "address", "name": "buyer", "indexed": true}, {"type": "uint256", "name": "eth_sold", "indexed": true}, {"type": "uint256", "name": "tokens_bought", "indexed": true}], "anonymous": false, "type": "event"}, {"name": "EthPurchase", "inputs": [{"type": "address", "name": "buyer", "indexed": true}, {"type": "uint256", "name": "tokens_sold", "indexed": true}, {"type": "uint256", "name": "eth_bought", "indexed": true}], "anonymous": false, "type": "event"}, {"name": "AddLiquidity", "inputs": [{"type": "address", "name": "provider", "indexed": true}, {"type": "uint256", "name": "eth_amount", "indexed": true}, {"type": "uint256", "name": "token_amount", "indexed": true}], "anonymous": false, "type": "event"}, {"name": "RemoveLiquidity", "inputs": [{"type": "address", "name": "provider", "indexed": true}, {"type": "uint256", "name": "eth_amount", "indexed": true}, {"type": "uint256", "name": "token_amount", "indexed": true}], "anonymous": false, "type": "event"}, {"name": "Transfer", "inputs": [{"type": "address", "name": "_from", "indexed": true}, {"type": "address", "name": "_to", "indexed": true}, {"type": "uint256", "name": "_value", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "Approval", "inputs": [{"type": "address", "name": "_owner", "indexed": true}, {"type": "address", "name": "_spender", "indexed": true}, {"type": "uint256", "name": "_value", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "setup", "outputs": [], "inputs": [{"type": "address", "name": "token_addr"}], "constant": false, "payable": false, "type": "function", "gas": 175875}, {"name": "addLiquidity", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "min_liquidity"}, {"type": "uint256", "name": "max_tokens"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": true, "type": "function", "gas": 82605}, {"name": "removeLiquidity", "outputs": [{"type": "uint256", "name": "out"}, {"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "amount"}, {"type": "uint256", "name": "min_eth"}, {"type": "uint256", "name": "min_tokens"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": false, "type": "function", "gas": 116814}, {"name": "__default__", "outputs": [], "inputs": [], "constant": false, "payable": true, "type": "function"}, {"name": "ethToTokenSwapInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "min_tokens"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": true, "type": "function", "gas": 12757}, {"name": "ethToTokenTransferInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "min_tokens"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}], "constant": false, "payable": true, "type": "function", "gas": 12965}, {"name": "ethToTokenSwapOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": true, "type": "function", "gas": 50455}, {"name": "ethToTokenTransferOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}], "constant": false, "payable": true, "type": "function", "gas": 50663}, {"name": "tokenToEthSwapInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_eth"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": false, "type": "function", "gas": 47503}, {"name": "tokenToEthTransferInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_eth"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}], "constant": false, "payable": false, "type": "function", "gas": 47712}, {"name": "tokenToEthSwapOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "eth_bought"}, {"type": "uint256", "name": "max_tokens"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": false, "type": "function", "gas": 50175}, {"name": "tokenToEthTransferOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "eth_bought"}, {"type": "uint256", "name": "max_tokens"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}], "constant": false, "payable": false, "type": "function", "gas": 50384}, {"name": "tokenToTokenSwapInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_tokens_bought"}, {"type": "uint256", "name": "min_eth_bought"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "token_addr"}], "constant": false, "payable": false, "type": "function", "gas": 51007}, {"name": "tokenToTokenTransferInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_tokens_bought"}, {"type": "uint256", "name": "min_eth_bought"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}, {"type": "address", "name": "token_addr"}], "constant": false, "payable": false, "type": "function", "gas": 51098}, {"name": "tokenToTokenSwapOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "max_tokens_sold"}, {"type": "uint256", "name": "max_eth_sold"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "token_addr"}], "constant": false, "payable": false, "type": "function", "gas": 54928}, {"name": "tokenToTokenTransferOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "max_tokens_sold"}, {"type": "uint256", "name": "max_eth_sold"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}, {"type": "address", "name": "token_addr"}], "constant": false, "payable": false, "type": "function", "gas": 55019}, {"name": "tokenToExchangeSwapInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_tokens_bought"}, {"type": "uint256", "name": "min_eth_bought"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "exchange_addr"}], "constant": false, "payable": false, "type": "function", "gas": 49342}, {"name": "tokenToExchangeTransferInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_tokens_bought"}, {"type": "uint256", "name": "min_eth_bought"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}, {"type": "address", "name": "exchange_addr"}], "constant": false, "payable": false, "type": "function", "gas": 49532}, {"name": "tokenToExchangeSwapOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "max_tokens_sold"}, {"type": "uint256", "name": "max_eth_sold"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "exchange_addr"}], "constant": false, "payable": false, "type": "function", "gas": 53233}, {"name": "tokenToExchangeTransferOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "max_tokens_sold"}, {"type": "uint256", "name": "max_eth_sold"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}, {"type": "address", "name": "exchange_addr"}], "constant": false, "payable": false, "type": "function", "gas": 53423}, {"name": "getEthToTokenInputPrice", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "eth_sold"}], "constant": true, "payable": false, "type": "function", "gas": 5542}, {"name": "getEthToTokenOutputPrice", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}], "constant": true, "payable": false, "type": "function", "gas": 6872}, {"name": "getTokenToEthInputPrice", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}], "constant": true, "payable": false, "type": "function", "gas": 5637}, {"name": "getTokenToEthOutputPrice", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "eth_bought"}], "constant": true, "payable": false, "type": "function", "gas": 6897}, {"name": "tokenAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1413}, {"name": "factoryAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1443}, {"name": "balanceOf", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "address", "name": "_owner"}], "constant": true, "payable": false, "type": "function", "gas": 1645}, {"name": "transfer", "outputs": [{"type": "bool", "name": "out"}], "inputs": [{"type": "address", "name": "_to"}, {"type": "uint256", "name": "_value"}], "constant": false, "payable": false, "type": "function", "gas": 75034}, {"name": "transferFrom", "outputs": [{"type": "bool", "name": "out"}], "inputs": [{"type": "address", "name": "_from"}, {"type": "address", "name": "_to"}, {"type": "uint256", "name": "_value"}], "constant": false, "payable": false, "type": "function", "gas": 110907}, {"name": "approve", "outputs": [{"type": "bool", "name": "out"}], "inputs": [{"type": "address", "name": "_spender"}, {"type": "uint256", "name": "_value"}], "constant": false, "payable": false, "type": "function", "gas": 38769}, {"name": "allowance", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "address", "name": "_owner"}, {"type": "address", "name": "_spender"}], "constant": true, "payable": false, "type": "function", "gas": 1925}, {"name": "name", "outputs": [{"type": "bytes32", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1623}, {"name": "symbol", "outputs": [{"type": "bytes32", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1653}, {"name": "decimals", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1683}, {"name": "totalSupply", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1713}];
    web3;
    factoryAddress = '0xf5D915570BC477f9B8D6C0E980aA81757A3AaC36';
    factoryContract;
    currency2Contract;
    currency1ToCurrency2Price = [];
    currency2ToCurrency1Price = [];
    dates = [];

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
            currency2BalanceRounded : 0,
            currency1BalanceRounded : 0,
            currency1AmountToExchange : '',
            currency2AmountToGet : 0,
            currency2AmountToExchange : '',
            currency1AmountToGet : 0,
            exchangeRate : 0,
            dates : undefined,
            currency1ToCurrency2Price : undefined,
            currency2ToCurrency1Price : undefined,
            chartLoaded : false,
            send : this.props.send,
            addressToSend : '',
            senderAddressOk : false,
            senderInputClass : 'input is-primary',
            currency1AmountToTransferOk : false,
            currency2AmountToTransferOk : false,
            currency1AmountToTransferClass : 'input is-primary',
            currency2AmountToTransferClass : 'input is-primary',
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
        this.sendInput = this.sendInput.bind(this);
        this.getExchangeRate = this.getExchangeRate.bind(this);
        this.checkCurrency1AmountToTransferToBalance = this.checkCurrency1AmountToTransferToBalance.bind(this);
        this.checkCurrency2AmountToTransferToBalance = this.checkCurrency2AmountToTransferToBalance.bind(this);
        this.handleSendAddress = this.handleSendAddress.bind(this);
        this.sendOrTrade = this.sendOrTrade.bind(this);
        this.getExchangeRate();
    }

    getExchangeRate() {
        this.factoryContract.methods.getExchange(this.state.token).call().then((exchangeAddress) => {
            const exchangeContract = new this.web3.eth.Contract(this.exchangeABI, exchangeAddress);
            exchangeContract.methods.getEthToTokenInputPrice(this.web3.utils.toWei((1).toString(), 'ether')).call().then((exchangeRate) => {
                this.setState({
                    exchangeRate : Math.round(this.web3.utils.fromWei(exchangeRate.toString(), 'ether')*100)/100,
                })
            })
        });
    }

    getCurrency2FromCurrency1() {
        if(!this.state.currency1AmountToTransferOk  || (this.props.send && !this.state.senderAddressOk)) {
            alert('Inputed is\'t correct!');
            return;
        }

        var receiver = this.web3.currentProvider.selectedAddress
        if(this.props.send) {
            receiver = this.state.addressToSend;
        }

        this.factoryContract.methods.getExchange(this.state.token).call().then((exchangeAddress) => {
            const exchangeContract = new this.web3.eth.Contract(this.exchangeABI, exchangeAddress);

            var optionGasEstimate = {
                from : this.web3.currentProvider.selectedAddress,
                value : this.web3.utils.toWei(this.state.currency1AmountToExchange, 'ether')
            };
            exchangeContract.methods.getEthToTokenInputPrice(this.web3.utils.toWei(this.state.currency1AmountToExchange, 'ether')).call().then((price) => {
               exchangeContract.methods.ethToTokenTransferInput(price, Date.now() + 120, receiver).estimateGas(optionGasEstimate).then((gasToPay) => {
                    var optionSend = {
                            from : this.web3.currentProvider.selectedAddress,
                            gasLimit : gasToPay,
                            value : this.web3.utils.toWei(this.state.currency1AmountToExchange, 'ether'),
                        };
                    exchangeContract.methods.ethToTokenTransferInput(price, Date.now() + 120, receiver).send(optionSend).then((res) => {
                            console.log(res);
                        }).catch((err) => {
                            console.log(err);
                        });
                    });
            });
        })
    }

    approveTokensTransfer() {
        if(!this.state.currency2AmountToTransferOk || (this.props.send && !this.state.senderAddressOk)) {
            alert('Inputed value is\'t correct!');
            return
        }

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
            var receiver = this.web3.currentProvider.selectedAddress
            if(this.props.send) {
                receiver = this.state.addressToSend;
            }

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

                exchangeContract.methods.getTokenToEthInputPrice(this.web3.utils.toWei(this.state.currency2AmountToExchange, 'ether')).call().then((price) => {
                    console.log(price);
                    exchangeContract.methods.tokenToEthTransferInput(this.web3.utils.toWei(this.state.currency2AmountToExchange, 'ether'), price, Date.now() + 120, receiver).estimateGas(optionGasEstimate).then((gasToPay) => {
                        console.log(gasToPay)
                        var optionSend = {
                            from : this.web3.currentProvider.selectedAddress,
                            gasLimit : gasToPay
                        }
                        exchangeContract.methods.tokenToEthTransferInput(this.web3.utils.toWei(this.state.currency2AmountToExchange, 'ether'), price, Date.now() + 120, receiver).send(optionSend).then((res) => {
                            console.log(res);
                        }).catch((err) => {
                            console.log(err);
                        });
                    });
                });
            });       
    }

    handleCurrency1AmountToExchange(events) {
        var currency1Amount = events.target.value;
        if(currency1Amount === '' || currency1Amount === undefined) {
            this.setState({
                currency1AmountToExchange : '',
                currency2AmountToGet : 0,
            })
            return;
        }

        this.factoryContract.methods.getExchange(this.state.token).call().then((exchangeContractAddress) => {
            var exchangeContract = new this.web3.eth.Contract(this.exchangeABI, exchangeContractAddress);
            exchangeContract.methods.getEthToTokenInputPrice(this.web3.utils.toWei(currency1Amount, 'ether')).call().then((price) => {
            console.log(currency1Amount)
                
                this.setState({
                    currency1AmountToExchange : currency1Amount,
                    currency2AmountToGet : Math.round(this.web3.utils.fromWei(price.toString(), 'ether')*100)/100,
                },this.checkCurrency1AmountToTransferToBalance(currency1Amount) );
            });            
        });
    }

    checkCurrency1AmountToTransferToBalance(currency1Amount) {
        if(currency1Amount === '' || currency1Amount === undefined
        ) {
            this.setState({
                currency1AmountToTransferOk : false,
                currency1AmountToTransferClass : 'input is-primary',
            });
            return;
        }

        this.web3.eth.getAccounts().then((accounts) => {
            var mainAccount = accounts[0];

            this.web3.eth.getBalance(mainAccount).then((balance) => {
                if (Number(currency1Amount) > Number(this.web3.utils.fromWei(balance, 'ether'))) {
                    this.setState({
                        currency1AmountToTransferOk : false,
                        currency1AmountToTransferClass : 'input is-primary has-text-danger',
                    });
                    return;
                }
                this.setState({
                    currency1AmountToTransferOk : true,
                    currency1AmountToTransferClass : 'input is-primary has-text-primary',
                });
            });
        });
    }

    handleCurrency2AmountToExchange(events) {
        var currency2Amount = events.target.value;
        if(currency2Amount === '' || currency2Amount === undefined) {
            this.setState({
                currency2AmountToExchange : '',
                currency1AmountToGet : 0,
            })
            return;
        }

        this.factoryContract.methods.getExchange(this.state.token).call().then((exchangeContractAddress) => {
            var exchangeContract = new this.web3.eth.Contract(this.exchangeABI, exchangeContractAddress);
            exchangeContract.methods.getTokenToEthInputPrice(this.web3.utils.toWei(currency2Amount, 'ether')).call().then((price) => {
                this.setState({
                    currency2AmountToExchange : currency2Amount,
                    currency1AmountToGet : Math.round(this.web3.utils.fromWei(price.toString(), 'ether')*100)/100,
                });
                this.checkCurrency2AmountToTransferToBalance(currency2Amount);
            });            
        });
    }

    checkCurrency2AmountToTransferToBalance(currency2Amount) {
        if(currency2Amount === '' || currency2Amount === undefined
        ) {
            this.setState({
                currency2AmountToTransferOk : false,
                currency2AmountToTransferClass : 'input is-primary',
            });
            return;
        }

        this.web3.eth.getAccounts().then((accounts) => {
            var mainAccount = accounts[0];
            var tokenContract = new this.web3.eth.Contract(this.state.abi, this.state.token);
            tokenContract.methods.balanceOf(mainAccount).call().then((balance) => {
                if (Number(currency2Amount) > Number(this.web3.utils.fromWei(balance, 'ether'))) {
                    this.setState({
                        currency2AmountToTransferOk : false,
                        currency2AmountToTransferClass : 'input is-primary has-text-danger',
                    });
                    return;
                }
                this.setState({
                    currency2AmountToTransferOk : true,
                    currency2AmountToTransferClass : 'input is-primary has-text-primary',
                });
            });
        });
    }

    sendInput() {
        if(!this.props.send) {
            return (<div></div>);
        }

        return (
            <div>
                <div className="field">
                    <p className="control">
                        <input className={this.state.senderInputClass} placeholder='Receiver Address' type="text" value={this.state.addressToSend} onChange={this.handleSendAddress}/>
                    </p>
                </div>
                <br/>
            </div>
        );
    }

    handleSendAddress(events) {

        var senderAddressOk = this.web3.utils.isAddress(events.target.value);

        if(senderAddressOk) {
            this.setState({
                senderInputClass : 'input is-primary has-text-primary',
            });
        }
        if (!senderAddressOk) {
            this.setState({
                senderInputClass : 'input is-primary has-text-danger',
            });
        }

        this.setState({
            addressToSend : events.target.value,
            senderAddressOk : senderAddressOk,
        })
    }

    sendOrTrade() {
        if (this.props.send) {
            return 'Send';
        }
        return 'Get';
    }

    render() {
        this.getExchangeRate();
        return (<section className="hero">
                <BalanceComponent currency1={this.state.currency1}
                currency2={this.state.currency2}
                token={this.state.token}
                abi={this.state.abi}
                />
                <div className="hero-body">
                    <div className="container">
                        <a className="image aCustom is-32x32" >
                            <img src={this.state.currency2IconPath} width="30" height="36"></img>
                        </a>
                    </div>
                    <div className="container contCust has-text-centered has-text-justified">
                    <p className="has-text-weight-semibold pCustom">{this.state.exchangeRate}</p>
                    </div>
                    {this.sendInput()}
                    <div className="field has-addons" id="inputTrade">
                        <p className="control" id="inputTradeCurrenyInputed">
                            <a className="button buttonT is-static">
                                {this.state.currency1}
                            </a>
                        </p>
                        <p className="control" id="inputTradeAmountInputed">
                            <input className={this.state.currency1AmountToTransferClass} type="number" value={this.state.currency1AmountToExchange} onChange={this.handleCurrency1AmountToExchange}/>
                        </p>
                        <p className="control" id="inputTradeAmountConverted">
                            <a className="button buttonT is-static">
                                {this.state.currency2AmountToGet}
                            </a>
                        </p>
                    </div>
                    <button className="button" onClick={() => this.getCurrency2FromCurrency1()}>{this.sendOrTrade()} {this.state.currency2}</button>
                    <br/>
                    <br/>
                    <br/>
                    <div className="field has-addons" id="inputTrade">
                        <p className="control" id="inputTradeCurrenyInputed">
                            <a className="button buttonT is-static">
                                {this.state.currency2}
                            </a>
                        </p>
                        <p className="control" id="inputTradeAmountInputed">
                            <input className={this.state.currency2AmountToTransferClass} type="number" value={this.state.currency2AmountToExchange} onChange={this.handleCurrency2AmountToExchange}/>
                        </p>
                        <p className="control" id="inputTradeAmountConverted">
                            <a className="button buttonT is-static">
                                {this.state.currency1AmountToGet}
                            </a>
                        </p>
                    </div>
                    <button className="button" onClick={() => this.approveTokensTransfer()}>{this.sendOrTrade()} {this.state.currency1}</button>
                </div>
            </section>);
    }
}

export default Exchange;