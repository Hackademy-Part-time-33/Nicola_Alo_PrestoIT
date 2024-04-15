//CATTURA ELEMENTI

let MyNavbar = document.querySelector("#MyNavbar");
let links = document.querySelectorAll(".nav-link");
let logo = document.querySelector(".img-logo");




window.addEventListener("scroll", ()=>{
    let scrolled = window.scrollY;
    if (scrolled>0) {
        changeNavbar('nav-blur', 'logo_white', 'var(--White)', '2px solid var(--White)', 'transparent');
    } else {
        MyNavbar.classList.remove('nav-blur');
        changeNavbar('nav-custom', 'logo_brown', 'var(--Black)', 'transparent', 'transparent');
    }
})

function changeNavbar(background, imgLogo, color1, color2, color3) {
    MyNavbar.classList.add(background);
        logo.src = `./media/${imgLogo}.png`;
        links.forEach((link)=>{
            link.style.color = color1;
            link.addEventListener("mouseenter", ()=>{
                link.style.borderBottom = color2;
                //link.style.fontWeight = 'bold';
            })
            link.addEventListener("mouseleave", ()=>{
                link.style.borderBottom = color3
            })
        })
}

//CONTATORE
let firstNumber = document.querySelector("#firstNumber");
let myInter = document.querySelector('#myInter')

function createInterval(number, element, timing) {
    let count = 0;
    let interval = setInterval (()=>{
        if(count < number){
            count++;
            element.innerHTML = count;
            } else {
                clearInterval(interval);
            }

    }, timing)
}

let confirm = false;

let observer = new IntersectionObserver( (entries)=>{
    entries.forEach((entry)=>{
        
        if (entry.isIntersecting && confirm == false) {
            createInterval(88 , firstNumber, 80);
            confirm = true;
        }
        
    })

}); 

observer.observe(myInter);

//SWIPER

const swiper = new Swiper('.swiper', {
    speed: 600,
    parallax: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  let reviews = [
    { name : "Elia" , title : "La mia piu' bella esperienza", description: "bellissima esperienza personale gentile, preparato, rapido , prezzi onestissimi"},
    { name : "Paola" , title : "La mia piu' bella esperienza", description: "bellissima esperienza personale gentile, preparato, rapido , prezzi onestissimi"}
  ]

  let swiperWrapper = document.querySelector(".swiper-wrapper");
  let addReviews = document.querySelector("#addReviews");
  let userName = document.querySelector("#userName");
  let userTitle = document.querySelector("#userTitle");
  let userDescription = document.querySelector("#userDescription");

  function generateCars() {
    swiperWrapper.innerHTML= '';
    reviews.forEach((review) => {
        let div = document.createElement('div');
        div.classList.add('swiper-slide');
        div.innerHTML = `
        <div class="title mb-3" data-swiper-parallax="-300">${review.name}</div>
        <div class="subtitle" data-swiper-parallax="-200">${review.title}</div>
        <div class="text" data-swiper-parallax="-100">
          <p>
            ${review.description}
          </p>
        </div>
        `
        swiperWrapper.appendChild(div);
    });
}
generateCars();

addReviews.addEventListener("click", ()=>{
    reviews.push( { name : userName.value , title : userTitle.value, description: userDescription.value });
    generateCars();
    userName.value = '';
    userTitle.value= '';
    userDescription.value= '';
    swiper.update();
})

