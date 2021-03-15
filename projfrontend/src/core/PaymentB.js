import React, {useState, useEffect} from 'react';
import { loadCart, cartEmpty } from '../core/cartHelper'
import {Link} from 'react-router-dom'
import { createOrder } from '../core/helper/orderHelper'
import { isAuthenticated } from '../auth/helper/index'
import { generateToken, processPayment } from './helper/paymentBHelper';

import DropIn from 'braintree-web-drop-in-react'



const PaymentB = ({products, setReload = f => f, reload= undefined}) => {

    //get user creds
    const userId = isAuthenticated()._id;
    const token = isAuthenticated().token;   

    //crete state
    const [info, setInfo] = useState({
        loading: false,
        Error: "",  
        success: false,
        instance: {},
        clientToken: null
    });


    
     
 
    //console.log(userId)

    const getToken = (userId, token) => {
        generateToken(userId, token).then(data => {
            console.log('data', data);
            if(data.err) {
                setInfo({...info, Error: data.err})
            }else{
                const clientToken = data.clientToken
                setInfo({clientToken : clientToken})
            }
        })
    }

    useEffect(()=> {
        getToken(userId, token)
    },[])


    //make transaction
    const onPurchase = () => {
        setInfo({loading: true})
        let nonce;
        let getNonce = info.instance
            .requestPaymentMethod()
            .then(data => {
                nonce = data.nonce
                const paymentData = {
                    paymentMethodNonce : nonce,
                    amount: getAmount()
                };
                processPayment(userId, token, paymentData)
                    .then(response => {
                        setInfo({...info, loading: false, success: response.success})
                        //TODO: empty cart
                        //TODO:  reload
                        console.log('PAYMENT SUCCESS')
                    }).catch(err => {
                        setInfo({loading: false, success: false})
                        console.log('PAYMENT FAILED')
                    })
            })
    }

    //get amout
    const getAmount = () => {
        let amount = 0;
        products.map(product => {
            amount = amount + product.price;
        })
        return amount;
    }


    //show payment drop down to enter payment details
    const showbtDropIn = () => {
        return(
            <div>
                {info.clientToken !== null && products.length > 0 ? (<div> 
                    <DropIn 
                    options = {{authorization: info.clientToken}}
                    onInstance = {instance => {info.instance = instance}}/>
                    <button className="btn btn-lg btn-success" onClick={onPurchase}>Buy</button>
                </div>) : (<h3>Pls, login or add products to cart</h3>)}

            </div>
        )
    }



    return(
        <div>
            <h2>Your total bill is {getAmount()} Rs</h2>
            {showbtDropIn()}
        </div>
    )
}


export default PaymentB;