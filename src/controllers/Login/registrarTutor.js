module.exports = function registrarTutor(req, res) {
    const data = req.body;
    console.log(data);

    req.getConnection((err, conn) => {
        if (err) {
            console.log(err);
            return;
        }

        const query = 'INSERT INTO tutor SET ?';

        conn.query(query, data, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }

            // Registro exitoso, redirigir a alguna página de éxito o hacer alguna otra acción
            res.render('login/index', { error: 'Usuario Registrado C:' });
        });
    });
}