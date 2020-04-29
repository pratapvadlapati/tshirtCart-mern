import React, { useState, useEffect}from "react"
import Base from "./Base"
import Card from "./card";
import { loadCart } from "./CartHelper";



const  Cart= () =>  {
    
const [products, setProducts] = useState([])


        useEffect(()=> {
            setProducts(loadCart())
        },[])



const loadAllProducts = () => {
    return (
        <div className="div">
            <div className="h2">
                This section is to load products.
                {products.map((product, index)=> {
                   
                return(
                    <Card 
                    key={index} 
                    product={product}
                     addToCart={false}
                    removeFromCart={true}  />
                )
                })}
            </div>
        </div>
    )
}



const loadCheckOut = () => {
    return (
        <div className="div">
            <div className="h2">
                This section is for checkout.
            </div>
        </div>
    )
}



    return(
        <Base className="container">
        <div className="row">
    <div className="row-6">{loadAllProducts()}</div>
       <div className="row-6">{loadCheckOut()}</div>
        </div>
        </Base>
    );
  

     

    
}


export default Cart;