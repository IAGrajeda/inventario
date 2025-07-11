
# 🚀 Inventario Castores

Sistema web para gestión de inventario, desarrollado como evaluación técnica para Castores.
Incluye control de productos, historial de movimientos y manejo de roles (Administrador y Almacenista).

---

## 🗂️ Estructura del proyecto

```
inventario/
├── inventario-frontend/   → Frontend (React + Tailwind)
├── src/                   → Backend (Spring Boot)
├── pom.xml               → Configuración Maven
├── mvnw / mvnw.cmd       → Wrapper Maven
└── ...
```

---

## 💡 Funcionalidades principales

✅ Gestión de productos (crear, dar de baja, reactivar)  
✅ Entradas y salidas de inventario  
✅ Historial detallado de movimientos  
✅ Roles con permisos: Administrador y Almacenista  
✅ Modal para indicar cantidad en entradas y salidas  
✅ Validación para evitar cantidades negativas  
✅ Validación de stock para no permitir sacar más de lo disponible  
✅ Experiencia interactiva mejorada (uso de modales en lugar de inputs fijos)  
✅ UI adaptativa con Tailwind CSS

---

## 👤 Roles y permisos

| Permiso                      | Administrador | Almacenista |
|-----------------------------|---------------|-------------|
| Ver inventario              | ✅            | ✅          |
| Agregar nuevos productos   | ✅            | ❌          |
| Aumentar inventario       | ✅            | ❌          |
| Dar de baja/reactivar      | ✅            | ❌          |
| Ver módulo de salidas     | ❌            | ✅          |
| Sacar inventario         | ❌            | ✅          |
| Ver histórico              | ✅            | ❌          |

---

## ⚙️ Instalación y ejecución

### Backend (Spring Boot)

```bash
./mvnw spring-boot:run
```

El backend corre por default en: [http://localhost:8080](http://localhost:8080)

---

### Frontend (React)
Tambien se debe tener instalado NODE.js

```bash
cd inventario-frontend
npm install
npm run dev
```

El frontend corre por default en: [http://localhost:3000](http://localhost:3000)

---

## 🔐 Accesos

### Usuarios por defecto

- **Administrador**
  - Usuario: cualquiera (nombre libre)
  - Contraseña: `admin123`

- **Almacenista**
  - Usuario: cualquiera (nombre libre)
  - Contraseña: `alma123`

---

## 📝 Notas adicionales

- Se agregaron modales para las opciones de "Entrada" y "Salida", permitiendo al usuario especificar la cantidad deseada en cada operación.
- Se valida que la cantidad ingresada sea mayor a cero y, en el caso de salidas, que no exceda el stock disponible.
- Los movimientos muestran nombre y rol del usuario.
- Todo el historial y las tablas son adaptativos (scroll y altura responsive).
- El archivo `application-example.properties` contiene datos dummy, cambiarlos para poder entrar a la base de datos.

---

## ⚡ Autor

**Alejandro Grajeda**
[GitHub](https://github.com/IAGrajeda)
