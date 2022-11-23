const mongoose = require('mongoose');
const expect = require('chai').expect;
const Employee = require('../employee.model');

describe('Employee', () => {

  it('should throw an error if no arg', () => {
    const emp = new Employee({});
    emp.validate(err => {
      expect(err.errors).to.exist;
    });
  });

  it('should throw an  error  if arg is not a string',  () => {
    const cases = [[],{}];

    for(let c of cases)  {
      const emp  = new Employee({firstName: c, lastName: c, department: c})

      emp.validate(err => {
        expect(err.errors).to.exist;
      });
    };
  });

  it('should not throw an error if arg is correct', () =>{
    const cases = ['string', 'stringno2'];

    for (let c of  cases) {
      const emp =  new  Employee({firstName: c, lastName: c, department: c})

      emp.validate(err => {
        expect(err).to.not.exist;
      });
    };
  });
});