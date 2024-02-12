module.exports = function nuevoAlumno(req, res) {
    if ((req.session.loggedin = true)) {
        res.render("trabajo_social/nuevo_alumno", { name: req.session.name });
    } else {
        res.redirect("/logout");
    }
}

