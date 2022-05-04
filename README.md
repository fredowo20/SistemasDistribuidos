# Sistemas Distribuidos
Tarea N°1 Sistemas Distribuidos

Integrantes:
- Freddy Aguilar
- Mirko Babic

## Instrucciones de Ejecución

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
- Almacena la información usada en menor cantidad
- Implementación requiere llevar la cuenta de TTL de cada elemento
- Alto costo
##### LFU (Least Frecuently Used)
- Almacena la información usada con menor frecuencia
- Implementación requiere llevar la cuenta de cantidad de veces que se usa cada elemento

Justificación Uso

