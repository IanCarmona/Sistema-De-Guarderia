module.exports = function crearNuevoGrupo(req, res) {
    if (req.session.loggedin) {

        // Obtener los datos del formulario enviado
        const { idSala, titular, cupo, horaInicio, horaFin } = req.body;

        req.getConnection((err, conn) => {
            if (err) {
                console.log(err);
                return;
            }

            const insertQuery = "INSERT INTO sala (idSala, titular, cupo, horaInicio, horaFin) VALUES (?, ?, ?, ?, ?)";
            const updateQuery = "UPDATE cuidador SET salaAsignada = ? WHERE correo = ?";

            conn.beginTransaction((err) => {
                if (err) {
                    console.log(err);
                    return;
                }

                conn.query(insertQuery, [idSala, titular, cupo, horaInicio, horaFin], (err, result) => {
                    if (err) {
                        conn.rollback(() => {
                            console.log(err);
                            return;
                        });
                    }

                    conn.query(updateQuery, [idSala, titular], (err, result) => {
                        if (err) {
                            conn.rollback(() => {
                                console.log(err);
                                return;
                            });
                        }

                        conn.commit((err) => {
                            if (err) {
                                conn.rollback(() => {
                                    console.log(err);
                                    return;
                                });
                            }

                            res.redirect("/");
                        });
                    });
                });
            });
        });
    } else {
        res.redirect("/logout");
    }
}