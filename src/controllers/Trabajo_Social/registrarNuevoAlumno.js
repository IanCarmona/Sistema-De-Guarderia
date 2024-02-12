module.exports = function registrarNuevoAlumno(req, res) {
    const data = req.body;
    

    req.getConnection((err, conn) => {
        if (err) {
            console.log(err);
            return;
        }
        conn.query(
            "SELECT * FROM alumno WHERE idAlumno = ? OR curp = ?",
            [data.idAlumno, data.curp],
            (err, userdata) => {
                if (err) {
                    console.log(err);
                    return;
                }
                const userExists = userdata.length > 0;
                if (userExists) {
                    res.render("trabajo_social/index_trabajo_social", {
                        error: "Error: User already exists!",
                    });
                } else {
                    conn.query(
                        "INSERT INTO alumno (idAlumno, nombre, apPat, apMat, curp, tipoParto, alergias, enfermedades, talla, peso, sexo, edad, familiograma, tipoSangre, estudioSocioeconomico) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                        [
                            data.idAlumno,
                            data.nombre,
                            data.apPat,
                            data.apMat,
                            data.curp,
                            data.tipoParto,
                            data.alergias,
                            data.enfermedades,
                            data.talla,
                            data.peso,
                            data.sexo,
                            data.edad,
                            data.familiograma,
                            data.tipoSangre,
                            data.estudioSocioeconomico,
                        ],
                        (err, rows) => {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            res.render("trabajo_social/index_trabajo_social", {error: "Alumno creado con exito"});
                        }
                    );
                }
            }
        );
    });
}