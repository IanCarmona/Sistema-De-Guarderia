


module.exports = function enviarInfoEvacuaciones(req, res) {
    if (req.session.loggedin) {
        const { tipo, idAlumno } = req.params;
        const maestroCorreo = req.session.correo;

        req.getConnection((err, conn) => {
            if (err) {
                console.log(err);
                return;
            }

            // Realizar la lógica necesaria para actualizar el valor correspondiente en la base de datos
            let campoActualizar = '';
            if (tipo === 'pipi') {
                campoActualizar = 'evacuacionesPipi';
            } else if (tipo === 'popo') {
                campoActualizar = 'evacuacionesPopo';
            } else {
                res.render('cuidador/index_cuidador', {
                    error: 'Tipo de evacuación inválido',
                    name: req.session.name,
                    correo: req.session.correo
                });
                return;
            }

            // Ejemplo de consulta para actualizar el valor correspondiente
            const updateQuery = `UPDATE asistencia SET ${campoActualizar} = ${campoActualizar} + 1 WHERE idAlumno = ?`;
            const values = [idAlumno];

            // Ejecutar la consulta
            conn.query(updateQuery, values, (err, result) => {
                if (err) {
                    console.log(`Error al actualizar el valor de "${campoActualizar}" en la base de datos: ${err}`);
                    res.render('cuidador/index_cuidador', {
                        error: `Error al actualizar el valor de "${campoActualizar}" en la base de datos`,
                        name: req.session.name,
                        correo: req.session.correo
                    });
                } else {
                    console.log(`Valor de "${campoActualizar}" actualizado para el alumno con ID ${idAlumno}`);
                    res.render('cuidador/index_cuidador', {
                        error: `Se ha actualizado el registro de ${campoActualizar}`,
                        name: req.session.name,
                        correo: req.session.correo
                    });
                }
            });
        });
    } else {
        res.redirect('/logout');
    }
}