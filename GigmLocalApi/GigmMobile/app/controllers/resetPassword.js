(function () {
    'use strict'

    var controllerId = "resetPassword";

    angular.module('gigm').controller(controllerId, ['$timeout','$localstorage', 'datacontext', resetPassword]);

    function resetPassword($timeout,$localstorage, datacontext) {
        var vm = this;

        vm.resetPasswordObj = {};
        vm.activationCode = "";
        vm.loading = false;

        try {
            vm.activationCode = $localstorage.getObject("activationCode");
            console.log(activationCode);
        } catch (ex) {
            console.log(ex);
        }

        vm.resetPassword = function () {
            vm.loading = true;
            datacontext.resetPassword(vm.resetPasswordObj).then(function (d) {
                vm.loading = false;
                console.log(d.Item1);
                if (d.Item1.Code == "200") {
                    swal("Password susscessfully changed!", "", "success");
                    $timeout(function () {
                        window.location.href = "/";
                    }, 3000)
                } else {
                    swal(d.Item1.Code, "", "error");
                    vm.loading = false;
                }   
            }, function (err) {
                vm.loading = false;
                swal("Error occured!", "", "error");
                console.log(err);
            });
        }
    }
})();