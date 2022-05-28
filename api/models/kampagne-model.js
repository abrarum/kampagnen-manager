const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Kampagne = new Schema(
    {
        kampagnenname: String,
        kunde: String,
        status: String,
        start: String,
        end: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model('Kampagne', Kampagne);
