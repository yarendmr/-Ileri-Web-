const Kullanici = require('../models/kullanici')
const bcrypt = require('bcryptjs')

exports.getGiris = (req, res, next) => {
	console.log(req.session)
	res.render('giris', {
		sayfaBasligi: 'Yetkili Giriş Paneli',
		yol: '/giris',
		hataMesaji: req.query.hataMesaji
	})
}

exports.postGiris = (req, res, next) => {
	const eposta = req.body.eposta
	const sifre = req.body.sifre

	Kullanici.findOne({ eposta: eposta })
		.then((kullanici) => {
			if (!kullanici) {
				return res.render('giris', { hataMesaji: 'Geçersiz Eposta adresi!' })
			}

			bcrypt
				.compare(sifre, kullanici.sifre)
				.then((sifreKontrol) => {
					if (sifreKontrol) {
						req.session.oturum_acildi = true
						req.session.kullanici = kullanici

						return req.session.save((bilgi) => {
							res.redirect('/')
						})
					}
					res.render('giris', { hataMesaji: 'Hatalı şifre!' })
				})
				.catch((err) => {
					console.log(err)
					res.render('giris', { hataMesaji: 'Bir hata oluştu. Lütfen tekrar deneyin.' })
				})
		})
		.catch((err) => {
			console.log(err)
			res.render('giris', { hataMesaji: 'Bir hata oluştu. Lütfen tekrar deneyin.' })
		})
}

exports.getCikis = (req, res, next) => {
	req.session.destroy((err) => {
		console.log(err)
		res.redirect('/')
	})
}

exports.getKayit = (req, res, next) => {
	res.render('kayit', {
		sayfaBasligi: 'Yetkili Kayıt Paneli',
		yol: '/kayit',
		hataMesaji: req.query.hataMesaji
	})
}

exports.postKayit = (req, res, next) => {
	const eposta = req.body.eposta
	const sifre = req.body.sifre

	Kullanici.findOne({ eposta: eposta })
		.then((kullaniciBilgi) => {
			if (kullaniciBilgi) {
				return res.render('kayit', {
					hataMesaji: 'Bu eposta adresi zaten kullanılıyor!'
				})
			}

			return bcrypt
				.hash(sifre, 12)
				.then((hashedSifre) => {
					const kullanici = new Kullanici({
						eposta: eposta,
						sifre: hashedSifre
					})
					return kullanici.save()
				})
				.then((sonuc) => {
					res.redirect('/giris')
				})
		})
		.catch((err) => {
			console.log(err)
		})
}
