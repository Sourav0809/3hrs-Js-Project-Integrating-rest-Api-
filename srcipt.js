let mainFrom = document.querySelector("#main-form")
let productName = document.querySelector("#productname")
let productPrice = document.querySelector("#productprice")
let ul = document.querySelector(".listitems")
let totalPrice = document.getElementById("total-price")
let userIcon = document.querySelector(".user-icon")




/* -------------------------------------------------------------------------- */
/*                       Fetching Data On every Refresh                       */
/* -------------------------------------------------------------------------- */

window.addEventListener("DOMContentLoaded", async () => {
    try {
        let res = await axios.get(`${JSON.parse(localStorage.getItem("url"))}/ItemLists`)

        for (let i = 0; i < res.data.length; i++) {
            ul.innerHTML += `<li class="lists"><span class="id-token">${res.data[i]._id}</span> <span>${res.data[i].ItemName}</span> <span>${res.data[i].itemPrice}</span> <button class="delete-btn">Delete</button></li>`
            totalPrice.textContent = Number(totalPrice.textContent) + Number(res.data[i].itemPrice)
        }


    } catch (error) {
        console.log(error)

    }

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
        // using destructor over here to get the actual data 
        const { data } = await axios.post(`${JSON.parse(localStorage.getItem("url"))}/ItemLists`, productObj)
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
                await axios.delete(`${JSON.parse(localStorage.getItem("url"))}/ItemLists/${idToken}`)

                totalPrice.textContent = Number(totalPrice.textContent) - Number(li.children[2].textContent)
                li.remove()
            }
        }

    } catch (err) {
        console.log(err)

    }
})



/* -------------------------------------------------------------------------- */
/*                Adding the network link to the  localStorage                */
/* -------------------------------------------------------------------------- */

userIcon.addEventListener("click", () => {
    let url = prompt("Enter the link here.....")

    localStorage.setItem("url", JSON.stringify(url))
})