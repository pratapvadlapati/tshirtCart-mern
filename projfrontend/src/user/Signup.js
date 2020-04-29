import  React,{ useState } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { signup } from '../auth/helper';


const Signup = () => {

//state
 const [values, setValues] = useState({
     name: "",
     email: "",
     password: "",
     error: "",
     success: false
 })

  const  {name, email, password, error, success} = values

//handle changes of form
    const handleChange = name => (event) => {
        setValues({...values, error: false, [name]: event.target.value})
    };
//onSubmit

    const onSubmit = event => {
        event.preventDefault()
        setValues({...values, error: false})
        signup({name, email, password})
        .then(data => {
            //console.log(data.err);
            if(data.err) {
                setValues({...values, error: data.err, success: false})
            }else{
                setValues({...values,
                       name: "",
                       email: "",
                       password: "",
                       error: "",
                       success: true })
            }
        })
        .catch(error => console.log(error));
    }


    
    //method
    const SignUpForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left" >
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input className="form-control" onChange={handleChange("name")} value={name} type="text"/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input className="form-control" type="text"
                            onChange={handleChange("email")} value={email}/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input className="form-control" type="password"
                            onChange={handleChange("password")} value={password} />
                        </div>
                        <button onClick={onSubmit} className="btn btn-success btn-block"
                        >Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    //success message
    const successMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                <div className="alert alert-success"
            style={{ display: success ? "" : "none"}}>
                New account was created successfully.
                Please  <Link to="/signin">Login Here</Link>
            </div>
                </div>
            </div>
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

  return (
      <Base title="Signup Page" description="">
      {successMessage()}
      {errorMessage()}    
      {SignUpForm()}
  <p className="text-white text-center">{JSON.stringify(values)}</p>
      </Base>
  )
} 



export default Signup;