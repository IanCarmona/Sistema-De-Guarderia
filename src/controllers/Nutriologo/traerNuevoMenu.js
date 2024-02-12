module.exports = function traerNuevoMenu(req, res) {
    req.getConnection((err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Error al conectar a la base de datos' });
            return;
        }

        const queryDesayunos = 'SELECT nombreDesayuno, cal FROM desayuno';
        const queryComidas = 'SELECT nombreComida, cal FROM comida';
        const queryMeriendas = 'SELECT nombreMerienda, cal FROM merienda';
        const querySalas = 'SELECT idSala FROM sala';

        conn.query(queryDesayunos, (err, desayunos) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: 'Error al obtener los desayunos' });
                return;
            }

            conn.query(queryComidas, (err, comidas) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ error: 'Error al obtener las comidas' });
                    return;
                }

                conn.query(queryMeriendas, (err, meriendas) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ error: 'Error al obtener las meriendas' });
                        return;
                    }

                    conn.query(querySalas, (err, salas) => {
                        if (err) {
                            console.log(err);
                            res.status(500).json({ error: 'Error al obtener las salas' });
                            return;
                        }

                        res.render('nutriologo/crear_menu', {
                            desayunos: desayunos.map(item => ({ nombre: item.nombreDesayuno, calorias: item.cal })),
                            comidas: comidas.map(item => ({ nombre: item.nombreComida, calorias: item.cal })),
                            meriendas: meriendas.map(item => ({ nombre: item.nombreMerienda, calorias: item.cal })),
                            salas: salas.map(item => item.idSala),
                            correo: req.session.correo
                        });
                    });
                });
            });
        });
    });
}