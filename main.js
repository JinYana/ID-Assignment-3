
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

    let header = document.createElement('h1')
    let itemcat = document.createTextNode("All Items")
    header.setAttribute("class", "itemheader")
    header.appendChild(itemcat)
    document.getElementById("inventory").appendChild(header)

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
          let price = document.createElement("p")
          let img = document.createElement("img")
          img.src = "https://shopinventory-7a51.restdb.io/media/" + response[i].ItemImage
          img.setAttribute("width", "100px")
          img.setAttribute("height", "100px")
          let node = document.createTextNode(response[i].ItemName);
          let number = document.createTextNode("$" + response[i].ItemPrice)
          item.appendChild(img)
          title.appendChild(node)
          price.appendChild(number)
          item.appendChild(title)
          item.appendChild(price)
          document.getElementById("inventory").appendChild(item)
        }
        
        
        else if(document.getElementById("category").value == response[i].ItemCategory){
          let item = document.createElement("div");
          item.setAttribute("class", "item")
          let title = document.createElement("p")
          let price = document.createElement("p")
          let img = document.createElement("img")
          img.src = "https://shopinventory-7a51.restdb.io/media/" + response[i].ItemImage
          img.setAttribute("width", "100px")
          img.setAttribute("height", "100px")
          let node = document.createTextNode(response[i].ItemName);
          let number = document.createTextNode("$" + response[i].ItemPrice)
          item.appendChild(img)
          title.appendChild(node)
          price.appendChild(number)
          item.appendChild(title)
          item.appendChild(price)
        
         document.getElementById("inventory").appendChild(item)      
        }         
      } 
    })
});
})