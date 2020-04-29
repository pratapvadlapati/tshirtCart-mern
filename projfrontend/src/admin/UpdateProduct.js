import React, { useState, useEffect} from 'react'
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getProduct, getCategories, UpdateProduct } from './helper/adminapicall';




const UpdateProducts = ({match}) => {


   //get user details
const {_id, token} = isAuthenticated();

//set state
const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    loading: false,
    error: "",
    updatedProduct: "",
    getaRedirect: false,
    formData: ""
});

//destructure values
const {
    name,
    description,
    price,
    stock,
    categories,
    loading,
    error,
    updatedProduct,
    getaRedirect,
    formData
} = values;


//preload products
const preloadProduct = (productId) => {
 
    getProduct(productId)
        .then(data => {
            if(data.err) {
            
                setValues({...values, error: data.err})
            }else{
              preloadCategories();
                setValues({...values, 
                            name: data.name,
                            description: data.description,
                            category: data.category._id,
                            price: data.price,
                            stock: data.stock,
                            formData: new FormData()})
                    }
                    
                  
        })
};


//preloadCategories
const preloadCategories = () => {
    getCategories(_id, token)
        .then(data => {
            if (data.error) {
            setValues({ ...values, error: data.error });
            } else {
            setValues({categories: data, formData: new FormData() });
            }
        });
        };

//preload fn
useEffect(() => {
    preloadProduct(match.params.productId);
},[])



    //sucess message
    const successMessage = () => (
        <div
          className="alert alert-success mt-3"
          style={{ display: updatedProduct ? "" : "none" }}>
          <h4>{updatedProduct} updated successfully</h4>
        </div>
      );

     //warning message
    const warningMessage = () => (
        <div
        className="alert alert-danger mt-3"
        style={{ display: error ? "" : "none" }}
        >
        <h4>Product updation failed</h4>
        </div>
    );

//handle change
const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });

}
//onSubmit
const onSubmit = (event) => {
    event.preventDefault();
    setValues({...values, error: "", loading: true});

    UpdateProduct(match.params.productId, _id, token, formData)
        .then(data => {
            if(data.err) {
                setValues({...values, error: data.err});
            }else{
                setValues({
                    ...values,
                    name: "",
                    description: "",
                    loading: false,
                    photo: "",
                    price: "",
                    stock: "",
                    loading: false,
                    updatedProduct: data.name

                })
            }

        })

}

//update form
const UpdateProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Stock"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Update Product
      </button>
    </form>
  );



  //render compnents
return (
    <Base
  title=""
  description="Welcome to product updation section"
  className="container bg-info p-4"
>
  <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
    Admin Home
  </Link>
  <div className="row bg-dark text-white rounded">
    <div className="col-md-8 offset-md-2">
      {successMessage()}
      {warningMessage()}
      {UpdateProductForm()}
    </div>
  </div>
</Base>
)}


export default UpdateProducts;