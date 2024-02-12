module.exports = function asignarSala(req, res) {
    if (req.session.loggedin) {
        // Obtén los valores seleccionados del formulario
        const alumnosSeleccionados = req.body.alumnosSeleccionados;
        const cuidadoresSeleccionados = req.body.cuidadoresSeleccionados;
        const idSala = req.body.idSala;

        req.getConnection((err, conn) => {
            if (err) {
                console.log(err);
                return;
            }

            // Actualiza la sala asignada de los alumnos seleccionados
            if (alumnosSeleccionados && alumnosSeleccionados.length > 0) {
                const updateAlumnosQuery = "UPDATE alumno SET salaAsignada = ? WHERE idAlumno IN (?)";
                conn.query(updateAlumnosQuery, [idSala, alumnosSeleccionados], (err, result) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log(`Se asignó la sala ${idSala} a los alumnos seleccionados`);

                    // Actualiza el cupo de la sala
                    const cupoAlumnos = alumnosSeleccionados.length;
                    const updateCupoQuery = "UPDATE sala SET cupo = cupo - ? WHERE idSala = ?";
                    conn.query(updateCupoQuery, [cupoAlumnos, idSala], (err, result) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        console.log(`Se actualizó el cupo de la sala ${idSala}`);
                    });
                });
            }

            // Actualiza la sala asignada de los cuidadores seleccionados
            if (cuidadoresSeleccionados && cuidadoresSeleccionados.length > 0) {
                const updateCuidadoresQuery = "UPDATE cuidador SET salaAsignada = ? WHERE correo IN (?)";
                conn.query(updateCuidadoresQuery, [idSala, cuidadoresSeleccionados], (err, result) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log(`Se asignó la sala ${idSala} a los cuidadores seleccionados`);
                });
            }

            res.render("pedagogo/index_pedagogo", {error: "Registro exitoso"}); // Redirecciona a la página de destino después de realizar las asignaciones
        });

    } else {
        res.redirect("/logout");
    }
}

