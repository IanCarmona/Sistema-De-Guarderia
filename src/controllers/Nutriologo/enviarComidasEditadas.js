module.exports = function enviarComidasEditadas(req, res) {
    const { nombreT, nombreC } = req.params;
    const { bebida, fruta, platoFuerte, postre, snack, cal } = req.body;

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

    const queries = [];
    const values = [];

    if (bebida) {
        queries.push(`UPDATE ${tableName} SET bebida = ? WHERE ${columnName} = ?`);
        values.push(bebida, nombreC);
    }
    if (fruta) {
        queries.push(`UPDATE ${tableName} SET fruta = ? WHERE ${columnName} = ?`);
        values.push(fruta, nombreC);
    }
    if (platoFuerte) {
        queries.push(`UPDATE ${tableName} SET platoFuerte = ? WHERE ${columnName} = ?`);
        values.push(platoFuerte, nombreC);
    }
    if (postre) {
        queries.push(`UPDATE ${tableName} SET postre = ? WHERE ${columnName} = ?`);
        values.push(postre, nombreC);
    }
    if (snack) {
        queries.push(`UPDATE ${tableName} SET snack = ? WHERE ${columnName} = ?`);
        values.push(snack, nombreC);
    }
    if (cal) {
        queries.push(`UPDATE ${tableName} SET cal = ? WHERE ${columnName} = ?`);
        values.push(cal, nombreC);
    }

    if (queries.length === 0) {
        res.status(400).json({ error: 'No se proporcionaron datos para actualizar' });
        return;
    }

    req.getConnection((err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Error al conectar a la base de datos' });
            return;
        }

        const executeQuery = (index) => {
            if (index >= queries.length) {
                res.render('nutriologo/index_nutriologo', { error: 'Comida Actualizada' });
                return;
            }

            const query = queries[index];
            const queryValues = values.slice(index * 2, index * 2 + 2);

            conn.query(query, queryValues, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ error: 'Error al actualizar la información de la comida' });
                    return;
                }

                executeQuery(index + 1);
            });
        };

        executeQuery(0);
    });
}
