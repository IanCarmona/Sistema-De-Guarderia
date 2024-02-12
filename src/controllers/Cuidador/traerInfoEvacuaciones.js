module.exports = 
function traerInfoEvacuaciones(req, res) {
    if (req.session.loggedin) {
        const maestroCorreo = req.session.correo;

        req.getConnection((err, conn) => {
            if (err) {
                console.log(err);
                return;
            }

            // Obtener la sala asignada al maestro
            const getSalasQuery = "SELECT salaAsignada FROM cuidador WHERE correo = ?";
            conn.query(getSalasQuery, [maestroCorreo], (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }

                if (result.length > 0) {
                    const salaAsignada = result[0].salaAsignada;

                    // Obtener los datos de los alumnos del grupo que tienen horaEnt diferente de '' y horaSal igual a NULL
                    const getAlumnosQuery =
                        "SELECT a.idAlumno, a.nombre, a.apPat, a.apMat " +
                        "FROM asistencia AS ast " +
                        "JOIN alumno AS a ON ast.idAlumno = a.idAlumno " +
                        "WHERE a.salaAsignada = ? AND ast.horaEnt IS NOT NULL AND ast.horaSal IS NULL";


                    conn.query(getAlumnosQuery, [salaAsignada], (err, alumnos) => {
                        if (err) {
                            console.log(err);
                            return;
                        }

                        // Verificar si se obtuvieron alumnos
                        if (alumnos.length > 0) {
                            // Renderizar la vista y pasar los datos de los alumnos
                            res.render('cuidador/evacuaciones_cuidador', {
                                name: req.session.name,
                                correo: req.session.correo,
                                alumnos: alumnos
                            });
                        } else {
                            // No se encontraron alumnos con horaEnt no nula y horaSal igual a NULL
                            res.render('cuidador/evacuaciones_cuidador', {
                                error: "No se encontraron alumnos en el grupo asignado con hora de entrada registrada y hora de salida nula",
                                name: req.session.name,
                                correo: req.session.correo,
                                alumnos: []
                            });
                        }
                    });
                } else {
                    // No se encontró una sala asignada al maestro
                    res.render('cuidador/evacuaciones_cuidador', {
                        error: "No se encontró una sala asignada al maestro",
                        name: req.session.name,
                        correo: req.session.correo,
                        alumnos: []
                    });
                }
            });
        });
    } else {
        res.redirect('/logout');
    }
}