# 3.5.2-Seminario-Evaluativo 

Este proyecto es una aplicación web diseñada para demostrar el poder y la flexibilidad de TypeScript en el desarrollo de aplicaciones del lado del cliente. La aplicación permite a los usuarios listar, visualizar, buscar y añadir productos a través de una interfaz sencilla e intuitiva. Utilizando llamadas a una API externa, los usuarios pueden interactuar con una lista dinámica de productos, lo que facilita la comprensión de conceptos clave como la comunicación con APIs, el manejo de estados y la manipulación del DOM con TypeScript. Este proyecto sirve como una excelente herramienta educativa para explorar las mejores prácticas en el desarrollo de aplicaciones modernas y responsivas, todo dentro del contexto de un seminario evaluativo.

## Configuración del Proyecto

Sigue estas instrucciones para configurar el proyecto en tu máquina local.

### Clonar el Repositorio

Primero, clona este repositorio a tu máquina local usando el siguiente comando en tu terminal:

```bash
git clone https://github.com/HectorGtz27/3.5.2-Seminario-Evaluativo.git
cd 3.5.2-Seminario-Evaluativo
```

### Compilar TypeScript a JavaScript

Este proyecto utiliza TypeScript, por lo tanto, necesitas compilar los archivos `.ts` a `.js`. Ejecuta el siguiente comando:

```bash
tsc
```

## Ejecutar el Proyecto Localmente

Para ejecutar y visualizar el proyecto en tu navegador, sigue estos pasos:

### Instalar `http-server`

Si aún no lo has hecho, instala `http-server` globalmente en tu sistema. Este es un servidor HTTP simple para servir archivos estáticos:

```bash
npm install -g http-server
```

### Servir el Proyecto

Ahora, navega al directorio desde donde quieras servir tu proyecto (usualmente donde se encuentra tu `index.html`) y ejecuta:

```bash
http-server
```

```bash
http-server
```

`http-server` iniciará un servidor local y te mostrará la URL para acceder al proyecto desde tu navegador, normalmente algo como `http://127.0.0.1:8080`.

---

## Creando una Nueva Rama

Para mantener el proyecto organizado y facilitar la revisión de cambios, pedimos a todos los contribuyentes que trabajen en ramas específicas para cada nueva característica o corrección. Aquí te explicamos cómo hacerlo:

### 1. **Clonar el Repositorio (Si aún no lo has hecho)**

Si aún no tienes el repositorio clonado en tu máquina local, necesitarás hacerlo utilizando el comando `git clone`. Reemplaza `url-del-repositorio` con la URL del repositorio al que eres contribuidor:

```bash
git clone https://github.com/HectorGtz27/3.5.2-Seminario-Evaluativo.git
cd 3.5.2-Seminario-Evaluativo
```

### 2. **Crear una Nueva Rama**

Una vez que tienes una copia local del repositorio y estás en el directorio correcto, puedes crear una nueva rama utilizando el comando git branch. Reemplaza nombre-de-la-nueva-rama con el nombre que quieras darle a tu nueva rama:

```bash
git branch nombre-de-la-nueva-rama
```

Sin embargo, este comando solo crea la nueva rama. Para empezar a trabajar en ella, necesitarás cambiar a esa rama con el comando git checkout:

```bash
git checkout nombre-de-la-nueva-rama
```

Alternativamente, puedes combinar estos dos pasos en un solo comando utilizando git checkout -b, que creará la nueva rama y cambiará a ella inmediatamente:

```bash
git checkout -b nombre-de-la-nueva-rama
```

### 3. **Subir la Nueva Rama al Repositorio Remoto**

Después de hacer cambios en tu nueva rama y hacer commit a esos cambios, querrás subir la rama al repositorio remoto para que otros puedan verla y contribuir a ella. Puedes hacer esto con el comando git push. Como esta rama no existe aún en el repositorio remoto, necesitarás establecer el upstream (río arriba) en tu primer push:

```bash
git push --set-upstream origin nombre-de-la-nueva-rama
```

Esto creará la rama en el repositorio remoto y establecerá tu rama local para que siga a la rama remota, lo que facilita futuros push y pull.

```bash
Asegúrate de reemplazar `url-del-repositorio`, `nombre-del-repositorio`, y `nombre-de-la-nueva-rama` con los valores específicos para tu proyecto. Este formato te ayudará a mantener tu `README.md` organizado y facilitará la comprensión de los contribuyentes sobre cómo trabajar con ramas en el proyecto.
```
