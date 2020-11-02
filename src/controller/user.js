const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.signup = (req, res) => {
    const {
        firstName,
        lastName,
        email,
        password,
        username
    } = req.body;
    User.findOne({ email: email })
        .then((user) => {
            if (user) return res.status(400).json({
                message: 'User with that email already exists'
            })

            User.findOne({ username: username })
                .then((user) => {
                    if (user) return res.status(400).json({
                        message: 'User with that username already exists'
                    })


                    bcrypt.hash(password, 12)
                        .then(hashedpassword => {
                            const _user = new User({
                                firstName,
                                lastName,
                                email,
                                password: hashedpassword,
                                username

                            })
                            _user.save()
                                .then((result) => {

                                    return res.status(201).json("User created successfully.")

                                })
                                .catch(err => {
                                    console.log(err)
                                })

                        })

                })
        })
}