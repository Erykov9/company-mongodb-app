const express = require('express');
const router = express.Router();
const Department  =  require('../models/department.model');
const DepartmentController  =  require('../controllers/departments.controller');

router.get('/departments', DepartmentController.getAll)

router.get('/departments/random', DepartmentController.getRandom);

router.get('/departments/:id', DepartmentController.getById);

router.post('/departments', DepartmentController.Post);

router.put('/departments/:id', DepartmentController.Edit);

router.delete('/departments/:id', DepartmentController.Delete);

module.exports = router;
