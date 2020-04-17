import React from "react";
import { browserHistory } from "react-router";
import axios from 'axios';

export class Employees extends React.Component {
    
    state = {
        employees: []
      };
    
    onNavigateHome() {
        browserHistory.push("/home");
    }

    onNavigateNewEmployee() {
        browserHistory.push("/create");
    }

    getEmployees() {
        axios.get('/api')
        .then((response) => {
          const data = response.data;
          this.setState({ employees: data });
          console.log('Data has been received!!',data);
        })
        .catch(() => {
          alert('Error retreiving data!!');
        })
    }

    componentDidMount() {
        this.getEmployees();
    }

    editEmployee = ({ target }) => {
        console.log('Hitting editEmployee method. Key : ', target.id);
        axios.get(`/api/${target.id}`)
        .then((response) => {
            console.log('Data:', response);
        })
        .catch((res) => {
            console.log('Error fetching employee',res);
        })
    }

    deleteEmployee = ({ target }) => {
        console.log('Hitting deleteEmployee method. Key : ', target.id);
        axios.delete(`/api/${target.id}`)
        .then((response) => {
            this.getEmployees();
        })
        .catch(() => {
            console.log('Error deleting employee');
        })
    }

    renderTableData(employees) {
        return employees.map((employee, index) => {
            return (
               <tr key={employee._id}>
                  <td>{employee.name}</td>
                  <td>{employee.designation}</td>
                  <td>{employee.CTC}</td>
                  <td>
                    <button id={employee._id} className="btn btn-primary" onClick={this.editEmployee}>Edit</button> &nbsp;
                    <button id={employee._id} className="btn btn-danger" onClick={this.deleteEmployee}>Delete</button>
                  </td>
               </tr>
            )
         })
    }

    render() {
        return (
            <div>
                <h3>Employee's List</h3>
                <button onClick={this.onNavigateNewEmployee} className="btn btn-primary">Add Employee</button>
                <hr/>
                <div className="employees-display">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Employee Name</th>
                                <th>Designation</th>
                                <th>CTC</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTableData(this.state.employees)}
                        </tbody>
                    </table>
                </div>
                <button onClick={this.onNavigateHome} className="btn btn-primary">Go Home!</button>
            </div>
        );
    }
}