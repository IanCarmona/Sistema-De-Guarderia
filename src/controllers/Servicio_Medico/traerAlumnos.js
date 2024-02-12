module.exports = function traerAlumnos(req, res) {
    const idSala = req.body.idSala; // Obtener el valor de idSala del formulario

    req.getConnection((err, conn) => {
        if (err) {
            console.log(err);
            res.redirect('/logout');
            return;
        }

        const consulta = "SELECT idAlumno, nombre, apPat, apMat FROM alumno WHERE salaAsignada = ?";
        conn.query(consulta, [idSala], (error, result) => {
            if (error) {
                console.error(`Error al obtener los estudiantes de la sala ${idSala}: ${error}`);
                res.redirect('/logout');
                return;
            }

            res.render('servicio_medico/ver_alumnos_servicio_medico', {
                estudiantes: result, // Pasar los estudiantes obtenidos a la vista
                idSala: idSala // Pasar el valor de idSala a la vista
            });
        });
    });
}