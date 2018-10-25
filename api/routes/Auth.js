const router = require("express").Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcryptjs')
const User = require('../../models/User');
const {secretOrKey} = require('../../config/keys');
// todo validation

/*
* @route /api/auth/register
* @method POST
* @desc create account
* @privacy public
*@params none
* */
router.post('/register', (req, res) => {
    const errors = {};
    const {email, name, password, password2} = req.body;
    User.findOne({email})
        .then(doc => {
            if (doc) {
                errors.email = "Email already in Use"
                return res.status(400)
                    .json({
                        errors
                    })
            } else {
                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) {
                            /*    res.status(500)
                                    .json({message: "some thing went wrong please try  again later"})*/
                            console.log(err);
                        }
                        const newUser = new User({
                            email,
                            name,
                            password: hash
                        })
                        newUser.save()
                            .then(user => {
                                const {name, email, _id} = user;
                                return res.status(201).json({
                                    message: "created account successfully",
                                    user: {
                                        name,
                                        email,
                                        _id
                                    }
                                });
                            })
                            .catch(err => res.status(401).json({
                                errors: "failed to create account"
                            }))
                    })
                )
            }
            ;
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({});
        })

})

/*
* @route /api/auth/login
* @method POST
* @desc login user with email and password
* @privacy public
*@params none
* */
router.post('/login', (req, res) => {
    // error validation
    //
    const errors = {};
    const {email, password} = req.body;
    User.findOne({email})
        .then(doc => {
            if (!doc) {
                errors.email = "Email not fount"
                return res(404)
                    .then({
                        errors,

                    })
            }
            bcrypt.compare(password, doc.password)
                .then(isMatch => {
                    if (isMatch) {
                        const paylaod = {
                            id: doc.id,
                            name: doc.name,
                            expirationTime: 3600 * 3
                        }
                        jwt.sign(paylaod,
                            secretOrKey,
                            {expiresIn: 3600 * 3},
                            (err, token) => {
                                if (err) {
                                    console.log(err);
                                }
                                if (token) {
                                    res.status(200)
                                        .json({
                                            message: "login  success",
                                            user: {
                                                id: doc._id,
                                                name: doc.name,
                                                email: doc.email
                                            },
                                            token: "Bearer " + token
                                        })
                                }
                            })
                    } else { // not matched
                        errors.password = 'password incorrect'
                        res.status(401)
                            .json({
                                errors
                            })
                    }
                })
        })
        .catch(err => res.status(500).json({
            errors: {
                server: "internal server error"
            }
        }))
})
module.exports = router;