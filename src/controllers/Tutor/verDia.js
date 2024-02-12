module.exports = function verDia(req, res) {
    // Obtener el valor de correo de req.session
    const correo = req.session.correo;
    console.log(correo);

    req.getConnection((err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Error al conectar a la base de datos' });
            return;
        }

        // Consulta SQL para obtener el idAlumno utilizando el correo
        const query = 'SELECT idAlumno FROM tutor WHERE correo = ?';

        // Ejecutar la consulta con el valor del correo como parámetro
        conn.query(query, correo, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: 'Error al obtener el idAlumno' });
                return;
            }

            // Verificar si se encontró un registro
            if (result.length > 0) {
                const idAlumno = result[0].idAlumno;

                // Consulta SQL para obtener los registros de asistencia para el idAlumno en el día en curso
                const queryAsistencia = 'SELECT * FROM asistencia WHERE idAlumno = ? AND fecha = CURDATE()';

                // Ejecutar la consulta con el valor de idAlumno como parámetro
                conn.query(queryAsistencia, idAlumno, (err, asistencia) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ error: 'Error al obtener los registros de asistencia' });
                        return;
                    }

                    // Renderizar la plantilla con los datos de asistencia obtenidos
                    res.render('tutor/ver_dia_tutor', { asistencia });
                });
            } else {
                res.status(404).json({ error: 'No se encontró el idAlumno' });
            }
        });
    });
}