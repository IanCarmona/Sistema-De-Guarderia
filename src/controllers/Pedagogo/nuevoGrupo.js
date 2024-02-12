module.exports = function nuevoGrupo(req, res) {
    if (req.session.loggedin) {
        req.getConnection((err, conn) => {
            if (err) {
                console.log(err);
                return;
            }

            const query = `SELECT e.correo, e.nombre
                        FROM empleado e
                        JOIN cuidador c ON e.correo = c.correo
                        WHERE c.salaAsignada = 'NA'`;

            conn.query(query, (err, userdata) => {
                if (err) {
                    console.log(err);
                    return;
                }
                if (userdata.length <= 0) {
                    res.render("pedagogo/index_pedagogo", {
                        error: "Error: No existen cuidadores para crear la sala",
                    });
                } else {
                    res.render("pedagogo/nuevo_grupo", {
                        name: req.session.name,
                        userdata: userdata,

                    });
                }
            });
        });

    } else {
        res.redirect("/logout");
    }
}
