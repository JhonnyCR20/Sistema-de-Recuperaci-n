# Sistema de Autenticación

## Autor
Jhonny Miranda Salazar

## Descripción
Este proyecto es un sistema completo de autenticación de usuarios que incluye funcionalidades de inicio de sesión, registro de nuevos usuarios y recuperación de contraseñas. Está diseñado con una interfaz moderna y responsiva utilizando Bootstrap 5, y se conecta a una API para gestionar la autenticación de usuarios.

## Características

### Inicio de Sesión
- Validación de formato de correo electrónico
- Autenticación segura contra API
- Almacenamiento de sesión en el navegador
- Notificaciones de éxito/error

### Registro de Usuarios
- Formulario con validación de campos
- Creación de nuevas cuentas de usuario
- Redirección automática al formulario de inicio de sesión tras registro exitoso
- Validación para evitar duplicados de correo electrónico

### Recuperación de Contraseña
- Sistema de recuperación basado en correo electrónico
- Validación de formato de correo
- Notificaciones de estado del proceso

## Tecnologías Utilizadas

- **HTML5**: Estructura del sitio
- **CSS3**: Estilos personalizados
- **JavaScript**: Lógica de cliente y validaciones
- **Bootstrap 5**: Framework CSS para diseño responsivo
- **Bootstrap Icons**: Iconografía
- **Fetch API**: Para comunicación con el servidor

## Configuración

El sistema está configurado para conectarse a una API en la URL base: `https://paginas-web-cr.com/Api/apis`. Si necesitas cambiar esta configuración, modifica la constante `API_BASE_URL` en el archivo `login.js`.

## Uso

### Iniciar Sesión
1. Ingresa tu correo electrónico registrado
2. Ingresa tu contraseña
3. Haz clic en "Iniciar Sesión"

### Registrarse
1. Haz clic en la pestaña "Registrarse"
2. Completa el formulario con tu nombre, correo electrónico y contraseña
3. Haz clic en "Registrarse"

### Recuperar Contraseña
1. Haz clic en la pestaña "Recuperar Contraseña"
2. Ingresa el correo electrónico asociado a tu cuenta
3. Haz clic en "Recuperar Contraseña"
4. Sigue las instrucciones enviadas a tu correo electrónico

## Estructura del Proyecto

- `index.html`: Contiene la estructura HTML y los formularios
- `login.js`: Contiene toda la lógica de autenticación y comunicación con la API

## Licencia

Este proyecto está bajo la Licencia MIT.
