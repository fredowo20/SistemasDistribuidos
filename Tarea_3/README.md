# Sistemas Distribuidos
Tarea N°3 Sistemas Distribuidos

Integrantes:
- Freddy Aguilar
- Mirko Babic

## Instrucciones de Ejecución

Primeramente es importante verificar que no estén utilizados los puertos `3000`, `5000`, `9092`, `2181`, `2888` y `3888`, lo cual se puede realizar mediante:

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

`http://localhost:3000/login`

Luego, se escoge la pestaña `Body` con la opción `raw` y en la lista desplegable se escoge `JSON`, colocando en el cuadro de texto lo siguiente:

`{
 "user" : "nicolas.hidalgoc@mail.udp.cl",
 "pass" : "sistemasdistribuidosbestramo"
}`

Finalmente se debería ver de la siguiente manera:

![Postman](https://user-images.githubusercontent.com/103700122/169953179-d402cbb5-7ccb-4000-9978-7fcbfaca166c.png)

Con esto, se podrá presionar `Send` para enviar la solicitud, en donde si se realizan 5 de estas en menos de 1 minuto, la cuenta será bloqueada. Cabe destacar que será posible visualizar los usuarios bloqueados hasta el momento en la siguiente url:

`http://localhost:5000/blocked`

#### Referencias

Para la elaboración de los códigos realizados se utilizó como base los códigos disponibles en la página de la librería utilizada [kafkajs](https://www.npmjs.com/package/kafkajs/v/1.16.0)

## Preguntas

- #### Explique la arquitectura que Cassandra maneja. Cuando se crea el clúster ¿Cómo los nodos se conectan? ¿Qué ocurre cuando un cliente realiza una petición a uno de los nodos? ¿Qué ocurre cuando uno de los nodos se desconecta? ¿La red generada entre los nodos siempre es eficiente? ¿Existe balanceo de carga?



- #### Cassandra posee principalmente dos estrategias para mantener redundancia en la replicación de datos. ¿Cuáles son estos? ¿Cuál es la ventaja de uno sobre otro? ¿Cuál utilizaría usted para el caso actual y por qué? Justifique apropiadamente su respuesta.



- #### Teniendo en cuenta el contexto del problema ¿Usted cree que la solución propuesta es la correcta? ¿Qué ocurre cuando se quiere escalar en la solución? ¿Qué mejoras implementaría? Oriente su respuesta hacia el Sharding (la replicación/distribución de los datos) y comente una estrategia que podría seguir para ordenar los datos.

