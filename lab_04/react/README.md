# Catálogo de café · React

Aplicación del laboratorio 4 para practicar React y TypeScript. El proyecto
evoluciona desde un catálogo de cafés hasta una aplicación con búsqueda,
carrito, rutas y formularios para crear y editar cafés.

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

El comando `build` ejecuta `tsc --noEmit` antes de generar la aplicación con
Vite.

## Ejercicios obligatorios

- [x] O1 · El catálogo con componentes
- [x] O2 · Un carrito con estado y eventos
- [x] O3 · Cargar los cafés con `useEffect`
- [ ] O4 · Un custom hook y una ref
- [ ] O5 · Lista y detalle con TanStack Router
- [ ] O6 · Alta de cafés con TanStack Form y Zod
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
