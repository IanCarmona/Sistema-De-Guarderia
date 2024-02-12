module.exports = function obtenerDatosSala(req, res) {
    if (req.session.loggedin) {
        // Obtén el valor seleccionado de la sala del formulario
        const idSala = req.body.idSala;

        req.getConnection((err, conn) => {
            if (err) {
                console.log(err);
                return;
            }

            const query1 = "SELECT * FROM sala WHERE idSala = ?";
            const query2 = "SELECT idAlumno, nombre, edad FROM alumno WHERE salaAsignada = 'NA'";
            const query3 = "SELECT e.nombre, e.apPat, e.correo FROM empleado e LEFT JOIN cuidador c ON e.correo = c.correo WHERE (c.salaAsignada = 'NA' OR c.salaAsignada IS NULL) AND e.tipo = 'cuidador' AND e.correo IS NOT NULL";



            // Realiza la primera consulta para obtener los datos de la sala seleccionada
            conn.query(query1, [idSala], (err, results1) => {
                if (err) {
                    console.log(err);
                    return;
                }


                if (results1.length <= 0) {
                    res.render("pedagogo/index_pedagogo", {
                        error: "Error: No existen registros en la tabla sala",
                    });
                } else {
                    // Realiza la segunda consulta para obtener los estudiantes sin sala asignada
                    conn.query(query2, (err, results2) => {

                        if (err) {
                            console.log(err);
                            return;
                        }

                        // Realiza la tercera consulta para obtener los profesores sin sala asignada
                        conn.query(query3, (err, results3) => {

                            if (err) {
                                console.log(err);
                                return;
                            }

                            res.render("pedagogo/ingresar_personas2", {
                                name: req.session.name,
                                salaData: results1,
                                estudiantesData: results2,
                                profesoresData: results3,
                            });
                        });
                    });
                }
            });
        });

    } else {
        res.redirect("/logout");
    }
}