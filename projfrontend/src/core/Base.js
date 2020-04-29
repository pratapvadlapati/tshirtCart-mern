import React from 'react';
import Menu from './Menu';

const Base = ({
    title = "My title",
    description = "My description",
    className ="bg-dark text-white p-4",
    children
}) => {
    return(
        <div>
            <Menu />
            <div className="container-fluid">
                <div className="bg-dark text-white text-center">
    <h4 className="display-4">{title}</h4>
                    <p className="lead">{description}</p>
                </div>
    <div className={className}>{children}</div>
            </div>
            <footer className="footer ng-dark mt-auto p-0">
                <div className="container-fluid bg-success text-white  text-center py-3">
                    <h4>Contact us for any information</h4>
                    <button className="btn btn-warning btn-lng">Contact Us</button>
                </div>
                <div className="container">
                    <span className="text-muted">
                        An amazing store
                    </span>
                </div>
            </footer>
        </div>
    )
}


export default Base;