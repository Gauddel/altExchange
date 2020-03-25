import React from 'react';
import LiquidityBalance from './LiquidityBalance';
import CurrencyPairsComponent from './CurrencyPairsComponent';
import Web3 from 'web3';

class Deposit extends React.Component {

    exchangeABI = [{"name": "TokenPurchase", "inputs": [{"type": "address", "name": "buyer", "indexed": true}, {"type": "uint256", "name": "eth_sold", "indexed": true}, {"type": "uint256", "name": "tokens_bought", "indexed": true}], "anonymous": false, "type": "event"}, {"name": "EthPurchase", "inputs": [{"type": "address", "name": "buyer", "indexed": true}, {"type": "uint256", "name": "tokens_sold", "indexed": true}, {"type": "uint256", "name": "eth_bought", "indexed": true}], "anonymous": false, "type": "event"}, {"name": "AddLiquidity", "inputs": [{"type": "address", "name": "provider", "indexed": true}, {"type": "uint256", "name": "eth_amount", "indexed": true}, {"type": "uint256", "name": "token_amount", "indexed": true}], "anonymous": false, "type": "event"}, {"name": "RemoveLiquidity", "inputs": [{"type": "address", "name": "provider", "indexed": true}, {"type": "uint256", "name": "eth_amount", "indexed": true}, {"type": "uint256", "name": "token_amount", "indexed": true}], "anonymous": false, "type": "event"}, {"name": "Transfer", "inputs": [{"type": "address", "name": "_from", "indexed": true}, {"type": "address", "name": "_to", "indexed": true}, {"type": "uint256", "name": "_value", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "Approval", "inputs": [{"type": "address", "name": "_owner", "indexed": true}, {"type": "address", "name": "_spender", "indexed": true}, {"type": "uint256", "name": "_value", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "setup", "outputs": [], "inputs": [{"type": "address", "name": "token_addr"}], "constant": false, "payable": false, "type": "function", "gas": 175875}, {"name": "addLiquidity", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "min_liquidity"}, {"type": "uint256", "name": "max_tokens"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": true, "type": "function", "gas": 82605}, {"name": "removeLiquidity", "outputs": [{"type": "uint256", "name": "out"}, {"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "amount"}, {"type": "uint256", "name": "min_eth"}, {"type": "uint256", "name": "min_tokens"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": false, "type": "function", "gas": 116814}, {"name": "__default__", "outputs": [], "inputs": [], "constant": false, "payable": true, "type": "function"}, {"name": "ethToTokenSwapInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "min_tokens"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": true, "type": "function", "gas": 12757}, {"name": "ethToTokenTransferInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "min_tokens"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}], "constant": false, "payable": true, "type": "function", "gas": 12965}, {"name": "ethToTokenSwapOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": true, "type": "function", "gas": 50455}, {"name": "ethToTokenTransferOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}], "constant": false, "payable": true, "type": "function", "gas": 50663}, {"name": "tokenToEthSwapInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_eth"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": false, "type": "function", "gas": 47503}, {"name": "tokenToEthTransferInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_eth"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}], "constant": false, "payable": false, "type": "function", "gas": 47712}, {"name": "tokenToEthSwapOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "eth_bought"}, {"type": "uint256", "name": "max_tokens"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": false, "type": "function", "gas": 50175}, {"name": "tokenToEthTransferOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "eth_bought"}, {"type": "uint256", "name": "max_tokens"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}], "constant": false, "payable": false, "type": "function", "gas": 50384}, {"name": "tokenToTokenSwapInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_tokens_bought"}, {"type": "uint256", "name": "min_eth_bought"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "token_addr"}], "constant": false, "payable": false, "type": "function", "gas": 51007}, {"name": "tokenToTokenTransferInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_tokens_bought"}, {"type": "uint256", "name": "min_eth_bought"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}, {"type": "address", "name": "token_addr"}], "constant": false, "payable": false, "type": "function", "gas": 51098}, {"name": "tokenToTokenSwapOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "max_tokens_sold"}, {"type": "uint256", "name": "max_eth_sold"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "token_addr"}], "constant": false, "payable": false, "type": "function", "gas": 54928}, {"name": "tokenToTokenTransferOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "max_tokens_sold"}, {"type": "uint256", "name": "max_eth_sold"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}, {"type": "address", "name": "token_addr"}], "constant": false, "payable": false, "type": "function", "gas": 55019}, {"name": "tokenToExchangeSwapInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_tokens_bought"}, {"type": "uint256", "name": "min_eth_bought"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "exchange_addr"}], "constant": false, "payable": false, "type": "function", "gas": 49342}, {"name": "tokenToExchangeTransferInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_tokens_bought"}, {"type": "uint256", "name": "min_eth_bought"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}, {"type": "address", "name": "exchange_addr"}], "constant": false, "payable": false, "type": "function", "gas": 49532}, {"name": "tokenToExchangeSwapOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "max_tokens_sold"}, {"type": "uint256", "name": "max_eth_sold"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "exchange_addr"}], "constant": false, "payable": false, "type": "function", "gas": 53233}, {"name": "tokenToExchangeTransferOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "max_tokens_sold"}, {"type": "uint256", "name": "max_eth_sold"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}, {"type": "address", "name": "exchange_addr"}], "constant": false, "payable": false, "type": "function", "gas": 53423}, {"name": "getEthToTokenInputPrice", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "eth_sold"}], "constant": true, "payable": false, "type": "function", "gas": 5542}, {"name": "getEthToTokenOutputPrice", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}], "constant": true, "payable": false, "type": "function", "gas": 6872}, {"name": "getTokenToEthInputPrice", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}], "constant": true, "payable": false, "type": "function", "gas": 5637}, {"name": "getTokenToEthOutputPrice", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "eth_bought"}], "constant": true, "payable": false, "type": "function", "gas": 6897}, {"name": "tokenAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1413}, {"name": "factoryAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1443}, {"name": "balanceOf", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "address", "name": "_owner"}], "constant": true, "payable": false, "type": "function", "gas": 1645}, {"name": "transfer", "outputs": [{"type": "bool", "name": "out"}], "inputs": [{"type": "address", "name": "_to"}, {"type": "uint256", "name": "_value"}], "constant": false, "payable": false, "type": "function", "gas": 75034}, {"name": "transferFrom", "outputs": [{"type": "bool", "name": "out"}], "inputs": [{"type": "address", "name": "_from"}, {"type": "address", "name": "_to"}, {"type": "uint256", "name": "_value"}], "constant": false, "payable": false, "type": "function", "gas": 110907}, {"name": "approve", "outputs": [{"type": "bool", "name": "out"}], "inputs": [{"type": "address", "name": "_spender"}, {"type": "uint256", "name": "_value"}], "constant": false, "payable": false, "type": "function", "gas": 38769}, {"name": "allowance", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "address", "name": "_owner"}, {"type": "address", "name": "_spender"}], "constant": true, "payable": false, "type": "function", "gas": 1925}, {"name": "name", "outputs": [{"type": "bytes32", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1623}, {"name": "symbol", "outputs": [{"type": "bytes32", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1653}, {"name": "decimals", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1683}, {"name": "totalSupply", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1713}];

    factoryAddress = '0xf5D915570BC477f9B8D6C0E980aA81757A3AaC36';
    factoryABI = [{"name": "NewExchange", "inputs": [{"type": "address", "name": "token", "indexed": true}, {"type": "address", "name": "exchange", "indexed": true}], "anonymous": false, "type": "event"}, {"name": "initializeFactory", "outputs": [], "inputs": [{"type": "address", "name": "template"}], "constant": false, "payable": false, "type": "function", "gas": 35725}, {"name": "createExchange", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "address", "name": "token"}], "constant": false, "payable": false, "type": "function", "gas": 187911}, {"name": "getExchange", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "address", "name": "token"}], "constant": true, "payable": false, "type": "function", "gas": 715}, {"name": "getToken", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "address", "name": "exchange"}], "constant": true, "payable": false, "type": "function", "gas": 745}, {"name": "getTokenWithId", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "uint256", "name": "token_id"}], "constant": true, "payable": false, "type": "function", "gas": 736}, {"name": "exchangeTemplate", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 633}, {"name": "tokenCount", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 663}];
    factoryContract;

    constructor(props) {
        super(props);

        this.state = {
            currencyPair : this.props.currencyPair,
            currency1AmountToDeposit : '',
            currency2AmountToDeposit : '',
            web3 : new Web3(window.ethereum),
            remove : false,
            removeLiquidity : 0,
            removeEther : 0,
            removeToken : 0,
            currency1EnoughBalance : false,
            currency1EnoughClass : 'input is-primary',
            currency2EnoughBalance : false,
            currency2EnoughClass : 'input is-primary',
            pooledToken: '',
            pooledTokenEnoughBalance : false,
            pooledTokenEnoughClass : 'input is-primary',
        }

        this.handleCurrency1AmountToDeposit = this.handleCurrency1AmountToDeposit.bind(this);
        this.handleCurrency2AmountToDeposit = this.handleCurrency2AmountToDeposit.bind(this);
        this.deposit = this.deposit.bind(this);
        this.remove = this.remove.bind(this);
        this.handleRemoveLiquidity = this.handleRemoveLiquidity.bind(this);
        this.checkCurrency1EnoughtBalance = this.checkCurrency1EnoughtBalance.bind(this);
        this.checkCurrency2EnoughtBalance = this.checkCurrency2EnoughtBalance.bind(this);
        this.checkPooledTokenEnoughtBalance = this.checkPooledTokenEnoughtBalance.bind(this);
    }

    handleCurrency1AmountToDeposit(events) {
        if(events.target.value == '' || events.target.value == undefined) {
            this.setState({
                currency1EnoughBalance : false,
                currency1EnoughClass : 'input is-primary has-text-danger',
                currency2EnoughBalance : false,
                currency2EnoughClass : 'input is-primary has-text-danger',
                currency1AmountToDeposit : '',
                currency2AmountToDeposit : ''
            })
            return;
        }

        this.checkCurrency1EnoughtBalance(events.target.value);
        this.checkCurrency2EnoughtBalance(events.target.value);
        var val = events.target.value;
            this.factoryContract = new this.state.web3.eth.Contract(this.factoryABI, this.factoryAddress);
            this.factoryContract.methods.getExchange(this.props.currencyPair.token).call().then((exchangeAddress) => {
                var exchangeContract = new this.state.web3.eth.Contract(this.exchangeABI, exchangeAddress);
                exchangeContract.methods.getEthToTokenInputPrice(this.state.web3.utils.toWei(val, 'ether')).call().then((currency2AmountToDeposit) => {
                    this.setState({
                        currency1AmountToDeposit : val,
                        currency2AmountToDeposit : this.state.web3.utils.fromWei(currency2AmountToDeposit, 'ether'),
                    });
                });
            });
    }

    checkCurrency1EnoughtBalance(balance) {
        this.state.web3.eth.getAccounts().then((accounts) => {
            var mainAccount = accounts[0];
            this.state.web3.eth.getBalance(mainAccount).then((balanceOfEther) => {
                if(this.state.web3.utils.fromWei(balanceOfEther) > balance) {
                    this.setState({
                        currency1EnoughBalance : true,
                        currency1EnoughClass : 'input is-primary has-text-primary',
                    });
                    return;
                }
                this.setState({
                    currency1EnoughBalance : false,
                    currency1EnoughClass : 'input is-primary has-text-danger',
                });                
            })
        })
    }

    handleCurrency2AmountToDeposit(events) {
        if(events.target.value == '' || events.target.value == undefined) {
            this.setState({
                currency2EnoughBalance : false,
                currency2EnoughClass : 'input is-primary has-text-danger',
                currency1EnoughBalance : false,
                currency1EnoughClass : 'input is-primary has-text-danger',
                currency1AmountToDeposit : '',
                currency2AmountToDeposit : ''
            })
            return;
        }

        this.checkCurrency1EnoughtBalance(events.target.value);
        this.checkCurrency2EnoughtBalance(events.target.value);
        var val = events.target.value;
        if(this.props.currencyPair.tokenSelected === true && this.props.currencyPair.abi !== ''){
            this.factoryContract = new this.state.web3.eth.Contract(this.factoryABI, this.factoryAddress);
            this.factoryContract.methods.getExchange(this.props.currencyPair.token).call().then((exchangeAddress) => {
                var exchangeContract = new this.state.web3.eth.Contract(this.exchangeABI, exchangeAddress);
                exchangeContract.methods.getTokenToEthInputPrice(this.state.web3.utils.toWei(val, 'ether')).call().then((currency1AmountToDeposit) => {
                    this.setState({
                        currency1AmountToDeposit : this.state.web3.utils.fromWei(currency1AmountToDeposit, 'ether'),
                        currency2AmountToDeposit : val,
                    });
                });
            });
        }
    }

    checkCurrency2EnoughtBalance(balance) {
        var tokenContract = new this.state.web3.eth.Contract(this.props.currencyPair.abi, this.props.currencyPair.token);
        this.state.web3.eth.getAccounts().then((accounts) => {
            var mainAccount = accounts[0];
            tokenContract.methods.balanceOf(mainAccount).call().then((balanceOfToken) => {
                if(this.state.web3.utils.fromWei(balanceOfToken) > balance) {
                    this.setState({
                        currency2EnoughBalance : true,
                        currency2EnoughClass : 'input is-primary has-text-primary',
                    });
                    return;
                }
                this.setState({
                    currency2EnoughBalance : false,
                    currency2EnoughClass : 'input is-primary has-text-danger',
                });  
            })

        })
    }

    deposit() {
        if(!this.state.currency1EnoughBalance || !this.state.currency2EnoughBalance) {
            alert('Inputed data isn\'t correct!');
            return
        }

        this.state.web3.eth.getAccounts().then((accounts) => {
            var mainAccount = accounts[0];
        // approve on ERC20 token side
        this.factoryContract = new this.state.web3.eth.Contract(this.factoryABI, this.factoryAddress);
        this.factoryContract.methods.getExchange(this.props.currencyPair.token).call().then((exchangeAddress) => {
            var erc20TokenContract = new this.state.web3.eth.Contract(this.props.currencyPair.abi, this.props.currencyPair.token);
        erc20TokenContract.methods.approve(exchangeAddress, this.state.web3.utils.toWei((Number(this.state.currency2AmountToDeposit) + 1).toString(), 'ether')).send({from : mainAccount}).then(() => {
            var exchangeContract = new this.state.web3.eth.Contract(this.exchangeABI, exchangeAddress);
            exchangeContract.methods.addLiquidity(1, this.state.web3.utils.toWei((Number(this.state.currency2AmountToDeposit) + 1).toString(),'ether'), Date.now() + 120)
        .send({from: mainAccount, value : this.state.web3.utils.toWei(this.state.currency1AmountToDeposit, 'ether')}).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
        });        
    });
});
    }

    removeView() {
        this.setState({
            remove : !this.state.remove,
        })
    }

    handleRemoveLiquidity(events) {
        if(events.target.value == '' || events.target.value == undefined) {
            this.setState({
                pooledToken :'',
                pooledTokenEnoughBalance : false,
                pooledTokenEnoughBalance : 'input is-primary has-text-danger'
            });
            return;
        }
        this.checkPooledTokenEnoughtBalance(events.target.value);

        var amountToRemove = events.target.value;
        this.setState({
            pooledToken : amountToRemove,
        });

        this.state.web3.eth.getAccounts().then((accounts) => {
            var mainAccount = accounts[0];
            var erc20TokenContract = new this.state.web3.eth.Contract(this.props.currencyPair.abi, this.props.currencyPair.token);
        this.factoryContract = new this.state.web3.eth.Contract(this.factoryABI, this.factoryAddress);
        this.factoryContract.methods.getExchange(this.props.currencyPair.token).call().then((exchangeAddress) => {
            var exchangeContract = new this.state.web3.eth.Contract(this.exchangeABI, exchangeAddress);
            exchangeContract.methods.balanceOf(mainAccount).call().then((balance) =>  {
                this.state.web3.eth.getBalance(exchangeAddress).then((etherBalance) => {
                    exchangeContract.methods.totalSupply().call().then((totalSupply) =>  {
                        erc20TokenContract.methods.balanceOf(exchangeAddress).call().then((tokenBalance) => {
                            if(amountToRemove > balance) {
                                return;
                            }                            
                            var removeLiquidity = this.state.web3.utils.toWei(amountToRemove, 'ether');    
                            var ratio =  removeLiquidity / totalSupply;
                            var removeEther = etherBalance * ratio;
                            var removeToken = tokenBalance * ratio;

                            console.log(ratio);
                            console.log(removeEther);
                            console.log(removeToken);


                            this.setState({
                                removeLiquidity :removeLiquidity,
                                removeEther : removeEther - 10,
                                removeToken : removeToken - 10,
                            })
                        });   

                    });
                                     
                });
            });        
        });
    });
    }

    checkPooledTokenEnoughtBalance(balance) {
        var factoryContract = new this.state.web3.eth.Contract(this.factoryABI, this.factoryAddress);
        
        this.state.web3.eth.getAccounts().then((accounts) => {
            var mainAccount = accounts[0];
            factoryContract.methods.getExchange(this.props.currencyPair.token).call().then((exchangeAddress) => {
                var exchangeContract = new this.state.web3.eth.Contract(this.exchangeABI, exchangeAddress);
                exchangeContract.methods.balanceOf(mainAccount).call().then((balancePooledToken) => {
                    if(this.state.web3.utils.fromWei(balancePooledToken, 'ether') > balance) {
                        this.setState({
                            pooledTokenEnoughBalance : true,
                            pooledTokenEnoughClass : 'input is-primary has-text-primary'
                        });
                        return;
                    }

                    this.setState({
                        pooledTokenEnoughBalance : false,
                        pooledTokenEnoughClass : 'input is-primary has-text-danger'
                    });
                });
            })
        });
    }

    remove() {
        if(!this.state.pooledTokenEnoughBalance) {
            alert('Inputed data isn\'t correct!');
            return
        }

        this.state.web3.eth.getAccounts().then((accounts) => {
            var mainAccount = accounts[0];
            this.factoryContract = new this.state.web3.eth.Contract(this.factoryABI, this.factoryAddress);
            this.factoryContract.methods.getExchange(this.props.currencyPair.token).call().then((exchangeAddress) => {
                var exchangeContract = new this.state.web3.eth.Contract(this.exchangeABI, exchangeAddress);
                exchangeContract.methods.removeLiquidity(
                    this.state.removeLiquidity.toString(),
                    (1).toString(),
                    (1).toString(),
                    Date.now() + 120).send(
                        {
                            from : mainAccount,
                        }
                    ).then((res) => {
                        console.log(res)
                    }).catch((err) => {
                        console.log(err);
                    });
            });
        });
    }

    render() {
        console.log(this.state.currencyPair)
        if(this.props.currencyPair.tokenSelected === true && this.props.currencyPair.abi !== '' && !this.state.remove) {
        return (<div id="providerMissing">
            <br/>
            <div id="sendSwitch">
                <div className="field" id="field">
                    <input id="switchExample" type="checkbox" name="switchExample" className="switch is-info" checked={this.state.sendToSomeOne} onChange={() => this.removeView()}/>
                    <label htmlFor="switchExample">Remove</label>
                </div>
            </div>
            <CurrencyPairsComponent dropdownListClass={() => this.props.dropdownListClass()}
            dropdownListClicked={() => this.props.dropdownListClicked()}
            GetSelectionText={() => this.props.GetSelectionText()}
            ethBatClass={() => this.props.ethBatClass()}
            ethBatSelection={() => this.props.ethBatSelection()}
            ethDaiClass={() => this.props.ethDaiClass()}
            ethDaiSelection={() => this.props.ethDaiSelection()}
            ethMkrClass={() => this.props.ethMkrClass()}
            ethMkrSelection={() => this.props.ethMkrSelection()}
            ethOmgClass={()=> this.props.ethOmgClass()}
            ethOmgSelection={() => this.props.ethOmgSelection()}
            ethZrxClass={() => this.props.ethZrxClass()}
            ethZrxSelection={()=> this.props.ethZrxSelection()}/>
            <br/>
            <br/>
            <LiquidityBalance currency1={this.props.currencyPair.currency1}
             token ={this.props.currencyPair.token}
             currency2={this.props.currencyPair.currency2}
             currency2TokenAddress={this.props.currencyPair.token}
             abi={this.props.currencyPair.abi}
            />
            <section className="hero">
                <div className="hero-body">
                    <div className="field has-addons" id="liquidityInput">
                        <p className="control" id="liquidityCurrency">
                            <a className="button buttonT is-static">
                                {this.props.currencyPair.currency1}
                            </a>
                        </p>
                        <p className="control" id="amountToInput">
                            <input className={this.state.currency1EnoughClass} type="number" value={this.state.currency1AmountToDeposit} onChange={this.handleCurrency1AmountToDeposit}/>
                        </p>
                    </div>
                    <div className="field has-addons" id="liquidityInput">
                        <p className="control" id="liquidityCurrency">
                            <a className="button buttonT is-static">
                                {this.props.currencyPair.currency2}
                            </a>
                        </p>
                        <p className="control" id="amountToInput">
                            <input className={this.state.currency2EnoughClass} type="number" value={this.state.currency2AmountToDeposit} onChange={this.handleCurrency2AmountToDeposit}/>
                        </p>
                    </div>
                    <br/>
                    <br/>
                    <button className="button" onClick={() => this.deposit()}>Deposit</button>
                </div>
            </section>
        </div>);
        }

        if(this.props.currencyPair.tokenSelected === true && this.props.currencyPair.abi !== '' && this.state.remove) {
            return (<div id="providerMissing">
            <br/>
            <div id="sendSwitch">
                <div className="field" id="field">
                    <input id="switchExample" type="checkbox" name="switchExample" className="switch is-info" checked={this.state.sendToSomeOne} onChange={() => this.removeView()}/>
                    <label htmlFor="switchExample">Remove</label>
                </div>
            </div>
            <CurrencyPairsComponent dropdownListClass={() => this.props.dropdownListClass()}
            dropdownListClicked={() => this.props.dropdownListClicked()}
            GetSelectionText={() => this.props.GetSelectionText()}
            ethBatClass={() => this.props.ethBatClass()}
            ethBatSelection={() => this.props.ethBatSelection()}
            ethDaiClass={() => this.props.ethDaiClass()}
            ethDaiSelection={() => this.props.ethDaiSelection()}
            ethMkrClass={() => this.props.ethMkrClass()}
            ethMkrSelection={() => this.props.ethMkrSelection()}
            ethOmgClass={()=> this.props.ethOmgClass()}
            ethOmgSelection={() => this.props.ethOmgSelection()}
            ethZrxClass={() => this.props.ethZrxClass()}
            ethZrxSelection={()=> this.props.ethZrxSelection()}/>
            <br/>
            <br/>
            <LiquidityBalance currency1={this.props.currencyPair.currency1}
             token ={this.props.currencyPair.token}
             currency2={this.props.currencyPair.currency2}
             currency2TokenAddress={this.props.currencyPair.token}
             abi={this.props.currencyPair.abi}
            />
            <section className="hero">
                <div className="hero-body">
                    <div className="field has-addons" id="liquidityInput">
                        <p className="control" id="liquidityCurrency">
                            <a className="button buttonT is-static">
                                P T
                            </a>
                        </p>
                        <p className="control" id="amountToInput">
                            <input className={this.state.pooledTokenEnoughClass} type="number" value={this.state.pooledToken} onChange={this.handleRemoveLiquidity}/>
                        </p>
                    </div>
                    <br/>
                    <br/>
                    <button className="button" onClick={() => this.remove()}>Remove</button>
                </div>
            </section>
        </div>);
        }

        return (<div id="providerMissing">
        <br/>
        <div id="sendSwitch">
                <div className="field" id="field">
                    <input id="switchExample" type="checkbox" name="switchExample" className="switch is-info" checked={this.state.sendToSomeOne} onChange={() => this.removeView()}/>
                    <label htmlFor="switchExample">Remove</label>
                </div>
            </div>
        <CurrencyPairsComponent dropdownListClass={() => this.props.dropdownListClass()}
        dropdownListClicked={() => this.props.dropdownListClicked()}
        GetSelectionText={() => this.props.GetSelectionText()}
        ethBatClass={() => this.props.ethBatClass()}
        ethBatSelection={() => this.props.ethBatSelection()}
        ethDaiClass={() => this.props.ethDaiClass()}
        ethDaiSelection={() => this.props.ethDaiSelection()}
        ethMkrClass={() => this.props.ethMkrClass()}
        ethMkrSelection={() => this.props.ethMkrSelection()}
        ethOmgClass={()=> this.props.ethOmgClass()}
        ethOmgSelection={() => this.props.ethOmgSelection()}
        ethZrxClass={() => this.props.ethZrxClass()}
        ethZrxSelection={()=> this.props.ethZrxSelection()}/>
        </div>);
    }
}

export default Deposit;