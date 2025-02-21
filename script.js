const URL = "https://fakestoreapi.com/products";

const productsFetch = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    for (let product of data) {
        addProducts(product)
    }

}


productsFetch()

const addProducts = (product) => {
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
            <button id="${product.id}" >Add To cart</button>
        </div>
    `;

    container.appendChild(card);
    const button = card.querySelector("button")
    button.addEventListener("click", async (e) => {
        e.preventDefault();
        let id = e.target.id;
        const response = await fetch(`${URL}/${id}`)
        const item = await response.json()
        const productItem = {
            id: item.id,
            title: item.title,
            image: item.image,
            price: item.price,
        }

        addToCart(productItem);
    })


}

function addToCart(product) {
    let cartItem = JSON.parse(localStorage.getItem("cart")) || [];

    cartItem.push(product)
    localStorage.setItem("cart",JSON.stringify(cartItem));
}

const shortTitle = (title) => {
    const maxLength = 40;
    return title.length > maxLength ? title.substring(0, maxLength) + " ..." : title;
}
