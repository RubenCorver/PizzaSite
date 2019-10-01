let method = "";
let check = false;
let category_id = "";

window.onload = function () {
    method = "categoriesWithProducts";
    api()
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
function output(categories) {
    categories.forEach(cat => {
        console.log(cat.name);
        if (method == "categoriesWithProducts" || `categoryWithProduct/${category_id}`) {
            cat.products.forEach(catProd => {
                console.log(catProd.name);
            })
        }
    });
}

function categoryAdd(cat) {
    cat.forEach(cat => {
        let category = document.createElement("article")
        category.className = "category";

        let catcontainer = document.createElement("div")
        catcontainer.className = "category__container";
        let catname = document.createElement("h3")
        catname.className = "category__name";


        catname.innerHTML = cat.name;



        catcontainer.appendChild(catname);
        category.appendChild(catcontainer);

        if (method == "categoriesWithProducts" || `categoryWithProduct/${category_id}`) {
            cat.products.forEach(catProd => {
                let productname = document.createElement("p");
                productname.className = "product__name" + cat.name;
                productname.innerHTML = catProd.name;
                catcontainer.appendChild(productname);
            })
        }

        document.getElementById("products").appendChild(category);
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