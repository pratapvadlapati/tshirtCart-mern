import React, { useState } from 'react'
import Base from '../core/Base'
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import { createCategory } from '../admin/helper/adminapicall'



const AddCategory = () => {

    //define state
        const [name, setName] = useState("");
        const [error, setError] = useState(false);
        const [success, setSuccess] = useState(false);

        //get user
        const { token , _id} = isAuthenticated();

        //goback button
        const goBack = () =>{
           return(
           <div className="mt-5">
               <Link className="btn btn-sm btn-outline-warning mb-3 float-right" to="/admin/dashboard">Admin Home</Link>
           </div>
           )
        }

        //handle change
        const handleChange = event => {
            setError("");
            setName(event.target.value);
        }

        //onSubmit
        const onSubmit = (event) => {
            console.log(event)
            event.preventDefault();
            setError("");
            setSuccess(false);
            //backend-req
            createCategory(_id, token, {name})
                .then(data => {
                    if(data.err) {
                        setError(true);
                    }else{
                        setError("");
                        setSuccess(true);
                        setName("");
                    }
                })
                .catch(err => console.log(err))
        }

        //success-message
        const successMessage = () => {
            if(success) {
                return <span className="text-success">Category created successfully</span>
            }
        }

        //Error-message
        const errorMessage = () => {
            if(error) {
                return <span className="text-success">Failed to create category</span>
            }
        }


    const myCategoryForm = () => {
        return(
            <form>
              <div className="form-group">
                <p className="lead">Enter the category name</p>
                <input type="text" className="form-control my-3" 
                        autoFocus 
                        required 
                        placeholder="For Ex., Summer"
                        onChange={handleChange}
                        value={name}
                        ></input>
                <button className="btn btn-success rounded" onClick={onSubmit}>Submit</button>
              </div>
            </form>
        )
    }


    return (
        <Base title="Create Categories" d
              description="Add Category for the Products here"
              className="container bg-success p-4 rounded">  

              <div className="row bg-white rounded">
            
                  <div className="col-md-8 offset-md-2 p-4">
                {successMessage()} 
                {errorMessage()}
                {myCategoryForm()}
                {goBack()}

                  </div>
                  </div>  
        
        </Base>
    )
}



export default AddCategory;