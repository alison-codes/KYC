import React, { Component } from "react";
import { Link } from 'react-router-dom';
import ofacCheck from '../utils/ofacCheck';

export default class From extends Component {
    state = {
        name: "",
        social: "",
        // There are three risk categories with associated colors 
        // 1) High-risk is red, 2) Medium-risk is orange, and 3) Low-risk is green
        riskColor: "green",
        lastCustomerName: "",
        lastCustomerSocial: "",
    };

    //prevents user from typing in a SSN with more than 9 digits
    maxLengthCheck = (e) => {
        if (e.target.value.length > e.target.maxLength) {
            e.target.value = e.target.value.slice(0, e.target.maxLength)
        }
    }

    //requires users to type in required fields in order to select enter button (current name must be at least 4 characters)
    isFormInvalid() {
        return !(this.state.name.length > 3 && this.state.social.length === 9);
    }

    render() {
        return (
            <div>
                {this.state.lastCustomerName && (
                    <div className="card">
                        <div className="card-body">
                            <div style={{ color: this.state.riskColor }}>
                                Customer Profile: {this.state.lastCustomerName}
                            </div>

                            {this.state.riskColor === 'red' || this.state.riskColor === 'orange' ?
                                <div className="card-body">
                                    <div className="row">
                                        <div className="text-center summary-text">
                                            <h5>We advise additional review of this account. Learn more here. TODO insert more info on riskColor.</h5>
                                        </div>
                                    </div>
                                </div>

                                : <div className="card-body">
                                    <div className="row">
                                        <div className="text-center summary-text">
                                            <h5>Based on the information provided, this customer is not on the OFAC list and the process of opening a new account may occur automatically.
                                            <h2><Link to='/openaccount'>Start Process</Link></h2>

                                            </h5>
                                            
                                        </div>
                                    </div>
                                </div>}
                        </div>
                    </div>
                )}
                <div className="card">
                    <div className="card-body">
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                this.setState({
                                    name: ""
                                });
                            }}
                        >
                            <div className="input-group mb-3">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Enter Customer Name"
                                    value={this.state.name}
                                    onChange={e => {
                                        this.setState({
                                            name: e.target.value.toUpperCase(),
                                        });
                                    }}
                                />
                                <div className="input-group-append" />
                                <input
                                    className="form-control"
                                    type="text"
                                    maxLength="9"
                                    placeholder="Enter Customer Social Security Number"
                                    value={this.state.social}
                                    onInput={this.maxLengthCheck}
                                    onChange={e => {
                                        this.setState({
                                            social: e.target.value,
                                        });
                                    }}
                                />
                                <button
                                    className="btn btn-secondary"
                                    type="button"
                                    disabled={this.isFormInvalid()}
                                    onClick={e => {
                                        e.preventDefault();
                                        this.setState({
                                            lastCustomerName: this.state.name,
                                            lastCustomerSocial: this.state.social,
                                            name: "",
                                            social: "",
                                            riskColor: 'green',
                                        });

                                        if (!ofacCheck.passNameLookup(this.state.name)) {
                                            this.setState({
                                                riskColor: 'red',
                                            });
                                        };

                                    }}
                                >
                                    CHECK CUSTOMER
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
