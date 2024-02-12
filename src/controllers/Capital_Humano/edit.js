module.exports = function edit(req, res) {

    if (req.session.loggedin = true) {
        const correo = req.params.correo;
        const newCustomer = req.body;
        
        req.getConnection((err, conn) => {
            if (err) {
                console.log(err);
            }
            else {
                conn.query('UPDATE EMPLEADO SET ? WHERE CORREO = ?', [newCustomer, correo], (err, customer) => {
                    res.render('capital_humano/index_capital_humano', {error:"Usuario Actualizado con exito"});
                });
            }
        });
    } else {
        res.redirect('/logout');
    }
}
