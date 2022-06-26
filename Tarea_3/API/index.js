const express = require('express')
const app = express()
const { v1: uuidv1 } = require('uuid');
const parser = require('body-parser')
const cassandra = require('cassandra-driver');
app.use(parser.json())

const client_recetas = new cassandra.Client({
  contactPoints: ['cassandra-node1','cassandra-node2','cassandra-node3'],
  localDataCenter: 'datacenter1',
  authProvider: new cassandra.auth.PlainTextAuthProvider('cassandra', 'cassandra'),
  keyspace: 'recetas'
});
const client_pacientes = new cassandra.Client({
  contactPoints: ['cassandra-node1','cassandra-node2','cassandra-node3'],
  localDataCenter: 'datacenter1',
  authProvider: new cassandra.auth.PlainTextAuthProvider('cassandra', 'cassandra'),
  keyspace: 'pacientes'
});


app.post('/create', (req, res) => {(async () => {
    const receta = req.body;
    const lookup = "SELECT id FROM pacientes WHERE rut=? ALLOW FILTERING";
    client_pacientes.execute(lookup,[receta.rut]).then(result => {
      if(result.rows == ""){
        const insertar_paciente = "INSERT INTO pacientes(id, nombre,apellido,rut,email,fecha_nacimiento) VALUES(?,?,?,?,?,?); ";
        var id_paciente = uuidv1();
        var id_receta = uuidv1();
        const insertar_receta = "INSERT INTO recetas (id, id_paciente,comentario,farmacos,doctor) VALUES(?,?,?,?,?);";
     client_recetas.execute(insertar_receta,[id_receta, id_paciente ,receta.comentario,receta.farmacos,receta.doctor])
        client_pacientes.execute(insertar_paciente,[id_paciente, receta.nombre,receta.apellido,receta.rut,receta.email,receta.fecha_nacimiento]).then(resultado => {
        res.json("Nuevo paciente agregado con ID: " + id_paciente + " Y nueva receta con ID: " + id_receta)
        console.log("Se ha creado un nuevo paciente")
     })
      }else{
        const lookup2 = "SELECT * from recetas where id_paciente=? ALLOW FILTERING"
        client_recetas.execute(lookup2,[result.rows[0].id]).then(resultado01 => {
          res.json("Paciente ya creado, ID del paciente: " + result.rows[0].id + "  El ID de la receta es: " + resultado01.rows[0].id 
          + " El Doctor a cargo es: " + resultado01.rows[0].doctor + " y recetó: " + resultado01.rows[0].farmacos ) })
          console.log("Se ha intentado crear un paciente ya ingresado")
      }
    })
  })();
});


app.post('/edit', (req, res) => {(async () => {
  const receta = req.body;
  const actualizar_receta = "UPDATE recetas SET comentario=?, farmacos=?, doctor=? WHERE id=? ;";
  client_recetas.execute(actualizar_receta,[receta.comentario,receta.farmacos,receta.doctor,receta.id])      
  const lookup= "SELECT * FROM RECETAS WHERE id=? ALLOW FILTERING";
  client_recetas.execute(lookup,[receta.id]).then(resultado0 => {
  const paciente = "SELECT * FROM pacientes WHERE id=? ALLOW FILTERING";
  client_pacientes.execute(paciente,[resultado0.rows[0].id_paciente]).then(resultado01 => {
          res.json("Receta actualizada para el doc " + resultado0.rows[0].doctor + ", con los medicamentos: " + resultado0.rows[0].farmacos + ". Dicha receta pertenece al paciente: " + resultado01.rows[0].nombre) 
          console.log("Se ha editado una receta")
        }) 
      })
})();
});

app.post('/delete', (req, res) => {(async () => {
  const receta = req.body;
  const borrar = "DELETE FROM recetas WHERE id=?;";
  const id = receta.id
  client_recetas.execute(borrar,[receta.id]).then(resultado01 => {
    res.json("Se ha eliminado correctamente la receta de ID: " + id) 
    console.log("Se ha borrado una receta")
  }) 
})();
});

app.listen(3000, () => {
    console.log('CLIENT RUN AT http://localhost:3000. Por favor, esperar que inicie correctamente cassandra (tarda bastante)');
  });