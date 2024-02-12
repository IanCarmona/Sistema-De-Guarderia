


module.exports = function traerComidas(req, res) {
    if (req.session.loggedin) {
        req.getConnection((err, conn) => {
            if (err) {
                console.log(err);
                return;
            }

            // Consulta para obtener los desayunos
            const queryDesayuno = 'SELECT * FROM desayuno';
            conn.query(queryDesayuno, (err, desayunos) => {
                if (err) {
                    console.log(`Error al obtener los desayunos: ${err}`);
                    res.render('error', { error: 'Error al obtener los desayunos' });
                    return;
                }

                // Consulta para obtener las comidas
                const queryComida = 'SELECT * FROM comida';
                conn.query(queryComida, (err, comidas) => {
                    if (err) {
                        console.log(`Error al obtener las comidas: ${err}`);
                        res.render('error', { error: 'Error al obtener las comidas' });
                        return;
                    }

                    // Consulta para obtener las meriendas
                    const queryMerienda = 'SELECT * FROM merienda';
                    conn.query(queryMerienda, (err, meriendas) => {
                        if (err) {
                            console.log(`Error al obtener las meriendas: ${err}`);
                            res.render('error', { error: 'Error al obtener las meriendas' });
                            return;
                        }

                        // Renderizar el resultado en el HBS
                        res.render('nutriologo/traer_todas_comidas', {
                            desayunos: desayunos,
                            comidas: comidas,
                            meriendas: meriendas
                        });
                    });
                });
            });
        });
    } else {
        res.redirect('/logout');
    }
}
