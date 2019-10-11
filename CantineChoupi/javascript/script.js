let method = "categoriesWithProducts";
let check = false;
let amount = {
    order: []
}

function storageCheck() {
    if (localStorage.getItem("order") != undefined) {
        amount = JSON.parse(localStorage.getItem("order"));
        console.log(amount);
    }
    else {
        console.log("Geen bestelling");
    }
}


function productClick(cat) {
    let orderid = event.target.getAttribute("productid");
    let id = cat.products.find(catprod => catprod.id == orderid);
    let check = amount.order.find(prod => prod.name === id.name);
    if (check == undefined) {
        id.amount = 1;
        amount.order.push(id);
    } else {
        id.amount = check.amount;
        id.amount++;
        check.amount = id.amount;
    }
    console.log(amount);
    localStorage.setItem("order", JSON.stringify(amount));
    let shopcontainer = document.querySelector(".shopcart__container");
    let shoptotal = document.querySelector(".shopcart__total");
    if (shopcontainer == undefined) {
        shoppingCart()
    } else {
        shopcontainer.parentNode.removeChild(shopcontainer);
        shoptotal.parentNode.removeChild(shoptotal);
        shoppingCart()
    }
}

function shoppingCart() {
    let shoptotal = document.createElement("p")
    shoptotal.className = "shopcart__total";

    let shopcontainer = document.createElement("article")
    shopcontainer.className = "shopcart__container";

    let titlename = document.createElement("p")
    titlename.className = "shopcart__title";
    let tname = document.createTextNode("Product:");

    let titleprice = document.createElement("p")
    titleprice.className = "shopcart__title";
    let tprice = document.createTextNode("Price:");

    titlename.appendChild(tname);
    titleprice.appendChild(tprice);
    shopcontainer.appendChild(titlename);
    shopcontainer.appendChild(titleprice);

    amount.order.forEach(info => {

        let shopquantity = document.createElement("p")
        shopquantity.className = "shopcart__quantity";
        let quantity = document.createTextNode(info.amount + "x ");
        shopquantity.appendChild(quantity);

        let shopproduct = document.createElement("p")
        shopproduct.className = "shopcart__product";
        let name = document.createTextNode(info.name);

        let shopprice = document.createElement("p")
        shopprice.className = "shopcart__price";
        shopprice.setAttribute("productid", info.id);
        let price = document.createTextNode(info.amount * info.price + "$");

        let shopicon = document.createElement("i")
        shopicon.className = "shopremove fas fa-times fa-x3";

        shopproduct.appendChild(name);
        shopprice.appendChild(price);

        shopquantity.appendChild(shopproduct);
        shopcontainer.appendChild(shopquantity);
        shopprice.appendChild(shopicon);
        shopcontainer.appendChild(shopprice);
    })
    let total = 0;
    let counter = 0;

    amount.order.forEach(info => {
        counter++
        total += parseFloat(info.price * info.amount);
    })
    if (counter == 0) {
        totaltext = document.createTextNode("Shopping cart is empty");
    }
    else {
        totaltext = document.createTextNode("The total price is: " + total + "$");
    }
    shoptotal.appendChild(totaltext);

    document.querySelector(".shopcart__info").appendChild(shopcontainer);
    document.querySelector(".shopcart__info").appendChild(shoptotal);

    let remove = document.getElementsByClassName("shopremove");

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
            document.querySelector(".shopcart__info").removeChild(shopcontainer);
            document.querySelector(".shopcart__info").removeChild(shoptotal);
            shoppingCart();
            localStorage.setItem("order", JSON.stringify(amount));
        })
    }
}


function categoryDisplay(cat) {
    cat.forEach(cat => {
        if (cat.products != 0) {
            let category = document.createElement("article")
            category.className = "category";

            let catname = document.createElement("h3")
            catname.className = "category__name";
            let name = document.createTextNode(cat.name);
            catname.appendChild(name);
            category.appendChild(catname);

            if (method == "categoriesWithProducts" || method == `categoryWithProduct/${category_id}`) {
                cat.products.forEach(catprod => {
                    let catcontainer = document.createElement("div")
                    catcontainer.className = "category__container";

                    let productname = document.createElement("p");
                    productname.className = "product__name"
                    productname.setAttribute("productid", catprod.id);
                    let prodname = document.createTextNode(catprod.name);
                    productname.appendChild(prodname);
                    catcontainer.appendChild(productname);

                    let productprice = document.createElement("p");
                    productprice.className = "product__price";
                    let prodprice = document.createTextNode(catprod.price + "$");
                    productprice.appendChild(prodprice);
                    catcontainer.appendChild(productprice);

                    category.appendChild(catcontainer);

                    if (catprod.description != 0) {
                        let productdesc = document.createElement("p");
                        productdesc.className = "product__ingredients";
                        let proddesc = document.createTextNode(catprod.description);
                        productdesc.appendChild(proddesc);
                        category.appendChild(productdesc);
                    }

                    productname.addEventListener("click", function () {
                        productClick(cat);
                    });
                })
            }
            document.querySelector(".categories").appendChild(category);
        }
    })

}

function api() {
    fetch(`https://competa-api.dev.competa.com/api/${method}`)
        .then(result => {
            return result.json();
        })
        .then(function (categories) {
            console.log(categories);
            categoryDisplay(categories);
        })
}

function clearStorage() { //tijdelijk
    order = [];
    amount = { order };
    localStorage.setItem("order", JSON.stringify(amount));
    location.reload();
}

window.onload = function () {
    storageCheck()
    shoppingCart()
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
    document.querySelector(".shopbutton").addEventListener("click", function () {
        document.querySelector(".shopswitch").classList.toggle("show");
    })

}