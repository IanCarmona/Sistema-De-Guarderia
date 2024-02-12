module.exports = function traerNuevaComida(req, res) {
    if (req.session.loggedin = true) {
        res.render('nutriologo/traer_nueva_comida', { name: req.session.name, correo: req.session.correo });
    } else {
        res.redirect('/logout');
    }
}