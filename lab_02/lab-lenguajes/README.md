# 🧪 Laboratorio · Módulo 02 · JavaScript — Tueste ☕

Katas de JavaScript y TypeScript sobre el catálogo de **Tueste**, el tostadero de café: tipos, funciones, destructuring, opcionales, arrays, inmutabilidad, uniones y genéricos, tipos de utilidad, closures e Immer.

## 🚀 Cómo arrancarlo

```bash
npm install
npm run dev
```

Abrid la URL que muestra Vite (por defecto `http://localhost:5173`) y la consola de DevTools (`F12` → `Console`). Ahí sale la salida de todas las katas, porque `src/main.ts` las importa una a una.

También se puede ver la salida en la terminal, sin navegador:

```bash
npx tsx src/main.ts
```

## 📸 Salida de las katas

<!-- TODO: añadir la captura de la consola -->

![Salida de las katas en la consola](./docs/consola.png)

## ✅ Comprobación de tipos

```bash
npx tsc
```

## 📂 Estructura

```text
src/
├── types.ts                  ← O1 · tipos del catálogo
├── data.ts                   ← datos de partida
├── o01-tipos.ts
├── o02-funciones.ts
├── o03-destructuring.ts
├── o04-opcionales.ts
├── o05-arrays.ts
├── o06-carrito.ts
├── o07-pureza.ts
├── o08-uniones-genericos.ts
├── o09-utilidad.ts
├── o10-closures.ts
├── o11-immer.ts
└── main.ts                   ← importa todas las katas
```

## 📝 Respuestas a las preguntas 📝 y 🔍

### O2 · 🔍 Quitar un `case` del `switch`

TypeScript da: _"Function lacks ending return statement and return type does not include 'undefined'."_ Con un tueste sin `case`, la función no devolvería nada, y el tipo de retorno dice `string`. Comentario en [src/o02-funciones.ts](src/o02-funciones.ts).

### O3 · 📝 El `...` de la última línea

No es rest, es **spread**: `sumAll(...coffees.map((coffee) => coffee.stock))` expande el array de stocks en argumentos sueltos, que `sumAll` vuelve a recoger con su parámetro rest. Comentario en [src/o03-destructuring.ts](src/o03-destructuring.ts).

### O5 · 🔍 Cambiar `toSorted` por `sort`

`sort` ordena el array en el sitio, así que mutaría `coffees` y la última línea (`coffees.map(coffee => coffee.name)`) saldría en otro orden. `toSorted` devuelve un array nuevo.

### O8 · 🔍 Borrar `delivered` de `statusLabel` y tipos de `findById`

- Error: _"Property 'delivered' is missing in type '{ pending: string; roasting: string; shipped: string; }' but required in type 'Record<OrderStatus, string>'."_
- `findById(coffees, 4)` devuelve `Coffee | null` y `findById(customers, 3)` devuelve `Customer | null`: el genérico `T` se infiere de la lista que se le pasa.

Comentario en [src/o08-uniones-genericos.ts](src/o08-uniones-genericos.ts).

### O10 · 📝 `.map(blackFriday)`, ¿pura?

- No se ponen paréntesis porque no la llamamos nosotros: le pasamos la función a `map` y es `map` quien la llama con cada precio. `blackFriday()` pasaría su resultado, no la función.
- `blackFriday` es **pura**: mismo precio de entrada, mismo resultado, y no modifica nada fuera.
- `nextOrderId` es **impura**: mismo parametro de entrada devuelve distintos resultados despendiendo de la variable count

Comentario en [src/o10-closures.ts](src/o10-closures.ts).

### O11 · 📝 ¿Spread o Immer?

Immer es mucho más legible, sobre todo con objetos anidados (cambiar `customer.address.city` con spread obliga a copiar tres niveles). A cambio, añade una dependencia. Spread para cambios planos o de un nivel; Immer cuando hay anidamiento profundo o varios cambios a la vez. Comentario en [src/o11-immer.ts](src/o11-immer.ts).

## ☑️ Checklist

### Obligatorios

- [x] O1 · Tipar el catálogo
- [x] O2 · Funciones básicas
- [x] O3 · Destructuring y rest
- [x] O4 · Datos que pueden faltar
- [x] O5 · Métodos de arrays
- [x] O6 · El carrito inmutable
- [x] O7 · ¿Pura o impura?
- [x] O8 · Uniones, Record y genéricos
- [x] O9 · Tipos de utilidad
- [x] O10 · Closures
- [x] O11 · Immer
- [x] O12 · README + bitácora de IA

### Opcionales

- [ ] P1 · Tests con Vitest
- [ ] P2 · Deshacer en el carrito
- [ ] P3 · Agrupar con reduce
- [ ] P4 · Ordenar por cualquier propiedad
- [ ] P5 · Datos desconocidos con `unknown`
- [ ] P6 · Vuestros propios `map` y `filter`
- [ ] P7 · Modelad los datos de vuestro TFM

### Desafíos

- [ ] D1 · Pintad el catálogo en la landing del módulo 1
- [ ] D2 · Uniones discriminadas
- [ ] D3 · Medid el coste de la inmutabilidad
- [ ] D4 · Un pedido como en React (reducer con Immer)
- [ ] D5 · Vuestro propio `reduce`

## 🤖 Bitácora de IA

**Herramientas usadas:**: Claude Code

### Ejemplo 1

#### Prompt

Explicame como funciona el operador spread

#### Qué me dio

...

#### Qué corregí y por qué

...

### Ejemplo 2

#### Prompt

"..."

#### Qué me dio

...

#### Qué corregí y por qué

...

### Ejemplo 3

#### Prompt

"..."

#### Qué me dio

...

#### Qué corregí y por qué

...
