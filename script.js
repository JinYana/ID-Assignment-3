

$(document).ready(function(){

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
                }
            });

            if (found == false){
                console.log("Account not found!");
            }
          });
    })
})