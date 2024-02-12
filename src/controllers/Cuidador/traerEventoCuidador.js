module.exports = function traerEventoCuidador(req, res) {
    if (req.session.loggedin) {
        const correoCuidador = req.session.correo;

        req.getConnection((err, conn) => {
            if (err) {
                console.log(err);
                res.redirect('/logout');
                return;
            }

            // Realizar consulta para obtener la sala asignada al cuidador
            const getSalasQuery = "SELECT salaAsignada FROM cuidador WHERE correo = ?";
            conn.query(getSalasQuery, [correoCuidador], (error, result) => {
                if (error) {
                    console.error(`Error al obtener la sala asignada del cuidador: ${error}`);
                    res.redirect('/logout');
                    return;
                }

                if (result.length > 0) {
                    const salaCuidador = result[0].salaAsignada;

                    res.render('cuidador/eventos_cuidador', {
                        correoCuidador: correoCuidador,
                        salaCuidador: salaCuidador
                    });
                } else {
                    console.error(`No se encontró una sala asignada al cuidador con correo ${correoCuidador}`);
                    res.redirect('/logout');
                }
            });
        });
    } else {
        res.redirect('/logout');
    }
}