module.exports = function update(req, res) {
    if (req.session.loggedin = true) {
        const correo = req.params.correo;
        req.getConnection((err, conn) => {
            if (err) {
                console.log(err);
            }
            else {
                conn.query('SELECT * FROM EMPLEADO WHERE CORREO = ?', [correo], (err, customer) => {
                    res.render('capital_humano/editar', { name: req.session.name, data: customer[0] });
                });
            }
        });
    } else {
        res.redirect('/logout');
    }
}
