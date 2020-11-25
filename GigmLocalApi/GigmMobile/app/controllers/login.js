(function () {
    'use strict';

    var controllerId = 'login';

    angular.module('gigm').controller(controllerId, ['$timeout','$localstorage', 'datacontext', 'common', login]);

    function login($timeout,$localstorage, datacontext, common) {

        console.log("here");

        var vm = this;

        vm.loading = false;

        vm.title = "login";

        vm.user = {};

       
        vm.newUser = {};

        vm.gender = {
            availableOptions: [
              { id: '2', name: 'Select Gender' },
              { id: '0', name: 'Male' },
              { id: '1', name: 'Female' },
             
            ],

            selectedOption: { id: '2', name: 'Select Gender' }, //This sets the default value of the select in the ui

        };


        function activate() {

        }

        vm.continueNoLogin = function () {
            window.location.href = "Passenger";
        }

      
        vm.login = function (type) {
            console.log(type);
            vm.loading = true;
            var user = {};

            user.UserName = vm.user.username;
            user.Password = vm.user.password;

            datacontext.signIn(user).then(function (d) {
                console.log(d);
                vm.loading = false;
                if (d.Item1.Code == "200") {
                    $localstorage.setObject("user", d);
                    if (type) {
                        window.location.reload();
                    }else
                        window.location.href = "Passenger";
                   
                } else {
                    swal(d.Item1.ShortDescription + "!");
                }
               
            }, function (err) {
                vm.loading = false;
                 swal("Error occured!")
            });
            console.log(vm.user);
        }

        vm.signUp = function(type){
             
            vm.loading = true;

            datacontext.signUp(vm.newUser).then(function (d) {
                console.log(d);
                try {
                    if (d.data.Item1.Code == "200") {
                       
                        vm.loading = false;
                        swal("Congrats!", "You have been successfully created on our platform!", "success");

                        $timeout(function () {
                            swal("Congrats!", "You have been successfully created on our platform!", "success");
                            type == 1 ? window.location.href = "Booking" : window.location.href = "Pages/Passenger";
                        }, 5000);

                    } else {
                        swal("User not Created", d.data.Item1.ShortDescription +" (" + d.data.Item1.Code + ")" , "error");
                        vm.loading = false;
                    }

                } catch (e) {
                    console.log(e);
                    swal("User not Created", "Error occured pls try again later!", "error");
                    vm.loading = false;
                }
               
            }, function (err) {
                console.log(err);
                swal("User not Created", "Error Occured", "error");
                vm.loading = false;
            });
        }

        vm.getActivationCode = function () {
            vm.loading = true;
            datacontext.getActivationCode(vm.phoneNumber).then(function (d) {
                if (d.Item1.Code = "200") {
                    $localstorage.setObject("activationCode", d.Item1.Object);
                    window.location.href = "/Pages/ForgotPassword";

                }

                vm.loading = false;
            }, function (err) {
                vm.loading = false;
            });
        }
    }

})();