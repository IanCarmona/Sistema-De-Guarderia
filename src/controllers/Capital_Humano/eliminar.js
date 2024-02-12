module.exports = function eliminar(req, res) {
    if (req.session.loggedin === true) {
        const correo = req.params.correo;
        const tipo = req.session.tipo; // Obtener el tipo de usuario de la sesión
        let deleteQuery = '';
        if (tipo === 'nutriologo') {
            deleteQuery = 'DELETE FROM nutriologo WHERE correo = ?';
        }
        else if (tipo === 'servicioMedico') {
            deleteQuery = 'DELETE FROM servicioMedico WHERE correo = ?';

        }
        else if (tipo === 'cuidador') {
            deleteQuery = 'DELETE FROM cuidador WHERE correo = ?';

        }
        else {
            deleteQuery = 'DELETE FROM empleado WHERE correo = ?';
        }
        req.getConnection((err, conn) => {
            if (err) {
                console.log(err);
            }
            else {
                conn.beginTransaction((err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    conn.query(deleteQuery, [correo], (err) => {
                        if (err) {
                            conn.rollback(() => {
                                console.log(err);
                            });
                            return;
                        }
                        conn.commit((err) => {
                            if (err) {
                                conn.rollback(() => {
                                    console.log(err);
                                });
                            }
                            res.redirect('/');
                        });
                    });
                });
            }
        });
    } else {
        res.redirect('/logout');
    }
}
