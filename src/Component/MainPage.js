import React from 'react';
import Web3 from 'web3';
import Exchange from './Exchange';
import ConnexionComponent from './ConnexionComponent';
import MissingProviderComponent from './MissingProviderComponent';
import MenuComponent from './MenuComponent';
import Deposit from './Deposit';
import CurrencyPairsComponent from './CurrencyPairsComponent';

class MainPage extends React.Component {

    factoryABI = [{"name": "NewExchange", "inputs": [{"type": "address", "name": "token", "indexed": true}, {"type": "address", "name": "exchange", "indexed": true}], "anonymous": false, "type": "event"}, {"name": "initializeFactory", "outputs": [], "inputs": [{"type": "address", "name": "template"}], "constant": false, "payable": false, "type": "function", "gas": 35725}, {"name": "createExchange", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "address", "name": "token"}], "constant": false, "payable": false, "type": "function", "gas": 187911}, {"name": "getExchange", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "address", "name": "token"}], "constant": true, "payable": false, "type": "function", "gas": 715}, {"name": "getToken", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "address", "name": "exchange"}], "constant": true, "payable": false, "type": "function", "gas": 745}, {"name": "getTokenWithId", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "uint256", "name": "token_id"}], "constant": true, "payable": false, "type": "function", "gas": 736}, {"name": "exchangeTemplate", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 633}, {"name": "tokenCount", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 663}];

    exchangeABI = [{"name": "TokenPurchase", "inputs": [{"type": "address", "name": "buyer", "indexed": true}, {"type": "uint256", "name": "eth_sold", "indexed": true}, {"type": "uint256", "name": "tokens_bought", "indexed": true}], "anonymous": false, "type": "event"}, {"name": "EthPurchase", "inputs": [{"type": "address", "name": "buyer", "indexed": true}, {"type": "uint256", "name": "tokens_sold", "indexed": true}, {"type": "uint256", "name": "eth_bought", "indexed": true}], "anonymous": false, "type": "event"}, {"name": "AddLiquidity", "inputs": [{"type": "address", "name": "provider", "indexed": true}, {"type": "uint256", "name": "eth_amount", "indexed": true}, {"type": "uint256", "name": "token_amount", "indexed": true}], "anonymous": false, "type": "event"}, {"name": "RemoveLiquidity", "inputs": [{"type": "address", "name": "provider", "indexed": true}, {"type": "uint256", "name": "eth_amount", "indexed": true}, {"type": "uint256", "name": "token_amount", "indexed": true}], "anonymous": false, "type": "event"}, {"name": "Transfer", "inputs": [{"type": "address", "name": "_from", "indexed": true}, {"type": "address", "name": "_to", "indexed": true}, {"type": "uint256", "name": "_value", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "Approval", "inputs": [{"type": "address", "name": "_owner", "indexed": true}, {"type": "address", "name": "_spender", "indexed": true}, {"type": "uint256", "name": "_value", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "setup", "outputs": [], "inputs": [{"type": "address", "name": "token_addr"}], "constant": false, "payable": false, "type": "function", "gas": 175875}, {"name": "addLiquidity", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "min_liquidity"}, {"type": "uint256", "name": "max_tokens"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": true, "type": "function", "gas": 82605}, {"name": "removeLiquidity", "outputs": [{"type": "uint256", "name": "out"}, {"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "amount"}, {"type": "uint256", "name": "min_eth"}, {"type": "uint256", "name": "min_tokens"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": false, "type": "function", "gas": 116814}, {"name": "__default__", "outputs": [], "inputs": [], "constant": false, "payable": true, "type": "function"}, {"name": "ethToTokenSwapInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "min_tokens"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": true, "type": "function", "gas": 12757}, {"name": "ethToTokenTransferInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "min_tokens"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}], "constant": false, "payable": true, "type": "function", "gas": 12965}, {"name": "ethToTokenSwapOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": true, "type": "function", "gas": 50455}, {"name": "ethToTokenTransferOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}], "constant": false, "payable": true, "type": "function", "gas": 50663}, {"name": "tokenToEthSwapInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_eth"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": false, "type": "function", "gas": 47503}, {"name": "tokenToEthTransferInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_eth"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}], "constant": false, "payable": false, "type": "function", "gas": 47712}, {"name": "tokenToEthSwapOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "eth_bought"}, {"type": "uint256", "name": "max_tokens"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": false, "type": "function", "gas": 50175}, {"name": "tokenToEthTransferOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "eth_bought"}, {"type": "uint256", "name": "max_tokens"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}], "constant": false, "payable": false, "type": "function", "gas": 50384}, {"name": "tokenToTokenSwapInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_tokens_bought"}, {"type": "uint256", "name": "min_eth_bought"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "token_addr"}], "constant": false, "payable": false, "type": "function", "gas": 51007}, {"name": "tokenToTokenTransferInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_tokens_bought"}, {"type": "uint256", "name": "min_eth_bought"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}, {"type": "address", "name": "token_addr"}], "constant": false, "payable": false, "type": "function", "gas": 51098}, {"name": "tokenToTokenSwapOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "max_tokens_sold"}, {"type": "uint256", "name": "max_eth_sold"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "token_addr"}], "constant": false, "payable": false, "type": "function", "gas": 54928}, {"name": "tokenToTokenTransferOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "max_tokens_sold"}, {"type": "uint256", "name": "max_eth_sold"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}, {"type": "address", "name": "token_addr"}], "constant": false, "payable": false, "type": "function", "gas": 55019}, {"name": "tokenToExchangeSwapInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_tokens_bought"}, {"type": "uint256", "name": "min_eth_bought"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "exchange_addr"}], "constant": false, "payable": false, "type": "function", "gas": 49342}, {"name": "tokenToExchangeTransferInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_tokens_bought"}, {"type": "uint256", "name": "min_eth_bought"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}, {"type": "address", "name": "exchange_addr"}], "constant": false, "payable": false, "type": "function", "gas": 49532}, {"name": "tokenToExchangeSwapOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "max_tokens_sold"}, {"type": "uint256", "name": "max_eth_sold"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "exchange_addr"}], "constant": false, "payable": false, "type": "function", "gas": 53233}, {"name": "tokenToExchangeTransferOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "max_tokens_sold"}, {"type": "uint256", "name": "max_eth_sold"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}, {"type": "address", "name": "exchange_addr"}], "constant": false, "payable": false, "type": "function", "gas": 53423}, {"name": "getEthToTokenInputPrice", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "eth_sold"}], "constant": true, "payable": false, "type": "function", "gas": 5542}, {"name": "getEthToTokenOutputPrice", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}], "constant": true, "payable": false, "type": "function", "gas": 6872}, {"name": "getTokenToEthInputPrice", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}], "constant": true, "payable": false, "type": "function", "gas": 5637}, {"name": "getTokenToEthOutputPrice", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "eth_bought"}], "constant": true, "payable": false, "type": "function", "gas": 6897}, {"name": "tokenAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1413}, {"name": "factoryAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1443}, {"name": "balanceOf", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "address", "name": "_owner"}], "constant": true, "payable": false, "type": "function", "gas": 1645}, {"name": "transfer", "outputs": [{"type": "bool", "name": "out"}], "inputs": [{"type": "address", "name": "_to"}, {"type": "uint256", "name": "_value"}], "constant": false, "payable": false, "type": "function", "gas": 75034}, {"name": "transferFrom", "outputs": [{"type": "bool", "name": "out"}], "inputs": [{"type": "address", "name": "_from"}, {"type": "address", "name": "_to"}, {"type": "uint256", "name": "_value"}], "constant": false, "payable": false, "type": "function", "gas": 110907}, {"name": "approve", "outputs": [{"type": "bool", "name": "out"}], "inputs": [{"type": "address", "name": "_spender"}, {"type": "uint256", "name": "_value"}], "constant": false, "payable": false, "type": "function", "gas": 38769}, {"name": "allowance", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "address", "name": "_owner"}, {"type": "address", "name": "_spender"}], "constant": true, "payable": false, "type": "function", "gas": 1925}, {"name": "name", "outputs": [{"type": "bytes32", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1623}, {"name": "symbol", "outputs": [{"type": "bytes32", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1653}, {"name": "decimals", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1683}, {"name": "totalSupply", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1713}];
    web3;
    factoryAddress = '0xf5D915570BC477f9B8D6C0E980aA81757A3AaC36';
    factoryContract;
    daiABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"},{"name":"data","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokenAddress","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferAnyERC20Token","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"}];
    daiContract;

    tokenList = {
        'BAT' : {
            'token' : '0xDA5B056Cfb861282B4b59d29c9B395bcC238D29B',
            'exchange' : '0x9B913956036a3462330B0642B20D3879ce68b450',
            'iconPath' : 'https://raw.githubusercontent.com/atomiclabs/cryptocurrency-icons/master/32/color/bat.png',
            'abi' : [{"constant":true,"inputs":[],"name":"batFundDeposit","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"batFund","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"tokenExchangeRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"finalize","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"refund","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"tokenCreationCap","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"isFinalized","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"fundingEndBlock","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"ethFundDeposit","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"createTokens","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"tokenCreationMin","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"fundingStartBlock","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"_ethFundDeposit","type":"address"},{"name":"_batFundDeposit","type":"address"},{"name":"_fundingStartBlock","type":"uint256"},{"name":"_fundingEndBlock","type":"uint256"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"LogRefund","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"CreateBAT","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}],
        },
        'DAI' : {
            'token' : '0x2448eE2641d78CC42D7AD76498917359D961A783',
            'exchange' : '0x77dB9C915809e7BE439D2AB21032B1b8B58F6891',
            'iconPath' : 'https://raw.githubusercontent.com/atomiclabs/cryptocurrency-icons/master/32/color/dai.png',
            'abi' : [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"},{"name":"data","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokenAddress","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferAnyERC20Token","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"}],
        },
        'MKR' : {
            'token' : '0xF9bA5210F91D0474bd1e1DcDAeC4C58E359AaD85',
            'exchange' : '0x93bB63aFe1E0180d0eF100D774B473034fd60C36',
            'iconPath' : 'https://raw.githubusercontent.com/atomiclabs/cryptocurrency-icons/master/32/color/mkr.png',
            'abi' : [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"stop","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"owner_","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"name_","type":"bytes32"}],"name":"setName","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"src","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"stopped","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"authority_","type":"address"}],"name":"setAuthority","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"push","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"move","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"start","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"authority","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"src","type":"address"},{"name":"guy","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"wad","type":"uint256"}],"name":"pull","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"symbol_","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"authority","type":"address"}],"name":"LogSetAuthority","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"}],"name":"LogSetOwner","type":"event"},{"anonymous":true,"inputs":[{"indexed":true,"name":"sig","type":"bytes4"},{"indexed":true,"name":"guy","type":"address"},{"indexed":true,"name":"foo","type":"bytes32"},{"indexed":true,"name":"bar","type":"bytes32"},{"indexed":false,"name":"wad","type":"uint256"},{"indexed":false,"name":"fax","type":"bytes"}],"name":"LogNote","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}]
        },
        'OMG' : {
            'token' : '0x879884c3C46A24f56089f3bBbe4d5e38dB5788C0',
            'exchange' : '0x26C226EBb6104676E593F8A070aD6f25cDa60F8D',
            'iconPath' : 'https://raw.githubusercontent.com/atomiclabs/cryptocurrency-icons/master/32/color/omg.png',
            'abi' : [{"constant":true,"inputs":[],"name":"mintingFinished","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"mint","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"finishMinting","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"},{"name":"_releaseTime","type":"uint256"}],"name":"mintTimelocked","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[],"name":"MintFinished","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}],
        },
        'ZRX' : {
            'token' : '0xF22e3F33768354c9805d046af3C0926f27741B43',
            'exchange' : '0xaBD44a1D1b9Fb0F39fE1D1ee6b1e2a14916D067D',
            'iconPath' : 'https://raw.githubusercontent.com/atomiclabs/cryptocurrency-icons/master/32/color/zrx.png',
            'abi' : [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            dropdownListActive : false,
            ethBatSelected : false,
            ethDaiSelected : false,
            ethMkrSelected : false,
            ethOmgSelected : false,
            ethZrxSelected : false,
            connected : false,
            providerInstalled : false,
            wantToConnect : false,
            wantToTrade : false,
            wantToDeposit : false,
            sendToSomeOne : false,
            currencyPair: undefined,
        };

        this.dropdownListClass = this.dropdownListClass.bind(this);
        this.dropdownListClicked = this.dropdownListClicked.bind(this);
        this.ethBatSelection = this.ethBatSelection.bind(this);
        this.ethDaiSelection = this.ethDaiSelection.bind(this);
        this.ethMkrSelection = this.ethMkrSelection.bind(this);
        this.ethOmgSelection = this.ethOmgSelection.bind(this);
        this.ethZrxSelection = this.ethZrxSelection.bind(this);
        this.ethBatClass = this.ethBatClass.bind(this);
        this.ethDaiClass = this.ethDaiClass.bind(this);
        this.ethMkrClass = this.ethMkrClass.bind(this);
        this.ethOmgClass = this.ethOmgClass.bind(this);
        this.ethZrxClass = this.ethZrxClass.bind(this);
        this.GetSelectionText = this.GetSelectionText.bind(this);
        this.Initialize = this.Initialize.bind(this);
        this.GetExchange = this.GetExchange.bind(this);
        this.Connection = this.Connection.bind(this);
        this.Trade = this.Trade.bind(this);
        this.Deposit = this.Deposit.bind(this);
        this.sendToSomeone = this.sendToSomeone.bind(this);
        this.getChoosenCurrencyPair = this.getChoosenCurrencyPair.bind(this);

        this.Connecting();
    }

    GetEtherFromDAI() {

        this.initBalances();

        this.setState({web3 : this.web3 });

        const daiTokenAddress = '0x2448ee2641d78cc42d7ad76498917359d961a783';

        this.factoryContract.methods.getExchange(daiTokenAddress).call().then((exchangeAddress) => {
            const exchangeContract = new this.web3.eth.Contract(this.exchangeABI, exchangeAddress);
            

            var optionGasEstimate = {
                from : this.web3.currentProvider.selectedAddress,
            };
            console.log(exchangeContract);
            console.log(exchangeAddress);
            exchangeContract.methods.getTokenToEthInputPrice(this.state.daiAmountToExchange).call().then((price) => {
                console.log('Dai amount to exchange', this.state.daiAmountToExchange);
                console.log('Minimum of ether to mint', price);
                console.log('Time', Date.now() + 120);
                console.log('Address to sent', this.web3.currentProvider.selectedAddress);
                

               exchangeContract.methods.tokenToEthSwapInput(this.web3.utils.toWei(this.state.daiAmountToExchange, 'ether'), this.web3.utils.toWei(price, 'ether'), Date.now() + 120).estimateGas(optionGasEstimate).then((gasToPay) => {
                   console.log('GAS TO PAY', gasToPay);
                        var optionSend = {
                            from : this.web3.currentProvider.selectedAddress,
                        }
                        exchangeContract.methods.tokenToEthSwapInput(this.web3.utils.toWei(this.state.daiAmountToExchange, 'ether'), this.web3.utils.toWei(price, 'ether'), Date.now() + 120).send(optionSend).then((res) => {
                            console.log(res);
                        })
                    }).catch((err) => {
                        console.log('ERROR', err);
                    });
                });
            });
    }

    GetDAIFromEther() {
        this.Initialize();
    }

    Initialize() { 

        this.web3.eth.getBalance(this.web3.currentProvider.selectedAddress).then((balance) => {
            this.setState({etherBalance : Math.round(this.web3.utils.fromWei(balance.toString(), 'ether')* 1000)/1000})});

        this.daiContract.methods.balanceOf(this.web3.currentProvider.selectedAddress).call().then((balance) => {
            this.setState({daiBalance : Math.round(this.web3.utils.fromWei(balance.toString(), 'ether')* 1000)/1000})
        });

        this.setState({web3 : this.web3 });

        const daiTokenAddress = '0x2448ee2641d78cc42d7ad76498917359d961a783';

        this.factoryContract.methods.getExchange(daiTokenAddress).call().then((exchangeAddress) => {
            
            const exchangeContract = new this.web3.eth.Contract(this.exchangeABI, exchangeAddress);

            var optionGasEstimate = {
                from : this.web3.currentProvider.selectedAddress,
                value : this.web3.utils.toWei(this.state.etherAmountToExchange, 'ether')
            };
            exchangeContract.methods.getEthToTokenOutputPrice(this.web3.utils.toWei(this.state.etherAmountToExchange, 'ether')).call().then((price) => {
                console.log(Date.now() + 120);
               exchangeContract.methods.ethToTokenTransferInput(price, Date.now() + 120, this.web3.currentProvider.selectedAddress).estimateGas(optionGasEstimate).then((gasToPay) => {
                   console.log(gasToPay)
                        var optionSend = {
                            from : this.web3.currentProvider.selectedAddress,
                            gasLimit : gasToPay,
                            value : this.web3.utils.toWei(this.state.etherAmountToExchange, 'ether'),
                        }
                        exchangeContract.methods.ethToTokenTransferInput(price, Date.now() + 120, this.web3.currentProvider.selectedAddress).send(optionSend).then((res) => {
                            console.log(res);
                        })
                    })
            });
            console.log(exchangeContract)
        })
    }

    ApproveTokensTransfer() {

        this.web3.eth.getBalance(this.web3.currentProvider.selectedAddress).then((balance) => {
            this.setState({etherBalance : Math.round(this.web3.utils.fromWei(balance.toString(), 'ether')* 1000)/1000})});

        this.daiContract.methods.balanceOf(this.web3.currentProvider.selectedAddress).call().then((balance) => {
            this.setState({daiBalance : Math.round(this.web3.utils.fromWei(balance.toString(), 'ether')* 1000)/1000})
        });

        const daiTokenAddress = '0x2448ee2641d78cc42d7ad76498917359d961a783';
        this.factoryContract.methods.getExchange(daiTokenAddress).call().then((exchangeAddress) => {

            var optionGasEstimate = {
                from : this.web3.currentProvider.selectedAddress
            };
            console.log('Account Address', this.web3.currentProvider.selectedAddress);
            console.log('Exchange Address', exchangeAddress);
            console.log('Dai amount to transfer', this.state.daiAmountToExchange);
            console.log('Dai contract methods', this.daiContract.methods);
            this.daiContract.methods.approve(exchangeAddress, this.web3.utils.toWei(this.state.daiAmountToExchange, 'ether')).estimateGas(optionGasEstimate).then((gasEstimate) => {
                console.log(gasEstimate);
                
                var optionSend = {
                    from : this.web3.currentProvider.selectedAddress,
                    gasLimit : gasEstimate,
                }

                this.daiContract.methods.approve(exchangeAddress, this.state.daiAmountToExchange).send(optionSend).then((res) => {
                    console.log(res);
                })
            });

        });
    }

    getChoosenCurrencyPair() {
        var tokenSelected = false;
        var token = '';
        var exchange = '';
        var currency1IconPath = '';
        var currency2IconPath = '';
        var abi = '';
        var currency1 = '';
        var currency2 = '';

        if (this.state.ethBatSelected)
        {
            if (this.state.dropdownListActive) {
                return (<div></div>);
            }
            console.log('BAT');
            tokenSelected = true;
            token = this.tokenList.BAT.token;
            exchange = this.tokenList.BAT.exchange;
            currency2IconPath = this.tokenList.BAT.iconPath;
            currency1IconPath = 'https://raw.githubusercontent.com/atomiclabs/cryptocurrency-icons/master/32/color/eth.png';
            abi = this.tokenList.BAT.abi;
            currency1 = 'ETH';
            currency2 = 'BAT';
        }
        else if (this.state.ethDaiSelected)
        {
            if (this.state.dropdownListActive) {
                return (<div></div>);
            }
            console.log('DAI');
            tokenSelected = true;
            token = this.tokenList.DAI.token;
            exchange = this.tokenList.DAI.exchange;
            currency2IconPath = this.tokenList.DAI.iconPath;
            currency1IconPath = 'https://raw.githubusercontent.com/atomiclabs/cryptocurrency-icons/master/32/color/eth.png';
            abi = this.tokenList.DAI.abi;
            currency1 = 'ETH';
            currency2 = 'DAI';
        }
        else if (this.state.ethMkrSelected)
        {
            if (this.state.dropdownListActive) {
                return (<div></div>);
            }
            console.log('MKR');
            tokenSelected = true;
            token = this.tokenList.MKR.token;
            exchange = this.tokenList.MKR.exchange;
            currency2IconPath = this.tokenList.MKR.iconPath;
            currency1IconPath = 'https://raw.githubusercontent.com/atomiclabs/cryptocurrency-icons/master/32/color/eth.png';
            abi = this.tokenList.MKR.abi;
            currency1 = 'ETH';
            currency2 = 'MKR';
        }
        else if (this.state.ethOmgSelected)
        {
            if (this.state.dropdownListActive) {
                return (<div></div>);
            }
            console.log('OMG');
            tokenSelected = true;
            token = this.tokenList.OMG.token;
            exchange = this.tokenList.OMG.exchange;
            currency2IconPath = this.tokenList.OMG.iconPath;
            currency1IconPath = 'https://raw.githubusercontent.com/atomiclabs/cryptocurrency-icons/master/32/color/eth.png';
            abi = this.tokenList.OMG.abi;
            currency1 = 'ETH';
            currency2 = 'OMG';
        }
        else if (this.state.ethZrxSelected)
        {
            if (this.state.dropdownListActive) {
                return (<div></div>);
            }
            console.log('ZRX');
            tokenSelected = true;
            token = this.tokenList.ZRX.token;
            exchange = this.tokenList.ZRX.exchange;
            currency2IconPath = this.tokenList.ZRX.iconPath;
            currency1IconPath = 'https://raw.githubusercontent.com/atomiclabs/cryptocurrency-icons/master/32/color/eth.png';
            abi = this.tokenList.ZRX.abi;
            currency1 = 'ETH';
            currency2 = 'ZRX';
        }

        return { tokenSelected : tokenSelected,
            token: token,
            exchange: exchange,
            currency2IconPath: currency2IconPath,
            currency1IconPath : currency1IconPath,
            abi : abi,
            currency1 : currency1,
            currency2 : currency2,
        };
    }

    GetExchange() {
        var currencyPairs = this.getChoosenCurrencyPair();

        if (!currencyPairs.tokenSelected) {
            return (<div></div>);
        }

        return <Exchange currency2={currencyPairs.currency2}
         currency1={currencyPairs.currency1}
          abi={currencyPairs.abi}
          token={currencyPairs.token}
          exchange={currencyPairs.exchange}
          currency1IconPath={currencyPairs.currency1IconPath}
          currency2IconPath={currencyPairs.currency2IconPath}
          send={this.state.sendToSomeOne}/>;
    }

    handleEtherAmountToExchange(events) {
        this.setState({
            etherAmountToExchange : events.target.value,
        });
    }

    handleDaiAmountToExchange(events) {
        this.setState({
            daiAmountToExchange : events.target.value,
        });
    }

    handleApprovalDaiAmountToExchange(events) {
        this.setState({
            daiAmountToExchange : events.target.value,
        });
    }

    dropdownListClass() {
        if(this.state.dropdownListActive) {
            return 'dropdown dropdownList is-active';
        }
        else {
            return 'dropdown dropdownList';
        }
    }

    ethBatClass(){
        if (this.state.ethBatSelected) {
            return 'dropdown-item is-active';
        }
        else{
            return 'dropdown-item';
        }
    }

    ethDaiClass(){
        if (this.state.ethDaiSelected) {
            return 'dropdown-item is-active';
        }
        else{
            return 'dropdown-item';
        }
    }

    ethMkrClass(){
        if (this.state.ethMkrSelected) {
            return 'dropdown-item is-active';
        }
        else{
            return 'dropdown-item';
        }
    }

    ethOmgClass(){
        if (this.state.ethOmgSelected) {
            return 'dropdown-item is-active';
        }
        else{
            return 'dropdown-item';
        }
    }

    ethZrxClass(){
        if (this.state.ethZrxSelected) {
            return 'dropdown-item is-active';
        }
        else{
            return 'dropdown-item';
        }
    }

    ethBatSelection() {
        this.setState({
            ethBatSelected : ! this.state.ethBatSelected,
            dropdownListActive : ! this.state.dropdownListActive,
            ethDaiSelected : false,
            ethMkrSelected : false,
            ethOmgSelected : false,
            ethZrxSelected : false,
        });
    }

    ethDaiSelection() {
        this.setState({
            ethDaiSelected : !this.state.ethDaiSelected,
            dropdownListActive : ! this.state.dropdownListActive,
            ethBatSelected : false,
            ethMkrSelected : false,
            ethOmgSelected : false,
            ethZrxSelected : false,
        });
    }

    ethMkrSelection() {
        this.setState({
            ethMkrSelected : !this.state.ethMkrSelected,
            ethDaiSelected : false,
            ethBatSelected : false,
            ethOmgSelected : false,
            ethZrxSelected : false,
            dropdownListActive : ! this.state.dropdownListActive
        });
    }

    ethOmgSelection() {
        this.setState({
            ethOmgSelected : ! this.state.ethOmgSelected,
            dropdownListActive : ! this.state.dropdownListActive,
            ethDaiSelected : false,
            ethMkrSelected : false,
            ethBatSelected : false,
            ethZrxSelected : false,
        });
    }

    ethZrxSelection() {
        this.setState({
            ethZrxSelected : ! this.state.ethZrxSelected,
            dropdownListActive : ! this.state.dropdownListActive,
            ethDaiSelected : false,
            ethMkrSelected : false,
            ethOmgSelected : false,
            ethBatSelected : false,
        });
    }

    dropdownListClicked() {

        this.setState({
            dropdownListActive : ! this.state.dropdownListActive
        });
    }

    GetSelectionText() {
        if(this.state.ethBatSelected) {
            return 'ETH/BAT';
        }
        if(this.state.ethDaiSelected) {
            return 'ETH/DAI';
        }
        if(this.state.ethMkrSelected) {
            return 'ETH/MKR';
        }
        if(this.state.ethOmgSelected) {
            return 'ETH/OMG';
        }
        if(this.state.ethZrxSelected) {
            return 'ETH/ZRX';
        }

        return 'Select Currency Pair';
    }

    Connection() {
        this.setState({
            wantToConnect : true,
        }, () => this.Connecting());
    }

    Connecting() {
        if (this.state.wantToConnect) {
            window.web3 = new Web3(window.ethereum);
            window.ethereum.enable().then(() => {
                this.setState({
                    connected : true,
                    providerInstalled : true,
                });
            });
        }
        if (window.ethereum) {
            this.setState({
                connected : false,
                providerInstalled : true,
            });
        }  
    }

    Deposit() {
        this.setState({
            wantToDeposit : true,
            wantToTrade : false,
        });
    }

    Trade() {
        this.setState({
            wantToDeposit: false,
            wantToTrade: true,
        })
    }

    sendToSomeone() {
        this.setState({
            sendToSomeOne : !this.state.sendToSomeOne,
        })
    }

    render() {
        if (this.state.connected && this.state.providerInstalled && (!this.state.wantToTrade && !this.state.wantToDeposit)) {
            return (<MenuComponent trade={() => this.Trade()} deposit={() => this.Deposit()}/>);
        }

        if (this.state.wantToTrade) {
            var currencyPair = this.getChoosenCurrencyPair();
            return (<div id="providerMissing">
                    <br/>
                    <div id="sendSwitch">
                        <div className="field" id="field">
                            <input id="switchExample" type="checkbox" name="switchExample" className="switch is-info" checked={this.state.sendToSomeOne} onChange={this.sendToSomeone}/>
                            <label htmlFor="switchExample">Send</label>
                        </div>
                    </div>
                <CurrencyPairsComponent dropdownListClass={() => this.dropdownListClass()}
                dropdownListClicked={() => this.dropdownListClicked()}
                GetSelectionText={() => this.GetSelectionText()}
                ethBatClass={() => this.ethBatClass()}
                ethBatSelection={() => this.ethBatSelection()}
                ethDaiClass={() => this.ethDaiClass()}
                ethDaiSelection={() => this.ethDaiSelection()}
                ethMkrClass={() => this.ethMkrClass()}
                ethMkrSelection={() => this.ethMkrSelection()}
                ethOmgClass={()=> this.ethOmgClass()}
                ethOmgSelection={() => this.ethOmgSelection()}
                ethZrxClass={() => this.ethZrxClass()}
                ethZrxSelection={()=> this.ethZrxSelection()}
                />
                {this.GetExchange()}
            </div>);
        }

        if(this.state.wantToDeposit) {
            var currencyPair = this.getChoosenCurrencyPair();
            return (<Deposit currencyPair={currencyPair}
            dropdownListClass={() => this.dropdownListClass()}
            dropdownListClicked={() => this.dropdownListClicked()}
            GetSelectionText={() => this.GetSelectionText()}
            ethBatClass={() => this.ethBatClass()}
            ethBatSelection={() => this.ethBatSelection()}
            ethDaiClass={() => this.ethDaiClass()}
            ethDaiSelection={() => this.ethDaiSelection()}
            ethMkrClass={() => this.ethMkrClass()}
            ethMkrSelection={() => this.ethMkrSelection()}
            ethOmgClass={()=> this.ethOmgClass()}
            ethOmgSelection={() => this.ethOmgSelection()}
            ethZrxClass={() => this.ethZrxClass()}
            ethZrxSelection={()=> this.ethZrxSelection()}/>);
        }

        if (this.state.providerInstalled) {
            return (
                    <ConnexionComponent connection={() => this.Connection()}/>
            );
        }

        this.Connecting();
        return (<MissingProviderComponent/>);
    }
}

export default MainPage;
