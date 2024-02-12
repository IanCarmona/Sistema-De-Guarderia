const express = require('express');
const { engine } = require('express-handlebars');
const myconnection = require('express-myconnection');
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');


const loginRoutes = require('./routes/login');
const capitalHumanoRoutes = require('./routes/capital_humano');
const trabajoSocialRoutes = require('./routes/trabajo_social');
const cuidadorRoutes = require('./routes/cuidador');
const nutriologoRoutes = require('./routes/nutriologo');
const pedagogoRoutes = require('./routes/pedagogo');
const secratariaRoutes = require('./routes/secretaria');
const tutorRoutes = require('./routes/tutor');
const servicioMedicoRoutes = require('./routes/servicio_medico');



const app = express();
app.set('port',8090);
app.set('views', __dirname + '/views');
app.engine('hbs', engine({
    extname: '.hbs',
}));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use('/partials', express.static(path.join(__dirname, 'views', 'partials')));







app.use(myconnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'admin',
    port: 3306,
    database: 'pf_ads'
}));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));


app.listen(app.get('port'), () => {
    console.log('Listening on port ', app.get('port'));
});

app.use('/', loginRoutes);
app.use('/', capitalHumanoRoutes);
app.use('/', trabajoSocialRoutes);
app.use('/', cuidadorRoutes);
app.use('/', nutriologoRoutes);
app.use('/', pedagogoRoutes);
app.use('/', secratariaRoutes);
app.use('/', tutorRoutes);
app.use('/', servicioMedicoRoutes);



app.get('/', (req, res) => {
    // Render view based on type
    if(req.session.loggedin == true){
        if (req.session.tipo == 'capitalHumano') {
            res.render('capital_humano/index_capital_humano', { name: req.session.name });
        }
        else if (req.session.tipo == 'servicioMedico') {
            res.render('servicio_medico/index_servicio_medico', { name: req.session.name , correo:req.session.correo});
        }
        else if (req.session.tipo == 'nutriologo') {
            res.render('nutriologo/index_nutriologo', { name: req.session.name, correo:req.session.correo });
        }
        else if (req.session.tipo == 'cuidador') {
            res.render('cuidador/index_cuidador', { name: req.session.name, correo:req.session.correo });
        }
        else if (req.session.tipo == 'secretaria') {
            res.render('secretaria/index_secretaria', { name: req.session.name, correo:req.session.correo });
        }
        else if (req.session.tipo == 'pedagogo') {
            res.render('pedagogo/index_pedagogo', { name: req.session.name });
        }
        else if (req.session.tipo == 'trabajadorSocial') {
            res.render('trabajo_social/index_trabajo_social', { name: req.session.name });
        }
        else if(req.session.tipo == 'tutor'){
            res.render('tutor/index_tutor', { name: req.session.name, correo:req.session.correo });
        }
    }
    else{
        res.redirect('/login');
    }

    

    
})