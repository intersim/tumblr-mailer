var fs = require('fs');
var ejs = require('ejs');

var csvFile = fs.readFileSync("friend_list.csv","utf8");
var emailTemplate = fs.readFileSync('email_template.html', 'utf8');

var csvParse = function(csvArg) {

  var csvArr = [];
  var csv_data = [];
  var csv_subdata = [];
  var csv_multiarr = [];
  //csv_data should be an array, with each element a line from the csvFile
  csv_data = csvArg.split("\n");
  csv_data.pop();    
  csv_data.shift();
  //for each array element, turn into a subarray
  for (var i = 0; i < csv_data.length; i++) {
    csv_subdata = csv_data[i].split(",");
    csv_multiarr.push(csv_subdata);
  };

  //Creating new Contact objects
  var contactInfo = function() {
    this.firstName = "";
    this.lastName = "";
    this.numMonthsSinceContact = "";
    this.emailAddress = "";
  };
  
  var thisContactInfo = function() {
    var newContactObj = contactInfo.call(this);
  };

//for each element in csv_data, create a new object, newContact
  for (var i = 0; i < csv_multiarr.length; i++) {
    var newContact = new thisContactInfo();
    //add values from subarray into object
    newContact.firstName = csv_multiarr[i][0];
    newContact.lastName = csv_multiarr[i][1];
    newContact.numMonthsSinceContact = csv_multiarr[i][2];
    newContact.emailAddress = csv_multiarr[i][3];
    //add those objects into a new array
    csvArr.push(newContact);
  }

  //return that array
  return csvArr;
  //see csvParse-solution.js for Fullstack's example code, it's more concise.
};

friendList = csvParse(csvFile);

friendList.forEach(function(row){

    var firstName = row["firstName"];
    var numMonthsSinceContact = row["numMonthsSinceContact"];

    // we make a copy of the emailTemplate variable to a new variable to ensure
       // we don't edit the original template text since we'll need to us it for 
       // multiple emails

    var templateCopy = emailTemplate;

    // use .replace to replace FIRST_NAME and NUM_MONTHS_SINCE_CONTACT with firstName and  monthsSinceLastContact  
    templateCopy = templateCopy.replace(/FIRST_NAME/gi,
    firstName).replace(/NUM_MONTHS_SINCE_CONTACT/gi, numMonthsSinceContact);

    console.log(templateCopy);


})