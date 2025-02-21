const URL = "https://fakestoreapi.com/products";

const productsFetch = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    for (let product of data) {
        addProducts(product)            
    }
    
}


productsFetch()

const addProducts = (product) =>{
    const title = shortTitle(product.title);

    const container = document.querySelector(".container");
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
    <div class="images">
            <img src="${product.image}" alt="">
        </div>
        <div class="title">
        <h4> ${title}</h4>
        </div>
        <span>$ ${product.price}</span>
        <div class="btn">
            <button>Add To cart</button>
        </div>
    `;

    container.appendChild(card);
}

const shortTitle = (title) => {
    const maxLength = 40;
    return title.length > maxLength ? title.substring(0,maxLength)+" ..." : title;
}
