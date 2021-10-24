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
            li.innerHTML = `
                <strong>${tweet}</strong>
                <i class="fa fa-trash float-end delete-tweet"> Delete</i>
            `
            mainOl.appendChild(li);
            if(document.querySelector(".alertMsg")){
                document.querySelector(".alertMsg").remove();
            }
        })
    }else{
        if(tweetItems.length === 0){
            mainOl.insertAdjacentHTML("beforebegin", '<p class="alertMsg">Your tweet is empty...</p>')
        }
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
    if(tweetItems.length === 0){
        mainOl.insertAdjacentHTML("beforebegin", '<p class="alertMsg">Your tweet is empty...</p>')
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

