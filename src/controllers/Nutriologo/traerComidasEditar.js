module.exports = function traerComidasEditar(req, res) {
    const { nombreT, nombreC } = req.params;

    let tableName = '';
    let columnName = '';
    let columnNames = [];
    let view = '';

    if (nombreT === 'desayuno') {
        tableName = 'desayuno';
        columnName = 'nombreDesayuno';
        columnNames = ['nombreDesayuno', 'bebida', 'fruta', 'platoFuerte', 'cal'];
        view = 'nutriologo/editar_desayuno';
    } else if (nombreT === 'comida') {
        tableName = 'comida';
        columnName = 'nombreComida';
        columnNames = ['nombreComida', 'bebida', 'platoFuerte', 'postre', 'cal'];
        view = 'nutriologo/editar_comida';
    } else if (nombreT === 'merienda') {
        tableName = 'merienda';
        columnName = 'nombreMerienda';
        columnNames = ['nombreMerienda', 'bebida', 'snack', 'cal'];
        view = 'nutriologo/editar_merienda';
    } else {
        res.status(400).json({ error: 'Tabla inválida' });
        return;
    }

    const query = `SELECT * FROM ${tableName} WHERE ${columnName} = ?`;
    req.getConnection((err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Error al conectar a la base de datos' });
            return;
        }

        conn.query(query, [nombreC], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: 'Error al obtener la información de la comida' });
                return;
            }

            if (result.length === 0) {
                res.status(404).json({ error: 'Comida no encontrada' });
                return;
            }

            const comida = result[0];
            const comidaInfo = {};

            columnNames.forEach(column => {
                comidaInfo[column] = comida[column];
            });

            res.render(view, { comida: comidaInfo, tipo: nombreT });
        });
    });
}