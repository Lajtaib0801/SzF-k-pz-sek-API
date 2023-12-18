const { default: mongoose } = require('mongoose')
const customError = require('../utils/errorResponse')
const Training = require('../models/Training')

exports.getTraining = async (req, res, next) => {
    try {
        const trainings = await Training.findOne(req.query)
        res.status(201).json({ success: true, data: trainings })
    } catch (error) {
        next(error)
    }
}

exports.getTrainings = async (req, res, next) => {
    try {
        let query
        let queryStr = JSON.stringify(req.query)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`)

        query = Training.find(JSON.parse(queryStr))
        const trainings = await query
        res.status(200).json({ success: true, count: trainings.length, data: trainings })
    } catch (error) {
        next(error)
    }
}

exports.createTraining = async (req, res, next) => {
    try {
        const training = await Training.create(req.body)
        res.status(201).json({ success: true, data: training })
    } catch (error) {
        next(customError('Training cannot be created due internal server error!', 400))
    }
}

exports.updateTraining = async (req, res, next) => {
    try {
        const training = await Training.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })
        if (!training) {
            return res.status(400).json({ success: false, msg: 'Not found' })
        }
        res.status(200).json({ success: true, data: training })
    } catch (error) {
        next(customError(`Training cannot be updated with id: ${req.params.id}`, 400))
    }
}

exports.deleteTraining = async (req, res, next) => {
    try {
        const training = await Training.findByIdAndDelete(req.params.id)
        if (!training) {
            return res.status(400).json({ success: false, msg: 'Not found' })
        }
        res.status(200).json({ success: true, data: {} })
    } catch (error) {
        next(customError(`Training cannot be deleted with id: ${req.params.id}`, 400))
    }
}
