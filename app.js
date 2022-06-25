const client = contentful.createClient({
    // This is the space ID. 
    space: "quwbm5ozlrl8",
    // This is the access token for this space.
    accessToken: "iiV1q_x3vOldtE79q6DK3uG7KlNCy4hqhxjN9CcFXMc"
  });
const menuOverlay = document.querySelector(".menu-overlay");
const menuContainer = document.querySelector(".menu-container");
const hideBar = document.querySelector(".close-button");
const showMenu = document.querySelector(".nav-bars");
const cartBtn = document.querySelector(".nav-cart");
const closeCartBtn = document.querySelector(".close-btn");
const clearCartBtn = document.querySelector(".checkout-btn");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".amount");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".row-products");
const removeProduct = document.querySelector(".remove-btn");
const Count = document.querySelector(".count");
const productPageDOM = document.querySelector(".product-columns");
const home = document.getElementById('home');
const store = document.getElementById('store');
const productsContainer = document.querySelector(".product-1");
let cart = [];
let buttonsDOM = [];
let products = []
// getting all the products
class Products {
    async getProducts() {
        try {
            let contentful = await client.getEntries({
                content_type: "product"
            });
            let products = contentful.items;
            products = products.map(item =>{
                
            const { title, price} = item.fields;
            const { id } = item.sys;
            const image = item.fields.image.fields.file.url;
            const { category } = item.fields;
            const productContainer = productsContainer ;
            return {category, title, price , id, image, element: productContainer};
            
            })
            return products
            
        }
        
    
         catch (error) {
            console.log(error);
        }
    }
}

//display products
class UI{
    displayProducts(products){
        console.log(products)
        if(home){
            let result = '';
            products.forEach(product =>{
            result +=`  
                        <div class="col-2" >
                        <a href="product.html?id=${product.id}"><img src="${product.image}" class="product-images" data-id=${product.id}>
                        <h4 class="title-product" ${product.category}> ${product.title} </h4></a> 
                        <h4 class="price"> $${product.price} </h4>   
                        <span class="bag-btn" data-id=${product.id}><i class="fa fa-cart-plus" data-id=${product.id}></i></span>
                    </div>`;
    });
    productsDOM.innerHTML = result;
    }      
    
   else if(store){
    let allProducts = ``;
            products.forEach(product => {
                allProducts += `<div class="product-1">
                <a href="product.html?id=${product.id}"><img src="${product.image}" alt="" class="product-images" data-id=${product.id}>
                <p class="product-title" ${product.category}>${product.title}</p></a>
                <p class="product-price">$${product.price}</p>
                <center>
                <i class="fa fa-cart-plus"  data-id=${product.id}></i> 
                <a href="product.html?id=${product.id}"><i class="fa-solid fa-magnifying-glass" data-id=${product.id}></i></a>
                </center>                
            </div>`;
            productPageDOM.innerHTML = allProducts;
        });

        const searchInput = document.querySelector("[data-search]")
        searchInput.addEventListener("keyup", e => {
        const value = e.target.value.toLowerCase();
        let filtered = products.filter(product => product.title.toLowerCase().includes(value));
        console.log(filtered)
        if (filtered) {
            let productResults = ``;
            filtered.forEach(product => {
                productResults += `<div class="product-1">
                <a href="product.html?id=${product.id}"><img src="${product.image}" alt="" class="product-images" data-id=${product.id}>
                <p class="product-title" ${product.category}>${product.title}</p></a>
                <p class="product-price">$${product.price}</p>
                <center>
                <i class="fa fa-cart-plus"  data-id=${product.id}></i> 
                <a href="product.html?id=${product.id}"><i class="fa-solid fa-magnifying-glass" data-id=${product.id}></i></a>
                </center>                
            </div>`;
            productPageDOM.innerHTML = productResults;
            });
        }
        });

        const filter = [...document.querySelectorAll(".category-title")];
        buttonsDOM = filter;
        filter.forEach(filter =>{
            filter.addEventListener('click', event => {
                let value = event.target.innerHTML.toLowerCase();
                let filtered = products.filter(product => product.category.toLowerCase().includes(value));

                if(value = 'all products'){
                    let allProducts = ``;
                    products.forEach(product => {
                    allProducts += `<div class="product-1">
                    <a href="product.html?id=${product.id}"><img src="${product.image}" alt="" class="product-images" data-id=${product.id}>
                    <p class="product-title" ${product.category}>${product.title}</p></a>
                    <p class="product-price">$${product.price}</p>
                    <center>
                    <i class="fa fa-cart-plus"  data-id=${product.id}></i> 
                    <a href="product.html?id=${product.id}"><i class="fa-solid fa-magnifying-glass" data-id=${product.id}></i></a>
                    </center>                
                </div>`;
                productPageDOM.innerHTML = allProducts;
        });
                }
                if (filtered){
                    let productResults = ``;
                    filtered.forEach(product => {
                    productResults += `<div class="product-1">
                    <a href="product.html?id=${product.id}"><img src="${product.image}" alt="" class="product-images" data-id=${product.id}>
                    <p class="product-title" ${product.category}>${product.title}</p></a>
                    <p class="product-price">$${product.price}</p>
                    <center>
                    <i class="fa fa-cart-plus"  data-id=${product.id}></i> 
                    <a href="product.html?id=${product.id}"><i class="fa-solid fa-magnifying-glass" data-id=${product.id}></i></a>
                    </center>                
                </div>`;
                productPageDOM.innerHTML = productResults;
                });
                }
            });
        });
          
        const priceInput = document.querySelector('.price-filter');
        const priceValue = document.querySelector('.price-value');
        let maxPrice = products.map(product => product.price);
        maxPrice = Math.max(...maxPrice);
        maxPrice = Math.ceil(maxPrice);
        priceInput.value = maxPrice;
        priceInput.max = maxPrice;
        priceInput.min = 0;
        priceValue.textContent = `Value: $${maxPrice}`;
        priceInput.addEventListener('input', event => {
            const value = parseInt(priceInput.value);
            priceValue.textContent = `Value : $${value}`;
            let newStore = products.filter(product => product.price <= value);
            if(newStore){
                let productResults = ``;
                    newStore.forEach(product => {
                    productResults += `<div class="product-1">
                    <a href="product.html?id=${product.id}"><img src="${product.image}" alt="" class="product-images" data-id=${product.id}>
                    <p class="product-title" ${product.category}>${product.title}</p></a>
                    <p class="product-price">$${product.price}</p>
                    <center>
                    <i class="fa fa-cart-plus"  data-id=${product.id}></i> 
                    <a href="product.html?id=${product.id}"><i class="fa-solid fa-magnifying-glass" data-id=${product.id}></i></a>
                    </center>                
                </div>`;
                productPageDOM.innerHTML = productResults;
                });
            }
        });
    }
    const buttons = document.querySelectorAll(".fa-magnifying-glass, .product-images");
    buttons.forEach(button => {
        button.addEventListener('click', event =>{
            const buttonID = button.dataset.id;
            const id = products.filter(product => product.id.includes(buttonID));
            localStorage.setItem('id', JSON.stringify(id)); 
        });
    });
    
}

displaySingleProduct(){
    const singleProduct = document.getElementById(".single-product-body");
    const singleProductDOM = document.querySelector(".single-product")
    const product1 = JSON.parse(localStorage.getItem("id"));
        console.log(product1)  
                
                let singleProductResult = ``;
                product1.forEach(product => {
                    singleProductResult += `<div class="product1">
                    <div class="single-product-image">
                        <img src="${product.image}" alt="">
                    </div>
                    <div class="single-product-details">
                        <p class="single-product-title">${product.title}</p>
                        <p class="single-product-price">$${product.price}</p>
                        <p class="single-product-description">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse impedit, voluptates dolor quae accusantium nisi molestiae vel ipsa a, neque veniam fugiat repellendus? Delectus suscipit nostrum explicabo, maiores veritatis voluptatibus?</p>
                        <button class="add-button" data-id=${product.id}>
                            Add To Cart
                        </button>
                    </div>
                </div>`;
                singleProductDOM.innerHTML = singleProductResult;
                });
            
}


    //add to cart button
    getBagButtons(){
        const buttons =[...document.querySelectorAll(".fa-cart-plus, .add-button")];
        buttonsDOM = buttons;
        buttons.forEach(button =>{
            button.addEventListener('click', event => {
                let id = button.dataset.id;
                let inCart = cart.find(item => item.id === id);
                if(inCart){                   
                    let addAmount = event.target;
                    let id = addAmount.dataset.id;
                    let tempItem = cart.find(item => item.id === id);
                    tempItem.amount = tempItem.amount + 1;
                    Storage.saveCart(cart);
                    this.setCartValues(cart);
                    document.getElementById("count").innerHTML = tempItem.amount;
                }else{
                //get product from products
                let cartItem = {...Storage.getProducts(id), amount:1};
                //add product to cart
                cart = [...cart, cartItem];
                //storing cart locally
                Storage.saveCart(cart);
                //set cart values
                this.setCartValues(cart);
                //displaying the item in the cart
                this.addCartItem(cartItem);
                //show cart
                

            
                }
            });
        
         });         
    }

      setCartValues(cart){
        let tempTotal = 0;
        let itemsTotal = 0;
        cart.map(item => {
            tempTotal  += item.amount * item.price;
            itemsTotal += item.amount;
        })
        cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
        cartItems.innerText = itemsTotal;
    }
    addCartItem(item){
        const div = document.createElement('div');
        div.classList.add('cart-rows');
        div.innerHTML=`<div class="cart-col-1">
        <img src="${item.image}" class="image>">                  
    </div>
    <div class="cart-col-2">
        <h4 class="title">${item.title}</h4>
        <h5 class="price">${item.price}$</h5>
        
        <span class="remove-btn" data-id=${item.id}>remove</span>
    </div>
    <div class="cart-col-3">
        <i class="fa-solid fa-chevron-up" data-id=${item.id}></i>
        <p id="count">${item.amount}</p>
        <i class="fa-solid fa-chevron-down" data-id=${item.id}></i>
    </div>
        `
    cartContent.appendChild(div);
    }
    //show cart btn
   showCart() {
    cartOverlay.classList.add("transparentBg");
    cartDOM.classList.add("showCart");
   }
   //setting up the cart
   setupAPP(){
    cart = Storage.getCart();
    this.setCartValues(cart);
    this.populateCart(cart);
    cartBtn.addEventListener('click', this.showCart)
    closeCartBtn.addEventListener('click',this.hideCart);
    showMenu.addEventListener('click', this.showMenu);
    hideBar.addEventListener('click', this.hideMenu);
        
   }
    showMenu(){
        menuContainer.classList.add("hideNav");
        menuOverlay.classList.add("hideNavigation");
}
    hideMenu(){
        menuContainer.classList.remove("hideNav");
        menuOverlay.classList.remove("hideNavigation");
    }
   //adding item to cart and cartDOM
   populateCart(cart){
    cart.forEach(item => this.addCartItem(item));
     
    }
    // close btn
   hideCart(){
    cartOverlay.classList.remove("transparentBg");
    cartDOM.classList.remove("showCart");
    }
   cartLogic(){
    //clear cart
    clearCartBtn.addEventListener("click", () => {
        this.clearCart();
    });
    cartContent.addEventListener("click", event => {
        //remove single product from cart and cartDOM
        if(event.target.classList.contains('remove-btn'))
        {
            let removeItem = event.target;
            let id = removeItem.dataset.id;
            cartContent.removeChild (removeItem.parentElement.parentElement);
            this.removeItem(id)
        }
        //Chevron-up
        else if(event.target.classList.contains("fa-chevron-up")){
            let addAmount = event.target;
            let id = addAmount.dataset.id;
            let tempItem = cart.find(item => item.id === id);
            tempItem.amount = tempItem.amount + 1;
            Storage.saveCart(cart);
            this.setCartValues(cart);
            addAmount.nextElementSibling.innerText = tempItem.amount;
        }
        //Chevron-down
        else if(event.target.classList.contains("fa-chevron-down")){
            let lowerAmount = event.target;
            let id = lowerAmount.dataset.id;
            let lowerItem = cart.find(item => item.id === id);
            lowerItem.amount = lowerItem.amount - 1;
            if(lowerItem.amount > 0){
                Storage.saveCart(cart);
                this.setCartValues(cart);
                lowerAmount.previousElementSibling.innerText = lowerItem.amount;
            }
            else {
                cartContent.removeChild(lowerAmount.parentElement.parentElement);
                this.removeItem(id)
            }
        }
    });

    }
    clearCart() {
     let cartItems = cart.map(item => item.id);
     cartItems.forEach(id => this.removeItem(id));
     
     while(cartContent.children.length>0){
        cartContent.removeChild(cartContent.children[0]);
     }
   }
   removeItem(id){
    cart = cart.filter(item => item.id !== id);
    this.setCartValues(cart);
    Storage.saveCart(cart);
   
   }
   
   
    
        
  
}

//local storage
class Storage{
    static saveProducts(products){
        localStorage.setItem("products", JSON.stringify(products)
        );
  }
    
    static getProducts(id){
        let products = JSON.parse(localStorage.getItem('products'));
        return products.find(product => product.id === id)
    }
    
    static saveCart(cart){
        localStorage.setItem('cart', JSON.stringify(cart));

    }
    static getCart(){
        return localStorage.getItem('cart')?JSON.parse
        (localStorage.getItem('cart')):[]
    }
}   


    


document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Products();
    //setupid app (buttons)
    ui.setupAPP();  
    // get all products
    products.getProducts().then(products => {
        ui.displayProducts(products);
        ui.displaySingleProduct();
        Storage.saveProducts(products);
  }).then(() => {
      ui.cartLogic();
      ui.getBagButtons();
  });

});

   
