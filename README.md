# Reciclaje de números (FRONTEND)♻️

_Sistema de ROSE IT el cual se encarga del control de Usuarios, Grupos y administración para topics de Kafka._

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y como desplegarlo al servidor para pruebas. También el poder ver tus cambios en el servidor de pruebas._

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

_4. Crear .zip para despliegue (SEGUIR ORDEN):_

- <small>EL FINA DEL .ZIP ES TENER UNA IMAGEN (DOCKER IMAGES) Y CREAR UN CONTENEDOR EN EL SERVIDOR DE DESARROLLO.
  </small>

| No. | COMANDO                                                                         | FUNCIONALIDAD                                                                                                                          |
| --- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `docker compose build web`                                                      | Compila (construye) la imagen del servicio web definido en el docker-compose.yml.                                                      |
| 2   | `docker  save  roseit-web-ssr:latest  \|  gzip  >  roseit-web-ssr_1.0.1.tar.gz` | Exporta la imagen `roseit-web-ssr:latest` a un tar (stdout), lo comprime con `gzip` y guarda el archivo `roseit-web-ssr_1.0.1.tar.gz`. |

### Instalación SERVIDOR 🔧

_Una serie de ejemplos paso a paso que te dice lo que debes ejecutar para poder tener un entorno de prueba._

_1. Ingresar a ruta y borrar (si existe) el .zip ya existente:_

```
cd /home/roseadmin/softw/deployments_test
sudo rm -rf roseit-web-ssr_1.0.1.tar.gz
```

_2. Descomprimir .zip y crear contenedor:_

- <small>ANTES DE EJECUTAR ESTOS COMANDOS ASEGURARSE DE TENER EL NUEVO ZIP CREADO EN **Instalación DESARROLLO** YA SUBIDO EN LA RUTA MENCIONADA.</small>

| No. | COMANDO                                                                                                                                              | FUNCIONALIDAD                                                                                                                                                                               |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `docker stop roseit-web-proxy 2>/dev/null \|\| true`                                                                                                 | Intenta detener el contenedor `roseit-web-proxy`; oculta errores si no existe y continúa sin fallar.                                                                                        |
| 2   | `docker rm roseit-web-proxy 2>/dev/null \|\| true`                                                                                                   | Elimina el contenedor `roseit-web-proxy` si existe; silencioso y sin fallar si no está.                                                                                                     |
| 3   | `docker stop roseit-web-ssr`                                                                                                                         | Detiene el contenedor llamado `roseit-web-ssr`.                                                                                                                                             |
| 4   | `docker rm roseit-web-ssr`                                                                                                                           | Elimina el contenedor `roseit-web-ssr`.                                                                                                                                                     |
| 5   | `docker rmi roseit-web-ssr:latest`                                                                                                                   | Borra la imagen local etiquetada `roseit-web-ssr:latest`.                                                                                                                                   |
| 6   | `docker load < roseit-web-ssr_1.0.1.tar.gz`                                                                                                          | Importa/recarga una imagen Docker desde el archivo `tar.gz` al repositorio local.                                                                                                           |
| 7   | `docker run -d --name roseit-web-ssr --network roseit-net roseit-web-ssr:latest`                                                                     | Arranca en segundo plano un contenedor llamado `roseit-web-ssr` en la red `roseit-net` usando la imagen `roseit-web-ssr:latest`                                                             |
| 8   | `docker run -d --name roseit-web-proxy --network roseit-net -p 8081:80 -v "$(pwd)/default.conf:/etc/nginx/conf.d/default.conf:ro" nginx:1.25-alpine` | Lanza un contenedor Nginx como proxy en la red `roseit-net`, publica el puerto 80 del contenedor en el host como `8081`, y monta el `default.conf` local como configuración (solo lectura). |

### Visualizar Sistema 👁️

_Estas instrucciones te permitan ver la aplicación y poder realizar pruebas._

_1. Ruta servidor de pruebas:_

- [Ruta pruebas FRONTEND](http://172.18.2.26:8081/)
- <small>Si cuentas con una sesión activa de enviara a /home, si no de enviara a /login.</small>

_3. Roles y que podrán hacer en cada pantalla:_

| No. | Rol      | Pantalla             | Acciones                                  |
| --- | -------- | -------------------- | ----------------------------------------- |
| 1   | ADMIN    | Reciclaje de Números | Ver, Reprocesar, Borrar y Exportar        |
| 2   | OPERATOR | Reciclaje de Números | Ver, Reprocesar y Exportar                |
| 2   | VIEWER   | Reciclaje de Números | Ver y Exportar                            |
| 4   | ADMIN    | Grupos               | Ver, Buscar, Agregar, Editar y Borrar     |
| 5   | ADMIN    | Usuarios             | Ver, Buscar, Agregar, Editar y Desactivar |

## Construido con 🛠️

_Herramientas utilizadas en el Proyecto._

- [Angular](https://angular.dev/) - Framewotk utilizado para el desarrollo.
- [TypeScript](https://www.typescriptlang.org/) - Lenguaje Utilizado.
- [NPM](https://www.npmjs.com/) - Manejador de paquetes.

## Autores ✒️

_Mencion a creador(es):_

- **Martín Tecún** - _Desarrollador_ - [@martin.tecun](https://git.blautech.cloud/martin.tecun)
- **Angel Alvarez** - _Desarrollador_ - [@angel.alvarez](https://git.blautech.cloud/angel.alvarez)

## Expresiones de Gratitud 🎁

- Comenta a otros sobre este proyecto 📢
- Invita una cerveza 🍺 o un café ☕ para conversar.
- Da las gracias públicamente 🤓.
- etc.
