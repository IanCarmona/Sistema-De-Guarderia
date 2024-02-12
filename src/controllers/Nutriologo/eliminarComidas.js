module.exports = function eliminarComidas(req, res) {
    const { nombreT, nombreC } = req.params;


    let tableName = '';
    let columnName = '';

    if (nombreT === 'desayuno') {
        tableName = 'desayuno';
        columnName = 'nombreDesayuno';
    } else if (nombreT === 'comida') {
        tableName = 'comida';
        columnName = 'nombreComida';
    } else if (nombreT === 'merienda') {
        tableName = 'merienda';
        columnName = 'nombreMerienda';
    } else {
        res.status(400).json({ error: 'Tabla inválida' });
        return;
    }

    const query = `DELETE FROM ${tableName} WHERE ${columnName} = ?`;

    req.getConnection((err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Error al conectar a la base de datos' });
            return;
        }

        conn.query(query, [nombreC], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: 'Error al eliminar la comida' });
                return;
            }

            if (result.affectedRows == 0) {
                res.status(404).json({ error: 'Comida no encontrada' });
                return;
            }

            res.render('nutriologo/index_nutriologo', { error: 'Comida eliminada' });
        });
    });
}