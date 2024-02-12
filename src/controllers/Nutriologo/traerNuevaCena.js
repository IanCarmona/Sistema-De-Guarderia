module.exports = function traerNuevaCena(req, res) {
    if (req.session.loggedin = true) {
        res.render('nutriologo/traer_nueva_cena', { name: req.session.name, correo: req.session.correo });
    } else {
        res.redirect('/logout');
    }
}