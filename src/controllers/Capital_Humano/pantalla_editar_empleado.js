module.exports = function pantalla_editar_empleado(req, res) {
    const tipo = req.query.tipo;

    req.getConnection((err, conn) => {
        if (err) {
            console.log(err);
            return;
        }

        let query = '';
        let params = [];

        if (tipo === 'servicioMedico') {
            query = 'SELECT * FROM empleado INNER JOIN servicioMedico ON empleado.correo = servicioMedico.correo WHERE empleado.tipo = ?';
            params = [tipo];
        }
        else if (tipo === 'nutriologo') {
            query = 'SELECT * FROM empleado INNER JOIN nutriologo ON empleado.correo = nutriologo.correo WHERE empleado.tipo = ?';
            params = [tipo];
        }
        else {
            query = 'SELECT * FROM empleado WHERE tipo = ?';
            params = [tipo];
        }

        conn.query(query, params, (err, userdata) => {
            if (err) {
                console.log(err);
                return;
            }
            if (userdata.length <= 0) {
                res.render('capital_humano/editar_empleado', { error: 'Error: No existen registros' });
            } else {
                res.render('capital_humano/editar_empleado', { name: req.session.name, tipo: req.session.tipo, userdata: userdata});
            }
        });
    });
}
