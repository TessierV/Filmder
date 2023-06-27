window.addEventListener('DOMContentLoaded', () => {
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const circleYellow = document.querySelector('.circle-yellow');

  confirmPasswordInput.addEventListener('input', () => {
    if (passwordInput.value !== confirmPasswordInput.value) {
      circleYellow.classList.add('error');
    } else {
      circleYellow.classList.remove('error');
    }
  });
});

window.addEventListener('DOMContentLoaded', () => {
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const togglePassword = document.getElementById('togglePassword');
  const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');

  togglePassword.addEventListener('change', () => {
    passwordInput.type = togglePassword.checked ? 'text' : 'password';
  });

  toggleConfirmPassword.addEventListener('change', () => {
    confirmPasswordInput.type = toggleConfirmPassword.checked ? 'text' : 'password';
  });

  confirmPasswordInput.addEventListener('input', () => {
    if (passwordInput.value !== confirmPasswordInput.value) {
      circleYellow.classList.add('error');
    } else {
      circleYellow.classList.remove('error');
    }
  });
});

var items = document.querySelectorAll('.nav a');

for (var i = 0, l = items.length; i < l; i++) {
  items[i].style.left = (50 - 35 * Math.cos(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%";

  items[i].style.top = (50 + 35 * Math.sin(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%";
}

document.querySelector('.MainBtn').onclick = function (e) {
  e.preventDefault(); document.querySelector('.nav').classList.toggle('open');
}
setColor();
