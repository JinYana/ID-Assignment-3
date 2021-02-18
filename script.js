
let discount = 0
$(document).ready(function () {
  // Code for Iteminventory(to display items)
  $("#successAnimation").hide();
  $("#failAnimation").hide();
  $("#signupBlock").hide();
  $("#tpirStart").hide();
  $("#tpirAnswerForm").hide();
  $("#tpirSecondContainer").hide();
  $("#tpirThirdContainer").hide();


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

  if ($("body").is("#mainPage") || $("body").is("#itemPage") || $("body").is("#tpirPage") || $("body").is("#checkoutPage")) {
    $.ajax(settings).done(function (response) {
      console.log(response);
      if ($("body").is("#mainPage")) {
        $("#mainLoad").hide();
        localStorage.removeItem("ItemID");
        localStorage.removeItem("ItemPrice");
        //Code for deafault main page
        
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
        //End of code for deafult main page


        for (i = 0; i < response.length; i++) {
          document.getElementsByTagName("a")[i].addEventListener("click", function (event) {
            localStorage.setItem("ItemID", this.id)
          })

        }

        $("#searchBar").submit(function (e) {
          e.preventDefault();
        })

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


          //Start of code to enlarge item
          for (i = 0; i < response.length; i++) {
            document.getElementsByTagName("a")[i].addEventListener("click", function (event) {
              localStorage.setItem("ItemID", this.id)
            })//To keep track of which item was clicked by the user

          }
        })

      }

      else if ($("body").is("#itemPage")) {
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
      //End of code to enlarge item



      else if ($("body").is("#checkoutPage")) {
        let cartList = JSON.parse(localStorage.getItem("cartItemList"));

        $("#username").val(localStorage.getItem("accuser"));
        $("#email").val(localStorage.getItem("accemail"));

        if (cartList.length == 0) {
          $("#cartLoad").hide();
          $("#totalItems").text(cartList.length);

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
        else {
          const cartNode = document.getElementById("cart");
          while (cartNode.lastElementChild) {
            cartNode.removeChild(cartNode.lastElementChild);
          }

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
            })         
          }
          $("#cartLoad").hide();
          
          // $("#checkoutDisc").text();     
        }

        $("#checkoutForm").submit(function(e){
          e.preventDefault();
          if (cartList.length != 0){
            alert("Your order has been submitted! Redirecting you to the main page...");
            window.location.href = "main.html";
          }else{
            alert("There is nothing on your cart!");
          }
          
        });
      }

      else if ($("body").is("#tpirPage")) {
        
        $("#tpirLoad").hide();
        $("#tpirStart").show();
        let itemPrice = 0;
        
        $("#tpirStartButton").click(function () {
          $("#tpirStart").hide(200);
          $("#tpirHeader").hide();
          $("#tpirAnswerForm").show();

          let randomItemID = (Math.floor(Math.random() * 28) + 1);
          for (i = 0; i < response.length; i++) {
            if (response[i].ItemID == randomItemID) {
              let selectedItem = response[i];
              itemPrice = selectedItem.ItemPrice;

              console.log(selectedItem.ItemName);
              console.log(itemPrice);

              let item = document.createElement("a");
              item.setAttribute("class", "container flex-column d-flex mx-auto my-auto")
              item.setAttribute("id", response[i].ItemID)

              let title = document.createElement("p");
              title.setAttribute("class", "mx-auto");
              let mybr = document.createElement('br');
              let img = document.createElement("img")

              img.src = "https://shopinventory-7a51.restdb.io/media/" + response[i].ItemImage
              img.setAttribute("width", "400px")
              img.setAttribute("height", "400px")
              img.setAttribute("class", "align-self-center")
              let node = document.createTextNode(response[i].ItemName);
              
              
              

              item.appendChild(img)
              title.appendChild(node)
              title.appendChild(mybr)
              
              item.appendChild(title)

              document.getElementById("chosenItem").appendChild(item)
            }
          }

          $("#tpirAnswerForm").submit(function(e){
            return false;
          });
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
                $("#discountMessage").text("You have won 30% discount off your next order!");
              }
              else if ((tpirAns-itemPrice)>0){
                if(tpirAns-itemPrice <=5){
                  $("#tpirSecondContainer").addClass("d-flex")
                  $("#tpirSecondContainer").show();
                  $("#discountMessage").text("You have won 20% discount off your next order!");
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
                  $("#discountMessage").text("You have won 20% discount off your next order!");
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

  if ($("body").is("#loginPage") || $("body").is("#itemPage")) {

    $.ajax(settings).done(function (response) {
      if ($("body").is("#loginPage")) {


        $("#Log-in").submit(function (e) {
          e.preventDefault();

          let username = $('#username').val();
          let password = $('#password').val();
          console.log(username);
          console.log(password);
          let found = false;
          response.forEach(element => {
            if (element.username == username && element.password == password) {
              
              localStorage.setItem("discount", "zero")
              

              found = true;

              $("#mainAnimation").hide();
              $("#successAnimation").show();

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

        $("#startSignup").click(function () {
          $("#mainBlock").hide();
          $("#signupBlock").show();
        })

        $("#sign-up").submit(function (e) {
          e.preventDefault();
          console.log("hello");
          


          let username = $('#signupUser').val();
          let password = $('#signupPassw').val();
          let email = $('#signupEmail').val();
          

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
            "data": JSON.stringify(jsondata),
            error: function (e) {
              console.log("ERROR: " + e.responseJSON.message);
              $("#errMsg").text("Username already exists!");
            },
            "beforeSend": function () {
              $("#submitsignup").prop("disabled", true);
            }
          }

          $.ajax(settings).done(function (response) {
            console.log("Successful creation of account!");
            localStorage.setItem("discount", "zero")
            let cartItemList = [];
            localStorage.setItem('cartItemList', JSON.stringify(cartItemList));
            window.location.href = "main.html";
          })
        })

      }
      else if ($("body").is("#itemPage")) {
        $("#quantityPurchased").focusout(function () {
          $("#subtotalCost").val("$" + Number(localStorage.getItem("ItemPrice") * $("#quantityPurchased").val()).toFixed(2));

        });

        $("#addToCart").submit(function (e) {
          e.preventDefault();


          let cartList = JSON.parse(localStorage.getItem('cartItemList'));
          let found = false;
          cartList.forEach(element => {
            if (element.itemID == localStorage.getItem("ItemID")) {
              element.quantity = (parseFloat(element.quantity) + parseFloat($("#quantityPurchased").val())).toString();
              element.cost = Number(parseFloat(element.quantity) * localStorage.getItem("ItemPrice")).toFixed(2);
              found = true;
            }
          }
          )

          if (found == false) {
            let cartItem = new CartItem(localStorage.getItem("ItemID"),
              $("#quantityPurchased").val(), Number(localStorage.getItem("ItemPrice") * $("#quantityPurchased").val()).toFixed(2));
            cartList.push(cartItem);
          }

          localStorage.setItem('cartItemList', JSON.stringify(cartList));

          setTimeout(function () {
            window.location.href = 'main.html'
          }, 1500)
        })
      }

      // end of ajax
    })
  }

})

// Create CartItem constructor for CartItem object
function CartItem(itemID, quantity, cost) {
  this.itemID = itemID;
  this.quantity = quantity;
  this.cost = cost;
}


//Start of code for triva function


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

      //Creating triva form
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

      let submitbutton = document.createElement("input")
      submitbutton.setAttribute("type", "submit")
      submitbutton.setAttribute("value", "submit")
      submitbutton.setAttribute("id", "submitquiz")
      //End of creating triva form

      //to randomise correct answer location
      let randomise = Math.floor(Math.random() * 4) + 1;




      if (randomise == 1) {
        let decodedanswer = decodeURIComponent(result.results[0].correct_answer)
        lable1.appendChild(document.createTextNode(decodedanswer))
        input1.setAttribute("class", "correctans")



        for (i = 0; i < result.results[0].incorrect_answers.length; i++) {
          let decodedoption = decodeURI(result.results[0].incorrect_answers[i])
          
          let optionarray = [lable2, lable3, lable4]
          optionarray[i].appendChild(document.createTextNode(decodedoption))

        }



      }

      else if (randomise == 2) {
        let decodedanswer = decodeURIComponent(result.results[0].correct_answer)
        lable2.appendChild(document.createTextNode(decodedanswer))
        input2.setAttribute("class", "correctans")



        for (i = 0; i < result.results[0].incorrect_answers.length; i++) {
          let decodedoption = decodeURI(result.results[0].incorrect_answers[i])
          let optionarray = [lable1, lable3, lable4]
          optionarray[i].appendChild(document.createTextNode(decodedoption))

        }

      }

      else if (randomise == 3) {
        let decodedanswer = decodeURIComponent(result.results[0].correct_answer)
        lable3.appendChild(document.createTextNode(decodedanswer))
        input3.setAttribute("class", "correctans")



        for (i = 0; i < result.results[0].incorrect_answers.length; i++) {
          let decodedoption = decodeURI(result.results[0].incorrect_answers[i])

          let optionarray = [lable1, lable2, lable4]
          optionarray[i].appendChild(document.createTextNode(decodedoption))

        }

      }

      else if (randomise == 4) {
        let decodedanswer = decodeURIComponent(result.results[0].correct_answer)
        lable4.appendChild(document.createTextNode(decodedanswer))
        input4.setAttribute("class", "correctans")



        for (i = 0; i < result.results[0].incorrect_answers.length; i++) {
          let decodedoption = decodeURI(result.results[0].incorrect_answers[i])
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

          if(localStorage.getItem("discount") == "zero" ){
            localStorage.setItem("discount", "10")
            
          }
          else if(localStorage.getItem("discount") == "10"){
            localStorage.setItem("discount", "20")

          }
          else if(localStorage.getItem("discount") == "20"){
            localStorage.setItem("discount", "30")
            
          }
          else if(localStorage.getItem("discount") == "30"){
            localStorage.setItem("discount", "40")
            
          }
          else if(localStorage.getItem("discount") == "40"){
            localStorage.setItem("discount", "50")
            
          }
          else if(localStorage.getItem("discount") == "50"){
            localStorage.setItem("discount", "60")
            
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


    })


}
//End of code for triva function

