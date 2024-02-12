module.exports = function enviarEventos(req, res) {
    const { fecha, nombre, idSala, descripcion, responsable } = req.body;

    // Aquí debes agregar el código para realizar la inserción en la base de datos
    // utilizando los datos recibidos del formulario

    // Ejemplo de cómo podrías realizar la inserción utilizando un query de SQL
    const insertEventoQuery =
        "INSERT INTO eventos (fecha, nombreEv, salaAsignada, descripcion, responsable) VALUES (?, ?, ?, ?, ?)";
    const values = [fecha, nombre, idSala, descripcion, responsable];

    req.getConnection((err, conn) => {
        if (err) {
            console.log(err);
            return;
        }

        conn.query(insertEventoQuery, values, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }

            console.log("Evento registrado correctamente");

            // Aquí puedes redirigir o renderizar una página de éxito, por ejemplo:
            res.render("secretaria/index_secretaria", {
                error: "El evento se registró correctamente",
            });
        });
    });
}