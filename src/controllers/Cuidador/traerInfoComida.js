module.exports = 
function traerInfoComida(req, res) {
    if (req.session.loggedin) {
        const maestroCorreo = req.session.correo;
        const tipoComida = req.params.tipo;

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

                    // Verificar si el tipo de comida seleccionado es diferente de '-' en la base de datos
                    const tipoComidaQuery = `SELECT * FROM asistencia WHERE ${tipoComida} <> '-'`;
                    conn.query(tipoComidaQuery, (err, tipoComidaResult) => {
                        if (err) {
                            console.log(err);
                            return;
                        }

                        let getAlumnosQuery = "";

                        // Verificar si el tipo de comida seleccionado tiene un valor diferente de '-' en la base de datos
                        if (tipoComidaResult.length > 0) {
                            // Obtener los datos de los alumnos del grupo que tienen el tipo de comida seleccionado y la fecha actual
                            getAlumnosQuery =
                                `SELECT a.idAlumno, a.nombre, a.apPat, a.apMat
                  FROM asistencia AS ast
                  JOIN alumno AS a ON ast.idAlumno = a.idAlumno
                  WHERE a.salaAsignada = ? 
                  AND ast.horaEnt IS NOT NULL 
                  AND ast.horaSal IS NULL
                  AND ast.fecha = CURDATE()
                  AND ast.${tipoComida} <> '-'`;
                        } else {
                            // Obtener los datos de los alumnos del grupo que tienen horaEnt diferente de '' y horaSal igual a NULL y la fecha actual
                            getAlumnosQuery =
                                `SELECT a.idAlumno, a.nombre, a.apPat, a.apMat
                  FROM asistencia AS ast
                  JOIN alumno AS a ON ast.idAlumno = a.idAlumno
                  WHERE a.salaAsignada = ? 
                  AND ast.horaEnt IS NOT NULL 
                  AND ast.horaSal IS NULL
                  AND ast.fecha = CURDATE()
                  AND (ast.comida1 = '-' OR ast.comida2 = '-' OR ast.comida3 = '-' OR ast.comida1 IS NULL OR ast.comida2 IS NULL OR ast.comida3 IS NULL)`;
                        }

                        conn.query(getAlumnosQuery, [salaAsignada], (err, alumnos) => {
                            if (err) {
                                console.log(err);
                                return;
                            }

                            // Verificar si se obtuvieron alumnos
                            if (alumnos.length > 0) {
                                // Renderizar la vista y pasar los datos de los alumnos
                                res.render('cuidador/comidas_cuidador', {
                                    name: req.session.name,
                                    correo: req.session.correo,
                                    alumnos: alumnos
                                });
                            } else {
                                // No se encontraron alumnos con las condiciones especificadas
                                res.render('cuidador/comidas_cuidador', {
                                    error: "No se encontraron alumnos en el grupo asignado con hora de entrada registrada y hora de salida nula",
                                    name: req.session.name,
                                    correo: req.session.correo,
                                    alumnos: []
                                });
                            }
                        });
                    });
                } else {
                    // No se encontró una sala asignada al maestro
                    res.render('cuidador/comidas_cuidador', {
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