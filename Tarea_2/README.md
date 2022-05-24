# Sistemas Distribuidos
Tarea N°2 Sistemas Distribuidos

Integrantes:
- Freddy Aguilar
- Mirko Babic

## Instrucciones de Ejecución

Primeramente es importante verificar si hay puertos utilizados por Postgres o Redis mediante:

```
sudo lsof -nP -iTCP -sTCP:LISTEN
```
En este caso, para detener Postgres se debe ingresar `sudo kill -9 *PID*` y para Redis `sudo systemctl stop redis`

Luego:

```
sudo docker-compose up -d
sudo docker-compose up
```
En caso de tener problema con contenedores externos, borrarlos mediante:

```
sudo docker system prune -a
```

Si al ingresar el comando `sudo docker-compose up` se ejecuta bien pero no funciona la aplicación, detener servicio y volver a ejecutar.

**Ejemplo de búsqueda:** http://localhost:3000/inventory/search?name=busquedaDeseada

## Preguntas

#### ¿Por qué Kafka funciona bien en este escenario?

Kafka funciona bien en este escenario debido a que se necesitan procesar los datos a tiempo real, por lo tanto, utilizar este broker es beneficioso para el correcto funcionamiento 



#### Basado en las tecnologías que usted tiene a su disposición (Kafka, backend) ¿Qué haría usted para manejar una gran cantidad de usuarios al mismo tiempo?

Para manejar una gran cantidad de datos es necesario que el sistema implementado sea escalable, en este caso Kafka cumple con estos requisitos, pues es un sistema que permite el escalamiento horizontal, por lo tanto, para manejar una gran cantidad de usuarios simultáneamente se utilizarán algunas características propias de Kafka, por ejemplo, agregar más brokers para poder distribuir en cada uno la carga que vendría de una gran cantidad de usuarios, además de crear más particiones en cada uno de estos brokers.



