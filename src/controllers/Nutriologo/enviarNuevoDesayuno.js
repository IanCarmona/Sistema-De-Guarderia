module.exports = function enviarNuevoDesayuno(req, res) {
    // Obtener los datos del formulario enviados a través del objeto `req.body`
    const { nombreDesayuno, bebida, fruta, platoFuerte, cal } = req.body;

    req.getConnection((err, conn) => {
        if (err) {
            console.log(err);
            return;
        }

        // Realizar la lógica necesaria para guardar los datos en la base de datos
        const query = 'INSERT INTO desayuno (nombreDesayuno, bebida, fruta, platoFuerte, cal) VALUES (?, ?, ?, ?, ?)';
        const values = [nombreDesayuno, bebida, fruta, platoFuerte, cal];

        // Ejecutar la consulta
        conn.query(query, values, (err, result) => {
            if (err) {
                console.error('Error al guardar los datos del desayuno:', err);
                // Manejar el error de alguna manera adecuada (por ejemplo, mostrar un mensaje de error al usuario)
            } else {
                res.render('nutriologo/index_nutriologo', { name: req.session.name, correo: req.session.correo, error: 'Desayuno registrado con éxito' });
                // Realizar alguna acción adicional o enviar una respuesta al cliente si es necesario
            }
        });
    });
}
