let orders = localStorage.getItem("order");
let order = JSON.parse(orders);

function checkout() {
    let checkcontainer = document.createElement("article")
    checkcontainer.className = "checkout__container";

    let titlename = document.createElement("p")
    titlename.className = "checkout__title";
    let tname = document.createTextNode("Product:");
    
    let titleprice = document.createElement("p")
    titleprice.className = "checkout__title";
    let tprice = document.createTextNode("Price:");

    titlename.appendChild(tname);
    titleprice.appendChild(tprice);
    checkcontainer.appendChild(titlename);
    checkcontainer.appendChild(titleprice);

    order.order.forEach(info => {
        // order.amount.forEach(amount =>{
        //     console.log(amount);
        // })
        let checkproduct = document.createElement("p")
        checkproduct.className = "checkout__product";
        checkproduct.dataset.product = info.id;
        let name = document.createTextNode(info.name);

        let checkprice = document.createElement("p")
        checkprice.className = "checkout__price";
        checkproduct.dataset.product = info.id;
        let price = document.createTextNode(info.price + "$");

        let checkicon = document.createElement("i")
        checkicon.className = "fas fa-times fa-x3 checkremove";

        checkproduct.appendChild(name);
        checkprice.appendChild(price);

        checkcontainer.appendChild(checkproduct);
        checkprice.appendChild(checkicon);
        checkcontainer.appendChild(checkprice);


    })
    document.querySelector(".checkout__info").appendChild(checkcontainer);

    let remove = document.getElementsByClassName("checkremove");

    for (let i = 0; i < remove.length; ++i) {
        let item = remove[i];
        item.addEventListener("click", function () {
            let target = event.target.dataset.product;
            let id = order.order.find(order => order.id == target);
            console.log(id);
            order.order.splice(id, 1);
            let idname = id.name;
            delete order.list.idname;
            checkout();
            document.querySelector(".checkout__info").removeChild(checkcontainer);
            localStorage.setItem("order", JSON.stringify(order));
        })
    }
}
window.onload = function () {
    checkout()
    document.querySelector(".nav__checkout").addEventListener("click", function () {
        window.location.href = "checkout.html";
    })
    document.querySelector(".nav__home").addEventListener("click", function () {
        window.location.href = "index.html";
    })
    document.querySelector(".nav__menu").addEventListener("click", function () {
        api()
    })
    document.querySelector(".fa-align-justify").addEventListener("click", function () {
        document.getElementById("switch").classList.toggle("show");
    })
}