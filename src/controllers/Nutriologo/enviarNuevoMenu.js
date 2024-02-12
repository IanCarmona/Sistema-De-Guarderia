module.exports = function enviarNuevoMenu(req, res) {
    const { desayuno, comida, merienda, nutriologo, calTotal, salaAsignada, fecha } = req.body;

    // Aquí realizarías la lógica para insertar los datos en la tabla "menu" de tu base de datos
    // Puedes utilizar la misma lógica que te proporcioné anteriormente en el controlador

    // Ejemplo:
    req.getConnection((err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Error al conectar a la base de datos' });
            return;
        }

        const query = 'INSERT INTO menu (desayuno, comida, merienda, nutriologo, calTotal, salaAsignada, fecha) VALUES (?, ?, ?, ?, ?, ?, ?)';

        const values = [desayuno, comida, merienda, nutriologo, calTotal, salaAsignada, fecha];

        conn.query(query, values, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: 'Error al crear el menú' });
                return;
            }

            res.render('nutriologo/index_nutriologo', { error: 'Menú creado exitosamente' });
        });
    });
}

