let method = "categoriesWithProducts";
let check = false;
let orders = localStorage.getItem("order");
let category_id = "";
let order = JSON.parse(orders);




function productClick(cat) {
    let orderid = event.target.className.split(" ")[1];
    let id = cat.products.find(catprod => catprod.id == orderid);
    order.push(id);
    console.log(id.name);
}

function categoryDisplay(cat) {
    cat.forEach(cat => {
        if (cat.products != 0) {
            let category = document.createElement("article")
            category.className = "category";


            let catname = document.createElement("h3")
            catname.className = "category__name";

            catname.innerHTML = cat.name;
            category.appendChild(catname);
            if (method == "categoriesWithProducts" || method == `categoryWithProduct/${category_id}`) {
                cat.products.forEach(catprod => {
                    let catcontainer = document.createElement("div")
                    catcontainer.className = "category__container";

                    let productname = document.createElement("p");
                    productname.className = "product__name " + catprod.id;
                    productname.innerHTML = catprod.name;
                    catcontainer.appendChild(productname);

                    let productprice = document.createElement("p");
                    productprice.className = "product__price";
                    productprice.innerHTML = catprod.price + "$";
                    catcontainer.appendChild(productprice);
                    category.appendChild(catcontainer);

                    if (catprod.description != 0) {
                        let productdesc = document.createElement("p");
                        productdesc.className = "product__ingredients";
                        productdesc.innerHTML = catprod.description;
                        category.appendChild(productdesc);
                    } else {
                        console.log("Empty product description");
                    }

                    productname.addEventListener("click", function () {
                        productClick(cat);
                    });
                })
            }
            document.querySelector(".categories").appendChild(category);
        } else {
            console.log("Empty category")
        }


    })

}
function output(categories) {
    categories.forEach(cat => {
        console.log(cat.name);
        if (method == "categoriesWithProducts" || method == `categoryWithProduct/${category_id}`) {
            cat.products.forEach(catProd => {
                console.log(catProd.name);
            })
        }
    });
}
function api() {
    fetch(`https://competa-api.dev.competa.com/api/${method}`).then(result => {
        return result.json();
    })
        .then(function (categories) {
            console.log(categories);
            if (check == true) {
                check = false;
                output(categories);
            } else {
                categoryDisplay(categories);
            }
        })
}

function category() {
    check = true;
    method = "categories";
    api();
}

function product() {
    check = true;
    method = "products";
    api();
}
function catProduct() {
    check = true;
    method = "categoriesWithProducts";
    api();
}
function onecatProduct() {
    check = true;
    category_id = 1;
    method = `categoryWithProduct/${category_id}`;
    api();
}
function clearStorage() {
    let placeholder = [];
    localStorage.setItem("order", JSON.stringify(placeholder));
    location.reload();
}
window.onload = function () {
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