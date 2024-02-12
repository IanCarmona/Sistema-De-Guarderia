const bcrypt = require("bcrypt")

module.exports = function registrar_nuevo_empleado(req, res) {
    const data = req.body;

    req.getConnection((err, conn) => {
        if (err) {
            console.log(err);
            return;
        }
        conn.query('SELECT * FROM EMPLEADO WHERE CORREO = ?', [data.correo], (err, userdata) => {
            if (err) {
                console.log(err);
                return;
            }
            if (userdata.length > 0) {
                res.render('login/index', { error: 'Error: User already exists!' });
            } else {
                bcrypt.hash(data.password, 12).then(hash => {
                    data.password = hash;
                    conn.query('INSERT INTO empleado (tipo, nombre, apPat, apMat, correo, password, telefono, rfc) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [data.tipo, data.nombre, data.apPat, data.apMat, data.correo, data.password, data.telefono, data.rfc], (err, rows) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        if (data.tipo === 'servicioMedico') {
                            conn.query('INSERT INTO servicioMedico (correo, cedulaProfesional) VALUES (?, ?)', [data.correo, data.cedulaProfesional], (err, rows) => {
                                if (err) {
                                    console.log(err);
                                    return;
                                }

                            });
                        } else if (data.tipo === 'nutriologo') {
                            conn.query('INSERT INTO nutriologo (correo, cedulaProfesional) VALUES (?, ?)', [data.correo, data.cedulaProfesional], (err, rows) => {
                                if (err) {
                                    console.log(err);
                                    return;
                                }

                            });
                        }else if (data.tipo === 'cuidador') {
                            conn.query('INSERT INTO CUIDADOR (correo) VALUES (?)', [data.correo], (err, rows) => {
                                if (err) {
                                    console.log(err);
                                    return;
                                }

                            });
                        }
                        res.render('capital_humano/index_capital_humano', {error:"Empleado creado con Exito"});
                    });
                });
            }
        });
    });
}