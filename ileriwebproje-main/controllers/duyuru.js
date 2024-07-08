const Duyuru = require('../models/duyuru')

exports.getDuyurular = (req, res, next) => {
	Duyuru.find()
		.sort({tarih: -1}) // en yeni en önce
		.then((duyurular) => {
			// Tarihleri Türkçe diline çevir
			const duyurularTarihli = duyurular.map((duyuru) => {
				return {
					...duyuru._doc,
					tarih: duyuru.tarih.toLocaleDateString('tr-TR'),
					sonTarih: duyuru.sonTarih.toLocaleDateString('tr-TR')
				}
			})
			res.render('index', {
				sayfaBasligi: 'Duyuru Listesi',
				duyurular: duyurularTarihli,
				yol: '/'
			})
		})
		.catch((err) => {
			console.log(err)
		})
}

exports.getDuyuru = (req, res, next) => {
	const duyuruId = req.params.duyuruId
	Duyuru.findById(duyuruId)
		.then((duyuru) => {
			// Tarihleri Türkçe diline çevir
			const duyuruTarihli = {
				...duyuru._doc,
				tarih: duyuru.tarih.toLocaleDateString('tr-TR'),
				sonTarih: duyuru.sonTarih.toLocaleDateString('tr-TR')
			}
			res.render('duyuru-detay', {
				sayfaBasligi: 'Duyuru',
				duyuru: duyuruTarihli,
				yol: '/'
			})
		})
		.catch((err) => {
			console.log(err)
			res.redirect('/') // Hata durumunda anasayfaya yönlendir
		})
}

exports.getDuyuruEkle = (req, res, next) => {
	res.render('duyuru-ekle', {
		sayfaBasligi: 'Duyuru Ekle',
		baslikGoster: 2,
		yol: '/duyuru-ekle'
	})
}

exports.postDuyuruEkle = (req, res, next) => {
	const duyuru_adi = req.body.duyuru_adi
	const aciklama = req.body.aciklama
	const tarih = req.body.tarih
	const sonTarih = req.body.sonTarih

	const duyuru = new Duyuru({
		duyuru_adi: duyuru_adi,
		aciklama: aciklama,
		tarih: tarih,
		sonTarih: sonTarih
	})
	duyuru
		.save()
		.then((result) => {
			console.log(result)
			res.redirect('/')
		})
		.catch((err) => {
			console.log(err)
		})
}

exports.postSilId = (req, res, next) => {
	const duyuruId = req.body.duyuruId
	console.log('Duyuru ID:', duyuruId) // Duyuru ID'sini kontrol etmek için
	Duyuru.findByIdAndDelete(duyuruId)
		.then((result) => {
			if (!result) {
				console.log('Duyuru bulunamadı')
				return res.redirect('/') // Silinmek istenen duyuru bulunamadıysa anasayfaya yönlendir
			}
			console.log('Duyuru Silindi')
			res.redirect('/')
		})
		.catch((err) => {
			console.log('Silme Hatası:', err)
			res.redirect('/')
		})
}

exports.getDuyuruGuncelle = (req, res, next) => {
	const duyuruId = req.params.duyuruId
	Duyuru.findById(duyuruId)
		.then((duyuru) => {
			// Tarihleri Türkçe diline çevir
			const duyuruTarihli = {
				...duyuru._doc,
				tarih: duyuru.tarih.toLocaleDateString('tr-TR'),
				sonTarih: duyuru.sonTarih.toLocaleDateString('tr-TR')
			}
			res.render('duyuru-guncelle', {
				sayfaBasligi: 'Duyuru Güncelle',
				duyuru: duyuruTarihli,
				yol: '/'
			})
		})
		.catch((err) => {
			console.log(err)
			res.redirect('/') // Hata durumunda anasayfaya yönlendir
		})
}

exports.postDuyuruGuncelle = (req, res, next) => {
	const duyuruId = req.params.duyuruId
	const duyuru_adi = req.body.duyuru_adi
	const aciklama = req.body.aciklama
	const tarih = req.body.tarih
	const sonTarih = req.body.sonTarih

	Duyuru.findById(duyuruId)
		.then((duyuru) => {
			duyuru.duyuru_adi = duyuru_adi
			duyuru.aciklama = aciklama
			duyuru.tarih = tarih
			duyuru.sonTarih = sonTarih
			return duyuru.save()
		})
		.then((result) => {
			console.log(result)
			res.redirect('/')
		})
		.catch((err) => {
			console.log(err)
		})
}
