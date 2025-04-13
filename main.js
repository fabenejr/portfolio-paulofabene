const btnEn = document.getElementById('btn-en');


btnEn.addEventListener('click', () => {
  if (window.location.href.indexOf('index-en.html') === -1) {
    window.location.href = 'index-en.html';
  }
});

btnEn.addEventListener('click', () => {
  if (window.location.href.indexOf('index.html') === -1) {
    window.location.href = 'index.html';
  }
});
