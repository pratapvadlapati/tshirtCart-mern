import React from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'



const manageCategory = () => {

    const goBack = () => {
        return (<Link className="btn btn-sm btn-outline-warning" to="/admin/dashboard">Admin Home</Link>)
    }
        

    return(
        <Base>
            {goBack()}
            <h2>manageCategory</h2>
        </Base>
    )
}


export default manageCategory;