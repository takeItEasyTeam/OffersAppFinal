function isLogin(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
    res.redirect('/login');
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


  req.checkBody('firstName', 'Полето Име: е задължително!').notEmpty();
  req.checkBody('firstName', 'Полето Име: трябва да бъде между 3 и 15 символа!').len(3, 15);
  req.checkBody('lastName', 'Полето Фамилия: е задължително!').notEmpty();
  req.checkBody('lastName', 'Полето Фамилия: трябва да бъде между 3 и 15 символа!').len(3, 15);
  req.checkBody('username', 'Полето Потребителско име: е задължително!').notEmpty();
  req.checkBody('username', 'Полето Потребителско име: трябва да бъде между 3 и 15 символа!').len(3, 15);
  req.checkBody('password', 'Полето Парола: е задължително!').notEmpty();
  req.checkBody('password', 'Полето Парола: трябва да бъде между 3 и 15 символа!').len(3, 15);
  req.checkBody('repeatPassword', 'Паролата трябва да съвпада!').equals(req.body.password);
  req.checkBody('email', 'Полето E-mail: е задължително!').notEmpty();
  req.checkBody('email', 'Е-mail форматът е невалиден!').isEmail();
  req.checkBody('phoneNumber', 'Полето Телефонен номер: е задължително!').notEmpty();
  req.checkBody('phoneNumber', 'Полето Телефонен номер трябва да съдържа само цифри!').isInt();
  req.checkBody('country', 'Полето Държава: е задължително!').notEmpty();
  req.checkBody('country', 'Полето Държава: трябва да съдържа между 1 и 30 символа!').len(1, 30);
  req.checkBody('town', 'Полето Град: е задължително!').notEmpty();
  req.checkBody('town', 'Полето Град: трябва да съдържа между 1 и 30 символа!').len(1, 30);

  const errors = req.validationErrors();

  if (errors) {
    res.render('register-view', {
      errors: errors,
    });
  } else {
    return next();
  }
}

module.exports = { isLogin, frontRegisterUserValidation };
