const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const authenticate = require('../authenticate')

const leaderRouter = express.Router()

const Leader = require('../models/leaders')

leaderRouter.use(bodyParser.json())

leaderRouter.route('/')
    .get((req, res, next) => {
        Leader.find({})
            .then((leader) => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(leader)
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Leader.create(req.body)
            .then((leader) => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(leader)
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403
        res.end('PUT operation not supported on /leaders')
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Leader.remove({})
            .then((leader) => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(leader)
            }, (err) => next(err))
            .catch((err) => next(err))
    });

leaderRouter.route('/:id')
    .get((req, res, next) => {
        Leader.findById(req.params.id)
            .then((leader) => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(leader)
            }, (err) => next(err))
            .catch((err) => next(err))
    })

    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403
        res.end(`POST operation not supported on /leaders/${req.params.id}`)
    })

    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Leader.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
            .then((leader) => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(leader)
            }, (err) => next(err))
            .catch((err) => next(err))
    })

    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Leader.findByIdAndRemove(req.params.id)
            .then((leader) => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(leader)
            }, (err) => next(err))
            .catch((err) => next(err))
    })

module.exports = leaderRouter