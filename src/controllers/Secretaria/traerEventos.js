module.exports = function traerEventos(req, res) {


    if (req.session.loggedin = true) {

        const correo = req.session.correo;
        console.log(correo);

        req.getConnection((err, conn) => {
            if (err) {
                console.log(err);
                return;
            }

            // Consultar los idSalas de las salas existentes
            const query = 'SELECT idSala FROM sala';

            conn.query(query, (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }

                // Obtener solo los idSalas del resultado de la consulta
                const idSalas = result.map((row) => row.idSala);


                // Renderizar la vista y pasar los idSalas y el correo
                res.render('secretaria/eventos_secretaria', {
                    correo: correo,
                    idSalas: idSalas,
                });
            });
        });

    } else {
        res.redirect('/logout');
    }

}

