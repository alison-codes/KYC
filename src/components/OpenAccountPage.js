import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class OpenAccountPage extends Component {
    state = {
    };

    render() {
        return (
            <div>
                <h3>This page might contain the steps to initate the the account opening process. It's added here simply to allow for a bit of user flow.</h3>
                <Link to='/'>Check additional customers against sample OFAC list.</Link>
            </div>
        );
    }
}
