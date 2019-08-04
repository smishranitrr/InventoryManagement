var Product = require('../models/product');

exports.createProduct = function (req, res) {
    // Create a Product
    const product = new Product({
        name: req.body.name ,
        price: req.body.price,
        rating: req.body.rating,
    });

    // Save Product in the database
    product.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the product."
        });
    });
};

//get single product by _id
exports.getProduct= function (req, res) {
    Product.findById(req.params.id)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.id
            });            
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving product with id " + req.params.id
        });
    });
};

//update product
exports.updateProduct = function (req, res) {
    // Find and update product with the request body
    Product.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        price: req.body.price,
        rating: req.body.rating
    }, {new: true})
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.id
            });
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.id
        });
    });
};

//get all products
exports.getAllProducts = function (req, res) {
    Product.find()
    .then(products => {
        res.send(products);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving products."
        });
    });
};

// deleting a product
exports.deleteProduct = function (req, res) {
    Product.findByIdAndRemove(req.params.id)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.id
            });
        }
        res.send({message: "Product deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete product with id " + req.params.id
        });
    });
};