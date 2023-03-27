// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  
  // Set the getItems above setItems and for each description id, retrieve the value
  // for the appropriate id
  for (let i = 0; i < 18; i++) {
    $("#" + i).val(localStorage.getItem("hour-" + i))
  }

  var saveBtn = $(".saveBtn");

  // After the save button is clicked, assign the input as a value and
  // the div element id as the id
  saveBtn.on("click", function() {
    const listName = this.previousElementSibling.value;
    const mainDivID = this.parentElement.id;

    localStorage.setItem(mainDivID, listName);      

  })


  var today = '';

  // Set the current time and add "st", "nd", "rd", and "th" after the appropriate numbers
  setInterval(function() {
    var current = dayjs();
    today = current.format("dddd, MMMM DD");
  
    if (today[today.length - 1] === "1") {
      today += "st";
    } else if (today[today.length - 1] === "2") {
      today += "nd";
    } else if (today[today.length - 1] === "3") {
      today += "rd";
    } else {
      today += "th";
    }
    
    $("#currentDay").text(today);
  }, 1000)

  // 12 hour format
  var nowh = dayjs().format("h");
  // 24 hour format
  var nowH = dayjs().format("H");

  // Assign the "past" class to the times before the current time
  function past() {
    // Change nowH variable (the 24h format) from a string to a number and assign the past class to all time slots
    // before the current time
    for (let i = +nowH - 1; i > 8; i--) {
      $("#hour-" + i).addClass("past");
      $("#hour-" + i).removeClass("future");
      $("#hour-" + i).removeClass("present");
    }
  }

  console.log($("#hour-" + nowH).children().eq(0).text().substring(0,1))

  function present() {
    // For all inner texts of the "hour" class with a length of 3 (ex: 9AM) that is the same as 
    // the current time, set "present" class 
    if (nowh === $("#hour-" + nowH).children().eq(0).text().substring(0,1) && $("#hour-" + nowH).children().eq(0).text().length === 3) {
      $("#hour-" + nowH).removeClass("past");
      $("#hour-" + nowH).removeClass("future");
      $("#hour-" + nowH).addClass("present");
    // For all inner texts of the "hour" class with a length of 4 (ex: 12AM) that is the same as 
    // the current time, set "present" class 
    } else if (nowh === $("#hour-" + nowH).children().eq(0).text().substring(0,2) && $("#hour-" + nowH).children().eq(0).text().length === 4) {
      $("#hour-" + nowH).removeClass("past");
      $("#hour-" + nowH).removeClass("future");
      $("#hour-" + nowH).addClass("present");
    }
  }
  
  // Assign the "future" class to the times after the current time
  function future() {
    // Change nowH variable (the 24h format) from a string to a number and assign the future class to all time slots
    // after the current time
    for (let i = +nowH + 1; i < 18; i++) {
      $("#hour-" + i).removeClass("past");
      $("#hour-" + i).addClass("future");
      $("#hour-" + i).removeClass("present");
    }
    
  }

  setInterval(past, 1000);
  setInterval(present, 1000);
  setInterval(future, 1000);
 
  

});
