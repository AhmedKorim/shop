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
// bread crumbs
router.get('/:from/:to', (req, res, next) => {
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
    const slides = req.files.slides.map(slide => "uploads/" + slide.filename)
    metaData.image = "uploads/" + req.files['product-image'][0].filename;
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
});
module.exports = router;
