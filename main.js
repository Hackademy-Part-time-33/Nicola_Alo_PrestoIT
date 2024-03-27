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
        logo.src = `http://127.0.0.1:5500/media/${imgLogo}.png`;
        links.forEach((link)=>{
            link.style.color = color1;
            link.addEventListener("mouseenter", ()=>{
                link.style.borderBottom = color2
                //link.classList.add('font-weight-light')
            })
            link.addEventListener("mouseleave", ()=>{
                link.style.borderBottom = color3
            })
        })
}