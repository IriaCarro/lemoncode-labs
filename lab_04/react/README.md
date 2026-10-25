# Catálogo de café · React

Aplicación del laboratorio 4 para practicar React y TypeScript. El proyecto evoluciona desde un catálogo de cafés hasta una aplicación con búsqueda, carrito, rutas y formularios para crear y editar cafés.

## Requisitos

- Node.js 22.12 o superior.

## Instalación y ejecución

```bash
npm install
npm run start
```

Para generar la versión de producción y comprobar los tipos:

```bash
npm run build
```

El comando `build` genera la aplicación con Vite y después comprueba los tipos
con `tsc --noEmit`. Vite genera el árbol de rutas que TypeScript necesita.

## Ejercicios obligatorios

- [x] O1 · El catálogo con componentes
- [x] O2 · Un carrito con estado y eventos
- [x] O3 · Cargar los cafés con `useEffect`
- [x] O4 · Un custom hook y una ref
- [x] O5 · Lista y detalle con TanStack Router
- [x] O6 · Alta de cafés con TanStack Form y Zod
- [ ] O7 · Edición y organización en pods
- [ ] O8 · README + bitácora de IA

## Ejercicios opcionales

- [ ] P1 · Un carrito que no se pierde
- [ ] P2 · Y que sobreviva también a recargar
- [ ] P3 · Una cuenta atrás para la oferta
- [ ] P4 · Filtros que viven en la URL
- [ ] P5 · Memorizar… con cabeza
- [ ] P6 · CSS Modules
- [ ] P7 · Eliminar un café

## Desafíos

- [ ] D1 · Una búsqueda con debounce
- [ ] D2 · React Compiler
- [ ] D3 · Un contrato de API distinto
- [ ] D4 · Tests de componentes
- [ ] D5 · Hacia TanStack Start

### Pregunta de O1

¿Qué aviso da React sin `key` y para qué la necesita? ¿Por qué usáis `coffee.id` y no el índice del `.map`?

**Respuesta:**
React avisa de que cada elemento de una lista necesita una `key` única. La usa para identificar los elementos entre renderizados y detectar si se han añadido, quitado o reordenado. `coffee.id` es único y estable; el índice puede cambiar al filtrar o reordenar la lista y hacer que React asocie una tarjeta con el café equivocado.

### Preguntas de O2

¿Por qué se escribe `onAdd={addToCart}` y no `onAdd={addToCart()}`? ¿Por qué el total del carrito no necesita su propio `useState`?

**Respuesta:**
`onAdd={addToCart}` pasa la función para que la tarjeta la llame cuando se pulsa el botón.
`onAdd={addToCart()}` la ejecutaría durante el render, sin esperar al clic. El total se calcula con `reduce` a partir de `cart`, así
que no hace falta duplicarlo en estado: mantener ambos podría dejarlos desincronizados.

### Preguntas de O3

¿Por qué va la petición dentro de un `useEffect` y qué significa su array de dependencias `[]`?

**Respuesta:**
La petición es un efecto secundario: ponerla dentro de `useEffect` evita iniciarla durante el render, que React puede repetir. El array vacío indica que el efecto no depende de valores reactivos y se ejecuta al montar el componente; al desmontarlo se limpia la petición pendiente. En desarrollo, `StrictMode` puede ejecutar el ciclo del efecto más de una vez para detectar problemas.

### Preguntas de O4

Si dos componentes distintos llaman a `useCoffees()`, ¿comparten datos? ¿Cuántas peticiones se hacen? ¿Por qué el foco se hace con una ref y no con un estado?

**Respuesta:**
Cada llamada a `useCoffees()` tiene su propio estado, así que los componentes no comparten los datos y cada uno inicia su propia petición al montarse. La ref permite enfocar directamente el input del DOM cuando se pulsa «Buscar» sin provocar un render; el foco es una acción imperativa, no un dato que deba controlar la interfaz.

### Preguntas de O5

¿Qué ventaja tienen las rutas frente a cambiar de pantalla con un booleano? ¿Por qué se pierde el carrito al navegar al detalle y volver?

**Respuesta:**
Una URL por pantalla se puede compartir, guardar en favoritos y abrir directamente; además, el historial del navegador permite volver y avanzar entre pantallas.
El carrito está en el estado local del catálogo, que se desmonta al abrir el detalle, así que ese estado desaparece; para conservarlo al navegar tendría que vivir en un ancestro que permanezca montado, como el layout o en el almacenamiento del navegador.

### Preguntas de O6

¿Qué diferencia hay entre los tipos de TypeScript y la validación de Zod? ¿Por qué el precio debe llegar como número?

**Respuesta:**
TypeScript comprueba los tipos durante el desarrollo y se elimina al generar JavaScript; no valida los datos que introduce una persona al usar la aplicación. Zod comprueba esos valores en tiempo de ejecución y permite rechazar o transformar entradas inválidas. El precio debe ser un número para que las reglas numéricas (mayor que cero) funcionen y para poder calcularlo sin convertirlo después; por eso el campo usa `valueAsNumber`.

## Reglas del proyecto

- Los componentes se definen como funciones y sus props tienen tipos explícitos.
- El estado nunca se muta. No uses `push`, `splice` ni asignaciones directas
  como `coffee.price = ...`; actualiza los datos con spread, `map` y `filter`.
- No guardes en estado valores que se puedan calcular. El total del carrito y la
  lista filtrada, por ejemplo, se calculan durante el render.
- Cada `.map` que renderice una lista debe asignar una `key` estable a cada
  elemento.
- `npm run build` debe terminar sin errores; el comando también comprueba los
  tipos con TypeScript.
