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

| Comando           | Para qué sirve                                                                  |
| ----------------- | ------------------------------------------------------------------------------- |
| `npm start`       | Comprueba los tipos con TypeScript y arranca el servidor de desarrollo de Vite. |
| `npm run build`   | Comprueba los tipos y genera la versión de producción en `dist/`.               |
| `npm run preview` | Sirve localmente la última compilación de `dist/` para probarla.                |

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

Vite transpila TypeScript a JavaScript para servirlo rápidamente, pero esa transformación no comprueba que los tipos sean compatibles. Comprobar tipos requiere analizar las relaciones entre módulos y es una tarea distinta, que puede ejecutarse con `npx tsc --noEmit`.

`isolatedModules` es una opción de TypeScript que avisa de construcciones que no se pueden transformar tratando cada fichero de forma aislada; no activa la comprobación de tipos.

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

- [x] 1. Proyecto Vite con scripts `start`, `build` y `preview`; `npm run build` termina correctamente.
- [x] 2. Estilos Sass compilados a CSS en producción.
- [x] 3. Recursos de imagen procesados por Vite; la compilación genera la foto con hash en `dist/assets/`.
- [ ] 4. Comprobación de tipos con `vite-plugin-checker` durante desarrollo y build. El build comprueba tipos con `tsc --noEmit`, pero falta configurar el plugin y verificar su capa en el navegador.
- [ ] 5. React y su actualización Fast Refresh. La aplicación usa React, pero `@vitejs/plugin-react` está instalado y todavía no está registrado en una configuración de Vite.
- [x] 6. Variables de entorno de desarrollo y producción tipadas y leídas desde `env.constants.ts`; el banner se controla con `VITE_SHOW_OFFERS`.

### Opcionales

- [ ] Opcional 1. Tailwind CSS.
- [ ] Opcional 2. Code splitting, carga bajo demanda y análisis del bundle.

## Capturas pendientes

El enunciado pide adjuntar estas evidencias. No se han añadido todavía; guardadlas en `docs/` con estos nombres:

- Pendiente: `docs/ejercicio-1-304.png` — respuesta `304` del ejercicio 1.
- Pendiente: `docs/ejercicio-5-cache-control.png` — cabecera `Cache-Control` de las dependencias del ejercicio 5.
- Pendiente: `docs/ejercicio-6-preview-produccion.png` — página en `preview` con los valores de producción del ejercicio 6.

## Salida de `npm run build`

Salida comprobada en este proyecto:

```text
> lab-bundling@1.0.0 build
> npx tsc --noEmit && vite build

vite v8.3.4 building client environment for production...
✓ 19 modules transformed.
computing gzip size...
dist/index.html                        5.57 kB │ gzip:  4.22 kB
dist/assets/initial-2-BJOvV7C0.webp   46.52 kB
dist/assets/index-DNlKy9pS.css         0.04 kB │ gzip:  0.05 kB
dist/assets/index-BqRp4iy3.js        220.31 kB │ gzip: 69.00 kB

✓ built in 152ms
```

Los hashes y tiempos pueden variar en siguientes compilaciones.

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
