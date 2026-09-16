<div align="center">
  <img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="PokéAPI Logo" />

  # ⚡ Pokédex: Interfaz Declarativa con React ⚡

  <p>
    <strong>Migración de una aplicación Vanilla JavaScript a una arquitectura moderna y escalable utilizando React, TypeScript y Vite.</strong>
  </p>

  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)

</div>

---

## 📝 Datos del Alumno

- **Nombre:** Mayro Gameros
- **Proyecto:** [S9] Migración del Pokédex a una interfaz declarativa
- **Perfil de GitHub:** [@MayroGamerosXZ](https://github.com/MayroGamerosXZ)

---

## 📖 Descripción del Proyecto

Este proyecto consiste en la migración de un clásico proyecto de Pokédex construido originalmente con HTML, CSS y Vanilla JavaScript hacia una **interfaz declarativa** moderna. 

A través del uso de **React** y **TypeScript**, se han implementado componentes modulares y reutilizables, separando de manera estricta la lógica de acceso a datos de los componentes de presentación.

### ✨ Características Principales

*   **Renderizado Declarativo:** Manejo eficiente de colecciones de Pokémon utilizando `.map()` con `keys` estables (IDs) para garantizar un ciclo de vida limpio y sin duplicados en el DOM.
*   **Búsqueda Optimizada:** Formulario controlado que aprovecha la etiqueta `<datalist>` nativa para proveer sugerencias al instante, combinado con un sistema de **Debouncing** para no saturar la API en cada pulsación.
*   **Control de Peticiones:** Uso avanzado de `AbortController` para cancelar peticiones HTTP previas (fetch) que ya no sean relevantes, mejorando el rendimiento de red y previniendo "condiciones de carrera" (race conditions).
*   **Efectos 3D y Visuales:** Tarjetas de Pokémon con colores dinámicos basados en sus tipos, sprites retro-animados y efectos tridimensionales en CSS al hacer *hover*.
*   **Text-to-Speech (Voz Integrada):** Uso de la Web Speech API nativa del navegador. Al seleccionar un Pokémon, no solo escucharás su icónico grito, sino que una voz narrará su nombre y su tipo en español (ej. *"Charmander. Pokémon de tipo fuego."*).

---

## 🏗️ Arquitectura de Componentes

La aplicación está dividida en cuatro pilares de presentación y una capa de servicios:

1.  **`App`:** Orquestador principal. Mantiene el estado global (búsqueda, paginación, colecciones).
2.  **`SearchForm`:** Input con control de estados y un temporizador `useEffect` para emitir la búsqueda tras dejar de escribir.
3.  **`PokemonList` & `PokemonCard`:** Renderizado de las tarjetas. Inyectan de manera dinámica las variables CSS para los colores de tipo.
4.  **`RequestStatus`:** Intercepta la UI para representar claramente los estados: *Cargando (Skeletons)*, *Éxito*, *Error* o *Sin Resultados*.
5.  **`pokeApi` (Servicios):** Módulo asíncrono para abstraer los llamados a la API oficial `https://pokeapi.co/`.

---

## 🚀 Instalación y Despliegue

Para levantar este proyecto en tu entorno local, sigue los siguientes pasos:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/MayroGamerosXZ/S9-Migraci-n-del-Pok-dex-a-una-interfaz-declarativa.git
   ```
2. **Navegar al directorio:**
   ```bash
   cd S9-Migraci-n-del-Pok-dex-a-una-interfaz-declarativa
   ```
3. **Instalar las dependencias:**
   ```bash
   npm install
   ```
4. **Ejecutar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

El proyecto estará disponible en `http://localhost:5173`.

---
<div align="center">
  <i>Construido con dedicación para consolidar arquitecturas front-end basadas en componentes.</i>
</div>
