const bcrypt = require('bcrypt');



module.exports = function auth(req, res) {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM empleado WHERE correo = ?', [data.correo], (err, empleadoData) => {
            if (empleadoData.length > 0) {
                const empleado = empleadoData[0];
                bcrypt.compare(data.password, empleado.password, (err, isMatch) => {
                    if (!isMatch) {
                        res.render('login/index', { error: 'Error: Incorrect password or  user!' });
                    } else {
                        req.session.loggedin = true;
                        req.session.name = empleado.nombre;
                        req.session.tipo = empleado.tipo;
                        req.session.correo = empleado.correo;
                        res.redirect('/');
                    }
                });
            } else {
                conn.query('SELECT * FROM tutor WHERE correo = ? AND password = ?', [data.correo, data.password], (err, tutorData) => {
                    if (tutorData.length > 0) {
                        const tutor = tutorData[0];
                        req.session.loggedin = true;
                        req.session.name = tutor.nombre;
                        req.session.correo = tutor.correo;
                        req.session.tipo = 'tutor';
                        res.redirect('/');
                    } else {
                        res.render('login/index', { error: 'Error: User does not exist' });
                    }
                });
            }
            
        });
    });
}