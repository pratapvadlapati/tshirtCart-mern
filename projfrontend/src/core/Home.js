import React, { useState, useEffect}from "react"
import Base from "./Base"
import Card from "./card";
import { getProducts } from './helper/coreapicalls';


function Home(
    
) {
    
     //set states for loading producs
     const [products, setProducts] = useState([]);
     const [error, setError] = useState(false);
 
     //call the get products
     const getProductsToHome = () => {
         getProducts()
             .then(data => {
                 if(data.err) {
                     setError(data.err);
                 }else{
                     setProducts(data);
                 }
             }).catch(err => console.log(err))  
     }
 
     //run the methods
     useEffect( () => {
         getProductsToHome()
     },[])
 

    return(
        <Base className="container">
        <div className="row text-center">
           {products.map((product, index)=> {
               return(
                <div key={index} className="col-4 mb-4">
                <Card product={product} />
                </div>
               )
           })}
        </div>
        </Base>
    );
}


export default Home; 