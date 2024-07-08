exports.getHata404=(req,res,next) => {
    res.render('sayfa404', {
        sayfaBasligi:'Sayfa Bulunamadı',
        yol:'unknown'});
}