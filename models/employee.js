const mongoose = require('mongoose');

//Schema
const Schema = mongoose.Schema;
const EmployeeSchema = new Schema({
    name: String,
    designation: String,
    dateOfJoining: {
        type: String,
        default: Date.now()
    },
    CTC: Number
});

//Model
const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;