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

//JSON


//FILTRO CHECK
fetch("./annunci.json").then((response)=>response.json()).then((data)=> {
    let categoryWrap = document.querySelector("#categoryWrap");
    let cardWrap = document.querySelector("#cardWrap");


    function setCategory() {
        let category = data.map((annuncio)=> annuncio.category);
        let uniqueCategory = []; 
 
        category.forEach((category)=> {
            if(!uniqueCategory.includes(category) ) {
                uniqueCategory.push(category);
            }
        });
        //console.log(uniqueCategory);

        uniqueCategory.forEach((category)=> {
            let div = document.createElement('div');
            div.classList.add('form-check');
            div.innerHTML = `
            <input class="form-check-input" type="radio" name="category" id="${category}"> 
            <label class="form-check-label" for="${category}">
            ${category}
            </label>
            `
            categoryWrap.appendChild(div);
        })

    }
    setCategory();

    let radios = document.querySelectorAll(".form-check-input");

    function showCards(array) {

        array.sort((a,b)=> b.price - a.price );

        cardWrap.innerHTML = '';

        array.forEach((annuncio) => {
            let div = document.createElement("div");
            div.classList.add("card","mb-4","myCard");
            div.style.width = " 18rem";
            div.innerHTML = `
            
            <img src="${annuncio.image}" class="card-img-top imgCard" alt="immagine card">
            <div class="card-body text-center">
              <h5 class="card-title">${annuncio.name}</h5>
              <p class="card-text">${annuncio.category}</p>
              <p class="txtPrice">${annuncio.price} $</p>
              <a href="#" class="btn btn-custom">COMPRA</a>
            </div>
            
            `
            cardWrap.appendChild(div);

        });
    }
    showCards(data);

    function filterByCategory() {
        let checked = Array.from(radios).find((button)=> button.checked);
        let categoria = checked.id;
       
        if (categoria != "All") {
            let filtered = data.filter((annuncio) => annuncio.category == categoria);
            showCards(filtered);         
        }else{
            showCards(data);
        }    
    }

    filterByCategory();
    
    radios.forEach((button)=>{
        button.addEventListener("click", ()=>{
            filterByCategory()
        })
    })
    
    // FILTRO RANGE

    let inputPrice = document.querySelector("#inputPrice"); 
    let priceNum = document.querySelector("#priceNum");

    function setPriceInput() {
        let maxPrice = data[0].price;
        inputPrice.max = maxPrice;
        inputPrice.value = maxPrice;
        priceNum.innerHTML = maxPrice;
        
    }

    setPriceInput();

    inputPrice.addEventListener("input", ()=> {
        priceNum.innerHTML = inputPrice.value;
        filterByPrice();
    })

    function filterByPrice() {
        let filtered = data.filter((annuncio)=> +annuncio.price <= +inputPrice.value);
        showCards(filtered);
        
    }

    //PAROLA

    let inputWord = document.querySelector("#inputWord")
    inputWord.addEventListener("input", ()=>{
        filterByWorld();
    })

    function filterByWorld(annuncio) {
        let filteredWord = data.filter((annuncio)=> annuncio.name.toLowerCase().includes(inputWord.value.toLowerCase()));
        showCards(filteredWord);
    }
})