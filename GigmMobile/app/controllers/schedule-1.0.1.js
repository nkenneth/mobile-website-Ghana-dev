(function () {
    'use strict';


    var controllerId = "schedule";

    angular.module('gigm').controller(controllerId, ['$timeout','common', 'datacontext', schedule]);

    function schedule($timeout,common, datacontext, $sce) {

        var vm = this;

        vm.currentPage = 1;
        vm.pageSize = 10;

        vm.schedules = [];

        vm.newSchedule = [];

        vm.terminals = [];
        vm.terminal = [{ "TerminalId": 4, "TerminalName": "Edo => Auchi", "TerminalCode": null, "TerminalImage": null, "TerminalAddress": "Auchi-Okene express way, by old staff Quarters, Auchi Poly.", "ContactPerson": null, "ContactPersonNo": null, "Latitude": 7.05, "Longitude": 6.27, "StartDate": null, "EndDate": null, "Refcode": null, "BookingType": "0", "BookingStatus": "0", "StateId": 3, "StateName": "Edo", "RouteId": 0, "RouteName": null },
        { "TerminalId": 5, "TerminalName": "Edo => Uselu", "TerminalCode": null, "TerminalImage": null, "TerminalAddress": "202B Uselu Lagos Road, Near Ediaken Market, Benin City, Edo State", "ContactPerson": null, "ContactPersonNo": null, "Latitude": 6.38, "Longitude": 5.61, "StartDate": null, "EndDate": null, "Refcode": null, "BookingType": "0", "BookingStatus": "0", "StateId": 3, "StateName": "Edo", "RouteId": 0, "RouteName": null },
        { "TerminalId": 6, "TerminalName": "Lagos => Iyana Ipaja", "TerminalCode": null, "TerminalImage": null, "TerminalAddress": "164, Lagos-Abeokuta Express way, Beside Diamond Bank, Lagos.", "ContactPerson": null, "ContactPersonNo": null, "Latitude": 6.617549, "Longitude": 3.303139, "StartDate": null, "EndDate": null, "Refcode": null, "BookingType": "0", "BookingStatus": "0", "StateId": 2, "StateName": "Lagos", "RouteId": 0, "RouteName": null },
        { "TerminalId": 7, "TerminalName": "Lagos => Ajah", "TerminalCode": null, "TerminalImage": null, "TerminalAddress": "Near Police station in Ajiwe Ajah.", "ContactPerson": "", "ContactPersonNo": null, "Latitude": 6.47, "Longitude": 3.58, "StartDate": null, "EndDate": null, "Refcode": null, "BookingType": "0", "BookingStatus": "0", "StateId": 2, "StateName": "Lagos", "RouteId": 0, "RouteName": null },
        { "TerminalId": 8, "TerminalName": "Abia => Umuahia", "TerminalCode": null, "TerminalImage": null, "TerminalAddress": "New Central Park, Ohia, Enugu-Port Harcourt Express Way. Umuahia, Abia State.", "ContactPerson": null, "ContactPersonNo": null, "Latitude": 5.05, "Longitude": 7.88, "StartDate": null, "EndDate": null, "Refcode": null, "BookingType": "0", "BookingStatus": "0", "StateId": 5, "StateName": "Abia", "RouteId": 0, "RouteName": null },
        { "TerminalId": 9, "TerminalName": "Abia => Aba", "TerminalCode": null, "TerminalImage": null, "TerminalAddress": "No 5, Asa road, Former Old Nitel Building, Aba.", "ContactPerson": null, "ContactPersonNo": null, "Latitude": 5.11, "Longitude": 7.37, "StartDate": null, "EndDate": null, "Refcode": null, "BookingType": "0", "BookingStatus": "0", "StateId": 5, "StateName": "Abia", "RouteId": 0, "RouteName": null },
        { "TerminalId": 10, "TerminalName": "Akwa Ibom => Uyo", "TerminalCode": null, "TerminalImage": null, "TerminalAddress": "3, Monsignor Akpan Avenue, Itam Industrial Layout, Opposite Timber Market, Itam", "ContactPerson": null, "ContactPersonNo": null, "Latitude": 5.05, "Longitude": 5.05, "StartDate": null, "EndDate": null, "Refcode": null, "BookingType": "0", "BookingStatus": "0", "StateId": 6, "StateName": "Akwa Ibom", "RouteId": 0, "RouteName": null },
        { "TerminalId": 11, "TerminalName": "Anambra => Awka", "TerminalCode": null, "TerminalImage": null, "TerminalAddress": "Elite shopping complex, opposite Crunchies Fries, Enugu/Onitsha Expressway, Awka, Anambra State", "ContactPerson": null, "ContactPersonNo": null, "Latitude": 6.22, "Longitude": 7.07, "StartDate": null, "EndDate": null, "Refcode": null, "BookingType": "0", "BookingStatus": "0", "StateId": 7, "StateName": "Anambra", "RouteId": 0, "RouteName": null },
        { "TerminalId": 12, "TerminalName": "Bayelsa => Yenagoa", "TerminalCode": null, "TerminalImage": null, "TerminalAddress": "Opposite Wema bank, Kpansia, by Inec Junction,Yenagoa", "ContactPerson": null, "ContactPersonNo": null, "Latitude": 4.93, "Longitude": 6.31, "StartDate": null, "EndDate": null, "Refcode": null, "BookingType": "0", "BookingStatus": "0", "StateId": 8, "StateName": "Bayelsa", "RouteId": 0, "RouteName": null },
        { "TerminalId": 13, "TerminalName": "Delta => Asaba (Onitsha)", "TerminalCode": null, "TerminalImage": null, "TerminalAddress": "Asaba - Onisha Express way, by Head-Bridge.", "ContactPerson": null, "ContactPersonNo": null, "Latitude": 6.14, "Longitude": 6.75, "StartDate": null, "EndDate": null, "Refcode": null, "BookingType": "0", "BookingStatus": "0", "StateId": 9, "StateName": "Delta", "RouteId": 0, "RouteName": null },
        { "TerminalId": 14, "TerminalName": "Edo => Benin (Akpakpava)", "TerminalCode": null, "TerminalImage": null, "TerminalAddress": "12 Akpakpava Road by First Junction,Benin City,Edo State", "ContactPerson": null, "ContactPersonNo": null, "Latitude": 6.34, "Longitude": 5.63, "StartDate": null, "EndDate": null, "Refcode": null, "BookingType": "0", "BookingStatus": "0", "StateId": 3, "StateName": "Edo", "RouteId": 0, "RouteName": null },
        { "TerminalId": 15, "TerminalName": "Edo => Ekpoma", "TerminalCode": null, "TerminalImage": null, "TerminalAddress": "Benin Auchi road, Ekpoma,Opposite grail center", "ContactPerson": null, "ContactPersonNo": null, "Latitude": 6.38, "Longitude": 5.61, "StartDate": null, "EndDate": null, "Refcode": null, "BookingType": "0", "BookingStatus": "0", "StateId": 3, "StateName": "Edo", "RouteId": 0, "RouteName": null },
        { "TerminalId": 16, "TerminalName": "Edo => Auchi/Ekpoma", "TerminalCode": null, "TerminalImage": null, "TerminalAddress": "Auchi-Okene express way, by old staff Quarters, Auchi Poly", "ContactPerson": null, "ContactPersonNo": null, "Latitude": 0, "Longitude": 0, "StartDate": null, "EndDate": null, "Refcode": null, "BookingType": "0", "BookingStatus": "0", "StateId": 3, "StateName": "Edo", "RouteId": 0, "RouteName": null },
        { "TerminalId": 17, "TerminalName": "Enugu => Enugu", "TerminalCode": null, "TerminalImage": null, "TerminalAddress": "Market Road,Opposite State Library,Holy Ghost Park,Ogui,Enugu State.", "ContactPerson": null, "ContactPersonNo": null, "Latitude": 6.44, "Longitude": 7.49, "StartDate": null, "EndDate": null, "Refcode": null, "BookingType": "0", "BookingStatus": "0", "StateId": 10, "StateName": "Enugu", "RouteId": 0, "RouteName": null },
        { "TerminalId": 18, "TerminalName": "FCT Abuja => Mararaba", "TerminalCode": null, "TerminalImage": null, "TerminalAddress": "Abuja Keffi road, by Abacha road junction, via nyanya-mararaba. opp. Chrisgold plaza or Oando filling station. Abuja", "ContactPerson": null, "ContactPersonNo": null, "Latitude": 9.03, "Longitude": 7.59, "StartDate": null, "EndDate": null, "Refcode": null, "BookingType": "0", "BookingStatus": "0", "StateId": 4, "StateName": "FCT Abuja", "RouteId": 0, "RouteName": null },
        { "TerminalId": 19, "TerminalName": "FCT Abuja => Zuba", "TerminalCode": null, "TerminalImage": null, "TerminalAddress": "Market Space 206, Zuba Market Abuja", "ContactPerson": null, "ContactPersonNo": null, "Latitude": 9.09, "Longitude": 7.21, "StartDate": null, "EndDate": null, "Refcode": null, "BookingType": "0", "BookingStatus": "0", "StateId": 4, "StateName": "FCT Abuja", "RouteId": 0, "RouteName": null },
        { "TerminalId": 20, "TerminalName": "FCT Abuja => Kubwa", "TerminalCode": null, "TerminalImage": null, "TerminalAddress": "Block 43, Gado Nasko Way, Opposite 2/2 Court, Kubwa, Abuja.", "ContactPerson": null, "ContactPersonNo": null, "Latitude": 9.15, "Longitude": 7.33, "StartDate": null, "EndDate": null, "Refcode": null, "BookingType": "0", "BookingStatus": "0", "StateId": 4, "StateName": "FCT Abuja", "RouteId": 0, "RouteName": null },
        { "TerminalId": 21, "TerminalName": "FCT Abuja => Utako", "TerminalCode": null, "TerminalImage": null, "TerminalAddress": "Plot 113, Utako District, FCT Abuja", "ContactPerson": null, "ContactPersonNo": null, "Latitude": 9.07, "Longitude": 7.44, "StartDate": null, "EndDate": null, "Refcode": null, "BookingType": "0", "BookingStatus": "0", "StateId": 4, "StateName": "FCT Abuja", "RouteId": 0, "RouteName": null },
        { "TerminalId": 22, "TerminalName": "Imo => Owerri", "TerminalCode": null, "TerminalImage": null, "TerminalAddress": "31, Relief Road Junction, Off, Egbu Road, Owerri, Imo State", "ContactPerson": null, "ContactPersonNo": null, "Latitude": 5.48, "Longitude": 7.05, "StartDate": null, "EndDate": null, "Refcode": null, "BookingType": "0", "BookingStatus": "0", "StateId": 11, "StateName": "Imo", "RouteId": 0, "RouteName": null },
        { "TerminalId": 23, "TerminalName": "Imo => Orlu", "TerminalCode": null, "TerminalImage": null, "TerminalAddress": null, "ContactPerson": null, "ContactPersonNo": null, "Latitude": 0, "Longitude": 0, "StartDate": null, "EndDate": null, "Refcode": null, "BookingType": "0", "BookingStatus": "0", "StateId": 11, "StateName": "Imo", "RouteId": 0, "RouteName": null },
        { "TerminalId": 24, "TerminalName": "Kaduna => Kaduna", "TerminalCode": null, "TerminalImage": null, "TerminalAddress": "Lagos garage, Mando, Kaduna.", "ContactPerson": null, "ContactPersonNo": null, "Latitude": 10.59, "Longitude": 7.44, "StartDate": null, "EndDate": null, "Refcode": null, "BookingType": "0", "BookingStatus": "0", "StateId": 12, "StateName": "Kaduna", "RouteId": 0, "RouteName": null },
        { "TerminalId": 25, "TerminalName": "Lagos => Festac (mazamaza)", "TerminalCode": null, "TerminalImage": null, "TerminalAddress": "Festac Gate Bus Stop", "ContactPerson": null, "ContactPersonNo": null, "Latitude": 6.46, "Longitude": 3.3, "StartDate": null, "EndDate": null, "Refcode": null, "BookingType": "0", "BookingStatus": "0", "StateId": 2, "StateName": "Lagos", "RouteId": 0, "RouteName": null },
        { "TerminalId": 26, "TerminalName": "Lagos => Volks", "TerminalCode": null, "TerminalImage": null, "TerminalAddress": "Volkswagen Bus Stop", "ContactPerson": null, "ContactPersonNo": null, "Latitude": 6.46, "Longitude": 3.21, "StartDate": null, "EndDate": null, "Refcode": null, "BookingType": "0", "BookingStatus": "0", "StateId": 2, "StateName": "Lagos", "RouteId": 0, "RouteName": null },
        { "TerminalId": 27, "TerminalName": "Lagos => Ikotun", "TerminalCode": null, "TerminalImage": null, "TerminalAddress": "29, Ikotun Road, Opposite Ikotun LG, Ikotun Bus-Stop. Lagos State", "ContactPerson": null, "ContactPersonNo": null, "Latitude": 6.55, "Longitude": 3.27, "StartDate": null, "EndDate": null, "Refcode": null, "BookingType": "0", "BookingStatus": "0", "StateId": 2, "StateName": "Lagos", "RouteId": 0, "RouteName": null },
        { "TerminalId": 28, "TerminalName": "Lagos => Yaba", "TerminalCode": null, "TerminalImage": null, "TerminalAddress": "Yaba Central Park, Opp. Psychiatric Hospital, Yaba, Lagos.", "ContactPerson": null, "ContactPersonNo": null, "Latitude": 6.51, "Longitude": 3.37, "StartDate": null, "EndDate": null, "Refcode": null, "BookingType": "0", "BookingStatus": "0", "StateId": 2, "StateName": "Lagos", "RouteId": 0, "RouteName": null },
        { "TerminalId": 29, "TerminalName": "Lagos => Jibowu", "TerminalCode": null, "TerminalImage": null, "TerminalAddress": "20 Ikorodu Express Road, Jibowu, Lagos", "ContactPerson": null, "ContactPersonNo": null, "Latitude": 6.518806, "Longitude": 3.367547, "StartDate": null, "EndDate": null, "Refcode": null, "BookingType": "0", "BookingStatus": "0", "StateId": 2, "StateName": "Lagos", "RouteId": 0, "RouteName": null },
        { "TerminalId": 30, "TerminalName": "Lagos => Oyingbo (Iddo)", "TerminalCode": null, "TerminalImage": null, "TerminalAddress": "25 Otto causeway, opposite iddo bus stop. Iddo, ebute meta. Lagos", "ContactPerson": null, "ContactPersonNo": null, "Latitude": 6.47, "Longitude": 3.38, "StartDate": null, "EndDate": null, "Refcode": null, "BookingType": "0", "BookingStatus": "0", "StateId": 2, "StateName": "Lagos", "RouteId": 0, "RouteName": null },
        { "TerminalId": 31, "TerminalName": "Plateau => Jos", "TerminalCode": null, "TerminalImage": null, "TerminalAddress": "Angwan Soya Zaria Road bypass, Opposite Jankwanu Bingham University teaching Hospital", "ContactPerson": null, "ContactPersonNo": null, "Latitude": 0, "Longitude": 0, "StartDate": null, "EndDate": null, "Refcode": null, "BookingType": "0", "BookingStatus": "0", "StateId": 13, "StateName": "Plateau", "RouteId": 0, "RouteName": null },
        { "TerminalId": 32, "TerminalName": "Rivers => Port Harcourt", "TerminalCode": null, "TerminalImage": null, "TerminalAddress": "228 Aba Road By Bori Camp, Just after INEC Office, Port Harcout, River State.", "ContactPerson": null, "ContactPersonNo": null, "Latitude": 7.01, "Longitude": 7.01, "StartDate": null, "EndDate": null, "Refcode": null, "BookingType": "0", "BookingStatus": "0", "StateId": 14, "StateName": "Rivers", "RouteId": 0, "RouteName": null },
        { "TerminalId": 33, "TerminalName": "Lagos => Old Ojo Road", "TerminalCode": null, "TerminalImage": null, "TerminalAddress": "Old Ojo Road, By the Police Station, Lagos", "ContactPerson": null, "ContactPersonNo": null, "Latitude": 0, "Longitude": 0, "StartDate": null, "EndDate": null, "Refcode": null, "BookingType": "0", "BookingStatus": "0", "StateId": 2, "StateName": "Lagos", "RouteId": 0, "RouteName": null },
        { "TerminalId": 34, "TerminalName": "Akwa Ibom => Calabar", "TerminalCode": null, "TerminalImage": null, "TerminalAddress": null, "ContactPerson": null, "ContactPersonNo": null, "Latitude": 0, "Longitude": 0, "StartDate": null, "EndDate": null, "Refcode": null, "BookingType": "0", "BookingStatus": "0", "StateId": 6, "StateName": "Akwa Ibom", "RouteId": 0, "RouteName": null },
        { "TerminalId": 35, "TerminalName": "Delta => Warri", "TerminalCode": null, "TerminalImage": null, "TerminalAddress": "138, Effurun Sapele Road, By Airport Junction, Effurun, Delta State", "ContactPerson": null, "ContactPersonNo": null, "Latitude": 5.55, "Longitude": 5.78, "StartDate": null, "EndDate": null, "Refcode": null, "BookingType": "0", "BookingStatus": "0", "StateId": 9, "StateName": "Delta", "RouteId": 0, "RouteName": null },
        { "TerminalId": 49, "TerminalName": "Lagos => Cele/Okota", "TerminalCode": null, "TerminalImage": null, "TerminalAddress": "103 Okota Road, Cele. Lagos.", "ContactPerson": null, "ContactPersonNo": null, "Latitude": 0, "Longitude": 0, "StartDate": null, "EndDate": null, "Refcode": null, "BookingType": "0", "BookingStatus": "0", "StateId": 2, "StateName": "Lagos", "RouteId": 0, "RouteName": null },];









        vm.routes = [];
        vm.routeAndSchedule = [];

        vm.loading = false;


        activate();


        function activate() {

            try {

                var url_str = window.location.href;
                console.log(url_str);
                var url = new URL(url_str);
                var id = url.searchParams.get("id");

                var routeUrl = new URL(url_str);
                var routeId = routeUrl.searchParams.get("routeId");
                vm.loading = true;

                if (routeId) {
                    datacontext.getTripByRoute(routeId).then(function (d) {
                        vm.loading = false;
                        console.log(d.Item1.Object);
                        vm.routes = d.Item1.Object.filter(chechAvailableOnline);
                        console.log(vm.routes);

                        angular.forEach(vm.routes, function (route) {

                        });
                    }, function (err) {
                        console.log(err);
                    });

                    return;
                }


                if (id) {

                    datacontext.getSchedule(id).then(function (d) {
                        vm.loading = false;
                        console.log(d.Item1.Object);
                        vm.schedules = d.Item1.Object.filter(chechAvailableOnline);
                        console.log(vm.schedules);
                    }, function (err) {
                        vm.loading = false;
                        console.log(err);
                    });
                } else {
                    datacontext.getTerminals().then(function (d) {
                        vm.loading = false;
                        vm.terminals = d.Item1.Object.Items;
                    }, function (err) {
                        vm.loading = false;
                        console.log(err);

                    });
                }

                console.log(id);

            } catch (e) {
                console.log(e);
            }
        }

        vm.getSchedule = function (id) {
            window.location.href = "/Pages/ScheduleDetail?id=" + id;
        }


        var schedule_ = [];

        vm.scheduleArray = [];
        vm.showItem = false;
        vm.current = -1;

        var emptyArr = [];
       
        vm.newSchedule.schedule = [];
        vm.getRoute = function (id) {

           // console.log($('#schedule' + id));

            var contextId = $("#hidden1").val();

            console.log("val", $("#hidden1").val());

            if (contextId == id) {
                vm.showItem = true;
            }

            angular.forEach(vm.schedules, function (value) {
                if (value.RouteId !== id) {
                    $("#schedule" + value.RouteId).hide();
                }
            });

            console.log(vm.newSchedule);

            schedule = [];

            var newSchedule = {};

            $('#schedule' + id).toggle();

            try {
                vm.newSchedule = vm.scheduleArray.find(function (item) {
                    return item.id == id;
                }) || [] ;
                console.log("new_", vm.newSchedule);
                console.log("schArr", vm.scheduleArray);
            } catch (ex) {
                console.log(ex);
            }

            console.log("ns", vm.newSchedule);
            if (vm.newSchedule.length < 1) {
               
                vm.loading = true;
                datacontext.getTripByRoute(id).then(function (d) {
                    vm.loading = false;
                    console.log(d.Item1.Object);
                    vm.routes = d.Item1.Object;
                    vm.scheduleArray.push({ id: id, schedule: vm.routes });

                    vm.newSchedule = vm.scheduleArray.find(function (item) {
                        return item.id == id;
                    }) || [];
                    console.log("rts",vm.routes);
                   
                }, function (err) {
                    console.log(err);

                });
            }
      
           // window.location.href = "/Pages/TripDetail?routeId=" + id;
        }

        function chechAvailableOnline(route) {
            console.log(route.AvailableOnline);
            return route.AvailableOnline == true;
        }

        function chechIfExist(route) {
            console.log(route.AvailableOnline);
            if (route.id) {
                return true;
            }
            return false;
        }

    
        
    }

})();