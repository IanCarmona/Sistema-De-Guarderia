module.exports = function verIncidencias(req, res) {
    // Obtener el valor de correo de req.session
    const correo = req.session.correo;

    req.getConnection((err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Error al conectar a la base de datos' });
            return;
        }

        // Consulta SQL para obtener el idAlumno utilizando el correo del padre
        const queryIdAlumno = 'SELECT idAlumno FROM tutor WHERE correo = ?';

        // Ejecutar la consulta con el valor del correo como parámetro
        conn.query(queryIdAlumno, correo, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: 'Error al obtener el idAlumno' });
                return;
            }

            // Verificar si se encontró un registro
            if (result.length > 0) {
                const idAlumno = result[0].idAlumno;

                // Obtener la fecha actual
                const fechaActual = new Date().toISOString().split('T')[0];

                // Consulta SQL para obtener las incidencias médicas del día actual para el paciente
                const queryIncidencias = 'SELECT fecha, doctor, numReg, sintomas, diagnostico, tratamiento FROM atencionMedica WHERE paciente = ? AND fecha = ?';

                // Ejecutar la consulta con el valor de idAlumno y fechaActual como parámetros
                conn.query(queryIncidencias, [idAlumno, fechaActual], (err, incidencias) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ error: 'Error al obtener las incidencias médicas' });
                        return;
                    }

                    // Renderizar la plantilla con los datos de las incidencias obtenidas
                    res.render('tutor/ver_incidencias_tutor', { incidencias });
                });
            } else {
                res.status(404).json({ error: 'No se encontró el idAlumno' });
            }
        });
    });
}
