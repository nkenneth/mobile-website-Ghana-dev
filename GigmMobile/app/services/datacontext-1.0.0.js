(function () {
    'use strict';


    var serviceId = 'datacontext';
    var baseUrl = "/";
    //var baseUrl_ = "http://mtest2.gigm.com/";
    // var baseUrl_ = "http://localhost/gigm-mobile/";
    angular.module('gigm').factory(serviceId, ['$http', '$q', '$localstorage', 'common', datacontext]);



    function datacontext($http, $q, $localstorage, common) {
        var $q = common.$q;

        var service = {
            getDepartureTerminals: getDepartureTerminals,
            getDepartureTerminalsByCountryCode: getDepartureTerminalsByCountryCode,
            getTravelDocuments: getTravelDocuments,
            getDestinationTerminals: getDestinationTerminals,
            loadBusForDay: loadBusForDay,
            signIn: signIn,
            getCountryDetails : getCountryDetails,
            signUp: signUp,
            getActivationCode: getActivationCode,
            resetPassword: resetPassword,
            getPickupRoutes: getPickupRoutes,
            postBoking: postBooking,
            processGoogleMap: processGoogleMap,
            getBookingStatus: getBookingDetails,
            getHistory: getBookingHistory,
            postHireBooking: postHireBooking,
            getTerminals: getTerminals,
            getSchedule: getSchedule,
            getTripByRoute: getTripByRoute,
            savePartnerEnquiry: savePartnerEnquiry
        };

        return service;

        function loadBusForDay(data) {

            $localstorage.setObject("bus-data", {});
            console.log("data:", data);
            //debugger;
            ///data.NumberOfChildren = 0;
            console.log(baseUrl + 'Data/loadBusForDay');
            return $http.post(baseUrl + 'Data/loadBusForDay', data).then(function (d) {

                console.log("obj...", JSON.stringify(d.data.Object));

                return d.data.Object;
            }, function (err) {
                console.log(err);

            });
        }

        function getDepartureTerminals() {
            var terminals = [];

            return $http.get(baseUrl + 'Data/getRoutes').then(function(d) {
                console.log(d);
                terminals = d.data.Object;
                console.log(terminals);

                return terminals;
            }, function (err) {
                $q.reject(err);
            });
        }


        function getTravelDocuments() {
            var travelDocuments = [];

            return $http.get(baseUrl + 'Data/getTravelDocumentType').then(function (d) {
                console.log(d);
                travelDocuments = d.data.Object;
                console.log("travel Docs", travelDocuments);

                return travelDocuments;
            }, function(err) {
                $q.reject(err);
            });
        }

        function getDepartureTerminalsByCountryCode(countrycode) {
            var terminals = [];

            return $http.get(baseUrl + 'Data/getRoutesByCountryCode?countrycode=' + countrycode).then(function (d) {
                console.log(d);
                terminals = d.data.Object;
              //  console.log(terminals);

                return terminals;
            }, function (err) {
                $q.reject(err);
            });
        }

        function getDestinationTerminals(terminalId) {
            var terminals = [];
            return $http.get(baseUrl + 'Data/getDestinationRoutes?terminalId=' + terminalId).then(function (d) {
                console.log(d.data.Object);
                terminals = d.data.Object;
                console.log(terminals);

                return terminals;
            }, function (err) {
                $q.reject(err);
            });

        }

        function signIn(user) {

            console.log(user);
            var userDetails = {};
            try {
                return $http.post(baseUrl + 'Data/login', user).then(function (d) {
                    userDetails = d.data;
                    return userDetails;
                }, function (error) {
                    console.log(error);
                });
            } catch (e) {
                console.log(e);
                swal("Unable to login!Please try again later", "", "error");
            }
           
        }

        function signUp(user) {
            var response = {};

            return $http.post(baseUrl + 'Data/signUp', user).then(function (d) {
                console.log(d);
                return d;
            }, function (err) {
                console.log(err);
            });

        }

        function getPickupRoutes(tripId) {
            var routes = [];
            return $http.get(baseUrl + "Data/getAllPickUpRoutes?tripId=" + tripId).then(function (d) {

                //console.log(d.data.Object);

                routes = d.data.Object;

                return routes;

            }, function (err) {

                console.log(err);
            });
        }

        function postBooking(data) {
            var response = {};

            return $http.post(baseUrl + 'Data/PostBooking', data).then(function (d) {
                console.log(d);
                return d.data



            }, function (err) {
                console.log(err);
            });
        }

        function processGoogleMap(data) {
            var response = {};

            return $http.post(baseUrl + 'Data/processGoogleMap', data).then(function (d) {
                console.log(d);
                return d;
            }, function (err) {
                console.log(err);
            });
        }

        function getBookingDetails(refcode) {
            var response = {};

            return $http.get(baseUrl + 'Data/getBookingDetails?refcode=' + refcode).then(function (d) {
   
                return d.data.Item1;
            }, function (err) {

            });
        }


        function getCountryDetails(countryCode) {
            var response = {};

            return $http.get(baseUrl + 'Data/getCountryDetails?countryCode=' + countryCode).then(function(d) {

                return d.data.Item1;
            }, function(err) {

            });
        }



        function getBookingHistory(id) {
            return $http.get(baseUrl + 'Data/CustomerBookings?Id=' + id).then(function (d) {
                console.log(d.data.Item1);

                return d.data.Item1;
            }, function (err) {
                console.log(err);
            });
        }

        function postHireBooking(request, tripType) {
            console.log(request);
            var endPoint = "";
            if (tripType == 2) 
                endPoint = 'Data/PostHireBookingReturn';
            else
                endPoint = 'Data/PostHireBooking';
         

            return $http.post(baseUrl + endPoint , request).then(function (d) {

                console.log(d.data);

                return d.data;
            }, function (err) {
                console.log(err);

                    swal("error occured on server, Please try again", "", "error");
            });
        }

        function getActivationCode(phoneNumber) {
            var data = {
                Username:phoneNumber
            }
            return $http.post(baseUrl + "Data/GetActivationCode", data).then(function (d) {
                console.log(d.data);
                return d.data;
            }, function (err) {
                console.log(err);
            });
        }

        function resetPassword(data) {
           
            return $http.post(baseUrl + "Data/ForgotPassword", data).then(function (d) {
                console.log(d.data);
                return d.data;
            }, function (err) {
                console.log(err);
            });
        }

        function getTerminals() {

            return $http.get(baseUrl + "Data/GetTerminals").then(function (d) {
                console.log(d.data);

                return d.data;
            }, function (err) {
                console.log(err);
            });
        }

        function getSchedule(id) {
            console.log(id);
            return $http.get(baseUrl + "Data/GetSchedule?terminalId=" + id).then(function (d) {
                console.log(d.data);
                return d.data;
            }, function (err) {
                console.log(err);
            });
        }

        function getTripByRoute(id) {
            return $http.get(baseUrl + "Data/GetTripByRoute?routeId=" + id).then(function (d) {
                console.log(d.data);
                return d.data;
            }, function (err) {
                console.log(err);
            });
        }

        function savePartnerEnquiry(data) {
            console.log(data);
           // debugger;
            return $http.post(baseUrl + "Data/SavePartnerEnquiry", data).then(function (d) {
                console.log(d.data);
                return d.data;
            }, function (err) {
                console.log(err);
            });
        }





         

    }

    angular.module("gigm").factory('$localstorage', ['$window', function ($window) {
        return {
            set: function (key, value) {
                console.log("value", value);
                $window.localStorage[key] = value;
            },
            get: function (key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            setObject: function (key, value) {
             
                console.log(value);
                $window.localStorage[key] = JSON.stringify(value);
                // console.log($window.localStorage[key]);
            },
            getObject: function (key) {
                if ($window.localStorage[key] && $window.localStorage[key] !== undefined) {
                    //    console.log($window.localStorage[key]);
                    return JSON.parse($window.localStorage[key] || '{}');
                }
                else {
                    return undefined;
                }
            }
        }
    }]);
})();