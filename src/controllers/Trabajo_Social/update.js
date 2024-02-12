module.exports = function update(req, res) {
    if ((req.session.loggedin = true)) {
        const idAlumno = req.params.idAlumno;
        req.getConnection((err, conn) => {
            if (err) {
                console.log(err);
            } else {
                const query = `
                SELECT a.*, t.nombre AS tutorNombre, t.apPat AS tutorApPat, t.apMat AS tutorApMat, t.rfc AS tutorRFC, t.domicilio AS tutorDomicilio, t.tel1 AS tutorTel1, t.tel2 AS tutorTel2, t.tel3 AS tutorTel3, t.correo AS tutorCorreo
                FROM ALUMNO a
                INNER JOIN TUTOR t ON a.idAlumno = t.idAlumno
                WHERE a.idAlumno = ?
            `;


                conn.query(query, [idAlumno], (err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.render("trabajo_social/editar", {
                            name: req.session.name,
                            data: data[0],
                        });
                    }
                });
            }
        });
    } else {
        res.redirect("/logout");
    }
}