import React from "react";
import {Link} from "react-router";

export const Header = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <div className="navbar-header">
                    <ul className="nav navbar-header navbar-nav mr-auto">
                        <li><Link to={"/home"} activeStyle={{color: "red"}}>Home</Link>&nbsp;</li>
                        <li><Link to={"/employees"} activeStyle={{color: "red"}}>Employees</Link>&nbsp;</li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};