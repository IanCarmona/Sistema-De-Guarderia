module.exports = function eliminar(req, res) {
    if (req.session.loggedin === true) {
        const idAlumno = req.params.idAlumno;
        req.getConnection((err, conn) => {
            if (err) {
                console.log(err);
            } else {
                conn.beginTransaction((err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    // Eliminar al tutor
                    const deleteTutorQuery = "DELETE FROM tutor WHERE idAlumno = ?";
                    conn.query(deleteTutorQuery, [idAlumno], (err) => {
                        if (err) {
                            conn.rollback(() => {
                                console.log(err);
                            });
                            return;
                        }

                        // Eliminar al alumno
                        const deleteAlumnoQuery = "DELETE FROM alumno WHERE idAlumno = ?";
                        conn.query(deleteAlumnoQuery, [idAlumno], (err) => {
                            if (err) {
                                conn.rollback(() => {
                                    console.log(err);
                                });
                                return;
                            }

                            conn.commit((err) => {
                                if (err) {
                                    conn.rollback(() => {
                                        console.log(err);
                                    });
                                }
                                res.redirect("/");
                            });
                        });
                    });
                });
            }
        });
    } else {
        res.redirect("/logout");
    }
}
