
# 🚀 Sistema de Inventario 

Sistema web para gestión de inventario, desarrollado como evaluación técnica.
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

## ⚙️ Tecnologías y configuración

### 💻 IDE utilizado

- IntelliJ IDEA (para backend)
- Visual Studio Code (para frontend)

### ⚙️ Versión del lenguaje

- **Backend:** Java 17 (Spring Boot)
- **Frontend:** JavaScript (React) con Vite

### 🗄️ DBMS utilizado

- MySQL 8

### 🏃 Pasos para correr la aplicación

#### Backend

1. Asegúrate de tener MySQL instalado y crear la base de datos usando el script en la carpeta `SCRIPTS`.
2. Copia el archivo `application-example.properties` y renómbralo a `application.properties` en `src/main/resources`.
3. Configura tus credenciales locales en `application.properties`.
4. Ejecuta en consola:

```bash
./mvnw spring-boot:run
```

El backend quedará disponible en [http://localhost:8080](http://localhost:8080).

---

#### Frontend

1. Ve a la carpeta del frontend:

```bash
cd inventario-frontend
```

2. Instala dependencias:

```bash
npm install
```

3. Corre la app:

```bash
npm run dev
```

El frontend quedará disponible en [http://localhost:3000](http://localhost:3000).

---

## 🔐 Acceso

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
- Recuerda cambiar los datos dummy en el archivo application.properties para poder conectarte a la base de datos
---


## ⚡ Autor

**Alejandro Grajeda**
[GitHub](https://github.com/IAGrajeda)

