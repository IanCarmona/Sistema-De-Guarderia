module.exports = function verMenu(req, res) {
    // Obtener el valor de correo de req.session
    const correo = req.session.correo;

    req.getConnection((err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Error al conectar a la base de datos' });
            return;
        }

        // Consulta SQL para obtener el idAlumno utilizando el correo
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

                // Consulta SQL para obtener la sala asignada del alumno
                const querySalaAsignada = 'SELECT salaAsignada FROM alumno WHERE idAlumno = ?';

                // Ejecutar la consulta con el valor de idAlumno como parámetro
                conn.query(querySalaAsignada, idAlumno, (err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ error: 'Error al obtener la sala asignada' });
                        return;
                    }

                    // Verificar si se encontró un registro
                    if (result.length > 0) {
                        const salaAsignada = result[0].salaAsignada;

                        // Consulta SQL para obtener el menú del día según la sala asignada
                        const queryMenu =
                            'SELECT m.desayuno, d.bebida AS desayuno_bebida, d.fruta AS desayuno_fruta, d.platoFuerte AS desayuno_platoFuerte, d.cal AS desayuno_cal, ' +
                            'm.comida, c.bebida AS comida_bebida, c.platoFuerte AS comida_platoFuerte, c.postre AS comida_postre, c.cal AS comida_cal, ' +
                            'm.merienda, me.bebida AS merienda_bebida, me.snack AS merienda_snack, me.cal AS merienda_cal ' +
                            'FROM menu AS m ' +
                            'JOIN desayuno AS d ON m.desayuno = d.nombreDesayuno ' +
                            'JOIN comida AS c ON m.comida = c.nombreComida ' +
                            'JOIN merienda AS me ON m.merienda = me.nombreMerienda ' +
                            'WHERE m.salaAsignada = ? AND m.fecha = CURDATE()';

                        // Ejecutar la consulta con el valor de salaAsignada como parámetro
                        conn.query(queryMenu, salaAsignada, (err, menu) => {
                            if (err) {
                                console.log(err);
                                res.status(500).json({ error: 'Error al obtener el menú' });
                                return;
                            }

                            // Renderizar la plantilla con los datos del menú obtenidos
                            res.render('tutor/ver_menu_tutor', { menu });
                        });
                    } else {
                        res.status(404).json({ error: 'No se encontró la sala asignada' });
                    }
                });
            } else {
                res.status(404).json({ error: 'No se encontró el idAlumno' });
            }
        });
    });
}