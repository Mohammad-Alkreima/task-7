const form = document.querySelector(`.filters`)
const searchInput = document.querySelector(`#searchInput`)
const category = document.querySelector(`#category`)
const priceFilter = document.querySelector(`#priceFilter`)
const contaienr = document.querySelector(`.productsContainer`)


let products = JSON.parse(localStorage.getItem("products")) || []
// let filteredProducts = [...products]

const read = (list) => {
    contaienr.innerHTML = ""
    list.forEach((product) => {
        contaienr.innerHTML += `
            <div class="card">
                <img src="${product.img}">
                <h3>${product.name}</h3>
                <p>${product.category}</p>
                <p>${product.price}</p>
            </div>
        `
    })
}

const filterCategory = () => {
    const categories = ["all", ...new Set(products.map((product) => {return product.category}))]
    category.innerHTML = categories.map((category) => {
        return `<option value="${category}">${category}</option>`
    })
}

form.addEventListener("submit", (event) => {
    event.preventDefault()
    let result = [...products]
    // search by name
    const search = searchInput.value.toLowerCase()
    if(search) {
        result = result.filter((product) => {
            return product.name.toLowerCase().includes(search)
        })
    }
    // console.log(result)
    read(result)
    // by category
    const seclectCategory = category.value
    if(seclectCategory != "all") {
        result = result.filter((product) => {
            return product.category == seclectCategory
        })
    }
    read(result)
    // sorting
    const sort = priceFilter.value
    if(sort == "asc") {
        result = result.sort((a, b) => {
            return a.price - b.price
        })
    } else if(sort == "desc") {
        result = result.sort((a, b) => {
            return b.price - a.price
        })
    }
    read(result)
})

filterCategory()

read(products)

const productsSlider = document.querySelector("#productsSlider")
const prevBtn = document.querySelector("#prevBtn")
const nextBtn = document.querySelector("#nextBtn")

prevBtn.addEventListener("click", () => {
    // productsSlider.scrollBy({ left: -300, behavior: "smooth" });
    const card = document.querySelector(".card");
    // console.log(card)
    const scrollAmount = card ? card.offsetWidth + 20 : 220; // 20 = margin (gap)
    // console.log(scrollAmount)
    productsSlider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
});

nextBtn.addEventListener("click", () => {
    // productsSlider.scrollBy({ left: 300, behavior: "smooth" });
    const card = document.querySelector(".card");
    const scrollAmount = card ? card.offsetWidth + 20 : 220;
    productsSlider.scrollBy({ left: scrollAmount, behavior: "smooth" });
});