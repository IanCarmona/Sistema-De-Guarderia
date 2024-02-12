

module.exports = function traerDatosAlumnos(req, res) {
    const idAlumno = req.params.idAlumno;
    const correoDoctor = req.session.correo;

    req.getConnection((err, conn) => {
        if (err) {
            console.log(err);
            res.redirect('/logout');
            return;
        }

        const getAlumnoQuery = "SELECT tipoParto, alergias, enfermedades, talla, peso, tipoSangre FROM alumno WHERE idAlumno = ?";
        conn.query(getAlumnoQuery, [idAlumno], (error, alumnoResult) => {
            if (error) {
                console.error(`Error al obtener los datos del alumno: ${error}`);
                res.redirect('/logout');
                return;
            }

            // Aquí puedes acceder a los datos del alumno desde alumnoResult y el correo del doctor desde correoDoctor
            const alumnoData = alumnoResult[0];

            // Generar un número de registro único
            const numReg = generarNumeroRegistroUnico();
            const today = new Date().toISOString().split("T")[0];

            res.render('servicio_medico/ver_datos_alumnos_servicio_medico', {
                idAlumno: idAlumno,
                tipoParto: alumnoData.tipoParto,
                alergias: alumnoData.alergias,
                enfermedades: alumnoData.enfermedades,
                talla: alumnoData.talla,
                peso: alumnoData.peso,
                tipoSangre: alumnoData.tipoSangre,
                numReg: numReg,
                correoDoctor: correoDoctor,
                fecha: today
            });
        });
    });
}

function generarNumeroRegistroUnico() {
    // Aquí puedes generar un número de registro único como desees
    // Puedes usar una función, una librería o cualquier método que te garantice la unicidad del número
    // Por ejemplo, puedes generar un número aleatorio o basarlo en alguna secuencia
    // En este ejemplo, se generará un número aleatorio entre 1 y 100000
    return Math.floor(Math.random() * 100000) + 1;
}