function isLogin(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
}

function frontRegisterUserValidation(req, res, next) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const phoneNumber = req.body.phoneNumber;
  const country = req.body.country;
  const town = req.body.town;


  req.checkBody('firstName', 'First name is required').notEmpty();
  req.checkBody('firstName', 'First name must contain between 3 and 15 characters').len(3, 15);
  req.checkBody('lastName', 'Last name is required').notEmpty();
  req.checkBody('lastName', 'Last name must contain between 3 and 15 characters').len(3, 15);
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('username', 'Username must contain between 3 and 15 characters').len(3, 15);
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password', 'Password must contain between 3 and 15 characters').len(3, 15);
  req.checkBody('repeatPassword', 'Passwords do not match').equals(req.body.password);
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('phoneNumber', 'Phone number is required').notEmpty();
  req.checkBody('phoneNumber', 'Phone number must contain digits only').isInt();
  req.checkBody('country', 'Country is required').notEmpty();
  req.checkBody('country', 'Country must contain between 1 and 30 characters').len(1, 30);
  req.checkBody('town', 'Town is required').notEmpty();
  req.checkBody('town', 'Town must contain between 1 and 30 characters').len(1, 30);

  let errors = req.validationErrors();

  if (errors) {
    res.render('register-view', {
      errors: errors,
    });
  } else {
    return next();
  }
}

module.exports = { isLogin, frontRegisterUserValidation }