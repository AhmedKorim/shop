const router = require('express').Router();
const User = require('../../models/User');
const Order = require('../../models/Order');

const passport = require('passport');


/*
* @route /api/order
* @method Post
* @desc issue an order
* @privacy user that is logged in
*@params none
* */
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {_id,} = req.user;
    const errors = {};
    if (!_id) return res.status(401).json({
        errors: "un authorized operation"
    })
    User.findById(_id)
        .then(user => {
            if (user) {
                const {cart: {cast, ...cart}} = user.cart;
                const newOrder = new Order({
                    user: _id,
                    products: cart,
                    cast
                })
                newOrder.save()
                    .then(order => {
                        res.status(201)
                            .json({
                                message: "order purchased successfully",
                                order: order
                            })
                    })

            }
        })
        .catch(err => console.log(err))
})

/*
* @route /api/order/cart
* @method post
* @desc add product to the cart
* @privacy user that logged in
*@params
* */

router.post('/cart', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {_id} = req.user;
    const {id: productId, count} = req.body;
    let messgae;

    if (!_id) {
        console.log('shit hellp');
    }
    User.findById(_id)
        .then(user => {
            if (user) {
                const itemOnCart = user.cart.find(({product: id}) =>
                    id.toString() === productId
                );
                if (!!itemOnCart && itemOnCart.count === count) {
                    return res.status(200)
                        .json({
                            message: "item is already exist with the same amount",
                            cart: user.cart
                        })
                }
                const newProduct = {
                    product: productId,
                    count
                }
                user.cart.unshift(newProduct);
                user.save()
                // TODO POPULATE AN COUNT THE CAST
                    .then(user => {
                        res.status(201)
                            .json({
                                message: 'successfully added the item to the cart',
                                cart: user.cart
                            })
                    }).catch(err => {
                    console.log(err);
                    res.status(500)
                        .json({
                            message: 'internal server error'
                        })
                })

            }
        })
        .catch(err => res.status(404).json({
            message: "product is not available"
        }))
})

/*
* @route /api/order/cart
* @method Delete
* @desc deletes the product from the cart
* @privacy
*@params
* */

router.delete('/cart', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {_id} = req.user;
    const {id: productId} = req.body;
    let messgae;
    if (!_id) {
        console.log('shit hellp');
    }
    User.findById(_id)
        .then(user => {
            if (user) {
                const itemOnCart = !!user.cart.find(cartItem =>
                    cartItem.product.toString() === productId
                );
                if (!itemOnCart) return res.status(404)
                    .json({
                        message: 'item has already been removed from the cart'
                    })
                user.cart = user.cart.filter(cartItem =>
                    cartItem.product.toString() !== productId
                );
                user.save()
                // TODO POPULATE AN COUNT THE CAST
                    .then(user => {
                        res.status(201)
                            .json({
                                message: 'successfully deleted the item from the cart',
                                cart: user.cart
                            })
                    }).catch(err => {
                    console.log(err);
                    res.status(500)
                        .json({
                            message: 'internal server error'
                        })
                })

            }
        })
        .catch(err => res.status(404).json({
            message: "product is not available"
        }))
})

/*
* @route /api/order/wishlist
* @method post
* @desc add the product from the wishlist
* @privacy
*@params
* */
router.post('/wishlist', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {_id} = req.user;
    const {id: productId} = req.body;
    if (!_id) {
        // return res.status(401).json({})
    }
    User.findById(_id)
        .then(user => {
            if (user) {
                const onWishlist = !!user.wishlist.find(wishlistItem => wishlistItem.product.toString() === productId)
                if (onWishlist) {
                    user.wishlist = user.wishlist.filter(wishListIem => wishListIem.product.toString() !== productId)
                } else {
                    user.wishlist.unshift({
                        product: productId
                    })
                }
                user.save()
                    .then(user => {
                        console.log(user.wishlist); // ?
                        res.status(201)
                            .json({
                                message: onWishlist ? "item delete from wishlsit" : "item added to wishlist",
                                wishlist: user.wishlist
                            })
                    })
            }
        })
        .catch(err => console.log(err))
})

/*
* @route /api/order/session
* @method post
* @desc get use data
* @privacy
*@params
* */
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {_id} = req.user;
    User.findById(_id)
        .then(user => res.status(200).json({
            cart: user.cart,
            wishlist: user.wishlist
        }))
        .catch(err => {
            res.status(500)
                .json({
                    error: 'internal server error'
                })
        })
})

module.exports = router;