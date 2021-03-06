// List of overlook-api endpoints and a sample of their data:


// ***** GET all customers *****
// returns object with customers property containing an array of all customers
// http://localhost:3001/api/v1/customers
{
  "customers": [
    {
      "id": 1,
      "name": "Leatha Ullrich"
    },
    {
      "id": 2,
      "name": "Rocio Schuster"
    },
    {
      "id": 3,
      "name": "Kelvin Schiller"
    }
  ]
}


// ***** GET single customer *****
// returns object of single customer's info
// http://localhost:3001/api/v1/customers1
{
  "id": 1,
  "name": "Leatha Ullrich"
}

// http://localhost:3001/api/v1/customers/2
{
  "id": 2,
  "name": "Rocio Schuster"
}



// ***** GET all rooms *****
// returns object with rooms property containing an array of all rooms
// http://localhost:3001/api/v1/rooms
{
  "rooms": [
    {
    "number": 1,
    "roomType": "residential suite",
    "bidet": true,
    "bedSize": "queen",
    "numBeds": 1,
    "costPerNight": 358.4
    },
    {
    "number": 2,
    "roomType": "suite",
    "bidet": false,
    "bedSize": "full",
    "numBeds": 2,
    "costPerNight": 477.38
    },
    {
    "number": 3,
    "roomType": "single room",
    "bidet": false,
    "bedSize": "king",
    "numBeds": 1,
    "costPerNight": 491.14
    }
  ]
}


// ***** GET all bookings *****
// returns object with bookings property containing an array of all bookings
// http://localhost:3001/api/v1/bookings
{
  "bookings": [
    {
    "id": "5fwrgu4i7k55hl6sz",
    "userID": 9,
    "date": "2020/04/22",
    "roomNumber": 15,
    "roomServiceCharges": []
    },
    {
    "id": "5fwrgu4i7k55hl6t5",
    "userID": 43,
    "date": "2020/01/24",
    "roomNumber": 24,
    "roomServiceCharges": []
    },
    {
    "id": "5fwrgu4i7k55hl6t6",
    "userID": 13,
    "date": "2020/01/10",
    "roomNumber": 12,
    "roomServiceCharges": []
    }
  ]
}


// ***** POST add new booking *****
// http://localhost:3001/api/v1/bookings
// required format:
{ "userID": 48, "date": "2019/09/23", "roomNumber": 4 }
// with header:
{
"Content-Type": "application/json"
}
// successful response:
{ message: 'Booking with id <id> successfully posted', 
  newBooking: //<Object with trip info just posted> 
}
// NB bookings are for one night only
// NB the API backend will create the booking id for me



// ***** DELETE single booking *****
// http://localhost:3001/api/v1/bookings/5fwrgu4i7k55hl6t6
// (the tail end of the URL is the id of the booking we want to delete)
// with header:
{
"Content-Type": "application/json"
}
// successful response:
{ message: Booking #<id> has been deleted }