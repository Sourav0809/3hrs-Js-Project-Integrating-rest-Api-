let mainFrom = document.querySelector("#main-form")
let productName = document.querySelector("#productname")
let productPrice = document.querySelector("#productprice")
let ul = document.querySelector(".listitems")
let totalPrice = document.getElementById("total-price")




/* -------------------------------------------------------------------------- */
/*                       Fetching Data On every Refresh                       */
/* -------------------------------------------------------------------------- */

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/568315bbd24a470aa21f093563dfe8e3/ItemLists")
        .then((res) => {
            for (let i = 0; i < res.data.length; i++) {
                ul.innerHTML += `<li class="lists"><span class="id-token">${res.data[i]._id}</span> <span>${res.data[i].ItemName}</span> <span>${res.data[i].itemPrice}</span> <button class="delete-btn">Delete</button></li>`
                totalPrice.textContent = Number(totalPrice.textContent) + Number(res.data[i].itemPrice)
            }
        })
        .catch((err) => console.log(err))
})




/* -------------------------------------------------------------------------- */
/*                            add item into server                            */
/* -------------------------------------------------------------------------- */
mainFrom.addEventListener("submit", async (e) => {
    e.preventDefault()
    try {

        let productObj = {
            ItemName: productName.value,
            itemPrice: productPrice.value
        }

        const { data } = await axios.post('https://crudcrud.com/api/568315bbd24a470aa21f093563dfe8e3/ItemLists', productObj)
        console.log(data)

        const enteredName = productName.value
        const enteredPrice = productPrice.value
        ul.innerHTML += `<li class="lists"><span class="id-token">${data._id}</span> <span>${enteredName}</span> <span>${enteredPrice}</span> <button class="delete-btn">Delete</button></li>`
        totalPrice.textContent = Number(totalPrice.textContent) + Number(enteredPrice)
        // also doing the input fields empty
        productName.value = ""
        productPrice.value = ""
    } catch (error) {
        console.log(error)

    }

})



/* -------------------------------------------------------------------------- */
/*                            delete item function                            */
/* -------------------------------------------------------------------------- */

ul.addEventListener('click', async (e) => {
    try {
        if (e.target.classList.contains("delete-btn")) {
            if (confirm("Are You Sure ?")) {
                const li = e.target.parentElement
                const idToken = li.firstElementChild.innerText
                await axios.delete(`https://crudcrud.com/api/568315bbd24a470aa21f093563dfe8e3/ItemLists/${idToken}`)
                totalPrice.textContent = Number(totalPrice.textContent) - Number(li.children[2].textContent)
                li.remove()
            }
        }

    } catch (err) {
        console.log(err)

    }
})