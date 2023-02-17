const usersContainer = document.querySelector('.usersContainer');
const formContainer = document.querySelector('.form_container');
const userName = document.querySelector(".user_name");
const userEmail = document.querySelector(".user_email");
const button = document.querySelector("button");

const api_Url = localStorage.getItem("ApiUrl");
 console.log(api_Url)
let data;

// Create User container
const createUser = () => {
    for (let i = 0; i < data.length; i++) {
        usersContainer.innerHTML += `
        <div class="user">
            <h2>${data[i].name}</h2>
            <button type="button"  class="btn btn-danger " >Update</button>
            <button type="button"  class="btn btn-info " >Delete</button>

        </div>
        `  
    }
}

const inputValueLess = () => {
    usersContainer.innerHTML = '';
    userName.value = '';
    userEmail.value = '';
}

// Get method
const getData = async () => {
   
    if(api_Url){
        const responseData = await fetch(`${api_Url}/users`)
        data = await responseData.json();
        console.log(data);
        createUser();
    }else{
        window.location.href = "/api"
    }
   
}
getData();


// Post method
const formSubmit = () => {
    const postData = async () => {
        const response = await fetch(`${api_Url}/users`, {
            method: "POST",
            body: JSON.stringify({"name": userName.value, "email": userEmail.value})
        })
    }
  
   
    postData();
    createUser();
    getData();
    inputValueLess();
}



