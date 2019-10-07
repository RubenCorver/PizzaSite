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

    order.forEach(info => {
        let checkproduct = document.createElement("p")
        checkproduct.className = "checkout__product " + info.name;
        let name = document.createTextNode(info.name);

        let checkprice = document.createElement("p")
        checkprice.className = "checkout__price ";
        let price = document.createTextNode(info.price + "$");

        checkproduct.appendChild(name);
        checkprice.appendChild(price);

        checkcontainer.appendChild(checkproduct);
        checkcontainer.appendChild(checkprice);
    })
    document.querySelector(".checkout__info").appendChild(checkcontainer);
}

window.onload = function () {
    checkout()
    document.querySelector(".nav__checkout").addEventListener("click", function () {
        window.location.href = "checkout.html";
        localStorage.setItem("order", JSON.stringify(order));
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