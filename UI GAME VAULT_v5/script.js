// Show pages. All of the pages, except the home are hidden. 
// When a specific button is clicked, the section is showed and the rest is hidden

function showPage(pageId) {

  var pages = document.getElementsByTagName("section")
  var i;

  // This part hides the rest of the section
  for(i = 0; i < pages.length; i++){
    pages[i].style.display ="none";
  }

  // This shows the pages
  var x = document.getElementById(pageId);
  if (x.style.display === "none" || x.style.display === "") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }

  if (pageId === 'user-login' || pageId === 'create-account') {
    document.body.classList.add('login-mode');
  } else {
    document.body.classList.remove('login-mode');
  }
}

window.onload = function() {
    showPage('user-login');
};





// Game Search Bar

function gameSelection() {

  var input, filter, table, tr, td, i, textValue;

  input = document.getElementById("gameSearch");
  filter = input.value.toUpperCase();
  table = document.getElementById("gameTable");
  tr = table.getElementsByTagName("tr");

  for (i=0; i < tr.length; i++) {

    td = tr[i].getElementsByTagName("td")[1];

    if (td) {
      textValue = td.textContent || td.innerText;

      if (textValue.toUpperCase().indexOf(filter) > -1) {

        tr[i].style.display = "";
      } 

      else {
        
        tr[i].style.display = "none";
      }
    }       
  }

}







// SORTING
// This is a simple sorting algorithm
// sort by name or sort by price
function sortGames(criteria) {
  const table = document.getElementById("gameTable");
  const rows = Array.from(table.rows).slice(1); // skip header row

// checks the conditions firts, if the button is clicked with the name = "name"
// then it will sort by name, if its "price", then it will sort by price

  rows.sort((a, b) => {


// Sorts by name
    if (criteria ==="name") {

      const nameA = a.cells[1].innerText.toLowerCase();
      const nameB = b.cells[1].innerText.toLowerCase();
      return nameA.localeCompare(nameB);
    } 
// Sort by number
    else if (criteria ==="price") {

      const priceA = parseFloat(a.cells[2].innerText.replace(/[^0-9.]/g, ""));
      const priceB = parseFloat(b.cells[2].innerText.replace(/[^0-9.]/g, ""));
      return priceA - priceB;
    }
  });

  rows.forEach(row => table.appendChild(row)); // reattach in sorted order
}







// ==========================================
// ABOUT PAGE FORMS (CERBERUS LOGIC REPAIRED)
// ==========================================
var contactForm = document.forms["contactForm"];
if (contactForm) {

// CONTACT FORM CODE
// Same as the news letter form, but this one checks the name, last name, email, and a big text box to write something
  contactForm.addEventListener("submit", function(event) {
    event.preventDefault(); // stops form from refreshing the page

    var first = document.forms["contactForm"]["firstname"].value.trim();
    var last = document.forms["contactForm"]["lastname"].value.trim();
    var email = document.forms["contactForm"]["emailaddress"].value.trim();
    var message = document.forms["contactForm"]["something"].value.trim();

// This will require the user to check if all of the field is filled
    if (first === "" || last === "" || email === "" || message === "") {

      alert("Please fill out all fields before submitting.");

      return;
    }

// It should include @ and .
    if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {

      alert("Please enter a valid email address.");

      return;
    }

    alert("Message sent successfully!");

  });
}





// ==========================================
// MY LIBRARY SYSTEM
// ==========================================
var library = [];

function updateLibraryDisplay() {
  const table = document.getElementById("libraryTable");
  table.querySelectorAll("tr:not(.header)").forEach(row => row.remove());

  library.forEach((item) => {
    const row = table.insertRow();

    const pictureCell = row.insertCell(0);
    const picture = document.createElement("img");
    picture.src = item.image;
    picture.alt = item.name;
    pictureCell.appendChild(picture);

    const detailsCell = row.insertCell(1);
    detailsCell.innerHTML = `
      ${item.name}
      <span class="library-activation">Activation Key: ${item.activationKey}</span>
    `;

    const downloadBtn = document.createElement("button");
    downloadBtn.innerText = "DOWNLOAD";
    downloadBtn.className = "library-download-btn";
    downloadBtn.onclick = function() { alert(`Starting download for ${item.name}...`); };
    
    row.appendChild(downloadBtn);
  });

  if(library.length === 0){
    document.getElementById("libraryMessage").style.display = "block";
  } else {
    document.getElementById("libraryMessage").style.display = "none";
  }
}





// Shopping Cart
var cart = [];


// Function for adding cart, so I get the name, price, image source
function addToCart(name, price, image) {
  for (var i = 0; i < library.length; i++) {
    if (library[i].name === name) {
      alert(`${name} is already in your Library! You own this game.`);
      return;
    }
  }

  // Once a button is pushed, the value inside the button will go straight to the cart variable or container
  cart.push({ name, price, image }); //I used the cart variable to "push" or insert the data

  alert(`${name} (CDN$ ${price}) has been added to your cart.`);

  // The three function will take the same name,image,and price
  updateCartDisplay();
  updateCheckOutDisplay();
  updateReceiptItems();
}



// We update the cart using the cart we had
function updateCartDisplay() {
  const table = document.getElementById("cartTable");
  const totalDisplay = document.getElementById("totalPrice");

  // Remove all rows except the header
  table.querySelectorAll("tr:not(.header)").forEach(row => row.remove());

  let total = 0;

  //I generated the table and used forEach function to create each table 
  cart.forEach((item, index) => {
    const row = table.insertRow();

    const pictureCell = row.insertCell(0);
    const picture = document.createElement("img");

    picture.src = item.image;
    picture.alt = item.name;
    picture.style.width = "75%";
    picture.style.height = "25%";
   
    pictureCell.appendChild(picture);
   
    //Name (Easier to edit the style here)
    const nameCell = row.insertCell(1);
    nameCell.innerText = item.name;
    nameCell.style.fontSize = "30px";

    //Price(Easier to edit the style here)
    const priceCell = row.insertCell(2);
    priceCell.innerText = `CDN$ ${item.price.toFixed(2)}`;
    priceCell.style.fontSize = "15px";

    const removeCell = row.insertCell(3);
    const button = document.createElement("button");
    button.classList.add("removeButton");
    button.innerText = "Remove";
    button.onclick = function() { removeFromCart(index); };
    removeCell.appendChild(button);

    //I added the total price with tax
    total += (item.price * 0.13) + item.price;
    
  });

// The whole idea of this code is to hide and show the check out button, total, and message
// if there is or there is not anything in the cart

// If cart is empty
  if(cart.length === 0){

  //message will show this
    document.getElementById("shoppingMessage").innerHTML = "Your Shopping Cart is Empty <br><br><br><br>";
    document.getElementById("shoppingHeader").innerHTML = ""; 
    totalDisplay.innerText = "";

  // I created a button and it is hidden if the cart is 0
    let checkOutButton = document.getElementById("checkOut");
    checkOutButton.classList.add("checkOut");
    checkOutButton.style.visibility = "hidden";
    checkOutButton.innerText = "";

  } else {

  // It will show the table title and the total if there is something in the cart
    document.getElementById("shoppingMessage").innerHTML = ""; 
    document.getElementById("shoppingHeader").innerHTML = "Your Shopping Cart";
    totalDisplay.innerText = `Total: CDN$ ${total.toFixed(2)}`;

  // I created a button and it is visible if there is an item in the cart
    let checkOutButton = document.getElementById("checkOut");
    checkOutButton.style.float = "right";
    checkOutButton.style.visibility = "visible";
    checkOutButton.classList.add("checkOut");
    checkOutButton.innerText = "Check Out";
    checkOutButton.onclick = function() { showPage('checkOutPage'); };

  }

}



//Removing the item fromt he cart
function removeFromCart(index) {

  // When the user removes anything from the cart, it will automatically remove the items from
  // the cart, checkout display, and receipt item (both the check out and receipt is hidden from the user until they opened it)
  cart.splice(index, 1);
  updateCartDisplay();
  updateCheckOutDisplay();
  updateReceiptItems();

}







// Shopping wishlist
// I just recycled the shopping cart and removed the total ammount.
// I also added a "add to cart" and reused the addToCart function
// Mostly identical to the shopping cart
// and it has it's own wishlist container to get items once a button is clicked
var wishlist = [];

function addToWishlist(name, price, image) {
  for (var i = 0; i < library.length; i++) {
    if (library[i].name === name) {
      alert(`${name} is already in your Library! You own this game.`);
      return;
    }
  }

  // Add game to wishlist
  wishlist.push({ name, price, image });

  alert(`${name} (CDN$ ${price}) has been added to your wishlist.`);

  // This calls the updateWhishlist function which is to take the object-like data from the button
  updatewishlistDisplay();
}

function updatewishlistDisplay() {
  const table = document.getElementById("wishlistTable");

  // Removes all rows except the header
  table.querySelectorAll("tr:not(.header)").forEach(row => row.remove());

  wishlist.forEach((item, index) => {
    const row = table.insertRow();

    // Same as the shoppingCart, this will generate all the images,
    // price, remove button, but this time it has add to Cart

    //The image here
    const pictureCell  = row.insertCell(0);
    const picture = document.createElement("img");
    picture.src = item.image;
    picture.alt = item.name;
    picture.style.width = "75%";
    picture.style.height = "25%";
    pictureCell.appendChild(picture);

    // Game name and price
    const namedCell = row.insertCell(1);
    namedCell.innerText = item.name;
    namedCell.style.fontSize = "30px";

    const pricedCell = row.insertCell(2);
    pricedCell.innerText = `CDN$ ${item.price.toFixed(2)}`;
    pricedCell.style.fontSize =  "15px";

    // Remove button
    const removeCell = row.insertCell(3);
    const removeButton = document.createElement("button");
    removeButton.classList.add("removeButton");
    removeButton.innerText = "Remove";
    removeButton.onclick = function() { removeFromwishlist(index); };
    removeCell.appendChild(removeButton);

    // Add to Cart button
    // This is the new addition to whish list 
    const addCell = row.insertCell(4);
    const addButton = document.createElement("button");
    addButton.classList.add("removeButton"); //Recycled class (because they have the same attribute)
    addButton.innerText = "Add to Cart";
    // This means, what ever item is in the whish list, goes through the add to cart button function, which will take the items.
    addButton.onclick = function() {
      const itemToAdd =  wishlist[index];
      addToCart(itemToAdd.name, itemToAdd.price, itemToAdd.image);
      // I also need to remove it from the list once they added it
      removeFromwishlist(index); 
    };
    addCell.appendChild(addButton);
  });

// Same idea with the 
  if(wishlist.length === 0){

    document.getElementById("wishlistMessage").innerHTML = "Your Wishlist is Empty <br><br><br>";
    document.getElementById("wishlistHeader").innerHTML = ""; 

  } else {

    document.getElementById("wishlistMessage").innerHTML = ""; 
    document.getElementById("wishlistHeader").innerHTML = "Your Wishlist"; 

  }
}

function removeFromwishlist(index) {
  wishlist.splice(index, 1);
  updatewishlistDisplay();
}



// Similar to shopping cart except I removed "remove"
// The code will be taking items from the "cart" variable unlike wishlist which has a different container
function updateCheckOutDisplay() {
  const table = document.getElementById("checkOutTable");
  const totalDisplay = document.getElementById("totalCheckOutPrice");

  // Remove all rows except the header
  table.querySelectorAll("tr:not(.header)").forEach(row => row.remove());

  let total = 0;

  cart.forEach(item => {
    const row = table.insertRow();

    // this generates the images, name, and price
    const pictureCell = row.insertCell(0);
    const picture = document.createElement("img");
    picture.src = item.image;
    picture.alt = item.name;
    picture.style.width = "75%";
    picture.style.height = "25%";
    pictureCell.appendChild(picture);

    const nameCell = row.insertCell(1);
    nameCell.innerText = item.name;
    nameCell.style.fontSize = "30px";

    const priceCell = row.insertCell(2);
    priceCell.innerText = `CDN$ ${item.price.toFixed(2)}`;
    priceCell.style.fontSize = "15px";

    // computes the price here
    total += (item.price * 0.13) + item.price;

  });

  // shows the price here
  totalDisplay.innerText = `CDN$ ${total.toFixed(2)}`;

}



// Receipt page
// This almost the same as the two functions above but this one is less
// complicated than the two above because it only creates the image, name, and price
function updateReceiptItems() {
  const table = document.getElementById("recieptTable");
  const totalDisplay = document.getElementById("totalRecieptPrice");

  table.querySelectorAll("tr:not(.header)").forEach(row => row.remove());

  let total = 0;

  cart.forEach(item => {
    const row = table.insertRow();

    // this generates the images, name, and price
    const pictureCell = row.insertCell(0);
    const picture = document.createElement("img");
    picture.src = item.image;
    picture.alt = item.name;
    picture.style.width = "75%";
    picture.style.height = "25%";
    pictureCell.appendChild(picture);


    const nameCell = row.insertCell(1);
    nameCell.innerText = item.name;
    nameCell.style.fontSize = "30px";

    const priceCell = row.insertCell(2);
    priceCell.innerText = `CDN$ ${item.price.toFixed(2)}`;
    priceCell.style.fontSize = "15px";

    // It computes the price here
    total += (item.price * 0.13) + item.price;

  });

  // shows the total here
  totalDisplay.innerText = `CDN$ ${total.toFixed(2)}`;

}














// CREDIT CARD FORM
// Very similar to the other form written above
var creditForm = document.forms["creditForm"];
if (creditForm) {

  creditForm.addEventListener("submit", function(event) {
    event.preventDefault(); // stops form from refreshing the page

    var first = document.forms["creditForm"]["name"].value.trim();
    var number = document.forms["creditForm"]["number"].value.trim();
    var email = document.forms["creditForm"]["emailaddress"].value.trim();
    var cvv = document.forms["creditForm"]["CVV"].value.trim();
    var month = document.forms["creditForm"]["month"].value.trim();

    // Checks if every text box is empty
    if (first === "" || number === "" || email === "" || cvv === "" || month === "") {

      alert("Please fill out all fields before submitting.");

      return;
    }

    // It will need a 16  digit number and should be a number
    if (number.length !== 16 || isNaN(number)){

      alert("Please insert a valid card number (16 digits)");

      return;
    }

    // It needs a total number of 3 and should be a number
    if (cvv.length !== 3 || isNaN(number)){

      alert("Please insert a valid CVV (3/4 digits)");

      return;
    }

    // It needs @ and . to proceed
    if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {

      alert("Please enter a valid email address.");

      return;
    }
    
    // After the transaction, it will proceed to the receipt page 
    alert("Order Complete!");
    showPage('receiptPage');

    // Grab the generated receipt number
    var orderStr = receiptNumber();

    // Push purchased items to the Library!
    cart.forEach(item => {
      // Check if not already in library
      var alreadyOwned = false;
      for (var j = 0; j < library.length; j++) {
        if (library[j].name === item.name) {
          alreadyOwned = true;
        }
      }
      if(!alreadyOwned) {
        library.push({ 
          name: item.name, 
          image: item.image, 
          activationKey: orderStr + "-KEY" 
        });
      }
    });

    updateLibraryDisplay();

    // This part will update and delete the data inside the cart and checkout display
    cart = [];
    updateCartDisplay();
    updateCheckOutDisplay();

  });
}




// RECEIPT PAGE
// This will generate the date, order number, name, and, email
var oNumber = 1; //Will use this for the order number to increment each time the user orders

function receiptNumber (){

  const date = new Date();


  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let thankYouName = document.forms["creditForm"]["name"].value.trim();

  // Using Math function to create a 4 digit randomized number
  let random = Math.floor(Math.random() * 10000);
  let orderNumber = oNumber++; // I need to increment once if the order number proceeds so each order number will be from 1 onwards

  // Simple concatenation 
  let fullDate = day + "/" + month + "/" + year;
  let fullReceiptNumber =  orderNumber + "-" +  year + "" + month + "" + day + "-" + random;

  // This will show the final output of the message or text
  document.getElementById("receiptCode").innerHTML = fullReceiptNumber;
  document.getElementById("date").innerHTML = fullDate;
  document.getElementById("nameReceipt").innerHTML = "Thank you " + thankYouName + " for shopping!";
  document.getElementById("emailReceipt").innerHTML = document.forms["creditForm"]["emailaddress"].value.trim();

  return fullReceiptNumber;

}



// Also known as "go back" button
//Since the cart was already reseted to none in the credit card form, the program will just need to update the receipt item table
function resetCart (){

  updateReceiptItems();
  showPage('home');

}



// ==========================================
// MODAL IMAGE SCRIPT inspired by W3Schools
// ==========================================
var modal = document.getElementById("myModal");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
var images = document.getElementsByClassName("myImg");

for (var i = 0; i < images.length; i++) {
  images[i].onclick = function() {
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
  }
}

var span = document.getElementsByClassName("close")[0];

if (span) {
  span.onclick = function() { 
    modal.style.display = "none";
  }
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


/* Function/s for User Info or Profile */

function updateProfileInfo() {

  // It updates game count based on user's library contents
  document.getElementById("stat-games-count").innerText = library.length;
  
  document.getElementById("display-username").innerText = "User_ITEC3230";
  document.getElementById("display-email").innerText = "user_ITEC3230@gmail.com";
}

function handleRegistration(event) {
    event.preventDefault();
    alert("Account created successfully!");
    showPage('user-login');
}

function handleLogout() {
    if(confirm("Are you sure you want to logout?")) {
        showPage('user-login');
    }
}