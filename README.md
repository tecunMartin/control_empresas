
# Reciclaje de números (FRONTEND)♻️

  

_Sistema de ROSE IT el cual se encarga del control de Usuarios, Grupos y administración para topics de Kafka._

  

## Comenzando 🚀

  

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y como desplegarlo al servidor para pruebas._

  

### Instalación DESARROLLO 🔧

  

_Una serie de ejemplos paso a paso que te dice lo que debes ejecutar para poder tener un entorno de desarrollo._

  

_1. Requisitos mínimos:_

  

_GIT_

  

```

git version = git version 2.39.1.windows.1

```

  

_NODE_

  

```

node -v = v22.14.0

```

  

_NPM_

  

```

npm -v = 10.9.2

```

  

_2. Clonar repositorio a tu local:_

  

```

git clone <url>

```

  

_3. Agregar una nueva dependencia (package.json):_

  

```

npm install <package-name>

```

  

_4. Crear .zip para despliegue y pruebas (SEGUIR ORDEN):_

* <small>EL FINA DEL .ZIP ES TENER UNA IMAGEN Y CREAR UN CONTENEDOR EN EL SERVIDOR DE DESARROLLO.</small>

| No. |COMANDO                           | FUNCIONALIDAD|
|--   |--                                |--            |
|1    | ``` docker compose build web ``` |Compila (construye) la imagen del servicio web definido en el docker-compose.yml|
|2    | ``` docker  save  roseit-web-ssr:latest \| gzip  >  roseit-web-ssr_1.0.1.tar.gz ``` |Exporta la imagen `roseit-web-ssr:latest` a un tar (stdout), lo comprime con `gzip` y guarda el archivo `roseit-web-ssr_1.0.1.tar.gz` (contraparte de `docker load`).|


### Instalación SERVIDOR 🔧

_Una serie de ejemplos paso a paso que te dice lo que debes ejecutar para poder tener un entorno de prueba._

