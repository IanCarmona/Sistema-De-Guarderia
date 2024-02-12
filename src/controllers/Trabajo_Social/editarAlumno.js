module.exports = function editarAlumno(req, res) {
    req.getConnection((err, conn) => {
        if (err) {
            console.log(err);
            return;
        }

        const query = "SELECT idAlumno, nombre, apPat, apMat FROM alumno";

        conn.query(query, (err, userdata) => {
            if (err) {
                console.log(err);
                return;
            }
            if (userdata.length <= 0) {
                res.render("trabajo_social/editar_alumnos", {
                    error: "Error: No existen registros",
                });
            } else {
                res.render("trabajo_social/editar_alumnos", {
                    name: req.session.name,
                    userdata: userdata,
                });
            }
        });
    });
}