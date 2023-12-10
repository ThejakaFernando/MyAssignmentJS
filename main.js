//Refering to the DOM elements 
// Hotel Booking DOM Elements

const nameInput = document.getElementById("fullName");
const countryInput = document.getElementById("country");
const hotelTypeInput = document.getElementById("hotelType");
const numOfRoomsInput = document.getElementById("numOfRooms");
var roomTypeInput = document.getElementsByName("roomType");
const childrenInput = document.getElementById("children");
const adultsInput = document.getElementById("adults");
const extraInput = document.getElementsByName("extraRequirements");
const kidCostInput = document.getElementsByName("kidCost");
var promoInput = document.getElementById("promo");
const costInput = document.getElementById("currentCost");
const loyaltyPointsDisplay = document.getElementById("loyaltyPointsResult");
const hotelBtn = document.getElementById("hotelBtn");
const outputText1 = document.getElementById("output1");

// Adventure Booking DOM Elements

const nameAdventureInput = document.getElementById("fullNameAdventure");
const countryAdventureInput = document.getElementById("countryAdventure");
const childrenAdventureInput = document.getElementById("childrenAdventure");
const adultsAdventureInput = document.getElementById("adultsAdventure");
const adventureTypeInput = document.getElementById("adventureType");
const guideInput = document.getElementsByName("guideRequirementsCost");
const adventureBookBtn = document.getElementById("adventureBtn");
const adventureCostInput = document.getElementById("currentAdventureCost");
const outputText2 = document.getElementById("output2");


// Advance Features DOM Elements ('Add to Favourites' & 'Check Loyalty' Buttons)
const favoritesInputBtn = document.getElementById("addToFavouritesBtn");
const favoritesAdventureInputBtn = document.getElementById("addToFavouritesAdventureBtn");
const loyaltyCheckBtn = document.getElementById("checkLoyaltyBtn");

//Adding the event listners to the code

hotelBtn.addEventListener("click", finalizeBooking);
adventureBookBtn.addEventListener("click",finalizeAdventure);
loyaltyCheckBtn.addEventListener("click", checkLoyalty);
favoritesInputBtn.addEventListener("click", bookingFavourite);
favoritesAdventureInputBtn.addEventListener("click", bookingAdventureFavourite);
guideInput.forEach(item => item.addEventListener("change", changeGuideCost))
roomTypeInput.forEach(item => item.addEventListener("change", changeRoom));
extraInput.forEach(item => item.addEventListener("change", changeExtra))
kidCostInput.forEach(item => item.addEventListener("change", changeKidCost))


// declaring the variables
let numOfRooms;
let total;
let room;
let roomCost;
let extraCost;
let kidCost;
let guideCost;
let totalAdventure;


// Functions of the Event Listeners

function initialize_hotel() {
    total = 0;
    numOfRooms = 1;
    room = "";
    roomCost = 0;
    extraCost = 0;
    kidCost = 0;
    hotelBtn.disabled = true;
}

function initialize_adventure() {
    totalAdventure = 0;
    guideCost = 0;
    numberOfChildren = 0;
    numberOfAdults = 0;
}



function finalizeBooking(event) {

    event.preventDefault();


    let name = nameInput.value;
    let country = countryInput.value;
    let selectedHotel = hotelTypeInput.options[hotelTypeInput.selectedIndex].value;

        // getting the value for the selected room by the customer
        var hotelRoom = "";

        for(var i=0; i< roomTypeInput.length; i++) {
            if (roomTypeInput[i].checked) {
                hotelRoom += roomTypeInput[i].value;
                break;
            }

        }
    
    numOfRooms = numOfRoomsInput.value;
    numOfChildren = childrenInput.value;
    numOfAdults = adultsInput.value;

    let finalPrize = ((roomCost * numOfRooms) + (kidCost * numOfChildren)) + extraCost;

        // promo code section

        var promoCode = promoInput.value;
        var discount = 0;
        
        if (promoCode === "Promo123") {
            discount = 5;
        } else if (promoCode !== "") {
            window.alert("The promo code you entered is not valid. Please try again!")
            promoInput.value = "";
            return;
        }

        let adjustedTotalCost = finalPrize - (finalPrize * (discount / 100));


    window.alert(`${name}'s Hotel Booking Details are Displayed Below.
    Country : ${country}
    Hotel :  ${selectedHotel}
    Room Type : ${hotelRoom}
    Number of Rooms : ${numOfRooms}
    Number of Children : ${numOfChildren}
    Number of Adults : ${numOfAdults}`);


    outputText1.innerText = ` Dear ${name}, \n
    Your reservation at ${selectedHotel} has been confirmed. Please find your details below. 
    Number of Rooms : ${numOfRooms}
    Total Cost : LKR ${adjustedTotalCost} `

    // Values are set to 0 after 'Book Hotel' button is clicked.
    nameInput.value = "";
    countryInput.value = "";
    hotelTypeInput.value = "Hotel Branch";

    for (var i=0; i<roomTypeInput.length; i++) {
        roomTypeInput[i].checked = false;
    }

    numOfRoomsInput.value = 1;
    childrenInput.value = 0;
    adultsInput.value = 0;

    extraInput.forEach(function(extraInput){
        extraInput.checked = false;
    });

    promoInput.value = "";

    kidCostInput.forEach(function(kidCostInput){
        kidCostInput.checked = false;
    });

    loyaltyPointsDisplay.innerText = 0; // Resets loyalty points to 0 when 'Book Hotel' button is clicked.

    costInput.innerText = 0;
    
}

function finalizeAdventure(event){
    event.preventDefault();


    let adventureName = nameAdventureInput.value;
    let adventureCountry = countryAdventureInput.value;
    let selectedAdventure = adventureTypeInput.options[adventureTypeInput.selectedIndex].value;
    let adventureChildrenInput = childrenAdventureInput.value;
    let adventureAdultsInput = adultsAdventureInput.value;

    window.alert(`${adventureName}'s Adventure Details are Displayed Below.
    Country : ${adventureCountry}
    Adventure Type : ${selectedAdventure}
    Number of Children : ${adventureChildrenInput}
    Number of Adults : ${adventureAdultsInput}`);

    let adultDivingCost;
    let kidDivingCost;

    if(adventureCountry.toLowerCase() === "sri lanka") {
        adultDivingCost = 5000;
        kidDivingCost = 2000;
    } else {
        adultDivingCost = 10000;
        kidDivingCost = 5000;
    }

    
    let totalAdventureCost = (adultDivingCost * adventureAdultsInput) + (kidDivingCost * adventureChildrenInput) + guideCost; 

    outputText2.innerText = ` Dear ${adventureName}, \n
    Thank you for taking the time to book your adventure with us! We have succesfully confirmed your reservation for ${selectedAdventure}.
    Total Cost : ${totalAdventureCost} `

    //Values are set to 0 when the 'Book Adventure' Button is clicked.

    nameAdventureInput.value = "";
    countryAdventureInput.value = "";

    for (var i=0; i< adventureTypeInput.length; i++) {
        adventureTypeInput[i].checked = false;
    }

    childrenAdventureInput.value = 0;
    adultsAdventureInput.value = 0;

    guideInput.forEach(function(guideInput){
        guideInput.checked = false;
    });

    adventureCostInput.innerText = 0;

}

    
    
    

function changeRoom() {
    hotelBtn.disabled = false;
    if(this.value =="Single"){
        roomCost = 25000;
        room= "Single";
    } else if(this.value =="Double"){
        roomCost = 35000;
        room= "Double";
    } else {
        roomCost = 40000;
        room= "Triple";
    }

    total = roomCost + extraCost + kidCost;
    costInput.innerText = ` ${total}`;
}

function changeExtra() {
    if(this.value =="extraBed"){
        if(this.checked) {
        extraCost += 8000;
    } else {
        extraCost-= 8000;
    }

    }  

    total = roomCost + extraCost + kidCost; 
    costInput.innerText = ` ${total}`
}

function changeGuideCost() {
    
    if(this.value =="adultGuideCost"){
        if(this.checked) {
        guideCost += 1000;
    } else {
        guideCost -= 1000;
        }
    } else {
        if(this.checked) {
        guideCost += 500;
    } else {
        guideCost-= 500;
    }

    }

    totalAdventure = guideCost;
    adventureCostInput.innerText = ` ${totalAdventure}`
}

function changeKidCost() {
    if(this.value =="yesKidCost"){
        if(this.checked) {
        kidCost += 5000;
    } else {
        kidCost -= 5000;
    }

    }  

    total = roomCost + extraCost + kidCost; 
    costInput.innerText = ` ${total}`
}

let loyaltyPoints = 0;

function checkLoyalty(event){
    event.preventDefault();

    const minValue = 3;

    const userName = nameInput.value;
    const numberOfRooms  = parseInt(numOfRoomsInput.value);

    if(numberOfRooms > minValue) {
        const points  = numberOfRooms * 20;
    
    loyaltyPoints = 0;

    loyaltyPoints += points;

    const userLoyaltyData = {
        name : userName,
        points: loyaltyPoints,
        roomsBooked : numberOfRooms,
    }

    localStorage.setItem('userLoyalty', JSON.stringify(userLoyaltyData));

    loyaltyPointsDisplay.innerText = loyaltyPoints;

    window.alert(`Congratulations! You just earned ${points} loyalty points.`);
} else {
    window.alert(`Sorry, but you're not eligable for loyalty points. You are required to have more than ${minValue} bookings.`)
}
}

function bookingFavourite (event) {

    event.preventDefault();

    window.alert(`You added this booking as a favourite!`);
    const customerName = nameInput.value;
    const customerCountry = countryInput.value;
    const customerHotel = hotelTypeInput.options[hotelTypeInput.selectedIndex].value;

    var customerRoom = "";
    for (var i = 0; i < roomTypeInput.length; i++) {
        if(roomTypeInput[i].checked){
            customerRoom += roomTypeInput[i].value;
            break;
        }
    }

    const numberOfRooms1 = parseInt(numOfRoomsInput.value);
    const customerChildren = childrenInput.value;
    const customerAdults = adultsInput.value;



    const userHotelBooking = {
        name : customerName,
        country : customerCountry,
        hotel : customerHotel,
        roomType : customerRoom,
        numOfRooms : numberOfRooms1,
        numOfChildren : customerChildren,
        numOfAdults : customerAdults,

    }
        
    localStorage.setItem('userBooking',JSON.stringify(userHotelBooking));

}

function bookingAdventureFavourite(event) {
    event.preventDefault();
    
    window.alert(`You added this adventure booking as a favourite!`)

    const customerAdventureName = nameAdventureInput.value;
    const customerAdventureCountry = countryAdventureInput.value;
    const customerAdventureType = adventureTypeInput.options[adventureTypeInput.selectedIndex].value;

    const customerChildrenAdventure = childrenAdventureInput.value;
    const customerAdultAdventure = adultsAdventureInput.value;

    const userAdventureBooking = {
        name : customerAdventureName,
        country : customerAdventureCountry,
        adventureType : customerAdventureType,
        childrenCount : customerChildrenAdventure,
        adultCount : customerAdultAdventure,

        

    }
    localStorage.setItem('adventureBooking',JSON.stringify(userAdventureBooking));
}


initialize_hotel();
initialize_adventure();



  