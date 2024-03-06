let elAddButton = document.querySelector(".add-button")
let tBody = document.querySelector(".tbody")

let elModalWrapper = document.querySelector(".modal-wrapper")
let elModal = document.querySelector(".modal")

let elNavList = document.querySelector(".nav-list")
let elItem1 = document.querySelector(".item1")
let elItem2 = document.querySelector(".item2")

elNavList.addEventListener("click", function(evt){
    if(evt.target.id){
        if(evt.target.id == 0){
            elItem1.classList.add("text-teal-500")
            elItem2.classList.remove("text-teal-500")
        }else{
            elItem2.classList.add("text-teal-500")
            elItem1.classList.remove("text-teal-500") 
        }
        renderProducts(products, tBody, evt.target.id)
    }
})

let products = JSON.parse(window.localStorage.getItem("products")) || [];  

elAddButton.addEventListener("click", function(){
    elModalWrapper.classList.add("open-modal")
    elModal.innerHTML = `
        <form class="add-form">
            <label>
                <div class="w-[80%] bg-white mx-auto">
                    <img class="rounded-[50px]" src="./images/modal-choose-img.png" alt="" width="100%" height="100%"/>
                </div>
                <input class="visually-hidden" type="file"/>
            </label>
            <div class="p-3 bg-white mt-5 flex justify-between">
                <div class="w-[49%] flex flex-col gap-5">
                    <label class="flex flex-col">
                        <span class="">
                            Enter product name
                        </span>
                        <input class="p-2 border-[1px] border-black rounded-md" type="text" placeholder="Enter product name"/>
                    </label>
                    <label class="flex flex-col">
                        <span class="">
                            Enter product old price
                        </span>
                        <input class="p-2 border-[1px] border-black rounded-md" type="text" placeholder="Enter product old price"/>
                    </label>
                    <label class="flex flex-col">
                        <span class="">
                            Enter product new price
                        </span>
                        <input class="p-2 border-[1px] border-black rounded-md" type="text" placeholder="Enter product new price"/>
                    </label>
                </div>  
                <div class="w-[49%] flex flex-col gap-5">
                    <label class="flex flex-col">
                        <span class="">
                            Enter product quantity
                        </span>
                        <input class="p-2 border-[1px] border-black rounded-md" type="text" placeholder="Enter product quantity"/>
                    </label>
                    <label class="flex flex-col">
                        <span class="">
                            Choose type
                        </span>
                        <select class="p-2 border-[1px] border-black rounded-md">
                            <option value="0">
                                Каркасные
                            </option>
                            <option value="1">
                                Надувные
                            </option>
                        </select>
                    </label>
                    <label class="flex flex-col">
                        <span class="">
                            Choose status
                        </span>
                        <select class="p-2 border-[1px] border-black rounded-md">
                            <option value="0">
                                Not
                            </option>
                            <option value="1">
                                Рекомендуем
                            </option>
                            <option value="2">
                                Скидка
                            </option>
                            <option value="3">
                                Нет в наличии
                            </option>
                        </select>
                    </label>
                </div> 
            </div>
            <button class="bg-teal-500 p-2 font-bold rounded-[15px] text-white w-[200px] block mx-auto my-5">
                Добавить
            </button>
        </form>
    `

    let elForm = document.querySelector(".add-form")

    elForm.addEventListener("submit", function(evt){
        evt.preventDefault()
        let data = {
            id: products.length,
            img: URL.createObjectURL(evt.target[0].files[0]),
            name: evt.target[1].value,
            oldPrice: evt.target[2].value,
            newPrice: evt.target[3].value,
            quantity: evt.target[4].value,
            type:evt.target[5].value,
            status:evt.target[6].value
        }
        products.push(data)
        renderProducts(products, tBody, evt.target[5].value)
        elModalWrapper.classList.remove("open-modal")
        window.localStorage.setItem("products", JSON.stringify(products))
        if( evt.target[5].value == 0){
            elItem1.classList.add("text-teal-500")
            elItem2.classList.remove("text-teal-500")
        }else{
            elItem2.classList.add("text-teal-500")
            elItem1.classList.remove("text-teal-500") 
        }
    })
})

elModalWrapper.addEventListener("click", function(evt){
    if(evt.target.id == "modal-wrapper"){
        elModalWrapper.classList.remove("open-modal")
    }
})

function renderProducts(arr, list, id){
    list.innerHTML = ""
    arr.filter(item => {
        if(item.type == id){
            let elTr = document.createElement("tr")
            elTr.innerHTML = `
                    <td class="text-center p-1 bg-slate-300 rounded-l-[20px]">
                        <img class="mx-auto" src=${item.img} alt="Render img" width="40" height="40"/>
                    </td>
                    <td class="text-center p-1 bg-slate-300 flex flex-col">
                        <del class="text-[13px]">${item.oldPrice}</del>       
                        <strong class="text-[18px] line-throw">${item.newPrice}</strong>
                    </td>
                    <td class="text-center p-1 bg-slate-300">${item.quantity}</td>
                    <td class="text-center p-1 bg-slate-300 ${item.status == "1" ? "text-green-500" : ""} ${item.status == "2" ? "text-yellow-500" : ""} ${item.status == "3" ? "text-red-500" : ""}">
                        ${item.status == "0" ? "Простой" : ""}
                        ${item.status == "1" ? "Рекомендуем" : ""}
                        ${item.status == "2" ? "Скидка" : ""}
                        ${item.status == "3" ? "Нет в наличии" : ""}
                    </td>
                    <td class="text-center p-1 bg-slate-300 rounded-r-[20px]">
                        <button class="p-1 bg-green-500 text-white rounded-md">Update</button>
                        <button class="p-1 bg-red-500 text-white rounded-md">Delete</button>
                    </td>
            `
            list.appendChild(elTr)
        }
    })
}

renderProducts(products, tBody, 0)