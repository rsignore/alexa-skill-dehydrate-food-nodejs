'use strict';
var Alexa = require("alexa-sdk");

// -----------------------
// Data and strings
// -----------------------
//

const appId = 'amzn1.ask.skill.4d0bc0c4-2d64-415b-8373-02b143c10b28';

var preTreatments = {
    None: "do not need any pre-treatment",
    Color: "need pre-treatment to protect color",
    Flavor: "need pre-treatment to prevent flavor loss"

};

var noResponses = [
    "OK",
    "My pleasure",
    "Sure thing",
    "Right",
    "Good luck",
    "Cool"
];

var fruitData=[
    {
        foodName: "apples", 
        foodSingle: "apple", 
        prepare: "peel and slice the apples into one quarter inch thick pieces",
        temp: "135 degrees",
        time: "8 to 12 hours",
        pretreatment: preTreatments.Color
    },
    {
        foodName: "apricots", 
        foodSingle: "apricot", 
        prepare: "pit, peel, and slice the apricots into one quarter inch thick pieces",
        temp: "135 degrees",
        time: "15 to 19 hours",
        pretreatment: preTreatments.Color
    },
    {
        foodName: "bananas", 
        foodSingle: "banana", 
        prepare: "slice the bananas into one quarter inch thick pieces",
        temp: "135 degrees",
        time: "6 to 10 hours",
        pretreatment: preTreatments.Color
    },    
    {
        foodName: "blueberries", 
        foodSingle: "blueberry", 
        prepare: "leave them whole",
        temp: "135 degrees",
        time: "14 to 16 hours",
        pretreatment: preTreatments.Flavor,
        pretreatmentTime: 1
    },
    {
        foodName: "cherries", 
        foodSingle: "cherry", 
        prepare: "pit the cherries and cut them in half",
        temp: "135 degrees",
        time: "22 to 26 hours",
        pretreatment: preTreatments.None
    },
    {
        foodName: "cranberries", 
        foodSingle: "cranberry", 
        prepare: "leave them whole",
        temp: "135 degrees",
        time: "17 to 21 hours",
        pretreatment: preTreatments.Flavor,
        pretreatmentTime: 1
    },
    {
        foodName: "grapes", 
        foodSingle: "grape", 
        prepare: "cut them in half",
        temp: "135 degrees",
        time: "22 to 26 hours",
        pretreatment: preTreatments.None
    },
    {
        foodName: "kiwis", 
        foodSingle: "kiwi", 
        prepare: "peel and slice them one quarter inch thick.",
        temp: "135 degrees",
        time: "8 to 12 hours",
        pretreatment: preTreatments.None
    },
    {
        foodName: "lemons", 
        foodSingle: "lemon", 
        prepare: "slice them one quarter inch thick.",
        temp: "135 degrees",
        time: "17 to 21 hours",
        pretreatment: preTreatments.None
    },
    {
        foodName: "limes", 
        foodSingle: "lime", 
        prepare: "slice them one quarter inch thick.",
        temp: "135 degrees",
        time: "17 to 21 hours",
        pretreatment: preTreatments.None
    },
    {
        foodName: "oranges", 
        foodSingle: "orange", 
        prepare: "slice them one quarter inch thick.",
        temp: "135 degrees",
        time: "17 to 21 hours",
        pretreatment: preTreatments.None
    },
    {
        foodName: "mangoes", 
        foodSingle: "mango", 
        prepare: "peal, pit, and slice them one quarter inch thick.",
        temp: "135 degrees",
        time: "13 to 17 hours",
        pretreatment: preTreatments.None
    },
    {
        foodName: "nectarines", 
        foodSingle: "nectarine", 
        prepare: "peal, pit, and slice them one quarter inch thick.",
        temp: "135 degrees",
        time: "11 to 15 hours",
        pretreatment: preTreatments.Color
    },
    {
        foodName: "peaches", 
        foodSingle: "peach", 
        prepare: "peal, pit, and slice them one quarter inch thick.",
        temp: "135 degrees",
        time: "11 to 15 hours",
        pretreatment: preTreatments.Color
    },
    {
        foodName: "pears", 
        foodSingle: "pear", 
        prepare: "peal and slice them one quarter inch thick.",
        temp: "135 degrees",
        time: "11 to 15 hours",
        pretreatment: preTreatments.Color
    },
    {
        foodName: "pineapples", 
        foodSingle: "pineapple", 
        prepare: "peal, core, and slice them one quarter inch thick.",
        temp: "135 degrees",
        time: "12 to 16 hours",
        pretreatment: preTreatments.None
    },
    {
        foodName: "plums", 
        foodSingle: "plum", 
        prepare: "pit and slice into eighths.",
        temp: "135 degrees",
        time: "23 to 27 hours",
        pretreatment: preTreatments.Color
    },
    {
        foodName: "strawberries", 
        foodSingle: "strawberry", 
        prepare: "slice them one quarter inch thick.",
        temp: "135 degrees",
        time: "6 to q0 hours",
        pretreatment: preTreatments.Color
    }
];

var foodData = fruitData;

// -----------------------
// Functions
// -----------------------
//

// -----------------------
// Intent Handelers 
// -----------------------
//
exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = appId;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        var repromptText = 'What would you like to dehydrate?';

        this.emit(':ask', 'Welcome to Food Dehydrator. I can give you instructions on how to dehydrate many fruits, vegetables and herbs. ' +
            repromptText, repromptText);
    },
    'FoodInstructions': function () {
        var foodToDehydrate = this.event.request.intent.slots.food.value;

        if(foodToDehydrate) {

            var foodFound = false;

            var foodIndex;
            for(foodIndex in foodData){

                var foodInstructions = foodData[foodIndex];

                // check for both the singular and plural form of the food, but use the plural in all responses
                //
                if(foodToDehydrate.toLowerCase() == foodInstructions['foodName'].toLowerCase() || 
                    foodToDehydrate.toLowerCase() == foodInstructions['foodSingle'].toLowerCase() ) {

                    // use the plural food name in all responses
                    //
                    var foodName = foodInstructions['foodName'].toLowerCase();
                    // build the instructions output text
                    //
                    var outputText = 'to dehydrate ' + foodName + ', ';
                    outputText += foodInstructions['prepare'] + '. ';
                    outputText += 'Dehydrate the ' + foodName + ' for ' + foodInstructions['time'] + ' at ' + foodInstructions['temp'] + ' fahrenheit. ';    

                    if(foodInstructions['pretreatment'] == preTreatments.None) {
                        this.emit(':tell', outputText);
                    }
                    else {
                        // food needs pre-treatment so this will trigger a dialog with the user
                        //
                        // save the food for the yes respose if the users wants pre-treatment instructions
                        //
                        this.attributes['foodIndexPretreatment'] = foodIndex;   
                        var repromptText = 'Would you like to hear pre-treatment instructions for ' + foodName + '?';

                        outputText += foodName + ' ' + foodInstructions['pretreatment'] + '. ' + repromptText;
                        this.emit(':ask', outputText, repromptText);
                    }
                    foodFound = true;
                    break;
                }
            }

            // if we did not find the food then we don't know have instructions for the food
            //
            if(!foodFound){
                console.log('User asked to dehydrate an unknown food; ' + foodToDehydrate.toString());
                this.emit(':tell', 'Sorry, but I don\'t know how to dehydrate ' + foodToDehydrate.toString());
            }
        }
        else { // response was not understood

            console.log('FoodInstructions intent called without a food');
            this.emit(':ask', 'Sorry, I didn\'t get that. ' + repromptText, repromptText);
        }
    },
    'AMAZON.NoIntent': function() {

        var randomResponseText = noResponses[Math.round(Math.random() * (noResponses.length - 1))];
        this.emit(':tell', randomResponseText );
    },
    'AMAZON.StopIntent': function() {
        this.emit('AMAZON.NoIntent');
    },
    "AMAZON.CancelIntent": function() {
        this.emit('AMAZON.NoIntent');
    },
    'AMAZON.YesIntent': function() {
  
        if(this.attributes['foodIndexPretreatment']) {
            var whatFood = parseInt(this.attributes['foodIndexPretreatment']);
            var foodName = foodData[whatFood]['foodName'].toLowerCase();
            var foodSingle = foodData[whatFood]['foodSingle'].toLowerCase();
            var outputText = '';

            switch(foodData[whatFood]['pretreatment']) {
                case preTreatments.Color:
                    outputText += 'to pre-treat ' + foodName + ', ';
                    outputText += 'prepare a solution of equal parts lemon juice and water. ' +
                                'Dip the ' + foodSingle + ' pieces in the solution and drain them before dehydrating.';
                    break;
                case preTreatments.Flavor:
                    var numMinutes = foodData[whatFood]['pretreatmentTime'].toString();
                    outputText += foodName + ' must be blanched before dehydrating to preserve their color. ' +
                        'First, bring a large stockpot filled with water to a boil. ' +
                        'place the ' + foodName + ' in a strainer with a handle. ' +
                        'Dip the strainer into the boiling water for ' + numMinutes + ' minutes. ' +
                        'After the time is up, put the ' + foodName + 
                        ' into a large bowl filled with ice-water to stop the blanching process. ' +
                        ' Drain and pat dry the ' + foodName + ' before dehydrating.';
                    break;
                default:
            }
            this.emit(':tell',outputText);
        }
        else { // I should not get here
            console.log('AMAZON.YesIntent called with foodIndexPretreetment not set');
            this.emit(':tell',"I dont have pretreatment instructions for that food");
        } 
    },
    'AMAZON.HelpIntent': function() {
        var repromptText = 'What food would you like to dehydrate?';

        this.emit(':ask','I can give you instructions on how to dehydrate many fruits, vegetables, and herbs. ' +
            'For example, you can ask questions like; how to dehydrate apples, or just say a food name when prompted. ' +
            repromptText, repromptText);
    },
    'Unhandled': function() {
        var repromptText = 'What food would you like to dehydrate?';

        console.log('Unhandled event; ' + this.event.request.intent.name);
        this.emit(':ask','Sorry, I didn\'t get that, ' + repromptText, repromptText);
    }
};