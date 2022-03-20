const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const Course = require('./Course');


const scoreSchema = new Schema({
    holeNumber: {
        type: Number,
        required: true
    },
    stroke: {
        type: Number,
        required: true
    }
});

const roundSchema = new Schema(
    {
        createAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        username: {
            type: String,
            required: true
        },
        scores: [scoreSchema],
        course: [
            {
            type: Schema.Types.ObjectId,
            ref: Course
        }]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

roundSchema.virtual('totalScore').get(function() {
    let strokeValues = this.scores.map(score => {
        return score.stroke;
    });
    let totalScore = strokeValues.reduce((acc, value) => acc + value, 0);
    return totalScore;
});

const Round = model('Round', roundSchema);

module.exports = Round;