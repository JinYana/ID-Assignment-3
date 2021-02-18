
$(document).ready(function () {
  // Hide animations and elements that only appear when specific conditions are met
  $("#successAnimation").hide();
  $("#failAnimation").hide();
  $("#signupBlock").hide();
  $("#tpirStart").hide();
  $("#tpirAnswerForm").hide();
  $("#tpirSecondContainer").hide();
  $("#tpirThirdContainer").hide();

  // Calling RestDB Inventory API 
  // Only certain pages require information from this database,hence the if statement
  if ($("body").is("#mainPage") || $("body").is("#itemPage") || $("body").is("#tpirPage") || $("body").is("#checkoutPage")) {
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

  
    // Code that only runs once the API responds
    $.ajax(settings).done(function (response) {
      console.log(response);
      if ($("body").is("#mainPage")) {
        // Hide loading animation once API responds
        $("#mainLoad").hide();

        // Remove localStorage values each time user accesses this page
        localStorage.removeItem("ItemID");
        localStorage.removeItem("ItemPrice");

        //Code for injecting elements and nodes into the main page, using information received by the API
        let itemcat = document.createTextNode("All Items")
        document.getElementById("itemcat").appendChild(itemcat)

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
        //End of code for default main page

        // Add event listener to set localStorage value for item chosen.
        for (i = 0; i < response.length; i++) {
          document.getElementsByTagName("a")[i].addEventListener("click", function (event) {
            localStorage.setItem("ItemID", this.id)
          })

        }

        //Code for sort by category function
        document.getElementById("category").addEventListener("input", function (event) {
          event.preventDefault();

          document.querySelectorAll('.item').forEach(e => e.remove())//To clear the page
          

          //To Change the title to the item category chosen
          let itemcat = document.getElementById("itemcat")
          itemcat.innerHTML = document.getElementById("category").value


          for (i = 0; i < response.length; i++) {
            //If user chooses All as the category
            if (document.getElementById("category").value == "All") {
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



            else if (document.getElementById("category").value == response[i].ItemCategory) {
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
          //End of code to display items in main page
        })

      }

      // Code that only runs when the User is on item.html
      else if ($("body").is("#itemPage")) {

        // Code to create and insert elements and nodes for the selected item, using both localStorage values and the API
        for (i = 0; i < response.length; i++) {
          if (response[i].ItemID == localStorage.getItem("ItemID")) {
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
      //End of code for item.html


      // Code that only runs when User is on checkout.html
      else if ($("body").is("#checkoutPage")) {

        // Create a local value to store user's cart retrieved from localStorage
        let cartList = JSON.parse(localStorage.getItem("cartItemList"));

        // Automatically display user's account details using localStorage
        $("#username").val(localStorage.getItem("accuser"));
        $("#email").val(localStorage.getItem("accemail"));

        // Code for when the user has nothing in their cart
        if (cartList.length == 0) {
          $("#cartLoad").hide();
          $("#checkoutDisc").text(localStorage.getItem("discount")+"%");   
          $("#subtotal").text("$0");
          $("#total").text("$0"); 
          $("#totalItems").text(cartList.length);

          // Insert elements and nodes to display lack of items in cart
          let item = document.createElement("li");
          item.setAttribute("class", "list-group-item justify-content-between d-flex flex-row lh-condensed");
          let itemdiv = document.createElement("div");

          let itemHeader = document.createElement("h6");
          itemHeader.setAttribute("class", "my-0");
          let itemText = document.createTextNode("There are currently no items in your cart!");
          itemHeader.appendChild(itemText);


          itemdiv.appendChild(itemHeader);

          item.appendChild(itemdiv);


          document.getElementById("cart").appendChild(item);
        }
        // Code for when the user has one more items in their cart
        else {
          
          // Create elements for each item in cart and display them
          for (i = 0; i < response.length; i++) {
            cartList.forEach(x => {
              if (parseInt(x.itemID) == response[i].ItemID) {
                let item = document.createElement("li");
                item.setAttribute("class", "list-group-item justify-content-between d-flex flex-row lh-condensed");

                let itemdiv = document.createElement("div");
                itemdiv.setAttribute("style", "max-width: 150px;")
                let itemHeader = document.createElement("h6");
                itemHeader.setAttribute("class", "my-0");
                let itemText = document.createTextNode(response[i].ItemName + " ×" + x.quantity);
                itemHeader.appendChild(itemText);
                let itemDesc = document.createElement("small");
                itemDesc.setAttribute("class", "text-muted");
                let descText = document.createTextNode(response[i].ItemDescription);
                itemDesc.appendChild(descText);
                let deleteButton = document.createElement("a");
                deleteButton.setAttribute("role", "button");
                deleteButton.setAttribute("id", response[i].ItemID);
                deleteButton.setAttribute("href", "#");
                
                // Create a delete button that removes itself visually, in the localStorage value and also refreshes the page
                deleteButton.setAttribute("onClick",
                  "(function(){console.log('Deleting item with id: ' + id); let cartList= JSON.parse(localStorage.getItem('cartItemList')); for (var i = cartList.length -1; i>=0; i--){if (cartList[i].itemID == id){cartList.splice(i, 1); } } localStorage.setItem('cartItemList', JSON.stringify(cartList)); location.reload();})()");
                deleteButton.setAttribute("class", "my-auto align-self-end")
                let deleteText = document.createTextNode("Remove");
                deleteButton.appendChild(deleteText);

                itemdiv.appendChild(itemHeader);
                itemdiv.appendChild(itemDesc);


                let itemCost = document.createElement("span");
                itemCost.setAttribute("class", "text-muted mx-3 my-auto");
                let costNode = document.createTextNode(x.cost);
                itemCost.appendChild(costNode);
                item.appendChild(itemdiv);
                item.appendChild(itemCost);
                item.appendChild(deleteButton);

                document.getElementById("cart").appendChild(item);
                $("#totalItems").text(cartList.length);
              }
              // End of code to display items in the cart
            })         
          }

          // Code to determine and display the values for subtotal, discount and total of the order
          let subtotal = 0;
          cartList.forEach(element =>{
            subtotal += parseFloat(element.cost);
          })
          $("#subtotal").text("$" + String(Number(subtotal).toFixed(2)));
          if (localStorage.getItem("discount") != "0"){
            $("#total").text("$" + String(Number(subtotal * ((100-parseInt(localStorage.getItem("discount")))/100)).toFixed(2))); 
          }
          else{
            $("#total").text("$" + String(Number(subtotal).toFixed(2)));
          }
          $("#cartLoad").hide();
          $("#checkoutDisc").text(localStorage.getItem("discount") + "%");  
          
          // End of code for determining and displaying those values
        }

        // Code for the checkout form
        $("#checkoutForm").submit(function(e){
          e.preventDefault();
          // User can't submit form with nothing in their cart
          if (cartList.length != 0){
            alert("Your order has been submitted! Redirecting you to the main page...");
            localStorage.setItem("discount", "0")
            window.location.href = "main.html";
          }else{
            alert("There is nothing on your cart!");
          }
          
        });
      }

      // Code that only runs if User is on priceisright.html
      else if ($("body").is("#tpirPage")) {
        
        $("#tpirLoad").hide();
        $("#tpirStart").show();
        let itemPrice = 0;
        
        // All of this only runs once the user clicks the start button
        $("#tpirStartButton").click(function () {
          $("#tpirStart").hide(200);
          $("#tpirHeader").hide();
          $("#tpirAnswerForm").show();

          // Generate a random ID to choose as the Item for the game
          let randomItemID = (Math.floor(Math.random() * 28) + 1);

          // Code to create and insert elements and nodes for the selected item
          for (i = 0; i < response.length; i++) {
            if (response[i].ItemID == randomItemID) {
              let selectedItem = response[i];
              itemPrice = selectedItem.ItemPrice;

              console.log(selectedItem.ItemName);
              console.log(itemPrice);

              let item = document.createElement("a");
              item.setAttribute("id", response[i].ItemID)
              item.setAttribute("class", "mx-auto");

              let title = document.createElement("p");
              title.setAttribute("class", "text-center");
              let mybr = document.createElement('br');
              let img = document.createElement("img")

              img.src = "https://shopinventory-7a51.restdb.io/media/" + response[i].ItemImage
              
              img.setAttribute("class", "img-fluid");
              img.setAttribute("style", "max-width:400px; max-height:400px;")
              let node = document.createTextNode(response[i].ItemName);

              item.appendChild(img)
              title.appendChild(node)
              title.appendChild(mybr)
              
              item.appendChild(title)

              document.getElementById("chosenItem").appendChild(item)
            }
          }
          // End of code to create the chosenItem element

          // Prevent user from refreshing the page by submitting the input (Not meant to submit anyway)
          $("#tpirAnswerForm").submit(function(e){
            return false;
          });

          // 1: Code for the countdown, as users are only given 5 seconds to input an answer
          // 2: Code to add discounts to localStorage value if user wins
          // 3: Display win or lose messages, and discount value won
          var timeleft = 5;
          var downloadTimer = setInterval(function(){
            if(timeleft <= 0){
              clearInterval(downloadTimer);
              $("#countdown").hide();
              $("#tpirQuestion").hide();
              $("#tpirAns").attr('readonly', true);

              let tpirAns = parseFloat($("#tpirAns").val());
              console.log(tpirAns);

              if (tpirAns == itemPrice){
                $("#tpirSecondContainer").addClass("d-flex")
                $("#tpirSecondContainer").show();
                let newDisc = parseInt(localStorage.getItem("discount")) + 15;
                
                if (newDisc>60){
                  newDisc =60;
                }
                $("#discountMessage").text("You have won 15% discount off your next order! (Capped at 60%) Total: " + String(newDisc) + "%");
                localStorage.setItem("discount", String(newDisc)); 
              }
              else if ((tpirAns-itemPrice)>0){
                if(tpirAns-itemPrice <=5){
                  $("#tpirSecondContainer").addClass("d-flex")
                  $("#tpirSecondContainer").show();
                  let newDisc = parseInt(localStorage.getItem("discount")) + 5;
                  if (newDisc>60){
                    newDisc =60;
                  }
                  $("#discountMessage").text("You have won 5% discount off your next order! (Capped at 60%) Total: " + String(newDisc) + "%");
                  localStorage.setItem("discount", String(newDisc)); 
                }
                else{
                  $("#tpirThirdContainer").addClass("d-flex")
                  $("#tpirThirdContainer").show();
                  
                }
              }
              else{
                if (itemPrice-tpirAns<=5){
                  $("#tpirSecondContainer").addClass("d-flex")
                  $("#tpirSecondContainer").show();
                  let newDisc = parseInt(localStorage.getItem("discount")) + 5;
                  if (newDisc>60){
                    newDisc =60;
                  }
                  $("#discountMessage").text("You have won 5% discount off your next order! (Capped at 60%) Total: " + String(newDisc) + "%");
                  localStorage.setItem("discount", String(newDisc)); 
                }
                else{
                  $("#tpirThirdContainer").addClass("d-flex")
                  $("#tpirThirdContainer").show();
                }
              }

            } else {
              $("#countdown").text(timeleft + " second(s) remaining");
            }
            timeleft -= 1;
          }, 1000);
          
        })
      }
    });
  }



  // The account API is only called if user is on these html pages
  if ($("body").is("#loginPage") || $("body").is("#itemPage")) {

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

    // Code that is only run once the account database responds
    $.ajax(settings).done(function (response) {

      // Code that only runs if the user is on index.html
      if ($("body").is("#loginPage")) {
        localStorage.clear();

        // Code that runs when user clicks the login button
        $("#Log-in").submit(function (e) {
          e.preventDefault();

          let username = $('#username').val();
          let password = $('#password').val();
          console.log(username);
          console.log(password);
          let found = false;
          response.forEach(element => {
            if (element.username == username && element.password == password) {
              
              localStorage.setItem("discount", "0");
              localStorage.setItem("accemail", element.email);
              localStorage.setItem("accuser", username);
              

              found = true;

              $("#mainAnimation").hide();
              $("#successAnimation").show();

              // Delay before redirecting to main.html
              setTimeout(function () {
                $("#successAnimation").hide();
                $("#mainAnimation").show();
                $("#Log-in").trigger("reset");
                let cartItemList = [];
                localStorage.setItem('cartItemList', JSON.stringify(cartItemList));
                window.location.href = "main.html";
              }, 2000);
            }
          })

          // Code that runs if the input does not match any records in the account database
          if (found == false) {
            console.log("Account not found!");
            $("#mainAnimation").hide();
            $("#failAnimation").show();

            setTimeout(function () {
              $("#failAnimation").hide(100);
              $("#mainAnimation").show(100);
            }, 2000);
          }

        })

        // Hides main block and displays elements and form for signing up once clicked
        $("#startSignup").click(function () {
          $("#mainBlock").hide();
          $("#signupBlock").show();
        })

        // Code for signing up and adding record to the Account database
        $("#sign-up").submit(function (e) {
          e.preventDefault();
         
          let username = $('#signupUser').val();
          let password = $('#signupPassw').val();
          let email = $('#signupEmail').val();
          
          // Send data via API to Account database
          var jsondata = {
            "username": username,
            "password": password,
            "email": email,
            "discount": 0
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
            // Code for when there is an error, such as when the account already exists.
            "data": JSON.stringify(jsondata),
            error: function (e) {
              console.log("ERROR: " + e.responseJSON.message);
              $("#errMsg").text("Username already exists!");
            },
            // Makes the submit button disabled so they are unable to submit multiple times and spam the API
            "beforeSend": function () {
              $("#submitsignup").prop("disabled", true);
            }
          }

          // Code that runs once the API responds with a success value indicating the Account record was successfully made
          $.ajax(settings).done(function (response) {
            console.log("Successful creation of account!");
            localStorage.setItem("discount", "0");
            localStorage.setItem("accuser", username);
            localStorage.setItem("accemail", email);
            let cartItemList = [];
            localStorage.setItem('cartItemList', JSON.stringify(cartItemList));
            window.location.href = "main.html";
          })
        })

      }
      // Code that runs when the user is on item.html
      else if ($("body").is("#itemPage")) {

        // Event listener that automatically displays total cost of order for an individual item
        $("#quantityPurchased").focusout(function () {
          $("#subtotalCost").val("$" + Number(localStorage.getItem("ItemPrice") * $("#quantityPurchased").val()).toFixed(2));
        });

        // Adding an order to cart
        $("#addToCart").submit(function (e) {
          e.preventDefault();

          // Create a local value to extract localStorage cartItemList
          let cartList = JSON.parse(localStorage.getItem('cartItemList'));
          let found = false;

          // Code for when a CartItem object of a specific item ID already exists
          // This code ensures that the new quantity and value is updated in that CartItem object, instead of 
          // creating another CartItem object with the same item ID.
          cartList.forEach(element => {
            if (element.itemID == localStorage.getItem("ItemID")) {
              element.quantity = (parseFloat(element.quantity) + parseFloat($("#quantityPurchased").val())).toString();
              element.cost = Number(parseFloat(element.quantity) * localStorage.getItem("ItemPrice")).toFixed(2);
              found = true;
            }
          }
          )

          // Code that runs to create a new CartItem object since there isn't a CartItem object 
          // with the same ItemID already existing in the cartItemList
          if (found == false) {
            let cartItem = new CartItem(localStorage.getItem("ItemID"),
              $("#quantityPurchased").val(), Number(localStorage.getItem("ItemPrice") * $("#quantityPurchased").val()).toFixed(2));
            cartList.push(cartItem);
          }

          // Update localStorage value for cartItemList
          localStorage.setItem('cartItemList', JSON.stringify(cartList));

          // Redirect back to main.html, after 1.5 seconds.
          setTimeout(function () {
            window.location.href = 'main.html'
          }, 1500)
        })
      }
    })
  }

})

// Create CartItem constructor for CartItem object
function CartItem(itemID, quantity, cost) {
  this.itemID = itemID;
  this.quantity = quantity;
  this.cost = cost;
}


// Start of code for trivia function
// It doesn't make use of the two custom APIs, thus it requires it's own if statement.
if ($("body").is("#triviaPage")) {
  
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=db0d6efdab67b239fecd4fa9109cb303");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("https://opentdb.com/api.php?amount=1&category=15&type=multiple&encode=url3986", requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      let question = document.createElement('h1')
      let decodedquestion = decodeURIComponent(result.results[0].question)// decoding the triva question from URL Encoding (RFC 3986)
      question.setAttribute("class","question")


      question.appendChild(document.createTextNode(decodedquestion))

      document.getElementById("quiz").appendChild(question)

      // Creating trivia form
      let quiz = document.createElement("form")
      quiz.setAttribute("id", "trivia")


      let option1 = document.createElement("div")
      let input1 = document.createElement("input")
      input1.setAttribute("type", "radio")
      input1.setAttribute("id", "opt1")
      input1.setAttribute("name", "trivia")
      let lable1 = document.createElement("label")
      lable1.setAttribute("for", "opt1")
      option1.appendChild(lable1)
      option1.appendChild(input1)

      let option2 = document.createElement("div")
      let input2 = document.createElement("input")
      input2.setAttribute("type", "radio")
      input2.setAttribute("id", "opt2")
      input2.setAttribute("name", "trivia")
      let lable2 = document.createElement("label")
      lable2.setAttribute("for", "opt2")
      option2.appendChild(lable2)
      option2.appendChild(input2)

      let option3 = document.createElement("div")
      let input3 = document.createElement("input")
      input3.setAttribute("type", "radio")
      input3.setAttribute("id", "opt3")
      input3.setAttribute("name", "trivia")
      let lable3 = document.createElement("label")
      lable3.setAttribute("for", "opt3")
      option3.appendChild(lable3)
      option3.appendChild(input3)

      let option4 = document.createElement("div")
      let input4 = document.createElement("input")
      input4.setAttribute("type", "radio")
      input4.setAttribute("id", "opt4")
      input4.setAttribute("name", "trivia")
      let lable4 = document.createElement("label")
      lable4.setAttribute("for", "opt4")
      option4.appendChild(lable4)
      option4.appendChild(input4)

      let submitbutton = document.createElement("div")
      let submit = document.createElement("input")
      submit.setAttribute("type", "submit")
      submit.setAttribute("value", "submit")
      submit.setAttribute("id", "submitquiz")
      submitbutton.appendChild(submit)
      // End of creating trivia form

      // Randomise correct answer location
      let randomise = Math.floor(Math.random() * 4) + 1;




      if (randomise == 1) {
        let decodedanswer = decodeURIComponent(result.results[0].correct_answer)
        lable1.appendChild(document.createTextNode(decodedanswer))
        input1.setAttribute("class", "correctans")



        for (i = 0; i < result.results[0].incorrect_answers.length; i++) {
          let decodedoption = decodeURIComponent(result.results[0].incorrect_answers[i])
          
          let optionarray = [lable2, lable3, lable4]
          optionarray[i].appendChild(document.createTextNode(decodedoption))

        }



      }

      else if (randomise == 2) {
        let decodedanswer = decodeURIComponent(result.results[0].correct_answer)
        lable2.appendChild(document.createTextNode(decodedanswer))
        input2.setAttribute("class", "correctans")



        for (i = 0; i < result.results[0].incorrect_answers.length; i++) {
          let decodedoption = decodeURIComponent(result.results[0].incorrect_answers[i])
          let optionarray = [lable1, lable3, lable4]
          optionarray[i].appendChild(document.createTextNode(decodedoption))

        }

      }

      else if (randomise == 3) {
        let decodedanswer = decodeURIComponent(result.results[0].correct_answer)
        lable3.appendChild(document.createTextNode(decodedanswer))
        input3.setAttribute("class", "correctans")



        for (i = 0; i < result.results[0].incorrect_answers.length; i++) {
          let decodedoption = decodeURIComponent(result.results[0].incorrect_answers[i])

          let optionarray = [lable1, lable2, lable4]
          optionarray[i].appendChild(document.createTextNode(decodedoption))

        }

      }

      else if (randomise == 4) {
        let decodedanswer = decodeURIComponent(result.results[0].correct_answer)
        lable4.appendChild(document.createTextNode(decodedanswer))
        input4.setAttribute("class", "correctans")



        for (i = 0; i < result.results[0].incorrect_answers.length; i++) {
          let decodedoption = decodeURIComponent(result.results[0].incorrect_answers[i])
          let optionarray = [lable1, lable2, lable3]
          optionarray[i].appendChild(document.createTextNode(decodedoption))

        }

      }

      quiz.appendChild(option1)
      quiz.appendChild(option2)
      quiz.appendChild(option3)
      quiz.appendChild(option4)
      quiz.appendChild(submitbutton)
      document.getElementById("quiz").appendChild(quiz)
      // End of randomising correct ans location




      document.getElementById("submitquiz").addEventListener("click", function (event) {
        event.preventDefault();

        // Code for what actions to take when user answers question correctly
        if (document.querySelector('input[name="trivia"]:checked').classList.contains("correctans")) {
          document.querySelectorAll('h1').forEach(e => e.remove())
          document.querySelectorAll('#trivia').forEach(e => e.remove())

          if(parseInt(localStorage.getItem("discount")) < 60){
            let newDisc = parseInt(localStorage.getItem("discount")) + 10;
            localStorage.setItem("discount", String(newDisc));
          }
          console.log(localStorage.getItem("discount"))

          


          

          let result = document.createElement('h1')
          result.appendChild(document.createTextNode("Congrats!!! You have earned yourself  a 10% discount (Capped at 60%). Total: " + localStorage.getItem("discount") + "%"))

          document.getElementById("quiz").appendChild(result)
        }

        // Code for what actions to take when user answers question wrongly
        else {

          document.querySelectorAll('h1').forEach(e => e.remove())
          document.querySelectorAll('#trivia').forEach(e => e.remove())

          let result = document.createElement('h1')
          result.appendChild(document.createTextNode("Oh no!!! You answered the question incorrectly, Better luck next time!"))

          document.getElementById("quiz").appendChild(result)
        }
      })
    }
  )
}
//End of code for triva function

