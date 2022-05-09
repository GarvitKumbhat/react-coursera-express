const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const authenticate = require('../authenticate')

const promoRouter = express.Router()

const Promo = require('../models/promotions')

promoRouter.use(bodyParser.json())

promoRouter.route('/')
    .get((req, res, next) => {
        Promo.find({})
            .then((promos) => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(promos)
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Promo.create(req.body)
            .then((promo) => {
                console.log('Promo Created', promo)
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(promo)
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403
        res.end('PUT operation not supported on /promotions')
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Promo.remove({})
            .then((resp) => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'applcation/json')
                res.send(resp)
            }, (err) => next(err))
            .catch((err) => next(err))
    });

promoRouter.route('/:id')
    .get((req, res, next) => {
        Promo.findById(req.params.id)
            .then((promo) => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.send(promo)
            }, (err) => next(err))
            .catch((err) => next(err))
    })

    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403
        res.end(`POST operation not supported on /promotions/${req.params.id}`)
    })

    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Promo.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
            .then((promo) => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(promo)
            }, (err) => next(err))
            .catch((err) => next(err))
    })

    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Promo.findByIdAndRemove(req.params.id)
            .then((promo) => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.send(promo)
            }, (err) => next(err))
            .catch((err) => next(err))
    })

module.exports = promoRouter