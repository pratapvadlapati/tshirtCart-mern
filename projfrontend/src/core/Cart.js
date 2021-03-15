import React, { useState, useEffect}from "react"
import Base from "./Base"
import Card from "./card";
import { loadCart } from "./cartHelper";
import PaymentB from "./PaymentB";




const  Cart= () =>  {
    
const [products, setProducts] = useState([])
const [reload, setReload] = useState(false);

        useEffect(()=> {
            setProducts(loadCart())
        },[reload])



const loadAllProducts = (products) => {
    
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
                    removeFromCart={true}
                    setReload = {setReload}
                    reload = {reload}  />
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
                <PaymentB products={products} reload= {true}/>
            </div>
        </div>
    )
}



    return(
        <Base className="container">
        <div className="row">
        {products.length > 0 ? <div className="row-4">{loadAllProducts(products)}</div> : (<h2>No Products</h2>) }
       <div className="row-6 p-4">{loadCheckOut()}</div>
        </div>
        </Base>
    );
  

     

    
}


export default Cart;