
const moment = require('moment');

module.exports = function enviarInfoAsistencia(req, res) {
    if (req.session.loggedin) {
        const maestroCorreo = req.session.correo;
        const tipo = req.params.tipo;
        const alumnosSeleccionados = req.body.asistenciaAlumno;

        const horaRegistro = moment().format('HH:mm:ss'); // Obtiene la hora actual en el formato HH:mm:ss

        req.getConnection((err, conn) => {
            if (err) {
                console.log(err);
                return;
            }

            if (tipo === 'horaEnt') {
                // Realiza las inserciones en la base de datos para los alumnos seleccionados en horaEnt
                const insertAsistenciaQuery = "INSERT INTO asistencia (idAlumno, fecha, horaEnt) VALUES ?";
                const insertValues = alumnosSeleccionados.map(idAlumno => [idAlumno, moment().format('YYYY-MM-DD'), horaRegistro]);
                conn.query(insertAsistenciaQuery, [insertValues], (err, result) => {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    // Redirige o muestra un mensaje de éxito, según sea necesario
                    res.render('cuidador/index_cuidador', { error: "Asistencia registrada" });
                });
            } else if (tipo === 'horaSal') {
                // Actualiza la hora de salida en la base de datos para los alumnos seleccionados en horaSal
                const updateAsistenciaQuery = "UPDATE asistencia SET horaSal = ? WHERE idAlumno = ? AND fecha = CURDATE()";
                alumnosSeleccionados.forEach(idAlumno => {
                    conn.query(updateAsistenciaQuery, [horaRegistro, idAlumno], (err, result) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                    });
                });

                // Redirige o muestra un mensaje de éxito, según sea necesario
                res.render('cuidador/index_cuidador', { error: "Hora de salida registrada" });
            } else {
                // Tipo de asistencia inválido, mostrar error
                res.render('cuidador/index_cuidador', { error: "Tipo de asistencia inválido" });
            }
        });
    } else {
        res.redirect('/logout');
    }
}