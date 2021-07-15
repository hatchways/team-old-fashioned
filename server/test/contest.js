const sinon = require('sinon');
const { createContest, updateContest, getContest, getContests } = require('../controllers/contest');
const should = require('chai').should();
require('sinon-mongoose');
const mongoose = require('mongoose');
const { validateContest, validateUpdateContest } = require('../validate');
const { validationResult } = require('express-validator/check');

var testMiddleware = async (req, res, middlewares) => {
  await Promise.all(
    middlewares.map(async (middleware) => {
      await middleware(req, res, () => undefined);
    }),
  );
};

describe('Create Contest', () => {
  it('should create a contest and return the contest', async function () {
    const req = {
      body: {
        title: 'title for a new contest',
        description: 'description about the contest',
        prizeAmount: 2000,
        deadline: '2021-07-25T03:25:00',
      },
    };
    const res = {};
    const next = () => {
      console.log();
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    const Contest = mongoose.model('Contest');
    let MockContest = sinon.mock(Contest);
    const a = req.body;
    MockContest.expects('create')
      .withArgs({ title: a.title, description: a.description, prizeAmount: a.prizeAmount, deadline: a.deadline })
      .resolves(req.body);

    await createContest(req, res, next);
    const response = req.body;

    res.json.calledWith(response).should.be.a('boolean');
    res.json.calledWith(response).should.be.equal(true);
    MockContest.restore();
  });

  describe('validate params and request body', () => {
    it('check title is validated', async function () {
      const req = {
        body: {
          description: 'description about the contest',
          prizeAmount: 2000,
          deadline: '2021-07-25T03:25:00',
        },
      };
      const res = {};

      await testMiddleware(req, res, validateContest);
      const errors = validationResult(req);
      errors.errors[0].msg.should.be.equal('Please provide a title for the contest');
    });

    it('check description is validated', async function () {
      const req = {
        body: {
          title: 'description about the contest',
          prizeAmount: 2000,
          deadline: '2021-07-25T03:25:00',
        },
      };
      const res = {};

      await testMiddleware(req, res, validateContest);
      const errors = validationResult(req);
      errors.errors[0].msg.should.be.equal('Please provide a description for the contest');
    });

    it('check prizeAmount is validated', async function () {
      const req = {
        body: {
          title: 'description about the contest',
          description: 'some description about the contest',
          deadline: '2021-07-25T03:25:00',
        },
      };
      const res = {};

      await testMiddleware(req, res, validateContest);
      const errors = validationResult(req);
      errors.errors[0].msg.should.be.equal('Please provide a valid prize amount');
    });

    it('check deadline is validated', async function () {
      const req = {
        body: {
          title: 'title about the contest',
          description: 'some description about the contest',
          prizeAmount: 2000,
        },
      };
      const res = {};

      await testMiddleware(req, res, validateContest);
      const errors = validationResult(req);
      errors.errors[0].msg.should.be.equal('Please provide a valid deadline date');
    });

    it('check should pass for valid data', async function () {
      const req = {
        body: {
          title: 'title about the contest',
          description: 'description about the contest',
          prizeAmount: 2000,
          deadline: '2021-07-25T03:25:00',
        },
      };
      const res = {};

      await testMiddleware(req, res, validateContest);
      const errors = validationResult(req);
      errors.errors.should.be.empty;
    });
  });
});

describe('Update Contest', () => {
  it('should update a contest', async function () {
    const req = {
      body: {
        title: 'title for a new contest',
        description: 'description about the contest',
        prizeAmount: 2000,
      },
      params: {
        id: 'someID2NH2_A',
      },
    };
    const res = {};
    const next = () => undefined;

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    const Cont = mongoose.model('Contest');
    let MockContest = sinon.mock(Cont);
    const a = req.body;
    MockContest.expects('findOneAndUpdate')
      .withArgs({ id: req.params.id }, { title: a.title, description: a.description, prizeAmount: a.prizeAmount })
      .resolves(req.body);

    await updateContest(req, res, next);
    const response = req.body;

    MockContest.restore();

    res.json.calledWith(response).should.be.a('boolean');
    res.json.calledWith(response).should.be.equal(true);
  });

  describe('validations', () => {
    describe('check value of id', () => {
      var testSchema = async (req, res, schema) => {
        await Promise.all(
          schema.map((chain) => {
            chain.run(req, res, () => undefined);
          }),
        );
      };
      it('should fail, id not provided', async function () {
        const req = {
          params: {},
        };
        const res = {};

        await testSchema(req, res, validateUpdateContest);
        const errors = validationResult(req);
        errors.errors[0].msg.should.be.equal('Wrong ID provided');
      });

      it('should pass, id provided', async function () {
        const req = {
          params: {
            id: 'somen&hygs',
          },
        };
        const res = {};

        await testSchema(req, res, validateUpdateContest);
        const errors = validationResult(req);
        errors.errors.should.be.empty;
      });
    });
  });
});

describe('get contest', () => {
  it('should get a contest', async function () {
    const title = 'title for a new contest';
    const description = 'description about the contest';
    const prizeAmount = 2000;

    const cont = { title: title, description: description, prizeAmount: prizeAmount };

    const req = {
      params: {
        id: 'someID2NH2_A',
      },
    };
    const res = {};
    const next = () => undefined;

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    const Cont = mongoose.model('Contest');
    let MockContest = sinon.mock(Cont);
    MockContest.expects('findById').withArgs(req.params.id).resolves(cont);

    await getContest(req, res, next);
    const response = cont;

    res.json.calledWith(response).should.be.a('boolean');
    res.json.calledWith(response).should.be.equal(true);

    MockContest.restore();
  });
});

describe('Get all contests', () => {
  it('should get a contest', async function () {
    const title = 'title for a new contest';
    const description = 'description about the contest';
    const prizeAmount = 2000;

    const cont = { title: title, description: description, prizeAmount: prizeAmount };

    const req = {};
    const res = {};
    const next = () => undefined;

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    const Cont = mongoose.model('Contest');
    let MockContest = sinon.mock(Cont);
    MockContest.expects('find').resolves(cont);

    await getContests(req, res, next);
    const response = cont;

    res.json.calledWith(response).should.be.a('boolean');
    res.json.calledWith(response).should.be.equal(true);

    MockContest.restore();
  });
});
