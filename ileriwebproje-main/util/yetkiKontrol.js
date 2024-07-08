module.exports = (req, res, next) => {
	if (!req.session.oturum_acildi) {
		return res.redirect('/giris')
	}
	next()
}
