const mongoose = require('mongoose')

const Schema = mongoose.Schema

const duyuruSchema = new Schema({
	duyuru_adi: {
		type: String,
		required: true
	},
	aciklama: {
		type: String,
		required: true
	},
	tarih: {
		type: Date,
		default: Date.now
	},
	sonTarih: {
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model('Duyuru', duyuruSchema)
