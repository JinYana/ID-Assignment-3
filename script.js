
$(document).ready(function(){
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
    if ($("body").is("#mainPage")){
      localStorage.removeItem("ItemID");
      localStorage.removeItem("ItemPrice");
      
      let header = document.createElement('h1')
      let itemcat = document.createTextNode("All Items")
      header.setAttribute("class", "itemheader")
      header.appendChild(itemcat)
      document.getElementById("inventory").appendChild(header)

    
     for (i = 0; i < response.length; i++) {	
        let item = document.createElement("a");	
        item.setAttribute("href", "item.html")	
        item.setAttribute("class", "item")
       item.setAttribute("id", response[i].ItemID)

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
      for (i = 0; i < response.length; i++){
        document.getElementsByTagName("a")[i].addEventListener("click", function(event) {
        localStorage.setItem("ItemID", this.id)
        
        })
        
      }

      $("#searchBar").submit(function(e){
        e.preventDefault();
      })

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
            let item = document.createElement("a");
            item.setAttribute("class", "item")
            item.setAttribute("href", "item.html")
            item.setAttribute("id", response[i].ItemID)

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
            let item = document.createElement("a");
            item.setAttribute("href", "item.html")
            item.setAttribute("class", "item")
            item.setAttribute("id", response[i].ItemID)
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
        for (i = 0; i < response.length; i++){
          document.getElementsByTagName("a")[i].addEventListener("click", function(event) {
          localStorage.setItem("ItemID", this.id)
          
          
          })
          
        } 


      })

      
    }
    
    if($("body").is("#itemPage")){
      for (i = 0; i < response.length; i++){
        if(response[i].ItemID == localStorage.getItem("ItemID")){

          let title = document.createElement("H1")
          let img = document.createElement("img")
          img.src = "https://shopinventory-7a51.restdb.io/media/" + response[i].ItemImage
          img.setAttribute("width", "300px")
          img.setAttribute("height", "300px")
          let price = document.createElement("h1")
          price.id = 'priceValue';
          let descheader = document.createElement("h3")
          let itemdesc = document.createElement("h4")

          let itemname = document.createTextNode(response[i].ItemName)
          let cost = document.createTextNode("$" + Number(response[i].ItemPrice).toFixed(2))
          let decription = document.createTextNode("Description")
          let itemdescription = document.createTextNode(response[i].ItemDescription)

          title.appendChild(itemname)
          price.appendChild(cost)
          descheader.appendChild(decription)
          itemdesc.appendChild(itemdescription)
          document.getElementById("bigitem").appendChild(title)
          document.getElementById("bigitem").appendChild(img)
          document.getElementById("bigitem").appendChild(price)
          document.getElementById("bigitem").appendChild(descheader)
          document.getElementById("bigitem").appendChild(itemdesc)
          console.log(itemdescription)

          localStorage.setItem("ItemPrice", Number(response[i].ItemPrice).toFixed(2));
          
        }
      }
      
    }
    else if ($("body").is("#checkoutPage")){
      let cartList = JSON.parse(localStorage.getItem("cartItemList"));
      
      for (i=0; i<response.length; i++){
        
        cartList.forEach(x => {
          if (parseInt(x.itemID) == response[i].ItemID){
            let item = document.createElement("li");
            item.setAttribute("class", "list-group-item d-flex justify-content-between lh-condensed");
            item.setAttribute("id", response[i].ItemID);
            let itemdiv = document.createElement("div");
            let itemHeader = document.createElement("h6");
            itemHeader.setAttribute("class", "my-0")
            let itemText = document.createTextNode(response[i].ItemName);
            itemHeader.appendChild(itemText);
            let itemDesc = document.createElement("small");
            itemDesc.setAttribute("class", "text-muted")
            let descText = document.createTextNode(response[i].ItemDescription);
            itemDesc.appendChild(descText);

            itemdiv.appendChild(itemHeader);
            itemdiv.appendChild(itemDesc);

            let itemCost = document.createElement("span");
            itemCost.setAttribute("class", "text-muted");
            let costNode = document.createTextNode(x.cost);
            itemCost.appendChild(costNode);
          item.appendChild(itemdiv);
          item.appendChild(itemCost);

          document.getElementById("cart").appendChild(item);
          $("#totalItems").text(cartList.length);
          }
        });
      }
    }
  });



  if ($("body").is("#loginPage")){
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
                          let cartItemList = [];
                          localStorage.setItem('cartItemList', JSON.stringify(cartItemList));
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
              let cartItemList = [];
              localStorage.setItem('cartItemList', JSON.stringify(cartItemList));
              window.location.href = "main.html";              
          })
      })

      $("#startSignup").click(function(){
          $("#mainBlock").hide();
          $("#signupBlock").show();
      })
  }
  else if ($("body").is("#itemPage")){
    $("#quantityPurchased").focusout(function(){
      $("#subtotalCost").val("$"+ Number(localStorage.getItem("ItemPrice") * $("#quantityPurchased").val()).toFixed(2));
      
    });

    $("#addToCart").submit(function(e){
      e.preventDefault();
      
      
      let cartList = JSON.parse(localStorage.getItem('cartItemList'));
      let found = false;
      cartList.forEach(element =>{
        if (element.itemID == localStorage.getItem("ItemID")){
          element.quantity = (parseFloat(element.quantity) + parseFloat($("#quantityPurchased").val())).toString();
          element.cost = Number(parseFloat(element.quantity) * localStorage.getItem("ItemPrice")).toFixed(2);
          found = true;
        }
      }
      )

      if (found == false){
        let cartItem = new CartItem(localStorage.getItem("ItemID"),
         $("#quantityPurchased").val(), Number(localStorage.getItem("ItemPrice") * $("#quantityPurchased").val()).toFixed(2));
        cartList.push(cartItem);
      }

      localStorage.setItem('cartItemList', JSON.stringify(cartList));
      
      setTimeout(function(){
        window.location.href = 'main.html'
      }, 1500)
    })
  }
})

function CartItem(itemID, quantity, cost) {
  this.itemID = itemID;
  this.quantity = quantity;
  this.cost = cost;
}

if($("body").is("#trivaPage")){
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=db0d6efdab67b239fecd4fa9109cb303");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("https://opentdb.com/api.php?amount=1&type=multiple&encode=url3986", requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      let question = document.createElement('h1')
      let decodedquestion = decodeURIComponent(result.results[0].question)
      

      question.appendChild(document.createTextNode(decodedquestion))

      document.getElementById("quiz").appendChild(question)

      let quiz = document.createElement("form")

      let option1 = document.createElement("input")
      option1.setAttribute("type", "radio")
      option1.setAttribute("id", "opt1")
      let lable1 = document.createElement("label")
      lable1.setAttribute("for", "opt1")

      let option2 = document.createElement("input")
      option2.setAttribute("type", "radio")
      option2.setAttribute("id", "opt2")
      let lable2 = document.createElement("label")
      lable2.setAttribute("for", "opt2")

      let option3 = document.createElement("input")
      option3.setAttribute("type", "radio")
      option3.setAttribute("id", "opt3")
      let lable3 = document.createElement("label")
      lable3.setAttribute("for", "opt3")

      let option4 = document.createElement("input")
      option4.setAttribute("type", "radio")
      option4.setAttribute("id", "opt4")
      let lable4 = document.createElement("label")
      lable4.setAttribute("for", "opt4")

      
      let randomise = Math.floor(Math.random() * 4)+ 1; 
      
      

       
      if(randomise == 1){
        let decodedanswer = decodeURIComponent(result.results[0].correct_answer)
        lable1.appendChild(document.createTextNode(decodedanswer))
        option1.setAttribute("class", "correctans")
        for(i = 0; i < result.results[0].incorrect_answers.length; i++){
          let decodedoption = decodeURI(result.results[0].incorrect_answers[i])
          console.log("hi")
          console.log(decodeURI(result.results[0].incorrect_answers[i]))
          let optionarray = [lable2, lable3, lable4]
          optionarray[i].appendChild(document.createTextNode(decodedoption))

        }
        quiz.appendChild(lable1)
        quiz.appendChild(option1)
        quiz.appendChild(lable2)
        quiz.appendChild(option2)
        quiz.appendChild(lable3)
        quiz.appendChild(option3)
        quiz.appendChild(lable4)
        quiz.appendChild(option4)
        document.getElementById("quiz").appendChild(quiz)

      }

      else if(randomise == 2){
        let decodedanswer = decodeURIComponent(result.results[0].correct_answer)
        lable2.appendChild(document.createTextNode(decodedanswer))
        option2.setAttribute("class", "correctans")
        for(i = 0; i < result.results[0].incorrect_answers.length; i++){
          let decodedoption = decodeURI(result.results[0].incorrect_answers[i])
          let optionarray = [lable1, lable3, lable4]
          optionarray[i].appendChild(document.createTextNode(decodedoption))

        }
        quiz.appendChild(lable1)
        quiz.appendChild(option1)
        quiz.appendChild(lable2)
        quiz.appendChild(option2)
        quiz.appendChild(lable3)
        quiz.appendChild(option3)
        quiz.appendChild(lable4)
        quiz.appendChild(option4)
        document.getElementById("quiz").appendChild(quiz)
      }

      else if(randomise == 3){
        let decodedanswer = decodeURIComponent(result.results[0].correct_answer)
        lable3.appendChild(document.createTextNode(decodedanswer))
        option3.setAttribute("class", "correctans")
        for(i = 0; i < result.results[0].incorrect_answers.length; i++){
          let decodedoption = decodeURI(result.results[0].incorrect_answers[i])
          
          let optionarray = [lable1, lable2, lable4]
          optionarray[i].appendChild(document.createTextNode(decodedoption))
          
        }
        quiz.appendChild(lable1)
        quiz.appendChild(option1)
        quiz.appendChild(lable2)
        quiz.appendChild(option2)
        quiz.appendChild(lable3)
        quiz.appendChild(option3)
        quiz.appendChild(lable4)
        quiz.appendChild(option4)
        document.getElementById("quiz").appendChild(quiz)
      }

      else if(randomise == 4){
        let decodedanswer = decodeURIComponent(result.results[0].correct_answer)
        lable4.appendChild(document.createTextNode(decodedanswer))
        option4.setAttribute("class", "correctans")
        for(i = 0; i < result.results[0].incorrect_answers.length; i++){
          let decodedoption = decodeURI(result.results[0].incorrect_answers[i])
          let optionarray = [lable1, lable2, lable3]
          optionarray[i].appendChild(document.createTextNode(decodedoption))

        }
        quiz.appendChild(lable1)
        quiz.appendChild(option1)
        quiz.appendChild(lable2)
        quiz.appendChild(option2)
        quiz.appendChild(lable3)
        quiz.appendChild(option3)
        quiz.appendChild(lable4)
        quiz.appendChild(option4)
        document.getElementById("quiz").appendChild(quiz)
      }
    })

    
    
}