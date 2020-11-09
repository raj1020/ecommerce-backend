const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


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
                message: 'Admin with that email already exists'
            })

            User.findOne({ username: username })
                .then((user) => {
                    if (user) return res.status(400).json({
                        message: 'Admin with that username already exists'
                    })


                    bcrypt.hash(password, 12)
                        .then(hashedpassword => {
                            const _user = new User({
                                firstName,
                                lastName,
                                email,
                                password: hashedpassword,
                                username,
                                role: 'admin'

                            })
                            _user.save()
                                .then((result) => {

                                    return res.status(201).json("Admin created successfully.")

                                })
                                .catch(err => {
                                    console.log(err)
                                })

                        })

                })
        })
}


exports.signin = (req, res) => {
    const {
        email,
        password
    } = req.body;

    if (!email || !password) {
        return res.status(422).json({ error: "Please add email and/or password." });
    }

    User.findOne({ email: email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: "Invalid email and/or password." });
            }

            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch && savedUser.role === 'admin') {
                        const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                        const {_id, firstName, lastName, email, role, fullName } = savedUser;
                        res.status(200).json({
                            token,
                            savedUser: {
                                _id, firstName, lastName, email, role, fullName
                            }
                        });

                    } else {
                        return res.status(422).json({ error: "Invalid email and/or password." });
                    }


                })
                .catch(err => {
                    console.log(err)
                })
        })

}


exports.requireSignin = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
} 

