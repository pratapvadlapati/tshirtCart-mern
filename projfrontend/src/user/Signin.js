import React, { useState } from 'react'
import Base from "../core/Base"
import { Link, Redirect } from "react-router-dom"
import { signin } from '../auth/helper'

import { authenticate, isAuthenticated} from "../auth/helper"


const Signin = () => {


    //use state
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        didRedirect: false
    })

    const {email, password, error, didRedirect, loading} = values
    const {user} = isAuthenticated(); 
    
    //method

     //onChange in form - handle change 
    const handleChange = name => (event) => {
        setValues({...values, error: false, [name]: event.target.value})
    }


    //onSubmit
    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: false, loading: true});
        signin({email, password})
        .then(data => {
            if(data.err) {
                setValues({...values, error: data.err, loading: false})
            }else{
                authenticate(data, ()=>{
                    setValues({
                        ...values,
                        didRedirect: true
                    })
                })
            }
        })
        .catch(err => console.log(err));
    }

    //redirect
    const performRedirect = () => {
        
        if(didRedirect) {
            
            if(user && user.role === 1) {
                return <Redirect to="/admin/dashboard"/>
            }else{
                return <Redirect to="/user/dashboard"/>
            }
        }
        if( isAuthenticated()) {
            return <Redirect to="/" />
         
        }
    }

   //success message
   const loadingMessage = () => {
    return (
       loading && (
           <div className="alert alert-info">
               <h2>Loading...</h2>
           </div>
       )
    )
}

// Error Message
const errorMessage = () => {
    return (
        <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
        <div className="alert alert-danger"
        style={ {display: error ? "" : "none"}}>
            {error}
        </div>
        </div>
        </div>
       
    )
}

    //signin form-control    
     const SignInForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left" >
                    <form>
                      
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input className="form-control" type="text"
                            onChange={handleChange("email")} value={email}
                            />
                        </div>
                        
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input className="form-control" type="password"
                            onChange={handleChange("password")} value={password}/>
                        </div>
                        <button className="btn btn-success btn-block"
                        onClick={onSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        )
    }


    return (
        <Base title="Signin Page"> 
        {loadingMessage()}
        {errorMessage()}
        {SignInForm()}
        {performRedirect()}
    <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    )
  } 



  export default Signin;