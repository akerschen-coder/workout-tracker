const { Workout } = require("../models");
const router = require("express").Router();

// get workouts
router.get("/api/workouts", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: '$exercises.duration',
                },
            },
        },
    ]).then((data) => {
        res.json(data);
    });
});

// add excersize    
router.put('/api/workouts/:id', (req, res) => {
    Workout.findByIdAndUpdate(
        req.params.id,
        {
            $push:
                { exercises: req.body, }
        },
        { new: true }
    )
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});
// create workout
router.post('/api/workouts', (req, res) => {
    Workout.create({})
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.status(400).json(err);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});
// get workouts range 
router.get('/api/workouts/range', (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: '$exercises.duration' }
            },
        },
    ]).sort({ _id: -1 })
        .limit(7)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});



// cry myself to sleep 
module.exports = router;