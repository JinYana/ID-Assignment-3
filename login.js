

$(document).ready(function(){

    $("#successAnimation").hide();
    $("#failAnimation").hide()
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
                        $("#successAnimation").hide();
                        $("#mainAnimation").show();
                        $("#Log-in").trigger("reset");
                        window.location.href = "index.html";
                    }, 2000);
                }
            });

            if (found == false){
                console.log("Account not found!");
                $("#mainAnimation").hide();
                $("#failAnimation").show();

                setTimeout(function(){
                  $("#failAnimation").hide(100);
                  $("#mainAnimation").show(100);
                }, 2000);
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
            error: function(e){
              console.log("ERROR: " + e.responseJSON.message);
              $("#errMsg").text("Username already exists!");
            },
            "beforeSend": function(){
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

