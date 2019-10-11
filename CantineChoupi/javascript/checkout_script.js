let orders = localStorage.getItem("order");
let amount = JSON.parse(orders);

function checkout() {
    let checktotal = document.createElement("p")
    checktotal.className = "checkout__total";

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

    amount.order.forEach(info => {

        let checkquantity = document.createElement("p")
        checkquantity.className = "checkout__quantity";
        let quantity = document.createTextNode(info.amount + "x ");
        checkquantity.appendChild(quantity);

        let checkproduct = document.createElement("p")
        checkproduct.className = "checkout__product";
        let name = document.createTextNode(info.name);

        let checkprice = document.createElement("p")
        checkprice.className = "checkout__price";
        checkprice.setAttribute("productid", info.id);
        let price = document.createTextNode(info.amount * info.price + "$");

        let checkicon = document.createElement("i")
        checkicon.className = "checkremove fas fa-times fa-x3";

        checkproduct.appendChild(name);
        checkprice.appendChild(price);

        checkquantity.appendChild(checkproduct);
        checkcontainer.appendChild(checkquantity);
        checkprice.appendChild(checkicon);
        checkcontainer.appendChild(checkprice);
    })
    let total = 0;
    let counter = 0;

    amount.order.forEach(info => {
        counter++
        total += parseFloat(info.price * info.amount);
    })
    if (counter == 0) {
        totaltext = document.createTextNode("checkping cart is empty");
    }
    else {
        totaltext = document.createTextNode("The total price is: " + total + "$");
    }
    checktotal.appendChild(totaltext);

    document.querySelector(".checkout__info").appendChild(checkcontainer);
    document.querySelector(".checkout__info").appendChild(checktotal);

    let remove = document.getElementsByClassName("checkremove");

    for (let i = 0; i < remove.length; ++i) {
        let item = remove[i];
        item.addEventListener("click", function () {
            let target = event.target.parentNode.getAttribute("productid");
            let id = amount.order.find(order => order.id == target);
            console.log(id.amount);
            console.log(id);
            id.amount -= 1;
            if (id.amount <= 0) {
                console.log(id);
                for (let i = amount.order.length - 1; i >= 0; i--) {
                    if (amount.order[i] == id) {
                        amount.order.splice(i, 1);
                    }
                }
            }
            document.querySelector(".checkout__info").removeChild(checkcontainer);
            document.querySelector(".checkout__info").removeChild(checktotal);
            checkout()
            localStorage.setItem("order", JSON.stringify(amount));
        })
    }
}
window.onload = function () {
    checkout()
    document.querySelector(".nav__link").addEventListener("click", function () {
        window.location.href = "index.html";
    })
    document.querySelector(".nav__link--checkout").addEventListener("click", function () {
        window.location.href = "checkout.html";
        localStorage.setItem("order", JSON.stringify(amount));
    })
    document.querySelector(".nav__link--menu").addEventListener("click", function () {
        api()
    })
    document.querySelector(".navbutton").addEventListener("click", function () {
        document.querySelector(".navswitch").classList.toggle("show");
    })
}
