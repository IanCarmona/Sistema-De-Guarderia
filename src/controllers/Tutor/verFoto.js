module.exports = function verFoto(req, res) {
    // Obtener el valor de correo de req.session
    const correo = req.session.correo;

    req.getConnection((err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Error al conectar a la base de datos' });
            return;
        }

        // Consulta SQL para obtener el idAlumno
        const query = 'SELECT idAlumno FROM tutor WHERE correo = ?';

        // Ejecutar la consulta con el valor de correo como parámetro
        conn.query(query, correo, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: 'Error al obtener los datos' });
                return;
            }

            // Verificar si se encontró un registro
            if (result.length > 0) {
                const idAlumno = result[0].idAlumno;

                res.render('tutor/agregar_foto_tutor', { correo, idAlumno });
            } else {
                res.status(404).json({ error: 'No se encontraron datos' });
            }
        });
    });
}
