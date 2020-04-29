import React from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper/index'

const AdminDashBoard =() => {

    //get user details
    const {name, email, role}   = isAuthenticated();
    


    //Admin left pannel 
    const AdminLeftPannel = () => {
        return (
            <div className="card">
                <h4 className="card-header bg-dark text-white">
                Admin Pannel
                </h4>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <Link to="/admin/create/category" className="nav-link text-success">Create Categories</Link>
                        </li>
                        <li className="list-group-item">
                            <Link to="/admin/categories" className="nav-link text-success">Manage Categories</Link>
                        </li>
                        <li className="list-group-item">
                            <Link to="/admin/create/product" className="nav-link text-success">Create Product</Link>
                        </li>
                        <li className="list-group-item">
                            <Link to="/admin/products" className="nav-link text-success">Manage Product</Link>
                        </li>
                        <li className="list-group-item">
                            <Link to="/admin/orders" className="nav-link text-success">Manage Orders</Link>
                        </li>
                    </ul>
                
            </div>
        )
    }

    //Admin right pannel 
    const AdminRightPannel = () => {
        return (
            <div className="card mb-4 mt-1">
                <h4 className="card-header">Admin Info</h4>
                <ul className="list-group">
                    <li className="list-group-item">
        <span className="badge badge-success mr-2">Name:</span> {name}
                    </li>
                    <li className="list-group-item">
        <span className="badge badge-success mr-2">Email:</span> {email}
                    </li>
                    <li className="list-group-item">
        <span className="badge badge-danger mr-2">Admin</span> 
                    </li>
                </ul>
            </div>
        )
    }

    return(
        <Base title=""
              description="Manage all your products here..."
              className="container bg-success">

            <div className="row">
            <div className="col-3">{AdminLeftPannel()}</div>
            <div className="col-9 ">{AdminRightPannel()}</div>
            </div>

        </Base>
    )
}


export default AdminDashBoard;