// SELECTOR

const inputTweet = document.querySelector(".inputTweet");
const tweetForm = document.querySelector(".submitTweet");
const mainOl = document.querySelector(".collection");
const searchTweet = document.querySelector(".searchTweet");

let tweetItems = getDataFromLocalStorage();

tweetForm.addEventListener("click", getDataFromInput);

function displayTweet(tweet){
    if(tweet.length > 0){
        let li;
        tweetItems.forEach(({id, tweet}) => {
            li = document.createElement("li");
            li.className = "product-collection-item";
            li.id = `tweet-${id}`
            li.innerHTML = `${id+1}
                <strong>${tweet}</strong>
                <i class="fa fa-trash float-end delete-tweet"> Delete</i>
            `
            mainOl.appendChild(li);
            if(document.querySelector(".alertMsg")){
                document.querySelector(".alertMsg").remove();
            }
        })
    }else{
        mainOl.insertAdjacentHTML("beforebegin", '<p class="alertMsg">Your tweet is empty...</p>')
    }

}
displayTweet(tweetItems);

function getDataFromInput(e){
    e.preventDefault()
    const tweet = inputTweet.value;
    let id;
    if(tweetItems.length === 0){
        id = 0;
    }else{
        id = tweetItems[tweetItems.length -1 ].id + 1 ;
    }
    if(tweet === '' || tweet > 1){
        alert("Please input valid information")
    }else{
        const data = {
            id,
            tweet,
        }
        tweetItems.push(data)
        addTweetToLocalStorage(data);
    }
    inputTweet.value = "";
    mainOl.innerHTML = '';
    displayTweet(tweetItems);
}

searchTweet.addEventListener("keyup", searchTweetByKey);

function searchTweetByKey(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll(".product-collection-item").forEach(item => {
        const tweet = item.firstElementChild.textContent.toLowerCase();
        if(tweet.indexOf(text) === -1){
            item.style.display = "none";
        }else{
            item.style.display = "block";
        };
    });
};

// DELETING TWEET

mainOl.addEventListener("click", deleteTweet);

function deleteTweet(e){
    if(e.target.classList.contains("delete-tweet")){
        const del = e.target.parentElement;
        e.target.parentElement.parentElement.removeChild(del);

        const dst = parseInt(del.id.split("-")[1])
        let result = tweetItems.filter(tweet => {
            return tweet.id !== dst;
        });
        tweetItems = result;
        deleteTweetsFromLocalStorage(dst);
    }
}

// SHOWING DATA TO UI

function getDataFromLocalStorage(){
    let item;
    if(localStorage.getItem("tweets") === null){
        item = [];
    }else{
        item = JSON.parse(localStorage.getItem("tweets"))
    }
    return item;
}


// ADDING TWEET TO LOCAL STORAGE

function addTweetToLocalStorage(data){
    let item;
    if(localStorage.getItem("tweets") === null){
        item = [];
        item.push(data)
        localStorage.setItem("tweets", JSON.stringify(item));
    }else{
        item = JSON.parse(localStorage.getItem("tweets"))
        item.push(data);
        localStorage.setItem("tweets", JSON.stringify(item));
    };
};

//DELETING TWEETS FOR LOCAL STORAGE

function deleteTweetsFromLocalStorage(id){
    let item;
    if(localStorage.getItem("tweets") === null){
        item = [];
    }
    const tweets = JSON.parse(localStorage.getItem("tweets"));
    let result = tweets.filter((item) => {
        return item.id !== id;
    })
        localStorage.setItem("tweets", JSON.stringify(result));
        // tweetItems = result;
};




















// //Selector
// const filterInput = document.querySelector("#filter");
// const productListUl = document.querySelector(".collection");
// const nameInput = document.querySelector(".product-name");
// const priceInput = document.querySelector(".product-price");
// const addBtn = document.querySelector(".add-product");
// const deleteBtn = document.querySelector(".delete-product");
// const alertFunc = document.querySelector(".col");
// const form = document.querySelector("form");



// // data/ state

// let productData = getDataFromLocalStorage();

// function getDataFromLocalStorage(){
//     let items = ''
//     if(localStorage.getItem("productItems") === null){
//         items = [];
//     }else{
//         items = JSON.parse(localStorage.getItem("productItems"))
//     }
//     return items;
// }

// function saveDataToLocalStorage(item){

//     let items = '';
//     if(localStorage.getItem('productItems') === null){
//         items = [];
//         items.push(item)
//         localStorage.setItem('productItems', JSON.stringify(items))
//     }else{
//         items = JSON.parse(localStorage.getItem('productItems'))
//         items.push(item);
//         localStorage.setItem("productItems", JSON.stringify(items))
//     }
// }

// function deleteItemFromLocalStorage(id){
//     // let items = ''
//     // if(localStorage.getItem("productItems") === null){
//     //     items = [];
//     // }
//     const items = JSON.parse(localStorage.getItem("productItems"));
//     let result = items.filter((productItem) => {
//         return productItem.id !== id;
//     });
//     localStorage.setItem("productItems", JSON.stringify(result));
//     if(result.length === 0){
//         location.reload();
//     }
//     // productData = result;
// }

// function getData(productList){
//     if(productData.length > 0){
//         let li = "";
//         productList.forEach(({id, name, price}) => {
//             li = document.createElement("li");
//             li.className = 'list-group-item collection-item';
//             li.id = `product-${id}`;
//             li.innerHTML = `<strong>${name}</strong>
//             <span class="price">$${price}</span>
//             <i class="fa fa-trash float-end delete-product">delete</i>
//             <i class="fa fa-pencil float-end edit-product">edit</i>`
//             productListUl.appendChild(li);
//             if(document.querySelector(".alertFunc")){
//                 document.querySelector(".alertFunc").remove();
//             }
//         });
//     }else{
//         alertFunc.insertAdjacentHTML("beforebegin",`<p class="alertFunc">Your list is empty</p>`)
//     }
// }
// getData(productData);

// function resetInput(){
//     nameInput.value = '';
//     priceInput.value = '';
// }

// function resetUI(){
//     addBtn.style.display = "block";
//     document.querySelector(".update-product").remove();
//     document.querySelector("#id").remove();
// }

// function addOrUpdateProduct(e){
//     if(e.target.classList.contains('add-product')){
//         addItem(e);
//     }else if(e.target.classList.contains('update-product')){
//         updateProduct(e);
//         resetInput();
//         resetUI();
//     }
// }

// function updateProduct(e){
//     e.preventDefault();
//     console.log(e.target);
//     const name = nameInput.value;
//     const price = priceInput.value;
//     const id = parseInt(e.target.previousElementSibling.value, 10);
    
//     const productWithUpdates = productData.map(product => {
//         if(product.id === id){
//             return {
//                 ...product,
//                 name,
//                 price
//             }
//         }else{
//             return product;
//         }
//     })
//     //find the product by id
// productData = productWithUpdates;
// getData(productData);

// }

// const addItem = e => {
//     // e.preventDefault();
//     const name = nameInput.value;
//     const price = priceInput.value;
//     let id;
//     if(productData.length === 0){
//         id = 0;
//     }else{
//         id = productData[productData.length - 1].id + 1;
//     }
//     if(name === '' || price === '' || !(!isNaN(parseFloat(price)) && isFinite(price))){
//         alert('please fil up necessary information');
//     }else{
//         const data = {
//             id,
//             name,
//             price,
//         };
//         productData.push(data);
//         saveDataToLocalStorage(data);
//         productListUl.innerHTML = '';
//         getData(productData);
//         nameInput.value = '';
//         priceInput.value = '';
//     }
// }

// function findProduct(id){
//     return productData.find(product => product.id === id);
// }

// function populateEditForm(product){
//     nameInput.value = product.name;
//     priceInput.value = product.price;
//     //update submit button
//     const idElm = `<input type="hidden" id="id" value=${product.id} />`
//     const elm = `<button class="btn mt-3 btn-block btn-info update-product">Update</button>`;
//     if(document.querySelector("#id")){
//         document.querySelector("#id").setAttribute('value', product.id);
//     }
//     document.forms[0].insertAdjacentHTML('beforeend', idElm);
//     if(!document.querySelector('.update-product')){
//         document.forms[0].insertAdjacentHTML('beforeend', elm);
//     }
//     // hide submit button
//     addBtn.style.display = "none";
// }


// // Delete item
// const modifyOrRemoveProduct =  e =>{
//     if(e.target.classList.contains('delete-product')){
//         //remove target from the UI
//         const target = e.target.parentElement;
//         e.target.parentElement.parentElement.removeChild(target);
    
//         //remove item from the store
//         const id = parseInt(target.id.split('-')[1]);
//         let result = productData.filter(productItem => {
//             return productItem.id !== id;
//         })
//         productData = result;
//         deleteItemFromLocalStorage(id);
//         //return result array

//     }else if(e.target.classList.contains('edit-product')){
//         const target = e.target.parentElement;
//         //Getting the ID
//         const id = parseInt(target.id.split('-')[1])
//         const fundProduct = findProduct(id);
//         console.log(fundProduct);
//         populateEditForm(fundProduct)

//         //update button

//         document.querySelector(".update-product");

//     }
// }


// const filterProduct = e => {
//     const text = e.target.value.toLowerCase();
//     document.querySelectorAll(".collection .collection-item").forEach(item => {
//         const productName = item.firstElementChild.textContent.toLowerCase();
//         if(productName.indexOf(text) === -1){
//             if(!document.querySelector(".alertFunc")){
//                 alertFunc.insertAdjacentHTML("beforebegin",`<p class="alertFunc">No item to show</p>`)
//             }
//             item.style.display = 'none';
//         }else{
//             if(document.querySelector(".alertFunc")){
//                 document.querySelector(".alertFunc").remove();
//             }
//             item.style.display = 'block';
//         };
//     });
// }

// function loadEventListener(){
//     addBtn.addEventListener("click", addItem);
//     productListUl.addEventListener("click", modifyOrRemoveProduct);
//     form.addEventListener('click', addOrUpdateProduct);
//     filterInput.addEventListener('keyup', filterProduct);
// }
// loadEventListener();


