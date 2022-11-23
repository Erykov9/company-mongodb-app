const expect = require('chai').expect;
const Department = require('../department.model');
const mongoose = require('mongoose');

describe('Department', () => {
  const dep = new Department({});
  it('should throw an error if no "name" arg', () => {
    dep.validate(err => {
      expect(err.errors.name).to.exist;
      after(() => {
        mongoose.models = {};
      });
    });
  });

  it('should throw an error if "name" is not a string', () => {
    const cases = [{}, []];
    for(let name of cases) {
      const dep = new Department({ name });
  
      dep.validate(err => {
        expect(err.errors.name).to.exist;
      });
    }
  });

  it('should throw an error if "name" is shorter than 5 and greater than 20 letters',  ()  => {
    const cases  = ['four','one', 'more than twenty letters'];
    for (let c of cases)  {
      const dep = new Department({ name: c });

      dep.validate(err => {
        expect(err.errors.name).to.exist;
      })
    }
  });

  it('should not throw an error if "name" is okay', () => {
    const cases = ['string', 'test12'];

    for(let c of cases) {
      const dep = new Department({ name: c });
  
      dep.validate(err => {
        expect(err).to.not.exist;
      });
  
    }
  })
});
