var preloader = document.getElementById('loading');
const clickx= document.getElementById('pencet');
const clicky= document.getElementById('menu');
const menu = document.querySelector('.navigation');

function myFunction(){
    preloader.style.opacity='0';
};

clickx.addEventListener('click', ()=>{
  clickx.classList.toggle('simple');
});

clicky.addEventListener('click', ()=>{
    menu.classList.toggle('Diam');
});