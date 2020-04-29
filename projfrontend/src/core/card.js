import React, { useState, useEffect} from  'react';
import ImageHelper from './ImageHelper';
import { Redirect } from 'react-router-dom';
import { addItemToCart } from './CartHelper';



const Card = (product, addToCart = true, removeFromCart = false) => {
  

    //create state
    const [redirect, setRedirect] = useState(false);

  //create variables with values or defualt
  const cartTitle       = product ? product.product.name : "T-shirt";
  const cartDescription = product ? product.product.description : "Not Available";
  const cartPrice       = product ? product.product.price : "0";


  const addProdToCart = () => {
    addItemToCart(product, () => setRedirect(true))
  }



  //method redirect
  const getARedirect = (redirect) => {
    if(redirect) {
      return <Redirect to="/cart" />
    }
  }


    //create methods for conditional rendering of button
    const ShowAddToCart = (addToCart) => {
          console.log('fromcart', addToCart)
        return(
            addToCart && 
            <button
            onClick={addProdToCart}
            className="btn btn-block btn-outline-success mt-2 mb-2"
          >
            Add to Cart
          </button>
        )
    }

    const ShowRemoveFromCart = (removeFromCart) => {
     
        return(
            removeFromCart && 
            <button
            onClick={() => {}}
            className="btn btn-block btn-outline-danger mt-2 mb-2"
          >
            Remove from cart
          </button>
        )
    }

    return(
       
              <div className="card text-white bg-dark border border-info ">
                <div className="card-header text-center lead">{cartTitle}</div>
                <div className="card-body">
                  {getARedirect(redirect)}
                  <ImageHelper product = {product}/>
                  <p className="lead bg-success font-weight-normal text-wrap">
                    {cartDescription}
                  </p>
                  <p className="btn btn-success rounded  btn-sm px-4">$ {cartPrice}</p>
                  <div className="row">
                    <div className="col-12">
                     {ShowAddToCart(addToCart)}
                    </div>
                    <div className="col-12">
                     {ShowRemoveFromCart(removeFromCart)}
                    </div>
                  </div>
                </div>
              </div>
            );
          };
    


export default Card;


