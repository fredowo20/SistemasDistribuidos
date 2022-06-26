CREATE KEYSPACE recetas
  WITH REPLICATION = { 
   'class' : 'SimpleStrategy', 
   'replication_factor' : 3
};

CREATE TABLE recetas.recetas(
    id UUID PRIMARY KEY, 
    id_paciente UUID,
    comentario text,
    farmacos text,
    doctor text
);