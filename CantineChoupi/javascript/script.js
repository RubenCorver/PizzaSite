let method = "categoriesWithProducts";
let check = false;
let orders = localStorage.getItem("order");
let abc = JSON.parse(orders);
let order = [];
let list = [];
let amount = { list, order };

function productClick(cat) {
    let orderid = event.target.dataset.product;
    let id = cat.products.find(catprod => catprod.id == orderid);
    if (order.includes(id)) {
        list.push({[id.name]:i++});
    }
    else {
        list.push({[id.name]:i = 1});
        order.push(id);
    }
    console.log(amount);
    localStorage.setItem("order", JSON.stringify(amount));
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
                    productname.dataset.product = catprod.id;
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
    list = {};
    order = [];
    localStorage.setItem("order", JSON.stringify(amount));
    location.reload();
}

window.onload = function () {
    document.querySelector(".nav__checkout").addEventListener("click", function () {
        window.location.href = "checkout.html";
        localStorage.setItem("order", JSON.stringify(amount));
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