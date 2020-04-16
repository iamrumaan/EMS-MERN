import React from "react";
import { browserHistory } from "react-router";
import axios from 'axios';

export class Create extends React.Component {
    
    constructor() {
        super();
        this.state = {
            name: "",
            designation: "",
            CTC: ""
          }; 
    }

    handleChange = ({ target }) => {
        const { name, value } = target;
        this.setState({
            [name]: value
        });
        console.log(name+": "+ value);
    };

    onSubmit = (event) => {
        event.preventDefault();
        const name = this.state.name;
        const designation = this.state.designation;
        const ctc = this.state.CTC;

        const payload = {
            name: name,
            designation: designation,
            CTC: ctc
        };

        axios({
            url: '/api/save',
            method: 'POST',
            data: payload
        })
            .then(() => {
                console.log('Data has been sent to the server');
                this.resetUserInputs();
                browserHistory.push("/employees");
            })
            .catch(() => {
                console.log('Internal server error');
            });;
    }

    resetUserInputs = () => {
        this.setState({
          name: '',
          designation: '',
          CTC: ''
        });
      };

    render() {
        return (
            <div>
                <h2>Add New Employee</h2>
                <form className="form ">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={this.state.name}
                            onChange={this.handleChange}
                            className="form-control"
                        />
                        <small id="nameHelp" className="form-text text-muted">Example - John Doe, etc.</small>
                    </div>
                    <div class="form-group">
                        <label for="desg">Designation</label>
                        <input
                            type="text"
                            name="designation"
                            placeholder="Designation"
                            value={this.state.designation}
                            onChange={this.handleChange}
                            className="form-control"
                        />
                        <small id="desgHelp" className="form-text text-muted">Example - Analyst, Consultant, etc.</small>
                    </div>
                    <div class="form-group">
                        <label for="ctc">Cost to Company (CTC)</label>
                        <input
                            type="number"
                            name="CTC"
                            placeholder="Cost To Company"
                            value={this.state.CTC}
                            onChange={this.handleChange}
                            className="form-control"
                        />
                        <small id="ctcHelp" className="form-text text-muted">Example - 2,40,000, 6,50,000 etc.</small>
                    </div>
                    <div className="form-input">
                        <button onClick={this.onSubmit} className="btn btn-success">Submit</button> &nbsp; &nbsp;
                        <button onClick={this.onCancel} className="btn btn-primary">Cancel</button>
                    </div>
                </form>
            </div>
        );
    }
}