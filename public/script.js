const usersContainer = document.querySelector('.usersContainer');
const formContainer = document.querySelector('.form_container');
const userName = document.querySelector(".user_name");
const userEmail = document.querySelector(".user_email");
const button = document.querySelector("button");
const updateUsername = document.getElementById("updateUsername");
const updateUserEmail = document.getElementById("updateUserEmail");
const errmessage = document.querySelectorAll(".message");

const api_Url = localStorage.getItem("ApiUrl");
 console.log(api_Url)
let userdata;


// Create User container
const createUser = () => {
    for (let i = 0; i < userdata.length; i++) {
        usersContainer.innerHTML += `
        <div class="user">
            <h2>${userdata[i].name}</h2>
            <button type="button"  data-bs-toggle="modal" data-bs-target="#exampleModal"  class="btn btn-danger " >Update</button>
            <button type="button" onclick="deleteUser()" class="btn btn-info " >Delete</button>

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
        userdata = await responseData.json();
        console.log(userdata);
        
        createUser();
    }else{
        window.location.href = "/api"
    }
   
}
getData();


// Post method
let idNumbers = 2;
const formSubmit = () => {
    
    if (userName.value === '' || userEmail.value === '') {
       
       errmessage.forEach((errmessage) => {
         errmessage.classList.add("color-red");
         errmessage.textContent = "Please fill out this field."
       })
       return
    }
    const postData = async () => {
        const response = await fetch(`${api_Url}/users`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({"name": userName.value, "email": userEmail.value, "id": `${idNumbers += 1}`})
        })
    }
    postData();
    createUser();
    getData();
    inputValueLess();
        
   
      
   
    
    
};

// Put Method
const update = async () => {
   
   const response = await fetch (`${api_Url}/users`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({"name": updateUsername.value, "email": updateUserEmail.value, "id": `${idNumbers += 1}`})
   });
   createUser();
    getData();
    usersContainer.innerHTML = '';
    updateUserEmail.value = '';
    updateUsername.value = '';
};


// Delete Method
let userObjectEmail;
const deleteUser = async () => {
    for (let i = 0; i < userdata.length; i++) {
        userObjectEmail = userdata[i].email;
    }
   console.log(userObjectEmail)
    const response = await fetch (`${api_Url}/users/${userObjectEmail}`, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(...userdata)
    });

    getData();
    usersContainer.innerHTML = '';
    
   
}

