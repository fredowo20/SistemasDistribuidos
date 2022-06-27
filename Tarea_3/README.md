# Sistemas Distribuidos
Tarea N°3 Sistemas Distribuidos

Integrantes:
- Freddy Aguilar
- Mirko Babic

## Instrucciones de Ejecución

Primeramente es importante verificar que no esté utilizado el puerto `3000`, lo cual se puede realizar mediante:

```
sudo lsof -nP -iTCP -sTCP:LISTEN
```

Luego:

```
sudo docker-compose up -d
sudo docker-compose up
```
En caso de tener problema con contenedores externos, borrarlos mediante:

```
sudo docker system prune -a
```

Además, se debe utilizar Postman, el cual se puede instalar mediante:

```
sudo snap install postman
```

Con todo lo anterior preparado, se ingresa a Postman, se escoge el método `POST` y se ingresa la siguiente url:

`http://localhost:3000/create`

Luego, se escoge la pestaña `Body` con la opción `raw` y en la lista desplegable se escoge `JSON`, colocando en el cuadro de texto lo siguiente:

`{
 "nombre": "Melon",
 "apellido": "Musk",
 "rut": "1",
 "email": "Xmelon_muskX@fruitter.com",
 "fecha_nacimiento": "28/06/1971",
 "comentario": "Amigdalitis",
 "farmacos": "Paracetamol",
 "doctor": "El Waton de la Fruta"
}`

Finalmente se debería ver de la siguiente manera:

![image](https://user-images.githubusercontent.com/103700122/175848703-b0df3ca3-9d96-406d-a1b5-243e36900401.png)

Con esto, se podrá presionar `Send` para enviar la solicitud de creación de receta, en donde será posible visualizar un mensaje indicando lo realizado:

![image](https://user-images.githubusercontent.com/103700122/175848757-d50725d7-5344-4bf1-8a53-61576a2d773f.png)

Es importante guardar el ID de la receta indicado para las siguientes acciones.

Después de esto, para editar la receta se ingresa la siguiente url:

`http://localhost:3000/edit`

Luego, se mantiene la configuración anterior, pero colocando en el cuadro de texto lo siguiente: 

`{
 "id": 1, //Reemplazar por el ID de la receta anteriormente mencionado
 "comentario": "Amigdalitis aguda",
 "farmacos": "Paracetamol con aguita",
 "doctor": "El Waton de la Fruta"
}`

Quedando de la siguiente manera:

![image](https://user-images.githubusercontent.com/103700122/175848988-6326cd9f-451a-4de7-a070-0d8a99ca81e6.png)

Con esto, se podrá nuevamente presionar `Send` para enviar la solicitud de edición de receta, en donde será posible visualizar un mensaje indicando lo realizado:

![image](https://user-images.githubusercontent.com/103700122/175848803-194f1b8d-025b-4ea2-8700-6c9bcd19caf8.png)

Finalmente, para eliminar la receta se ingresa la siguiente url:

`http://localhost:3000/delete`

Luego, se mantiene la configuración anterior, pero colocando en el cuadro de texto lo siguiente: 

`{
 "id": 1, //Reemplazar por el ID de la receta
}`

Quedando de la siguiente manera:

![image](https://user-images.githubusercontent.com/103700122/175849039-a503c959-f84e-491e-83d7-fd4d77e7deab.png)

Con esto, se podrá una vez más presionar `Send` para enviar la solicitud de edición de receta, en donde será posible visualizar un mensaje indicando lo realizado:

![image](https://user-images.githubusercontent.com/103700122/175848843-44458cb0-b0d7-4fcf-960b-f55e09d8e089.png)

## Preguntas

- #### Explique la arquitectura que Cassandra maneja. Cuando se crea el clúster ¿Cómo los nodos se conectan? ¿Qué ocurre cuando un cliente realiza una petición a uno de los nodos? ¿Qué ocurre cuando uno de los nodos se desconecta? ¿La red generada entre los nodos siempre es eficiente? ¿Existe balanceo de carga?



- #### Cassandra posee principalmente dos estrategias para mantener redundancia en la replicación de datos. ¿Cuáles son estos? ¿Cuál es la ventaja de uno sobre otro? ¿Cuál utilizaría usted para el caso actual y por qué? Justifique apropiadamente su respuesta.



- #### Teniendo en cuenta el contexto del problema ¿Usted cree que la solución propuesta es la correcta? ¿Qué ocurre cuando se quiere escalar en la solución? ¿Qué mejoras implementaría? Oriente su respuesta hacia el Sharding (la replicación/distribución de los datos) y comente una estrategia que podría seguir para ordenar los datos.

