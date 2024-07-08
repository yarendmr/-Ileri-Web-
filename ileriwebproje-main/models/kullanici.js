const mongoose = require('mongoose');

const Schema=mongoose.Schema;

const kullaniciSchema = new Schema({
eposta: {
    type: String,
    required: true,
},
sifre: {
    type: String,
    required: true,
}
});

module.exports=mongoose.model('Kullanici', kullaniciSchema);