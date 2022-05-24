# Sistemas Distribuidos
Tarea N°1 Sistemas Distribuidos

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

#### aaaa


