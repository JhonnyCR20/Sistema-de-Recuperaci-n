// Configuración de la API
const API_BASE_URL = 'https://paginas-web-cr.com/Api/apis';

// Referencias a formularios
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const recoveryForm = document.getElementById('recoveryForm');

// Toast de notificación
const toast = document.getElementById('notificationToast');
const toastTitle = document.getElementById('toastTitle');
const toastMessage = document.getElementById('toastMessage');
const bsToast = new bootstrap.Toast(toast);

// Mostrar notificación
function showNotification(title, message, type = 'info') {
  toastTitle.textContent = title;
  toastMessage.textContent = message;
  toast.className = `toast text-bg-${type}`;
  bsToast.show();
}

// Validar formato de correo
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Manejar errores de API
function handleApiError(error) {
  console.error('Error:', error);
  showNotification('Error', 'Error de conexión con el servidor. Intente más tarde.', 'danger');
}

// Enviar solicitud a la API
async function apiRequest(endpoint, data) {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error(`Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}

// Login
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  loginForm.classList.add('was-validated');

  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  if (!email || !password || !isValidEmail(email)) {
    showNotification('Error', 'Complete todos los campos correctamente.', 'danger');
    return;
  }

  try {
    const result = await apiRequest('AutenticarUsuario.php', { email, password });

    if (result.code === 200 || result.success) {
      sessionStorage.setItem('userSession', JSON.stringify({
        email: email,
        isAuthenticated: true
      }));
      showNotification('Éxito', 'Inicio de sesión exitoso.', 'success');
    } else {
      showNotification('Error', 'Credenciales incorrectas.', 'danger');
    }
  } catch (_) {}
});

// Registro
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  registerForm.classList.add('was-validated');

  const name = document.getElementById('registerName').value.trim();
  const email = document.getElementById('registerEmail').value.trim();
  const password = document.getElementById('registerPassword').value;

  if (!name || !email || !password || !isValidEmail(email)) {
    showNotification('Error', 'Complete todos los campos correctamente.', 'danger');
    return;
  }

  try {
    const result = await apiRequest('InsertarUsuarios.php', { name, email, password });

    if (result.code === 200 || result.success) {
      showNotification('Éxito', 'Cuenta creada. Puede iniciar sesión.', 'success');
      registerForm.reset();
      document.getElementById('login-tab').click();
    } else {
      showNotification('Error', result.message || 'El correo ya está registrado.', 'danger');
    }
  } catch (_) {}
});

// Recuperar contraseña (ahora con envío real)
recoveryForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const emailInput = document.getElementById('recoveryEmail');
  const email = emailInput.value.trim();

  recoveryForm.classList.add('was-validated');

  // Validación del campo nativo + formato de correo
  if (!recoveryForm.checkValidity() || !isValidEmail(email)) {
    showNotification('Error', 'Ingrese un correo electrónico válido.', 'danger');
    return;
  }

  try {
    const result = await apiRequest('SendPassword.php', { email });

    if (result.code === 200 || result.success) {
      showNotification('Información', 'Se ha enviado un correo con instrucciones de recuperación.', 'info');
      recoveryForm.reset();
      recoveryForm.classList.remove('was-validated');
    } else {
      showNotification('Error', result.message || 'No se pudo enviar el correo.', 'danger');
    }
  } catch (_) {}
});

// Limpiar validación al cambiar de pestaña
document.querySelectorAll('[data-bs-toggle="tab"]').forEach(tab => {
  tab.addEventListener('shown.bs.tab', () => {
    loginForm.classList.remove('was-validated');
    registerForm.classList.remove('was-validated');
    recoveryForm.classList.remove('was-validated');
  });
});