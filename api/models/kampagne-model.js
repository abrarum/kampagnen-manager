const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Kampagne = new Schema(
    {
        kampagnenname: String,
        kunde: String,
        status: String,
        start: { type: Date, default: Date.now() },
        end: { type: Date, default: Date.now() },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Kampagne', Kampagne);
