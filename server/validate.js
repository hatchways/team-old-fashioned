const { check, validationResult, checkSchema } = require('express-validator');

exports.validateRegister = [
  check('username', 'Please enter a username').not().isEmpty(),
  check('email', 'Please enter a valid email address').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({
    min: 6,
  }),
  (req, res, next) => {
    const errors = validationResult(req);

    console.log(errors);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];

exports.validateLogin = [
  check('email', 'Please enter a valid email address').isEmail(),
  check('password', 'Password is required').not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];

// makes sure only a valid contest can be created
exports.validateContest = [
  check('title', 'Please provide a title for the contest').notEmpty(),
  check('description', 'Please provide a description for the contest').notEmpty(),
  check('prizeAmount', 'Please provide a valid prize amount').isNumeric(),
  check('deadline', 'Please provide a valid deadline date').notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];

// checks that the values passed are valid and can be used to update a contest
exports.validateUpdateContest = checkSchema({
  id: {
    in: ['params'],
    errorMessage: 'Wrong ID provided',
    notEmpty: true,
  },
  // TODO: add more validations
});

exports.validateGetContest = checkSchema({
  id: {
    in: ['params'],
    errorMessage: 'Wrong ID provided',
    isEmpty: false,
  },
});
