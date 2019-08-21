import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class OpenAccountPage extends Component {
    state = {
    };

    render() {
        return (
            <div>
                <h4>This page might contain the steps to initate the account opening process. It's added here simply to allow for a bit of user flow.</h4>
                <Link to='/'>
                    <button className="waves-effect waves-light btn btn-secondary">Return to previous page</button>
                </Link>
            </div>
        );
    }
}
