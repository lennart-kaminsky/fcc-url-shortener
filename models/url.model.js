const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

const Schema = mongoose.Schema;

const urlSchema = new Schema({
    original_url: { type: String, required: true }
});

urlSchema.plugin(autoIncrement.plugin, 'Url');
const Url = mongoose.model("Url", urlSchema);

async function findOrCreateUrl(urlName) {
    const testUrl = await Url.findOne({ original_url: urlName });
    if (testUrl) {
        return testUrl;
    } else {
        const newUrl = await Url.create({ original_url: urlName });
        return newUrl;
    }  
};

module.exports = {
    Url: Url,
    findOrCreateUrl: findOrCreateUrl
};