

module.exports = function enviarInfoEventos(req, res) {
    if (req.session.loggedin) {
        const { nombre, fecha, descripcion, responsable, salaAsignada } = req.body;

        req.getConnection((err, conn) => {
            if (err) {
                console.log(err);
                res.render('cuidador/eventos_cuidador', {
                    error: 'Error al conectar a la base de datos',
                    correoCuidador: req.session.correo,
                    salaCuidador: req.body.salaAsignada
                });
                return;
            }

            const insertQuery = "INSERT INTO eventos (fecha, nombreEv, salaAsignada, descripcion, responsable) VALUES (?, ?, ?, ?, ?)";
            const values = [fecha, nombre, salaAsignada, descripcion, responsable];

            conn.query(insertQuery, values, (error, result) => {
                if (error) {
                    console.error(`Error al registrar el evento en la base de datos: ${error}`);
                    res.render('cuidador/eventos_cuidador', {
                        error: 'Error al registrar el evento en la base de datos',
                        correoCuidador: req.session.correo,
                        salaCuidador: req.body.salaAsignada
                    });
                } else {
                    console.log('Evento registrado con éxito');
                    res.render('cuidador/index_cuidador', {
                        error: 'Evento registrado con éxito',
                        correoCuidador: req.session.correo,
                        salaCuidador: req.body.salaAsignada
                    });
                }
            });
        });
    } else {
        res.redirect('/logout');
    }
}
