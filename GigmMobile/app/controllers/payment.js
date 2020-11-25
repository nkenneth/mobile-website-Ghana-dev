(function () {
    //'use strict'

    var controllerId = "payment";

    angular.module('gigm').controller(controllerId, ['$q', '$timeout', '$localstorage', '$scope', 'datacontext', 'common', payment]);

    function payment($q, $timeout, $localstorage, $scope, datacontext, common) {
        {
            var vm = this;

            vm.endpoint = "https://test.theteller.net";
            vm.transid = "";
            vm.APIKey = "MmY4NzRmNmU2MTIyOGFjYWZhODFkNzFjMWEyMmJmYTc";
            vm.amount = "10";
            vm.customer_email = "";
            vm.currency = "";
            vm.redirect_url = "";
            vm.redirect_url = "";

        }

    }
})();


