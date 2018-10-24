const express = require('express');
const Product = require('../../models/Product');
const multer = require('multer');
const router = express.Router();
const path = require('path');

const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
        fileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
        cb(null, fileName);
    }
})

// upload
const upload = multer({
    storage,
    // limits, -> {maxSize:}
    // filefilter -> funcion  (req,file,cb) -> callback -> : (err,boolean)
})


//get all products
router.get('/', (req, res, next) => {
    Product.find({}).then(docs => {
        res.status(200)
            .json({
                products: docs
            })
    })
        .catch(err => {
            res.status(404)
                .json({
                    message: "something went wrong",
                    error: err
                })
        })
})

router.post("/", upload.fields([{name: 'product-image', maxCount: 1}, {name: 'slides', maxCount: 10}]), (req, res, next) => {

    // validation
    const statistics = JSON.parse(req.body.statistics);
    const metaData = JSON.parse(req.body.metaData);
    const slides = req.files.slides.map(slide => slide.path.replace(/\\/g, "/"))
    metaData.image = req.files['product-image'][0].path.replace(/\\/g, '/');
    const newProduct = new Product({metaData, statistics, slides})

    newProduct.save()

        .then(product => {
            res.status(201).json({
                message: "product added successfully",
                product: product
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "failed to add the product",
            });
        })


    // const newPorduct = new Product({
    //     name: req.body.name,
    //     image: req.body.image,
    //     price: req.body.price,
    //     statistics: req.body.statistics,
    //     slides: req.body.slides,
    //     brand: req.body.brand
    // })
    // newPorduct.save()
    //     .then(doc => {
    //         console.log(doc);
    //         res.status(200)
    //             .json({
    //                 message: "product add successfully",
    //                 product: newPorduct
    //             })
    //     })
    //     .catch(err => {
    //         res.status(401)
    //             .json({
    //                 message: "failed to add the item",
    //                 error: err
    //             })
    //     })
});
module.exports = router;
