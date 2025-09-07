// Basic interactivity: menu, modal, carousel, year
document.addEventListener('DOMContentLoaded', () => {
  // header menu toggle for small screens
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  menuToggle && menuToggle.addEventListener('click', () => {
    if(mainNav.style.display === 'block') mainNav.style.display = '';
    else mainNav.style.display = 'block';
  });

  // login modal
  const loginBtn = document.getElementById('loginBtn');
  const loginModal = document.getElementById('loginModal');
  const closeModal = document.getElementById('closeModal');
  const modalCancel = document.getElementById('modalCancel');

  function openModal(){
    loginModal.setAttribute('aria-hidden','false');
  }
  function closeM(){
    loginModal.setAttribute('aria-hidden','true');
  }
  loginBtn && loginBtn.addEventListener('click', openModal);
  closeModal && closeModal.addEventListener('click', closeM);
  modalCancel && modalCancel.addEventListener('click', closeM);
  loginModal && loginModal.addEventListener('click', (e) => {
    if(e.target === loginModal) closeM();
  });

  // mock login submit
  const loginForm = document.getElementById('loginForm');
  if(loginForm){
    loginForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      alert('Logged in (mock). Use this form data to integrate real auth.');
      closeM();
    });
  }

  // carousel simple
  const slides = Array.from(document.querySelectorAll('.carousel .slide'));
  let cur = 0;
  const show = (i) => {
    slides.forEach((s,idx)=> s.classList.toggle('active', idx===i));
  };
  document.getElementById('prevSlide')?.addEventListener('click', ()=>{
    cur = (cur - 1 + slides.length) % slides.length; show(cur);
  });
  document.getElementById('nextSlide')?.addEventListener('click', ()=>{
    cur = (cur + 1) % slides.length; show(cur);
  });

  // set year
  document.getElementById('year').textContent = new Date().getFullYear();
});
