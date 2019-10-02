let method = "categoriesWithProducts";
let check = false;
let category_id = "";
let order = [];

function productClick(cat) {
    let orderid = event.target.className.split(" ")[1];
    let id = cat.products.find(catprod => catprod.id == orderid);
    console.log(id.name);

}

function categoryAdd(cat) {
    cat.forEach(cat => {
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
                productprice.className = "product__price ";
                productprice.innerHTML = catprod.price + "$";
                catcontainer.appendChild(productprice);

                category.appendChild(catcontainer);

                productname.addEventListener("click", function () {
                    productClick(cat);
                });
            })
        }
        document.getElementById("products").appendChild(category);
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
                categoryAdd(categories);
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
window.onload = function () {
    api()
}