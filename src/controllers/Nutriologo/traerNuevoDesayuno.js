module.exports = function traerNuevoDesayuno(req, res) {
    if (req.session.loggedin = true) {
        res.render('nutriologo/traer_nuevo_desayuno', { name: req.session.name, correo: req.session.correo });
    } else {
        res.redirect('/logout');
    }

}