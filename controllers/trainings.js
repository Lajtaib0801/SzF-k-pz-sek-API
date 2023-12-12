const { default: mongoose } = require('mongoose')
const customError = require('../utils/errorResponse')
const Training = require('../models/Training')
// @desc   Get all trainings
// @route  GET /api/trainings
// @access Public
exports.getTrainings = async (req, res, next) => {
    // console.log(req.query)
    try {
        const trainings = await Training.find(req.query)
        res.status(201).json({ success: true, data: trainings })
    } catch (error) {
        // res.status(400).json({ success: false })
        next(error)
    }
} // @desc   Get single training
// @route  GET /api/trainings/:id
// @access Public
// @desc   Get all trainings
// @route  GET /api/trainings
// @access Public
exports.getTrainings = async (req, res, next) => {
    try {
        let query
        let queryStr = JSON.stringify(req.query)
        // Kicseréljük a query-ben lévő lte sztringet $lte-re
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`)

        query = Training.find(JSON.parse(queryStr))
        const trainings = await query
        res.status(200).json({success: true, count: trainings.length, data: trainings})
    } catch (error) {
        next(error)
    }
} // @desc   Create new training
// @route  POST /api/trainings
// @access Private

exports.createTraining = async (req, res, next) => {
    try {
        const training = await Training.create(req.body)
        res.status(201).json({ success: true, data: training })
    } catch (error) {
        // res.status(400).json({ success: false })
        next(customError('Training cannot be created due internal server error!', 400))
    }
}

// @desc   Update training
// @route  PUT /api/trainings/:id
// @access Private
exports.updateTraining = async (req, res, next) => {
    try {
        const training = await Training.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // A frissített adatokat kapjuk vissza
            runValidators: true, // Ellenőrizze a frissített adatokat a modell
        })
        if (!training) {
            return res.status(400).json({ success: false, msg: 'Not found' })
        }
        res.status(200).json({ success: true, data: training })
    } catch (error) {
        // res.status(400).json({ success: false })
        next(customError(`Training cannot be updated with id: ${req.params.id}`, 400))
    }
} // @desc   Delete training
// @route  DELETE /api/trainings/:id
// @access Private
exports.deleteTraining = async (req, res, next) => {
    try {
        const training = await Training.findByIdAndDelete(req.params.id)
        if (!training) {
            return res.status(400).json({ success: false, msg: 'Not found' })
        }
        res.status(200).json({ success: true, data: {} })
    } catch (error) {
        // res.status(400).json({ success: false })
        next(customError(`Training cannot be deleted with id: ${req.params.id}`, 400))
    }
}
