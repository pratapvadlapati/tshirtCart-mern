import React from 'react';
import {API} from '../../backend'



 export const getProducts = () => {
    return fetch(`${API}/product/list/allproducts`, 
        {method: "GET"}
        ).then(response => {
           return response.json();
        }).catch(err => console.log(err) )
}
