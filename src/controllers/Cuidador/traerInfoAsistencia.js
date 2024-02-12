module.exports = function traerInfoAsistencia(req, res) {
    if (req.session.loggedin) {
        const maestroCorreo = req.session.correo;
        const tipoAsistencia = req.params.tipo;

        req.getConnection((err, conn) => {
            if (err) {
                console.log(err);
                return;
            }

            // Obtener el grupo asignado al maestro
            const getGrupoQuery = "SELECT salaAsignada FROM cuidador WHERE correo = ?";
            conn.query(getGrupoQuery, [maestroCorreo], (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }

                if (result.length > 0) {
                    const grupo = result[0].salaAsignada;

                    let getAlumnosQuery;
                    let params;

                    if (tipoAsistencia === 'horaEnt') {
                        // Obtener la información de los alumnos que no tienen asistencia en horaEnt
                        getAlumnosQuery =
                            "SELECT alumno.idAlumno, alumno.nombre, alumno.apPat, alumno.apMat " +
                            "FROM alumno LEFT JOIN asistencia " +
                            "ON alumno.idAlumno = asistencia.idAlumno " +
                            "AND asistencia.fecha = CURDATE() AND asistencia.horaEnt <> '' " +
                            "WHERE alumno.salaAsignada = ? AND asistencia.horaEnt IS NULL";
                        params = [grupo];
                    } else if (tipoAsistencia === 'horaSal') {
                        // Obtener la información de los alumnos que tienen asistencia en horaEnt
                        getAlumnosQuery =
                            "SELECT alumno.idAlumno, alumno.nombre, alumno.apPat, alumno.apMat " +
                            "FROM alumno INNER JOIN asistencia " +
                            "ON alumno.idAlumno = asistencia.idAlumno " +
                            "AND asistencia.fecha = CURDATE() AND asistencia.horaEnt <> '' " +
                            "WHERE alumno.salaAsignada = ? AND asistencia.horaSal IS NULL";
                        params = [grupo];
                    } else {
                        // Tipo de asistencia inválido, mostrar error
                        res.render('cuidador/asistencia_cuidador', {
                            error: "Tipo de asistencia inválido",
                            name: req.session.name,
                            correo: req.session.correo,
                            alumnos: []
                        });
                        return;
                    }

                    // Ejecutar la consulta para obtener los datos de los alumnos
                    conn.query(getAlumnosQuery, params, (err, result) => {
                        if (err) {
                            console.log(err);
                            return;
                        }

                        // Renderizar la vista y pasar los datos de los alumnos
                        res.render('cuidador/asistencia_cuidador', {
                            name: req.session.name,
                            correo: req.session.correo,
                            alumnos: result
                        });
                    });
                } else {
                    // Renderizar la vista sin datos de alumnos
                    res.render('cuidador/asistencia_cuidador', {
                        error: "No se encontró un grupo asignado al maestro",
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
