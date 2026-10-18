# Lab de bundling

## Cómo lanzar el proyecto

Necesitas tener [Node.js](https://nodejs.org/) y npm instalados.

1. Abre una terminal en la carpeta `lab_03/lab-bundling`.
2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npm start
   ```

4. Abre en el navegador la dirección local que indique Vite en la terminal.

Para generar y probar la versión de producción, ejecuta:

```bash
npm run build
npm run preview
```

# Ejercicio 1

## ¿Para qué sirve el hash en el nombre del fichero en producción? ¿Qué pasaría sin él al subir una versión nueva?

El hash identifica el contenido del fichero y cambia cuando este se modifica. Así, el navegador puede guardar en caché los ficheros sin dejar de descargar la versión nueva cuando corresponda.

Sin el hash, el navegador podría reutilizar un fichero antiguo almacenado en caché y mostrar una versión desactualizada de la aplicación.

## ¿Qué diferencia hay entre `npm start` y `npm run preview`? ¿Cuál usaríais para comprobar que funciona la versión de producción?

`npm start` inicia el servidor de desarrollo de Vite. `npm run preview` sirve la versión generada previamente con `npm run build`.

Para comprobar que funciona la versión de producción, usaríamos `npm run preview` después de ejecutar `npm run build`.

# Ejercicio 2

## ¿Por qué en desarrollo el CSS llega como un módulo de JavaScript y en producción como un fichero .css?

En desarrollo Vite transforma los imports de CSS en módulos JavaScript que insertan los estilos en la página, mientras que en producción, ite compila y extrae esos estilos en archivos .css separados, que el navegador descarga mediante etiquetas <link>

En resumen: en desarrollo prima la rapidez al editar; en producción, la carga y el almacenamiento en caché eficientes.

# Ejercicio 3

## ¿Dónde ha ido a parar el logo y por qué Vite lo trata distinto que la foto? Pista: buscad assetsInlineLimit en la documentación de Vite.

Se ha convertido a base64 en el html

## ¿Qué ganamos y qué perdemos con eso?

Ganamos:

- Menos peticiones HTTP
- Evitamos crear y solicitar un archivo a mayores

Perdemos:

- El contenido suele ocupar más espacio
- Aumenta el tamaño del fichero html
- El recurso deja de almacenarse en caché por separado
- La descarga en paralelo de los recursos

# Ejercicio 4

## ¿Por qué Vite, por sí solo, no comprueba los tipos? ¿Qué gana con ello? (Introducción del módulo: oxc e isolatedModules).

Vite transpila TypeScript para que el navegador pueda ejecutar JavaScript, pero no hace una comprobación de tipos.

isolatedModules ayuda a detectar construcciones de TypeScript, es una opción del propio Typescript

Comprobar tipos: npx tsc --noEmit

# Ejercicio 5

## ¿Por qué Vite trata distinto a react (dependencia) y a app.tsx (vuestro código)? ¿Qué es el pre-bundling y qué problema resuelve?

Porque la aplicación y sus dependencias no siguen el mismo ritmo de actualización

El prebundling se usa cuando arrancamo vite de desarrollo "npm run start", aquí se hace una optimización para poder ejecutar el código en el navegador.
Resuelve: compatibilidad y demasiados modulos y peticiones

## ¿Qué aporta exactamente @vitejs/plugin-react si el JSX ya funcionaba sin él?

Vite puede transformar .jsx y .tsx sin el plugin; eso basta para que el JSX se convierta en JavaScript.

Pero con el plugin añadimos funciones específicas de React, sobre todo React Fast Refresh, que permite actualizar componentes durante el desarrollo y normalmente conservar su estado
