module.exports = function traerSalas(req, res) {
    if (req.session.loggedin) {
        req.getConnection((err, conn) => {
            if (err) {
                console.log(err);
                return;
            }

            const query = "SELECT idSala FROM sala";

            conn.query(query, (err, results) => {
                if (err) {
                    console.log(err);
                    return;
                }

                if (results.length <= 0) {
                    res.render("servicio_medico/index_servicio_medico", {
                        error: "Error: No existen registros en la tabla sala",
                    });
                } else {


                    res.render("servicio_medico/traer_grupo_servicio_medico", {
                        name: req.session.name,
                        userdata: results,
                    });
                }

            });
        });
    } else {
        res.redirect("/logout");
    }
}