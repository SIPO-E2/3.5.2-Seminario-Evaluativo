# 3.5.2-Seminario-Evaluativo

Este proyecto es una aplicación web diseñada para demostrar el poder y la flexibilidad de TypeScript en el desarrollo de aplicaciones del lado del cliente. La aplicación permite a los usuarios listar, visualizar, buscar y añadir productos a través de una interfaz sencilla e intuitiva. Utilizando llamadas a una API externa, los usuarios pueden interactuar con una lista dinámica de productos, lo que facilita la comprensión de conceptos clave como la comunicación con APIs, el manejo de estados y la manipulación del DOM con TypeScript. Este proyecto sirve como una excelente herramienta educativa para explorar las mejores prácticas en el desarrollo de aplicaciones modernas y responsivas, todo dentro del contexto de un seminario evaluativo.

## Requisitos Previos

Para trabajar en este proyecto, necesitarás tener instalado lo siguiente:

- [Node.js](https://nodejs.org/): Entorno de ejecución para JavaScript.
- npm: Gestor de paquetes para JavaScript, viene incluido con Node.js.

## Configuración del Proyecto

Sigue estas instrucciones para configurar el proyecto en tu máquina local.

### Clonar el Repositorio

Primero, clona este repositorio a tu máquina local usando el siguiente comando en tu terminal:

- git clone https://github.com/HectorGtz27/3.5.2-Seminario-Evaluativo.git
- cd directorio-del-proyecto

### Instalar Dependencias

Una vez que estés dentro del directorio del proyecto, instala las dependencias necesarias ejecutando:

- npm install

Este comando instalará todas las dependencias listadas en tu archivo `package.json`.

### Compilar TypeScript a JavaScript

Este proyecto utiliza TypeScript, por lo tanto, necesitas compilar los archivos `.ts` a `.js`. Ejecuta el siguiente comando:

- npm run build

Esto compilará tus archivos TypeScript basándose en la configuración especificada en tu archivo `tsconfig.json`, generalmente generando los archivos JavaScript en el directorio `./dist`.

## Ejecutar el Proyecto Localmente

Para ejecutar y visualizar el proyecto en tu navegador, sigue estos pasos:

### Instalar `http-server`

Si aún no lo has hecho, instala `http-server` globalmente en tu sistema. Este es un servidor HTTP simple para servir archivos estáticos:

- npm install -g http-server

### Servir el Proyecto

Ahora, navega al directorio desde donde quieras servir tu proyecto (usualmente donde se encuentra tu `index.html`) y ejecuta:

- http-server

Si tus archivos están en `./dist`, asegúrate de navegar a ese directorio primero:

- cd dist
- http-server

`http-server` iniciará un servidor local y te mostrará la URL para acceder al proyecto desde tu navegador, normalmente algo como `http://127.0.0.1:8080`.

---

Espero que encuentres útil esta guía para comenzar a trabajar en el proyecto. Para cualquier duda o aclaración, no dudes en ponerte en contacto o abrir un issue en el repositorio.
