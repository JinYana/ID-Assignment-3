

$(document).ready(function(){

    $("#successAnimation").hide();
    $("#signupBlock").hide();

    $("#Log-in").submit(function(e){
        e.preventDefault();

        
        let username = $('#username').val();
        let password = $('#password').val();

        
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://accountdatabase-35b2.restdb.io/rest/account",
            "method": "GET",
            "headers": {
              "content-type": "application/json",
              "x-apikey": "6017b0836adfba69db8b6c22",
              "cache-control": "no-cache"
            }
          }
          
          $.ajax(settings).done(function (response) {
              let found = false;
            response.forEach(element => {
                if (element.username == username && element.password == password){
                    console.log("Signing in...");
                    found=true;

                    
                    $("#mainAnimation").hide();
                    $("#successAnimation").show();

                    setTimeout(function (){
                        $("#mainAnimation").show();
                        window.location.href = "index.html";
                    }, 2000);
                }
            });

            if (found == false){
                console.log("Account not found!");
            }
        });
    })

    $("#sign-up").submit(function(e){
        e.preventDefault();
        console.log("hello");

        
        let username = $('#signupUser').val();
        let password = $('#signupPassw').val();
        let email = $('#signupEmail').val();
        
        var jsondata = {
            "username": username,
            "password": password,
            "email": email
        }
        
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://accountdatabase-35b2.restdb.io/rest/account",
            "method": "POST",
            "headers": {
              "content-type": "application/json",
              "x-apikey": "6017b0836adfba69db8b6c22",
              "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(jsondata),
            "beforeSend": function(){
                //@TODO use loading bar instead
                //disable our button or show loading bar
                $("#submitsignup").prop("disabled", true);
            }
        }

        $.ajax(settings).done(function(response){
            console.log("Successful creation of account!");
            window.location.href = "index.html";              
        })
    })

    $("#startSignup").click(function(){
        $("#mainBlock").hide();
        $("#signupBlock").show();
    })
})

// Code for Iteminventory(to display items)
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://shopinventory-7a51.restdb.io/rest/items",
    "method": "GET",
    "headers": {
      "content-type": "application/json",
      "x-apikey": "6017c9516adfba69db8b6c31",
      "cache-control": "no-cache"
    }
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    for (i = 0; i < response.length; i++){
       let item = document.createElement("div");
       item.setAttribute("class", "item")
       let title = document.createElement("p")
       let price = document.createElement("p")
       let img = document.createElement("img")
       img.src = "https://shopinventory-7a51.restdb.io/media/" + response[i].ItemImage
       img.setAttribute("width", "100px")
       img.setAttribute("height", "100px")
       let node = document.createTextNode(response[i].ItemName);
       let number = document.createTextNode(response[i].ItemPrice)
       item.appendChild(img)
       title.appendChild(node)
       price.appendChild(number)
       item.appendChild(title)
       item.appendChild(price)
       
       document.getElementById("inventory").appendChild(item)
       
    }
  });