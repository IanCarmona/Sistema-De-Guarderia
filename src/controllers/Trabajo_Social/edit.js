module.exports = function edit(req, res) {
    if (req.session.loggedin === true) {
        const idAlumno = req.params.idAlumno;
        const newAlumnoData = req.body;
        

        req.getConnection((err, conn) => {
            if (err) {
                console.log(err);
            } else {
                // Actualizar los datos del alumno
                const alumnoQuery = "UPDATE alumno SET talla = ?, alergias = ?, enfermedades = ?, peso = ?, edad = ?, familiograma = ?, estudioSocioeconomico = ?  WHERE idAlumno = ?";
                const alumnoParams = [newAlumnoData.talla, newAlumnoData.alergias, newAlumnoData.enfermedades, newAlumnoData.peso, newAlumnoData.edad, newAlumnoData.familiograma, newAlumnoData.estudioSocioeconomico, idAlumno];
                conn.query(alumnoQuery, alumnoParams, (err, alumnoResult) => {
                    if (err) {
                        console.log(err);
                    }

                    // Actualizar los datos del tutor
                    const tutorQuery = "UPDATE tutor SET nombre = ?, apPat = ?, apMat = ?, domicilio = ?, rfc = ?, tel1 = ?, tel2 = ?, tel3 = ?, correo = ? WHERE idAlumno = ?";
                    const tutorParams = [newAlumnoData.tutorNombre, newAlumnoData.tutorApPat, newAlumnoData.tutorApMat, newAlumnoData.tutorDomicilio, newAlumnoData.tutorRFC, newAlumnoData.tutorTel1, newAlumnoData.tutorTel2, newAlumnoData.tutorTel3, newAlumnoData.tutorCorreo, idAlumno];



                    conn.query(tutorQuery, tutorParams, (err, tutorResult) => {
                        if (err) {
                            console.log(err);
                        }

                        res.render("trabajo_social/index_trabajo_social", {error: "Alumno editado con exito"});
                    });
                });
            }
        });
    } else {
        res.redirect("/logout");
    }
}