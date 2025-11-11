//JavaScript By Abby Napier
"use strict";

//Color generator function
$(function() {
  //submit part of the function
  $("#colorQuiz").submit(function(e) {
    //preventing default
    e.preventDefault();
    //what is show during loading
    $("#result").html("<p>Finding your perfect colors...</p>");
    //Declaring the values for the quiz
    const mood = $("#mood").val();
    //Base colors for each quiz option
    const moodColors = {
      bold: "ff0000",
      romantic: "ff69b4",
      chill: "add8e6",
      classy: "f5f5dc",
      sassy: "9246FF",
      happy: "FFFF66",
      festive: "008000",
      flirty: "FF1493"   
    };
    //The color baseline. Pink if mood is not working 
    const baseHex = moodColors[mood] || "ff69b4";
    //The Ajax part of the function 
    $.ajax({
      url: `https://www.thecolorapi.com/scheme?hex=${baseHex}&mode=analogic&count=10`, //The Api URL
      type: "GET", //Get to retrieve data
      dataType: "json", //json responses
      //if function is successful do this:
      success: function(data) {
        let html = "<h3>Your Color Matches</h3><div class='color-grid'>"; //Show this message on the website
        //Run through a loop of colors from the url and show their name
        data.colors.forEach(color => {
          html += `
            <div class="product-card" style="background-color:${color.hex.value};">
              <p>${color.name.value}</p>
            </div>
          `;
        });
        html += "</div>";
        //List the results
        $("#result").html(html);
      },
      //if an error occurs then show this to the website
      error: function() {
        $("#result").html("<p>Sorry, we could not show you your colors right now</p>");
      }
    });
  });
});

//Slide show for the pictures
$(document).ready(function(){
  $('.slideshow').slick({ //slick used for the slideshow
    autoplay: true, //Have autoplay
    dots: true, //Dots at the bottom to control the pictures
    arrows: true, //Arrows to scroll
    autoplaySpeed: 3000 //Auto play speed
  });

//The appointment form
$(function() {
  //Picker for the date
  $("#appointmentDate").datepicker({
    dateFormat: "DD, MM d, yy", //The format for the date
    minDate: 0, //Cannot pick a date that already happened
    onSelect: updateAppointment //Call the update the appointment display
  });
  //picker for the appointment time
  $("#appointmentTime").timepicker({
    'timeFormat': 'h:i A', //time format
    'step': 15, //Time in 15 minute intervals
    'scrollDefault': 'now', //Default time is the current time
    'disableTextInput': true //User cannot enter text. They can only choose from time selections
  }).on('changeTime', updateAppointment); //Call the function to update the time display
  });

  const form = $("#appForm"); //Linking the appForm from the HTML

 
  const storedData = JSON.parse(localStorage.getItem("appointmentData")) || {}; //Retrieving the appointment data

  //Pre-fill the appointment information if data exists
  if (storedData.name) $("#name").val(storedData.name);
  if (storedData.number) $("#number").val(storedData.number);
  if (storedData.email) $("#emailAd").val(storedData.email);
  if (storedData.contact) $(`input[name="contact"][value="${storedData.contact}"]`).prop("checked", true);
  if (storedData.date) $("#appointmentDate").val(storedData.date);
  if (storedData.time) $("#appointmentTime").val(storedData.time);

  //updating all data if new data is entered
  function updateAppointment() {
    const date = $("#appointmentDate").val();
    const time = $("#appointmentTime").val();
     if (date && time) {
      $("#appointmentDisplay").html(`Your appointment is set for ${date} at ${time}`);
    } else {
      $("#appointmentDisplay").html("");
    }
  }
  //Trigger the update function
  updateAppointment();

  //The function that tells if the form is valid
  form.submit(function(e) {
    e.preventDefault();
    //declaring the form values for each part of the function's data
    const data = {
      name: $("#name").val().trim(),
      number: $("#number").val().trim(),
      email: $("#emailAd").val().trim(),
      contact: $("input[name='contact']:checked").val(),
      date: $("#appointmentDate").val().trim(),
      time: $("#appointmentTime").val().trim()
    };

   //If are not are not complete an error will be given.
    if (!data.name || !data.number || !data.email || !data.contact || !data.date || !data.time) {
      alert("Please fill out all fields before submitting.");
      return; 
    }

    //if the form is valid then store it 
    localStorage.setItem("appointmentData", JSON.stringify(data));

    //Calls the update appointment function
    updateAppointment();
    //Inform the user the appointment has been booked
    alert(`Thanks ${data.name}! Your appointment has been booked.`);
  });

});
