# Sistemas Distribuidos
Tarea N°1 Sistemas Distribuidos

Integrantes:
- Freddy Aguilar
- Mirko Babic

## Instrucciones de Ejecución

Primeramente es importante verificar si hay puertos utilizados por Postgres o Redis, caso en el cual se deben cerrar.

```
sudo docker-compose up -d
sudo docker-compose up
```
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

Para esta aplicación se utilizó la política LFU debido a que, al ser un sistema de ventas, se requiere mantener en caché las entradas usadas con mayor frecuencia para poder reducir al máximo los recursos utilizados.

