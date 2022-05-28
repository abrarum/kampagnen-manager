const Kampagne = require('../models/kampagne-model');
const mongoose = require('mongoose');

let createKampagne = (req, res) => {
    const body = req.body;
    console.log('body', body);
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a new entry',
        });
    }

    const kampagne = new Kampagne(body);
    console.log('kampagne body', kampagne);

    if (!kampagne) {
        return res.status(400).json({ success: false, error: 'err' });
    }
    kampagne
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: kampagne._id,
                message: 'New entry created!',
            });
        })
        .catch((error) => {
            return res.status(400).json({
                error,
                message: 'Entry not created!',
            });
        });
};

let getKampagne = async (req, res) => {
    await Kampagne.find({}, (err, kampagne) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!kampagne.length) {
            return res
                .status(404)
                .json({ success: false, error: `Entry not found` });
        }
        return res.status(200).json({ success: true, data: kampagne });
    }).catch((err) => console.log(err));
};

let reset = async (req, res) => {
    try {
        mongoose.connection.db.dropDatabase().then((success) => {
            res.status(400).json({ success: true, error: success });
        })
    } catch (err) {
        console.log("error: ", err)
    }
}

module.exports = {
    createKampagne,
    getKampagne,
    reset
};
