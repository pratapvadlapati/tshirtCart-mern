import React from "react"
import { API }from '../backend';



const ImageHelper = ({product}) => {
 
    //construct img url
    const imageUrl =  product  ?  `${API}/product/photo/${product.product._id}}` : 'https://media.giphy.com/media/swhRkVYLJDrCE/giphy.gif';
    console.log(product);
    return(
        <div className="rounded border border-success p-2">
                    <img
                      src="https://media.giphy.com/media/swhRkVYLJDrCE/giphy.gif"
                      alt="photo"
                      style={{ maxHeight: "100%", maxWidth: "100%" }}
                      className="mb-3 rounded"
                    />
                  </div>
    )


}


export default ImageHelper;