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
    order.list.forEach(quantity => {
        let checkquantity = document.createElement("p")
        checkquantity.className = "checkout__quantity";
        let name = document.createTextNode(quantity[info.name]);
        checkquantity.appendChild(name);
    });
    order.order.forEach(info => {

        let checkproduct = document.createElement("p")
        checkproduct.className = "checkout__product";
        let name = document.createTextNode(info.name);

        let checkprice = document.createElement("p")
        checkprice.className = "checkout__price";
        checkprice.setAttribute("productid", info.id);
        let price = document.createTextNode(info.price + "$");

        let checkicon = document.createElement("i")
        checkicon.className = "checkremove fas fa-times fa-x3";

        checkproduct.appendChild(name);
        checkprice.appendChild(price);

        checkproduct.appendChild(checkquantity);
        checkcontainer.appendChild(checkproduct);
        checkprice.appendChild(checkicon);
        checkcontainer.appendChild(checkprice);


    })

    document.querySelector(".checkout__info").appendChild(checkcontainer);

    let remove = document.getElementsByClassName("checkremove");

    for (let i = 0; i < remove.length; ++i) {
        let item = remove[i];
        item.addEventListener("click", function () {
            let target = event.target.parentNode.getAttribute("productid");
            console.log(target);
            let id = order.order.find(order => order.id == target);
            console.log(name);
            delete order.list[id.name];
            console.log(id);
            order.order.splice(id, 1);
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
