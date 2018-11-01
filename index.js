const express = require('express');
const cors = require('cors')
const app = express();
const port = 3000;
const db = require('./models/db');
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
});
//optener
app.get('/login/logear', (req, res) => {
    setTimeout(function () {
        console.log("THIS IS");
        res.send({ username: 'alex', password: '122345' });
    }, 2000);
    console.log("hola");

});
/*rol */
//optener
app.get('/rol', (req, res) => {
    console.log('get roles');
    db.Rol.findAll().then(data => {
        res.send(data);
    });

});
//optener ID
app.get('/rol/:id', (req, res) => {

    db.Rol.findById(
        req.params.id
    ).then(data => {
        if (data != null) {
            res.send(data);
        } else {
            res.send({});
        }

    });

});
//crear
app.post('/rol', (req, res) => {
    // console.log("test->");
    // console.log(req.body);
    db.Rol.create(req.body).then(data => {
        res.send(data);
    });
});
//actualizar
app.put('/rol', (req, res) => {
    // console.log("test->");
    // console.log(req.body);
    db.Rol.update(req.body, { where: { id: req.body.id } })
        .then(updatedMax => {
            console.log(updatedMax)
            res.send(updatedMax);
        })
});
//eliminar
app.delete('/rol/:id', (req, res) => {
    // console.log("test->");
    // console.log(req.body);
    req.params.id;
    db.Rol.destroy({
        where: {
            id: req.params.id //this will be your id that you want to delete
        }
    }).then((rowDeleted) => { // rowDeleted will return number of rows deleted
        if (rowDeleted === 1) {
            res.send("correct");
        } else {
            res.send("error");
        }

    });
});
/*usuario */

/*optener usuarios solo de rol 2 */
app.get('/usuario/:id', (req, res) => {
    db.Usuario.findAll({
        where: {
            rol_id_rol: req.params.id
        }
    }).then(data => {
        res.send(data);
    });

});
//optinene todos
app.get('/usuario', (req, res) => {
    db.Usuario.findAll().then(data => {
        res.send(data);
    });

});
//todos los datos como objetos
app.get('/usuarioAll', (req, res) => {
    db.Usuario.findAll({
        attributes: ['id_usuario', 'username', 'password', 'edad'],
        include: [{
            model: db.Rol,
            attributes: ['id_rol', 'nombre', 'descripcion']
        }]
    }).then(data => {
        res.send({ success: true, message: 'correct', data: data });
    });

});
//actualiza
app.post('/usuario', (req, res) => {
    // console.log("test->");
    // console.log(req.body);
    db.Usuario.create(req.body).then(data => {
        res.send(data);
    });
});
/*paginacion de usuarios */
app.get('/rolPage/:page/:size', (req, res) => {
    console.log('get roles');
    let limit = req.params.size;   // number of records per page
    let offset = 0;
    //console.log(req.params.size);
    db.Rol.findAndCountAll()
        .then((data) => {
            let page = req.params.page;      // page number
            let pages = Math.ceil(data.count / limit);
            offset = limit * (page - 1);
            db.Rol.findAll({

                limit: limit,
                offset: offset,
                $sort: { id_rol: 1 }
            })
                .then((users) => {
                    res.status(200).json({ 'result': users, 'count': data.count, 'pages': pages });
                });
        })
        .catch(function (error) {
            res.status(500).send('Internal Server Error');
        });

});
//elimina la base y cre
// db.sequelize.sync({ force: true }).then(() => {
//si existe la tabla ya no crea
db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}!`);
    });
});
