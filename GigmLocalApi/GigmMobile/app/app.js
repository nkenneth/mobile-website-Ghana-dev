/*
   Main module

*/

(function () {
    'use strict';

    var app = angular.module('gigm', [
      //  'ngAnimate',        // animations
        'ngRoute',          // routing
        'ngSanitize',       // sanitizes html bindings (ex: sidebar.js)
        'common',
		'angular.filter',
        'ui.router',
        'ui.select',
        'angularUtils.directives.dirPagination'
    ]);

    app.controller('TerminalsController', function ($scope) {
    	$scope.players = [
 {
   "#": "1",
   "State": "Abia",
   "Terminal":"Aba Terminal",
   "Address": "No 5, Asa road, Former Old Nitel Building, Aba.",
   "Emails": "aba@gigm.com",
   "Phone": "08139851110"
 },
 {
   "#": "2",
   "State": "Abia",
   "Terminal":"Umuahia Terminal",
   "Address": "New Central Park, Ohia, Enugu-Port Harcourt Express Way. Umuahia, Abia State.",
   "Emails": "umuahia@gigm.com",
   "Phone": "08139851110"
 },
 {
   "#": "3",
   "State": "Abuja",
   "Terminal":"Maraba Terminal",
   "Address": "Abuja Keffi road, by Abacha road junction, via nyanya-mararaba. opp. Chrisgold plaza or Oando filling station. Abuja.",
   "Emails": "maraba@gigm.com",
   "Phone": "08139851110"
 },
 {
   "#": "4",
   "State": "Abuja",
   "Terminal":"Zuba Terminal",
   "Address": "Market Space 206, Zuba Market Abuja.",
   "Emails": "zuba@gigm.com",
   "Phone": "08139851110"
 },
 {
   "#": "5",
   "State": "Abuja",
   "Terminal":"Utako Terminal",
   "Address": "Plot 113, Utako District, FCT Abuja.",
   "Emails": "utako@gigm.com",
   "Phone": "08139851110"
 },
 {
   "#": "6",
   "State": "Abuja",
   "Terminal":"Kubwa Terminal",
   "Address": "Block 43, Gado Nasko Way, Opposite 2/2 Court, Kubwa, Abuja.",
   "Emails": "kubwa@gigm.com",
   "Phone": "08139851110"
 },
 {
   "#": "7",
   "State": "Akwa-Ibom",
   "Terminal":"Uyo Terminal",
   "Address": "3, Monsignor Akpan Avenue, Itam Industrial Layout, Opposite Timber Market, Itam",
   "Emails": "uyo@gigm.com",
   "Phone": "08139851110"
 },
 {
   "#": "8",
   "State": "Anambra",
   "Terminal":"Awka Terminal",
   "Address": "Elite shopping complex, opposite Crunchies Fries, Enugu/Onitsha Expressway, Awka, Anambra State",
   "Emails": "awka@gigm.com",
   "Phone": "08139851110",
   "Routes": [{ "route": "awka => uselu" }, { "route": "awka => utako" }, { "route": "awka => iyana-ipaja" }]
},
 {
   "#": "9",
   "State": "Bayelsa",
   "Terminal":"Bayelsa Terminal",
   "Address": "Opposite Wema bank, Kpansia, by Inec Junction,Yenagoa",
   "Emails": "yenagoa@gigm.com",
   "Phone": "08139851110"
 },
 {
   "#": "10",
   "State": "Edo",
   "Terminal":"Auchi Terminal",
   "Address": "Auchi-Okene express way, by old staff Quarters, Auchi Poly.",
   "Emails": "auchi@gigm.com",
   "Phone": "08139851110"
 },
 {
   "#": "11",
   "State": "Edo",
   "Terminal":"Benin- Central Terminal",
   "Address": "12 Akpakpava Road by First Junction,Benin City,Edo State",
   "Emails": "akpakpava@gigm.com",
   "Phone": "08139851110"
 },
 {
   "#": "12",
   "State": "Edo",
   "Terminal":"Benin-Head Office",
   "Address": "202B Uselu Lagos Road, Near Ediaken Market, Benin City, Edo State",
   "Emails": "uselu@gigm.com",
   "Phone": "08139851110"
 },
 {
   "#": "13",
   "State": "Edo",
   "Terminal":"Ekpoma Office",
   "Address": "Benin Auchi road, Ekpoma,Opposite grail center.",
   "Emails": "ekpoma@gigm.com",
   "Phone": "08139851110"
 },
 {
   "#": "14",
   "State": "Delta",
   "Terminal":"Asaba Office ",
   "Address": "Asaba - Onisha Express way, by Head-Bridge.",
   "Emails": "asaba@gigm.com",
   "Phone": "08139851110"
 },
 {
   "#": "15",
   "State": "Delta",
   "Terminal":"Warri Office",
   "Address": "138, Effurun Sapele Road, By Airport Junction, Effurun, Delta State.",
   "Emails": "warri@gigm.com",
   "Phone": "08139851110"
 },
 {
   "#": "16",
   "State": "Enugu",
   "Terminal":"Enugu Office",
   "Address": "7, Market Road,Opposite State Library,Holy Ghost Park,Ogui,Enugu State.",
   "Emails": "enugu@gigm.com",
   "Phone": "08139851110"
 },
 {
   "#": "17",
   "State": "Imo",
   "Terminal":"Owerri Office",
   "Address": "31, Relief Road Junction, Off, Egbu Road, Owerri, Imo State",
   "Emails": "owerri@gigm.com",
   "Phone": "08139851110"
 },
 {
   "#": "18",
   "State": "Lagos",
   "Terminal":"Ajah Office",
   "Address": "Near Police station in Ajiwe Ajah.",
   "Emails": "ajah@gigm.com",
   "Phone": "08139851110"
 },
 {
   "#": "19",
   "State": "Lagos",
   "Terminal":"Lekki Pick Up/ Booking Center",
   "Address": "No 1, Wole Ariyo street off Admiralty way beside first bank.",
   "Emails": "lekkibookingcenter@gigm.com",
   "Phone": "08139851110"
 },
 {
   "#": "20",
   "State": "Lagos",
   "Terminal":"Festac Office",
   "Address": "Festac Gate Bus Stop",
   "Emails": "festac@gigm.com",
   "Phone": "08139851110"
 },
 {
   "#": "21",
   "State": "Lagos",
   "Terminal":"Ikotun Terminal",
   "Address": "29, Ikotun Road, Opposite Ikotun LG, Ikotun Bus-Stop. Lagos State.",
   "Emails": "ikotun@gigm.com",
   "Phone": "08139851110"
 },
 {
   "#": "22",
   "State": "Lagos",
   "Terminal":"Iyana-Ipaja Terminal",
   "Address": "164, Lagos-Abeokuta Express way, Beside Diamond Bank, Lagos.",
   "Emails": "iyana-ipaja@gigm.com",
   "Phone": "08139851110"
 },
 {
   "#": "23",
   "State": "Lagos",
   "Terminal":"Jibowu Terminal",
   "Address": "20 Ikorodu Express Road, Jibowu, Lagos.",
   "Emails": "jibowu@gigm.com",
   "Phone": "08139851110"
 },
 {
   "#": "24",
   "State": "Lagos",
   "Terminal":"Old Ojo Terminal",
   "Address": "Old Ojo Road, By the Police Station, Lagos.",
   "Emails": "oldojo@gigm.com",
   "Phone": "08139851110"
 },
 {
   "#": "25",
   "State": "Lagos",
   "Terminal":"Volkswagen Terminal",
   "Address": "Volkswagen Bus Stop.",
   "Emails": "volks@gigm.com",
   "Phone": "08139851110"
 },
 {
   "#": "26",
   "State": "Lagos",
   "Terminal":"Yaba Terminal",
   "Address": "Yaba Terminal, In Tejuosho complex by Railway line, Yaba",
   "Emails": "yaba@gigm.com",
   "Phone": "08139851110"
 },
 {
   "#": "27",
   "State": "Lagos",
   "Terminal":"Oyingbo Terminal",
   "Address": "25 Otto causeway, opposite iddo bus stop. Iddo, ebute meta. Lagos.",
   "Emails": "oyingbo@gigm.com",
   "Phone": "08139851110"
 },
 {
   "#": "28",
   "State": "Lagos",
   "Terminal":"Cele Terminal",
   "Address": "103 Okota Road, Cele. Lagos.",
   "Emails": "celeo@gigm.com",
   "Phone": "08139851110"
 },
 {
   "#": "29",
   "State": "Kaduna",
   "Terminal":"Kaduna North Terminal",
   "Address": "Lagos garage, Mando, Kaduna.",
   "Emails": "kaduna@gigm.com",
   "Phone": "08139851110"
 },
  {
  	"#": "29",
  	"State": "Kaduna",
  	"Terminal": "Kaduna South Terminal",
  	"Address": "No 1 Bible Society Road, Romi New Extension Junction (Before Command Junction), Kaduna.",
  	"Emails": "kaduna@gigm.com",
  	"Phone": "08139851110"
  },
 {
   "#": "30",
   "State": "Rivers",
   "Terminal":"Port-Harcourt Terminal",
   "Address": "228 Aba Road By Bori Camp, Just after INEC Office, Port Harcout, River State.",
   "Emails": "portharcourt@gigm.com",
   "Phone": "08139851110"
 },
 {
   "#": "31",
   "State": "Plateau",
   "Terminal":"Jos Terminal",
   "Address": "Angwan Soya Zaria Road bypass, Opposite Jankwanu Bingham University teaching Hospital.",
   "Emails": "jos@gigm.com",
   "Phone": "08139851110"
 }
];
    });



    app.directive('numbersOnly', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                function fromUser(text) {
                    if (text) {
                        var transformedInput = text.replace(/[^0-9]/g, '');

                        if (transformedInput !== text) {
                            ngModelCtrl.$setViewValue(transformedInput);
                            ngModelCtrl.$render();
                        }
                        return transformedInput;
                    }
                    return undefined;
                }
                ngModelCtrl.$parsers.push(fromUser);
            }
        };
    });


    app.filter('propsFilter', function () {
        return function (items, props) {
            var out = [];

            if (angular.isArray(items)) {
                var keys = Object.keys(props);

                items.forEach(function (item) {
                    var itemMatches = false;

                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        var text = props[prop].toLowerCase();
                        if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                            itemMatches = true;
                            break;
                        }
                    }

                    if (itemMatches) {
                        out.push(item);
                    }
                });
            } else {
                // Let the output be the input untouched
                out = items;
            }

            return out;
        };
    });

   
    /*app.run(['$route', function ($route) {
             console.log("here");
    }]);*/

})()







