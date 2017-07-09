function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
}

function frontRegisterUserValidation(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  req.checkBody('username', 'Name is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('repeatPassword', 'Passwords do not match').equals(req.body.password);

  let errors = req.validationErrors();

  if(errors){
    res.render('register-view', {
      errors:errors
    });
  } else {
    return next()
  }
}

module.exports = { ensureAuthenticated, frontRegisterUserValidation }