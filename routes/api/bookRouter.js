const express = require('express');
const bodyParser = require('body-parser');
const mongoose=require('mongoose');
const bookRouter = express.Router();
const authenticate=require('../../authenticate');
const cors = require('../cors');
const Books=require('../../models/books');
bookRouter.use(bodyParser.json());

bookRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.corsWithOptions,(req,res,next) => {
    Books.find(req.query)
    .sort({name: 'asc'})
    .then((books)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(books);
    },(err)=>(next(err)))
    .catch((err)=>(next(err)))
})
.post(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    Books.create(req.body)
    .then((book)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(book);
    },(err)=>(next(err)))
    .catch((err)=>(next(err))) 
})
.put(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /books');
})
.delete(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /books');

/*   Books.remove({})
    .then((resp) => {
        console.log("Removed All Books");
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));*/
});

bookRouter.route('/:bookId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); 
    res.setHeader('Access-Control-Allow-Credentials', 'true')})
.get(cors.corsWithOptions,(req,res,next) => {
    Books.findById(req.params.bookId)
    .then((book)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(book);
    },(err)=>(next(err)))
    .catch((err)=>(next(err)));
})

.post(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /books/'+ req.params.bookId);
})

.put(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
 Books.findByIdAndUpdate(req.params.bookId,{
     $set: req.body
 },{new: true})
 .then((book) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(book);
}, (err) => next(err))
.catch((err) => res.status(400).json({success: false}));
})

.delete(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    Books.findByIdAndRemove(req.params.bookId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({_id: req.params.bookId,success: true});
    }, (err) => next(err))
    .catch((err) =>  res.status(400).json({success: false}));
});

module.exports = bookRouter;