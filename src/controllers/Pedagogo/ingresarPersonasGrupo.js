module.exports = function ingresarPersonasGrupo(req, res) {
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
                    res.render("pedagogo/index_pedagogo", {
                        error: "Error: No existen registros en la tabla sala",
                    });
                } else {


                    res.render("pedagogo/ingresar_personas", {
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