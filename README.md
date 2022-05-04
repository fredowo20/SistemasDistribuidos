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

## Configuración Redis

Para esta aplicación se utilizaron los siguientes parámetros:
- Memoria máxima: 60 mb
- Política de remoción: LFU

## LRU vs LFU

##### LRU (Least Recently Used)
- Almacena a corto plazo al retener la información usada más recientemente
- Implementación requiere llevar la cuenta de TTL de cada elemento
- Alto costo
##### LFU (Least Frecuently Used)
- Almacena a largo plazo al retener la información usada con mayor frecuencia
- Implementación requiere llevar la cuenta de cantidad de veces que se usa cada elemento
- Incapacidad de acceder a archivos muy antiguos

Para esta aplicación se utilizó la política LFU debido a que, al ser un sistema de ventas, se requiere mantener en caché las entradas más populares, es decir, las usadas con mayor frecuencia con el fin de poder reducir al máximo los recursos utilizados.

