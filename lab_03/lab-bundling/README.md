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

### Scripts disponibles

| Comando           | Para qué sirve |
| ----------------- | -------------- |
| `npm start`       | Arranca el servidor de desarrollo de Vite. `vite-plugin-checker` comprueba TypeScript y muestra los errores en la terminal y en el navegador. |
| `npm run build`   | Genera la versión de producción en `dist/`. |
| `npm run preview` | Sirve localmente la última compilación de `dist/` para probarla. |

Para probar la versión de producción, ejecuta primero el build y después el preview:

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

## ¿Por qué en desarrollo el CSS llega como un módulo de JavaScript y en producción como un fichero `.css`?

En desarrollo, Vite transforma los imports de CSS en módulos JavaScript que insertan y actualizan los estilos en la página mediante HMR. En producción, extrae los estilos a ficheros `.css` que el navegador descarga mediante etiquetas `<link>`.

En desarrollo prima la rapidez al editar; en producción, una carga y un almacenamiento en caché eficientes.

# Ejercicio 3

## ¿Dónde ha ido a parar el logo y por qué Vite lo trata distinto que la foto? Pista: buscad assetsInlineLimit en la documentación de Vite.

El logo pequeño (3.881 bytes en este proyecto) queda incrustado en el HTML como una URL `data:image/png;base64,...`, porque está por debajo del límite predeterminado de 4 KiB de `assetsInlineLimit`. La foto importada desde JavaScript es mayor y se emite como un fichero independiente con hash en `dist/assets/`.

## ¿Qué ganamos y qué perdemos con eso?

Al incrustarlo ganamos:

- Una petición HTTP menos para ese recurso pequeño.
- Evitamos generar y solicitar un fichero adicional.

Pero perdemos:

- El contenido Base64 suele ocupar más espacio y aumenta el tamaño del HTML.
- El recurso no se puede almacenar en caché por separado.
- El navegador no puede descargar ese recurso en paralelo como un fichero independiente.

# Ejercicio 4

## ¿Por qué Vite, por sí solo, no comprueba los tipos? ¿Qué gana con ello? (Introducción del módulo: oxc e isolatedModules).

Vite transpila TypeScript a JavaScript para servirlo rápidamente, pero esa transformación no comprueba que los tipos sean compatibles. Comprobar tipos requiere analizar las relaciones entre módulos y es una tarea distinta; en este proyecto la realiza `vite-plugin-checker` durante el desarrollo.

`isolatedModules` es una opción de TypeScript que avisa de construcciones que no se pueden transformar tratando cada fichero de forma aislada; no activa la comprobación de tipos. En este proyecto, `vite-plugin-checker` realiza esa comprobación durante el desarrollo y presenta los errores en la terminal y en el navegador.

# Ejercicio 5

## ¿Por qué Vite trata distinto a react (dependencia) y a app.tsx (vuestro código)? ¿Qué es el pre-bundling y qué problema resuelve?

Las dependencias como React suelen cambiar menos que el código propio de la aplicación. Por eso Vite las optimiza y almacena en caché durante el desarrollo, mientras que transforma `app.tsx` cuando hace falta y puede actualizarlo con HMR.

El pre-bundling es esa optimización de dependencias al iniciar el servidor de desarrollo. Convierte formatos como CommonJS a módulos ES que el navegador puede importar y agrupa dependencias con muchos módulos pequeños para reducir peticiones y evitar que el navegador tenga que resolver una gran cantidad de imports individuales.

## ¿Qué aporta exactamente @vitejs/plugin-react si el JSX ya funcionaba sin él?

Vite puede transformar `.jsx` y `.tsx` sin el plugin; eso basta para convertir el JSX en JavaScript.

El plugin añade funciones específicas de React, sobre todo React Fast Refresh, que permite actualizar componentes durante el desarrollo y normalmente conservar su estado. Instalar `@vitejs/plugin-react` no basta: hay que registrarlo en la configuración de Vite.

# Ejercicio 6

## ¿Por qué Vite obliga a usar el prefijo `VITE_`?

Vite no obliga a usarlo: `VITE_` es el prefijo predeterminado para exponer variables del entorno al código del cliente mediante `import.meta.env`. Este filtro evita exponer accidentalmente todas las variables del proceso.

## Si mañana cambia la URL de la API de producción, ¿basta con editar `.env.production` en el servidor?

No. Vite incorpora el valor al JavaScript durante el build, así que hay que reconstruir la aplicación con el nuevo valor y desplegar el resultado. Cambiar `.env.production` en el servidor después de compilar no cambia los archivos ya generados.

## ¿Por qué nunca debe ir una clave secreta en una variable `VITE_`?

Porque su valor puede quedar incluido en el JavaScript descargable y ser visible para cualquier usuario. Las claves y operaciones sensibles deben permanecer protegidas en el servidor.

## Según la comprobación 5: ¿un feature flag desactivado sirve para "esconder" algo a los usuarios?

No. En el frontend un flag puede ocultar una parte de la interfaz, pero no protege el código ni los datos. La autorización debe comprobarse también en el servidor.

# Obligatorio 7: README y bitácora de IA

## Checklist

### Obligatorios

- [x] 1. Proyecto Vite con scripts `start`, `build` y `preview`.
- [x] 2. Estilos Sass compilados a CSS en producción.
- [x] 3. Recursos de imagen procesados por Vite; la compilación genera la foto con hash en `dist/assets/`.
- [x] 4. `vite-plugin-checker` está configurado para comprobar TypeScript durante el desarrollo y mostrar errores en la terminal y en el navegador. Comprueba este comportamiento con el procedimiento siguiente.
- [x] 5. `@vitejs/plugin-react` está configurado para habilitar React Fast Refresh.
- [x] 6. Variables de entorno de desarrollo y producción tipadas y leídas desde `env.constants.ts`; el banner se controla con `VITE_SHOW_OFFERS`.

Para comprobar los ejercicios 4 y 5 manualmente:

1. Ejecuta `npm start`. Introduce temporalmente un error de tipo en un archivo TypeScript y confirma que aparece tanto en la terminal como en el overlay del navegador. Después, deshaz ese cambio.
2. En la aplicación, añade tres bolsas al carrito y modifica el texto del `<h2>`. Comprueba que Fast Refresh conserva el contenido del carrito.

### Opcionales

- [ ] Opcional 1. Tailwind CSS.
- [ ] Opcional 2. Code splitting, carga bajo demanda y análisis del bundle.

## Capturas

Evidencias de los ejercicios:

- Ejercicio 1: respuesta `304` — [docs/ejercicio1-304.png](docs/ejercicio1-304.png)
- Ejercicio 5: cabecera `Cache-Control` de las dependencias — [docs/ejercicio-5-cache-control.png](docs/ejercicio-5-cache-control.png)
- Ejercicio 6: página en `preview` con los valores de producción — [docs/ejercicio-6-preview-produccion.png](docs/ejercicio-6-preview-produccion.png)

## Comprobar la compilación de producción

Ejecuta `npm run build` para generar los archivos en `dist/`. Después, usa `npm run preview` para servir esa compilación. Los nombres con hash, tamaños y tiempos de salida pueden variar entre compilaciones.

La comprobación de tipos con `vite-plugin-checker` se realiza durante el desarrollo; `npm run build` ejecuta la compilación de Vite.

## Bitácora de IA

**Herramienta utilizada:** GitHub Copilot en VS Code.

### Ejemplo 1

#### Prompt

«Añade `ImportMetaEnv` en `vite-env.d.ts` con las variables del `.env`».

#### Qué me dio

Una declaración de tipos para `VITE_SHOP_NAME`, `VITE_API_BASE` y `VITE_SHOW_OFFERS`, además de la referencia a los tipos de Vite.

#### Qué corregí y por qué

Añadí también `ViteTypeOptions.strictImportMetaEnv`; sin esa ampliación, los tipos declarados no activan la comprobación estricta de `import.meta.env`.

### Ejemplo 2

#### Prompt

«Un `src/env.constants.ts` que las lea en un único sitio y convierta `VITE_SHOW_OFFERS` en un booleano de verdad».

#### Qué me dio

Un módulo centralizado que exporta el nombre de la tienda, la URL de la API y el flag como booleano.

#### Qué corregí y por qué

Validé que el flag tenga exactamente el valor `"true"` o `"false"` antes de convertirlo. Vite entrega estas variables como cadenas; sin validación, un valor mal escrito podría interpretarse silenciosamente como `false`.

### Ejemplo 3

#### Prompt

«Si mañana cambia la URL de la API de producción, ¿basta con editar `.env.production` en el servidor? ¿Por qué nunca debe ir una clave secreta en una variable `VITE_`?»

#### Qué me dio

La explicación de que Vite sustituye las variables durante la compilación y de que los valores expuestos al cliente se pueden inspeccionar.

#### Qué corregí y por qué

Quedó aclarado que editar el `.env.production` después del build no cambia los archivos estáticos desplegados: hay que reconstruir y desplegar de nuevo, salvo que se implemente una configuración de ejecución servida por el backend.
