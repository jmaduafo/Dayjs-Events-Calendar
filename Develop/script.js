// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  
  // const LOCAL_STORAGE_EVENT_KEY = "events.selectedId";
  // let events = Array.from(JSON.parse(localStorage.getItem(LOCAL_STORAGE_EVENT_KEY) || []));

  


  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  const LOCAL_STORAGE_EVENT_KEY = "events.lists";
  let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_EVENT_KEY)) || []

  var saveBtn = $(".saveBtn");

  console.log(lists.name)

  
  
  saveBtn.on("click", function(e) {
    const listName = this.previousElementSibling.value;

    if (listName == null || listName === '') return
    const list = createList(listName);
    lists.push(list);    

    var description = this.previousElementSibling

    save();

    lists.forEach(list => {
      description.dataset.id = list.id;
      description.innerText = list.name;
    })

    console.log(lists)
      

  })
  

  function save() {
    localStorage.setItem(LOCAL_STORAGE_EVENT_KEY, JSON.stringify(lists));
  }
  
  
  function createList(name) {
    return {
      id: Date.now().toString(),
      name: name
    }
  }




  var today = '';

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

  function past() {
    for (let i = +nowH - 1; i > 8; i--) {
      $("#hour-" + i).addClass("past");
      $("#hour-" + i).removeClass("future");
      $("#hour-" + i).removeClass("present");
    }
  }

  function present() {
    if (nowh === $("#hour-" + nowH).children().eq(0).text().substring(0,1)) {
      $("#hour-" + nowH).removeClass("past");
      $("#hour-" + nowH).removeClass("future");
      $("#hour-" + nowH).addClass("present");
    }
  }
  
  function future() {
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
