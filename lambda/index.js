var Alexa = require('alexa-sdk');
var alexaMeetups =  require('./data/alexaMeetups');

exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context);
  alexa.registerHandlers(handlers);
  alexa.execute();
};

var handlers = {

  'LaunchRequest': function () {
    this.emit(':ask', 'Welcome to Voice Devs!', 'Try saying hello!');
  },

  'Hello' : function () {
    this.emit(':tell', 'Hi Sushant!');
  },

  'AlexaMeetupNumbers' : function () {
    var meetupNumbers = alexaMeetups.length;
    this.emit(':ask', 'I currently know of '+meetupNumbers+' Alexa developer meetups. Check to see if your city is one of them!', 'How can I help?' );

  },

  'AlexaMeetupCityCheck' : function () {
    var USCitySlot =  this.event.request.intent.slots.USCity.value;
    var EuropeanCitySlot =  this.event.request.intent.slots.EuropeanCity.value;

    var city;

    if(USCitySlot) {
      city = USCitySlot;
    }
    else if (EuropeanCitySlot) {
      city = EuropeanCitySlot;
    } else {
      this.emit(':ask', 'Sorry, I didn\'t recognise that city name.', 'How can I help?');
    }

    // Check for City & Organiser
    var cityMatch = '';
    var cityOrganisers;
    for (var i = 0; i < alexaMeetups.length; i++) {
      if ( alexaMeetups[i].city.toLowerCase() === city.toLowerCase() ) {
        cityMatch = alexaMeetups[i].city;
        cityOrganisers = alexaMeetups[i].organisers;
      }
    }

    // var londonAudio = '';
    // if (city.toLowerCase() === 'london') {
    //   londonAudio = `<audio src="https://s3.amazonaws.com/wholesomeayurveda/1a.mp3"/>`;
    // }

    if (cityMatch !== '') {
      this.emit(':ask', 'Yes!' +city+ ' has an Alexa developer meetup', 'How can i help?');
    } else {
      this.emit(':ask', 'Sorry, looks like ' +city+ ' doesnt have an Alexa developer meetup yet - why dont you start one!', 'How can i help?');
    }
  },
  
  "AlexaMeetupOrganiserCheck" : function () {
    var USCitySlot =  this.event.request.intent.slots.USCity.value;
    var EuropeanCitySlot =  this.event.request.intent.slots.EuropeanCity.value;

    var city;

    if(USCitySlot) {
      city = USCitySlot;
    }
    else if (EuropeanCitySlot) {
      city = EuropeanCitySlot;
    } else {
      this.emit(':ask', 'Sorry, I didn\'t recognise that city name.', 'How can I help?');
    }

    // Check for City & Organiser
    var cityMatch = '';
    var cityOrganisers;
    for (var i = 0; i < alexaMeetups.length; i++) {
      if ( alexaMeetups[i].city.toLowerCase() === city.toLowerCase() ) {
        cityMatch = alexaMeetups[i].city;
        cityOrganisers = alexaMeetups[i].organisers;
      }
    }
    if (cityMatch !== '') {
      // this.emit(':ask', 'Yes!' +city+ ' has an Alexa developer meetup', 'How can i help?');

      // 1 Organiser
      if (cityOrganisers.length === 1) {
        this.emit(':ask', `The organiser of the ${city} Alexa developer meetup is ${cityOrganisers[0]}.`, 'How can i help?');
        // this.emit(':ask', '<audio src=\'https://s3.amazonaws.com/wholesomeayurveda/test.mp3\'>', 'How can i help?');
      }  else { // Multiple Organisers
        // this.emit(':ask', `The organisers of the ${city} Alexa developer meetup are: ${convertArrayToReadableString(cityOrganisers)}`, 'How can i help?');
        this.emit(':ask', `The organisers of the ${city} Alexa developer meetup are: ${cityOrganisers.toString()}`, 'How can i help?');
      }

    } else {
      this.emit(':ask', 'Sorry, looks like ' +city+ ' doesnt have an Alexa developer meetup yet - why dont you start one!', 'How can i help?');
    }

  }

};
