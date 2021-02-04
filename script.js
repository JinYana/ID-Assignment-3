
$(document).ready(function(){
// Code for Iteminventory(to display items)
  if ($("body").is("#mainPage")){
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

        let header = document.createElement('h1')
        let itemcat = document.createTextNode("All Items")
        header.setAttribute("class", "itemheader")
        header.appendChild(itemcat)
        document.getElementById("inventory").appendChild(header)

        
        for (i = 0; i < response.length; i++) {	
          let item = document.createElement("a");	
          item.setAttribute("href", "#")	
          item.setAttribute("class", "item")	
          let title = document.createElement("p")	
          let mybr = document.createElement('br');	
          let img = document.createElement("img")	
            
            
            
         img.src = "https://shopinventory-7a51.restdb.io/media/" + response[i].ItemImage	
         img.setAttribute("width", "100px")	
         img.setAttribute("height", "100px")	
         let node = document.createTextNode(response[i].ItemName);	
         let number = document.createTextNode("$" + Number(response[i].ItemPrice).toFixed(2))	
            
            
            
         item.appendChild(img)	
         title.appendChild(node)	
         title.appendChild(mybr)	
         title.appendChild(number)	
         item.appendChild(title)	
            
            
            
         document.getElementById("inventory").appendChild(item)
        }

        document.getElementById("submit").addEventListener("click", function(event) {
          event.preventDefault();
          document.querySelectorAll('.item').forEach(e => e.remove())
          document.querySelectorAll('.itemheader').forEach(e => e.remove())
    
          let header = document.createElement('h1')
          let itemcat = document.createTextNode(document.getElementById("category").value)
          header.setAttribute("class", "itemheader")
          header.appendChild(itemcat)
          document.getElementById("inventory").appendChild(header)
          for (i = 0; i < response.length; i++){
            if(document.getElementById("category").value == "All"){
              let item = document.createElement("div");
              item.setAttribute("class", "item")
              let title = document.createElement("p")
              let mybr = document.createElement('br');
              let img = document.createElement("img")
              img.src = "https://shopinventory-7a51.restdb.io/media/" + response[i].ItemImage
              img.setAttribute("width", "100px")
              img.setAttribute("height", "100px")
              let node = document.createTextNode(response[i].ItemName);
              let number = document.createTextNode("$" + Number(response[i].ItemPrice).toFixed(2))
              
    
    
              item.appendChild(img)
              title.appendChild(node)
              title.appendChild(mybr)
              title.appendChild(number)
              item.appendChild(title)
              document.getElementById("inventory").appendChild(item)
           
           
           
           
            }
            
            
            else if(document.getElementById("category").value == response[i].ItemCategory){
              let item = document.createElement("div");
              item.setAttribute("class", "item")
              let title = document.createElement("p")
              let mybr = document.createElement('br');
              let img = document.createElement("img")
              img.src = "https://shopinventory-7a51.restdb.io/media/" + response[i].ItemImage
              img.setAttribute("width", "100px")
              img.setAttribute("height", "100px")
              let node = document.createTextNode(response[i].ItemName);
              let number = document.createTextNode("$" + Number(response[i].ItemPrice).toFixed(2))
              item.appendChild(img)
              title.appendChild(node)
              title.appendChild(mybr)
              title.appendChild(number)
              item.appendChild(title)
           
           
           
              document.getElementById("inventory").appendChild(item)      
            }
            
            
             
          }
    
          
           
          
          
            
          
          
        })
      
      

      
    });
  }

  else if ($("body").is("#loginPage")){
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
                          window.location.href = "main.html";
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
  }
  else if ($("body").is("#itemPage")){

  }



})