# Sistemas Distribuidos
Tarea N°2 Sistemas Distribuidos

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

`http://localhost:3000/inventory/search?name=busquedaDeseada`

Luego, se escoge la pestaña `Body` con la opción `raw` y en la lista desplegable se escoge `JSON`, colocando en el cuadro de texto lo siguiente:

`{
 "user" : "nicolas.nunez2@mail.udp.cl",
 "pass" : "sistemasdistrbuidosbestramo"
}`

Finalmente se debería ver de la siguiente manera:



Si al ingresar el comando `sudo docker-compose up` se ejecuta bien pero no funciona la aplicación, detener servicio y volver a ejecutar.

**Ejemplo de búsqueda:** http://localhost:3000/inventory/search?name=busquedaDeseada

## Preguntas

#### ¿Por qué Kafka funciona bien en este escenario?

Kafka funciona bien en este escenario debido a que se necesitan procesar los datos a tiempo real, por lo tanto, utilizar este broker es beneficioso para el objetivo del sistema, pues se tiene un login, en el cual habrá un gran flujo de usuarios logeandose, así que es necesario tener un sistema escalable y Kafka cumple con ello, logrando alivianar la carga para poder gestionar de manera correcta los procesos asociados al sistema.


#### Basado en las tecnologías que usted tiene a su disposición (Kafka, backend) ¿Qué haría usted para manejar una gran cantidad de usuarios al mismo tiempo?

Para manejar una gran cantidad de datos es necesario que el sistema implementado sea escalable, en este caso Kafka cumple con estos requisitos, pues es un sistema que permite el escalamiento horizontal, por lo tanto, para manejar una gran cantidad de usuarios simultáneamente se utilizarán algunas características propias de Kafka, por ejemplo, agregar más brokers para poder distribuir en cada uno la carga que vendría de una gran cantidad de usuarios, además de crear más particiones en cada uno de estos brokers.
