

module.exports =  function enviarInfoComida(req, res) {
    if (req.session.loggedin) {
        const maestroCorreo = req.session.correo;
        const tipoComida = req.params.tipo;
        const comidasAlumno = req.body.comidasAlumno;

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

                    // Actualizar el campo de comida correspondiente para cada alumno en la tabla de asistencia
                    const updateComidaQuery =
                        `UPDATE asistencia SET ${tipoComida} = ? WHERE idAlumno = ?`;

                    const updatePromises = [];

                    for (const alumnoId in comidasAlumno) {
                        const comidaSeleccionada = comidasAlumno[alumnoId];

                        const updatePromise = new Promise((resolve, reject) => {
                            conn.query(updateComidaQuery, [comidaSeleccionada, alumnoId, salaAsignada], (err) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve();
                                }
                            });
                        });

                        updatePromises.push(updatePromise);
                    }

                    // Ejecutar todas las consultas de actualización en paralelo
                    Promise.all(updatePromises)
                        .then(() => {
                            // Redireccionar a la página de comidas con un mensaje de éxito
                            res.render('cuidador/index_cuidador', {
                                error: "Comidas actualizadas correctamente",
                                name: req.session.name,
                                correo: req.session.correo,
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                            res.render('cuidador/comidas_cuidador', {
                                error: "Ocurrió un error al actualizar las comidas",
                                name: req.session.name,
                                correo: req.session.correo,
                            });
                        });
                } else {
                    // No se encontró una sala asignada al maestro

                    res.render('cuidador/comidas_cuidador', {
                        error: "No se encontró una sala asignada al maestro",
                        name: req.session.name,
                        correo: req.session.correo,
                    });
                }
            });
        });
    } else {
        res.redirect('/logout');
    }
}