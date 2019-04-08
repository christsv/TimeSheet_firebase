$(document).ready(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA9NmiirWITVNPgG7_2ZO_L54i2nmLSGSQ",
    authDomain: "testing-dff8e.firebaseapp.com",
    databaseURL: "https://testing-dff8e.firebaseio.com",
    projectId: "testing-dff8e",
    storageBucket: "testing-dff8e.appspot.com",
    messagingSenderId: "373460696497"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

$("#add-employee-btn").on("click", function(event){
    event.preventDefault();
    

    var name = $("#employee-name-input").val();
    var role = $("#role-input").val();
    var date = moment($("#start-input").val().trim(), "MM/DD/YYYY").format("X");
    var rate = $("#rate-input").val();

    console.log(date);
    // learn to create an object to store data
    var Emp = {
        // console.log(Emp.name);
        tempName: name,
        tempRole: role,
        tempDate: date,
        tempRate: rate
    };

    // add the employee to the database BUT IT DOES NOT SAVE IT TO THE HTML 
    database.ref().push(Emp);

    // adds a new row to the HTML
    // at first we had it here but since it doesnt save permantenyl we moved it to the database.on and we can remove it here because
    // its redundant

    // Clears all of the text-boxes
    $("#employee-name-input").val("");
    $("#role-input").val("");
    $("#start-input").val("");
    $("#rate-input").val("");
});

database.ref().on("child_added", function(snapshot){

    // this snapshot will be the child (since its child_added) in the firebase console. if multiple than multiple objects
    console.log(snapshot.val());

    // so the reason they add the stuff in this database.on is because if you dont it wont save the HTML
    // if you have it in the add button itll only append but once its refreshed even though it is 
    // saved in the database it wont stay permanent on the html becuase that is only an instace
    // so putting it here would kill two birds with one stone.
    var name = snapshot.val().tempName;
    var role = snapshot.val().tempRole;
    var date = snapshot.val().tempDate;
    var rate = snapshot.val().tempRate;

    var empStart = moment.unix(date).format("MM/DD/YYYY");
    // didnt study the moment cause thats unimportant but you can analyze and understand this just from this code
    var empMonths = moment().diff(moment(date, "X"), "months");
    var empBilled = empMonths * rate;

    var newRow = $("<tr>").append( 
        $("<td>").text(name),
        $("<td>").text(role),
        $("<td>").text(empStart),
        $("<td>").text(empMonths),
        $("<td>").text(rate),
        $("<td>").text(empBilled),

        );

    $("#employee-body").append(newRow);

})

});