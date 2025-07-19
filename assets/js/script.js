const form = document.querySelector("#addProduct")
const nameProduct = document.querySelector("#nameProduct")
const price = document.querySelector("#price")
const category = document.querySelector("#category")
const linkImg = document.querySelector("#linkImg")
const add = document.querySelector("#add")
const container = document.querySelector("table tbody")

let products = JSON.parse(localStorage.getItem("products")) || []
let lastId = parseInt(localStorage.getItem("lastId")) || 0

const read = () => {
    container.innerHTML = ""
    products.forEach((product) => {
        container.innerHTML += `
            <tr>
                <td>
                    ${product.name}
                </td>
                <td>
                    ${product.price}
                </td>
                <td>
                    ${product.category}
                </td>
                <td>
                    
                    <img src="${product.img}" width="60" height="60">
                </td>
                <td><button onclick="handleEdit(${product.id})">edit</button><button onclick="deleteProduct(${product.id})">delete</button></td>
            </tr>`
    })
}



form.addEventListener("submit", (event) => {
    event.preventDefault()
    let product = {
        id: lastId + 1,
        name: nameProduct.value,
        price:price.value,
        category: category.value,
        img: linkImg.value
    }
    products.push(product)
    nameProduct.value = ""
    price.value = ""
    category.value = ""
    linkImg.value = ""
    lastId = product.id
    localStorage.setItem("products", JSON.stringify(products))
    localStorage.setItem("lastId", lastId)
    read()
})

const deleteProduct = (id) => {
    products =  products.filter((product) => {
        return product.id != id
    })
    localStorage.setItem("products", JSON.stringify(products))
    read()
}

const handleEdit = (id) => {
    const product = products.find((product) => {return product.id == id})
    nameProduct.value = product.name
    price.value = product.price
    category.value = product.category
    linkImg.value = product.img
    deleteProduct(id)
    localStorage.setItem("products", JSON.stringify(products))
}


read()
