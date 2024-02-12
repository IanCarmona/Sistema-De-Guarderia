module.exports = function pantalla_nuevo_empleado(req, res) {
    if (req.session.loggedin = true) {
        res.render('capital_humano/nuevo_empleado', { name: req.session.name });
    } else {
        res.redirect('/logout');
    }
}