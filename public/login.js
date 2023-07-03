/*** Wait for the DOM to be loaded ***/
window.addEventListener('DOMContentLoaded', () => {
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const circleYellow = document.querySelector('.circle-yellow');

  /*** Add event listener to the confirmPasswordInput for input changes ***/
  confirmPasswordInput.addEventListener('input', () => {
    if (passwordInput.value !== confirmPasswordInput.value) {
      circleYellow.classList.add('error');
    } else {
      circleYellow.classList.remove('error');
    }
  });
});

/*** Wait for the DOM to be loaded ***/
window.addEventListener('DOMContentLoaded', () => {
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const togglePassword = document.getElementById('togglePassword');
  const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');

  /*** Add event listener to togglePassword checkbox for change event ***/
  togglePassword.addEventListener('change', () => {
    passwordInput.type = togglePassword.checked ? 'text' : 'password';
  });

  /*** Add event listener to toggleConfirmPassword checkbox for change event ***/
  toggleConfirmPassword.addEventListener('change', () => {
    confirmPasswordInput.type = toggleConfirmPassword.checked ? 'text' : 'password';
  });

  /*** Add event listener to confirmPasswordInput for input changes ***/
  confirmPasswordInput.addEventListener('input', () => {
    if (passwordInput.value !== confirmPasswordInput.value) {
      circleYellow.classList.add('error');
    } else {
      circleYellow.classList.remove('error');
    }
  });
});

/*** Get all the elements with class 'nav a' ***/
var items = document.querySelectorAll('.nav a');

/*** Loop through the items and set their position ***/
for (var i = 0, l = items.length; i < l; i++) {
  items[i].style.left = (50 - 35 * Math.cos(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%";

  items[i].style.top = (50 + 35 * Math.sin(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%";
}

/*** Add click event listener to the '.MainBtn' element ***/
document.querySelector('.MainBtn').onclick = function (e) {
  e.preventDefault();
  document.querySelector('.nav').classList.toggle('open');
};

/*** Call the setColor function ***/
setColor();
