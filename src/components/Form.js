import React, { Component } from "react";
import { Link } from 'react-router-dom';
import ofacCheck from '../utils/ofacCheck';
import ReactDOM from 'react-dom';
import M from "materialize-css";
import 'materialize-css/dist/css/materialize.min.css';


export default class From extends Component {
    state = {
        name: "",
        social: "",
        country: [],
        // There are three risk categories with associated colors 
        // 1) High-risk is red, 2) Medium-risk is orange, and 3) Low-risk is green
        riskColor: "green",
        riskIssue: "",
        lastCustomerName: "",
        lastCustomerSocial: "",
        lastCustomerCitizenship: [],
    };

    //auto-initialize Materialize CSS selector dropdown
    componentDidMount() {
        M.AutoInit();
        let dropdowns = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(dropdowns);
    }

    //prevents user from typing in a SSN with more than 11 digits (9 numbers + 2 dashes)
    maxLengthCheck = (e) => {
        if (e.target.value.length > e.target.maxLength) {
            e.target.value = e.target.value.slice(0, e.target.maxLength)
        }
    }

    //requires users pass front-end validation in order to sumbit form
    //names must contain at least 3 characters; socials must be exactly 9 numeric characters
    isFormInvalid() {
        //removes dashes from Social Security number
        let numericSocialChars = this.state.social.replace(/-/g, "");
        return !(this.state.name.length > 2 && this.state.social.length === 11 && isFinite(numericSocialChars));
    }

    //allows users to clear form when the form is partially filled out 
    isFormBlank() {
        return !(this.state.name.length || this.state.social.length || this.state.country[0]);
    }

    render() {
        return (
            <div>

                {this.state.lastCustomerName && (
                    // If a customer was recently search for, show their info in a card above the input form
                    <div className="card">
                        <div className="right-align">
                            <button
                                className="btn delete-btn right-align"
                                type="button"
                                onClick={e => {
                                    e.preventDefault();
                                    this.setState({
                                        lastCustomerName: "",
                                        lastCustomerSocial: "",
                                        lastCustomerCitizenship: [],
                                    });
                                }}
                            >
                                X
                                </button>
                        </div>

                        <div className="card-body">
                            <div style={{ color: this.state.riskColor }}>
                                <h4>Customer Profile <br /> {this.state.lastCustomerName}</h4>
                            </div>
                            {this.state.riskColor === 'red' || this.state.riskColor === 'orange' ?
                                <div className="card-body">
                                    <div className="row">
                                        <div className="text-center summary-text">
                                            <h6>We advise an additional review of this account as {this.state.riskIssue}.
                                            {this.state.lastCustomerCitizenship.length ?
                                                    <div className="placeholder-text">Citizenship information has been entered for this customer.</div>
                                                    : null}
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                                : <div className="card-body">
                                    <div className="row">
                                        <div className="text-center summary-text">
                                            <h5>Based on the information provided, this customer is not on the OFAC list and has accounts in good standing with Sample Bank.
                                            <h6><Link to='/openaccount'>Initiate Account Opening Process</Link></h6>
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
                                    maxLength="100"
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
                                    maxLength="11"
                                    placeholder="Enter Customer Social Security Number"
                                    value={this.state.social}
                                    onInput={this.maxLengthCheck}
                                    onChange={e => {
                                        if (this.state.social.length === 2 || this.state.social.length === 5) {
                                            e.target.value = e.target.value + '-'
                                        }
                                        this.setState({
                                            social: e.target.value,
                                        });
                                    }}
                                />

                                <div>
                                    <div className="input-field col s12">
                                        <select multiple
                                            onChange={e => {
                                                this.setState({
                                                    country: [].slice.call(e.target.selectedOptions).map(o => {
                                                        return o.value;
                                                    })
                                                });
                                            }}
                                        >
                                            <option value="United States">United States</option>
                                            <option value="Canada">Canada</option>
                                            <option value="North Korea">North Korea</option>
                                        </select>
                                        <label>Optional: Select Customer's Country of Citizenship</label>
                                    </div>
                                </div>

                                <button
                                    className="btn btn-secondary waves-effect waves-light"
                                    type="button"
                                    disabled={this.isFormInvalid()}
                                    onClick={e => {
                                        e.preventDefault();
                                        this.setState({
                                            lastCustomerName: this.state.name,
                                            lastCustomerSocial: this.state.social,
                                            lastCustomerCitizenship: [...this.state.country],
                                            name: "",
                                            social: "",
                                            riskColor: "green",
                                            riskIssue: "",
                                        })
                                        // Reset countries selected on form
                                        let dropdowns = document.querySelectorAll('.dropdown-trigger');
                                        dropdowns[0].value = "";
                                        // Check to see which risk bucket the customer falls into:green, orange, or red
                                        if (!ofacCheck.passExistingCustomerLookup(this.state.name, this.state.social)) {
                                            this.setState({
                                                riskColor: "orange",
                                                riskIssue: "this individual does not have an existing relationship with Sample Bank",
                                            });
                                        };
                                        if (!ofacCheck.passSocialLookup(this.state.name, this.state.social)) {
                                            this.setState({
                                                riskColor: "red",
                                                riskIssue: "the Social Security Number entered may belong to a different individual",
                                            });
                                        };
                                        if (!ofacCheck.passCitizenshipLookup(this.state.country)) {
                                            this.setState({
                                                riskColor: "red",
                                                riskIssue: "this individual maintains citizenship with an OFAC-sanctioned country",
                                            });
                                        };
                                        if (!ofacCheck.passNameLookup(this.state.name)) {
                                            this.setState({
                                                riskColor: "red",
                                                riskIssue: "this individual is on the OFAC blocked persons list",
                                            });
                                        };
                                    }}
                                >
                                    RETRIEVE CUSTOMER DATA
                                </button>
                                <button
                                    className="btn btn-secondary waves-effect waves-light "
                                    type="button"
                                    disabled={this.isFormBlank()}
                                    onClick={e => {
                                        e.preventDefault();
                                        // Reset countries selected on form
                                        let dropdowns = document.querySelectorAll('.dropdown-trigger');
                                        dropdowns[0].value = "";
                                        // Reset state
                                        this.setState({
                                            name: "",
                                            social: "",
                                            country: [],
                                        });
                                    }}
                                >
                                    CLEAR FORM
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        );
    }
}
