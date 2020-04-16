const express = require('express');

const router = express.Router();

const Employee = require('../models/employee');

//Routes
router.get('/', (req,res) => {
    
    Employee.find({})
    .then((data) => {
        console.log('Data: ', data);
        res.json(data);
    })
    .catch((error) => {
        console.log('Error: ', daerrorta);
    });
    
});

router.post('/save', (req,res) => {
    console.log('Body: ', req.body);
    const data = req.body;

    const newEmployee = new Employee(data)
     
    // .save
    newEmployee.save((error) => {
        if(error){
            res.status(500).json({ 
                msg: 'Sorry, internal server error'
            });
            return;
        }
        //Employee
        return res.json({
            msg: 'Your data has been received!!!'
        });
    });
});

router.get(':id', (req, res) => {
    Employee.findById(req.params.id)
    .then(emp => {
        if(!emp) {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.id
            });            
        }
        res.send(emp);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Employee with id " + req.params.id
        });
    });
});

router.put(':id', (req, res) => {
    // Validate Request
    if(!req.body.name && !req.body.designation && !req.body.CTC) {
        return res.status(400).send({
            message: "Name/Designation/CTC cannot be empty"
        });
    }
    // Find employee and update it with the request body
    Employee.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        designation: req.body.designation,
        CTC: req.body.CTC
    }, {new: true})
    .then(emp => {
        if(!emp) {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.id
            });
        }
        res.send(emp);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating employee with id " + req.params.id
        });
    });
});

router.delete('/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id)
    .then(emp => {
        if(!emp) {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.id
            });
        }
        res.send({message: "Employee deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.todo
            });                
        }
        return res.status(500).send({
            message: "Could not delete employee with id " + req.params.id
        });
    });
});

router.get('/name', (req,res) => {
    const data = {
        username: "iamrumaan",
        age: "23",
    };
    res.json(data);
});

module.exports = router;