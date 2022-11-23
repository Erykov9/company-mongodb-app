const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
  before(async () => {

    try {
      await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
    } catch(err) {
      console.error(err);
    }
  });

  describe('Reading data',  () => {

    before(async () => {
      const testEmpOne = new Employee({ firstName: 'Employee #1', lastName: 'Employee surname  #1', department: 'IT' });
      await testEmpOne.save();

      const testEmpTwo = new Employee({ firstName: 'Employee #2', lastName: 'Employee surname #2', department: 'Management' });
      await testEmpTwo.save();
    });

    it('should return all the data  with find method', async () => {
      const employees = await Employee.find();
      const expectedLength = 2;
      expect(employees.length).to.be.equal(expectedLength);
    });

    it('should return proper document by variuos params with findOne method', async () => {
      const employee = await Employee.findOne({firstName: 'Employee #2', lastName: 'Employee surname #2', department: 'Management'});
      const expectedFirstName = 'Employee #2';
      const expectedLastName = 'Employee surname #2';
      const expectedEmployee = 'Management';
      expect(employee.firstName, employee.lastName, employee.Employee).to.be.equal(expectedFirstName, expectedLastName,  expectedEmployee);
    });

    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Creating data', () => {
    it('should insert new document with insertOne method.', async () => {
      const employee = new Employee({firstName: 'Employee #3', lastName: 'Employee surname #3', department: 'HR'});
      await employee.save();
      const savedEmployee = await Employee.findOne({firstName: 'Employee #3', lastName: 'Employee surname #3', department: 'HR'});
      expect(savedEmployee).to.not.be.null
    });

    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Updating data', () => {
    
    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName: 'Employee #1', lastName: 'Employee surname  #1', department: 'IT' });
      await testEmpOne.save();

      const testEmpTwo = new Employee({ firstName: 'Employee #2', lastName: 'Employee surname #2', department: 'Management' });
      await testEmpTwo.save();
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });

    it('should properly update one document with updateOne method', async () => {
      await Employee.updateOne({ firstName: 'Employee #1', lastName: 'Employee surname  #1', department: 'IT' }, { $set: { firstName: '=Employee #1=', lastName: '=Employee surname  #1=', department: '=IT=' }});
      const updatedEmployee = await Employee.findOne({ firstName: '=Employee #1=', lastName: '=Employee surname  #1=', department: '=IT=' });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update one  document with save method', async () => {
      const employee = await Employee.findOne({ firstName: 'Employee #1', lastName: 'Employee surname  #1', department: 'IT' });
      employee.firstName = '=Employee #1=';
      employee.lastName = '=Employee surname #1=';
      employee.department = '=IT=';
      await employee.save();
    
      const updatedEmployee = await Employee.findOne({ firstName: '=Employee #1=', lastName: '=Employee surname #1=', department: '=IT=' });
      expect(updatedEmployee).to.not.be.null;
    })

    it('should properly update multiple documents with updateMany method', async () => {
      await Employee.updateMany({}, { $set: { firstName: 'Updated!', lastName: 'Updated surname!', department: 'updated department!'  }});
      const employees = await Employee.find();
      expect(employees[0].firstName, employees[0].lastName, employees[0].department).to.be.equal('Updated!', 'Updated surname!', 'updated department!');
      expect(employees[1].firstName, employees[1].lastName, employees[1].department).to.be.equal('Updated!', 'Updated surname!', 'updated department!');
    });
  });

  describe('Removing data', () => {

    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName: 'Employee #1', lastName: 'Employee surname  #1', department: 'IT' });
      await testEmpOne.save();

      const testEmpTwo = new Employee({ firstName: 'Employee #2', lastName: 'Employee surname #2', department: 'Management' });
      await testEmpTwo.save();
    });
    
    afterEach(async () => {
      await Employee.deleteMany();
    });

    it('should properly remove one document with deleteOne method', async () => {
      const employee = await Employee.findOne({ firstName: 'Employee #1', lastName: 'Employee surname  #1', department: 'IT' });
      await Employee.deleteOne(employee);
      const removed = await Employee.findOne(employee);
      expect(removed).to.be.null;
    });

    it('should properly remove one document with remove method', async () => {
      const employee = await Employee.findOne({ firstName: 'Employee #1', lastName: 'Employee surname  #1', department: 'IT' });
      employee.remove();
      const removed = await Employee.findOne(employee);
      expect(removed).to.be.null;
    });

    it('should properly remove multiple  documents with deleteMany method', async () => {
      await Employee.deleteMany();
      const removed = await Employee.find();
      expect(removed.length).to.be.equal(0);
    })
  });

});