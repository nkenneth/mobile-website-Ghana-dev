(function () {
    'use strict';

    function getarray(x, y) {
        var arr = [];
        for (var i = 0; i < x; i++) {
            arr.push([]);
        }
        arr.forEach(function (item) {
            for (var i = 0; i < y; i++) {
                item.push(0);
            }
        });
        return arr;
    }
   
    function gettextarray(arr) {
        arr = arr || [[]];
        var height = arr.length;
        var width = arr[0].length;
        var i = 0;
        var ret = [];
        for (var y = 0; y < height; y++) {
            ret.push([]);
            for (var x = 0; x < width; x++) {
                ret[y].push("X");
            }
        }
        for (var x = 0; x < width; x++) {
            for (var y = height - 1; y >= 0; y--) {
                if (arr[y][x] >= 0) {
                    i++;
                    ret[y][x] = i + '';
                }
            }
        }
        return ret;
    }


    /*
    function getseatarray(width, linear, noofseats) {
        width = width || 4;
        var rows = 0;
        while (rows * width < noofseats) rows++;
        var seats = [];
        for (var i = 0; i < rows; i++) {
            seats.push([]);
            for (var j = 0; j < width; j++) {
                seats.last().push(0);
            }
        }
        //console.log(seats);
        var avoid = [];
        avoid.push({ X: 0, Y: 0 });
        if (width > 3) {
            if ((rows * width) - avoid.length > noofseats) avoid.push({ X: 1, Y: 0 });
            if ((rows * width) - avoid.length > noofseats) avoid.push({ X: width - 1, Y: 0 });
            if ((rows * width) - avoid.length > noofseats) avoid.push({ X: width - 1, Y: 1 });
            for (var i = 2; i < rows - 2; i++) {
                if ((rows * width) - avoid.length > noofseats) avoid.push({ X: width - 2, Y: i });
            }
        }
        // console.log(avoid);
        for (var y = rows - 1; y >= 0; y--) {
            for (var x = 0; x < width; x++) {
                if (avoid.where('X', y).where('Y', x).count() > 0) seats[x][y] = -1;
            }
        }
        //console.log(seats);
        var seatcount = 0;
        for (var y = rows - 1; y >= 0; y--) {
            for (var x = 0; x < width; x++) {
                if (seats[y][x] == 0) {
                    seatcount++;
                    if (linear.indexOf(seatcount) < 0) seats[y][x] = 2;
                }
            }
        }
        console.log(JSON.stringify(seats));
        return seats;
    }*/

    var app = angular.module("gigm");

    app.directive("busSeats", function () {
        return {
            restrict: 'AE',
            scope: {
                width: '@',
                height: '@',
                max: '@',
                uselinear: '@',
                totalnoofseats: '@',
                seatcapacity: '@',
                seatsarray: '@',
                busindex:'@'
            },
            templateUrl: '../app/directives/bus-seats.html',
            controller: function ($scope, $transclude) {
                console.log("sr1", $scope);
                $scope.uselinear = $scope.uselinear || false;
                $scope.getseatarray = getseatarray;
                $scope.gettextarray = gettextarray;
                $scope.seatsarray = $scope.seatsarray || [];
                $scope.seats = [];
                $scope.seattexts = [];
                $scope.selected = 0;
                $scope.selectedseats = [];

                console.log("index", $scope.busindex);

                if (!$scope.max) $scope.max = 3;

                $transclude(function (clone, scope) {
                    try {
                        $scope.width = $scope.width || 4;
                        //  console.log(clone.html());
                        //var json = clone.html();
                        $scope.height = $scope.height || 0;
                      
                        if ($scope.uselinear == 'true') $scope.seats = $scope.getseatarray($scope.width, $scope.height, JSON.parse($scope.seatsarray), $scope.totalnoofseats, $scope.seatcapacity);
                        else $scope.seats = JSON.parse(json);
                        $scope.seattexts = gettextarray($scope.seats);
                        console.log($scope.seats);
                        console.log($scope.seattexts);
                    }
                    catch (ex) {
                        !ex ? console.error("no width and height specified ...") : console.log(ex);
                         console.error(ex);
                        if (!$scope.width) $scope.width = 5;
                        if (!$scope.height) $scope.height = 5;
                        $scope.seats = getarray($scope.height, $scope.width);
                    }
                });
            },
            link: function ($scope, element, attrs) {
                element.attr("selectedseats", "[]");
                $scope.selectseat = function (x, y) {
                console.log(x, y); 
                console.log($scope.selectedseats);
                   // debugger;
                    if ($scope.selected < $scope.max) {
                        if ($scope.seats[x][y] == 1) {
                            $scope.seats[x][y] = 0;
                            $scope.selected -= 1;
                            $scope.selectedseats.remove($scope.seattexts[x][y]);
                            console.log($scope.selectedseats);
                            $(element).attr("selectedseats", JSON.stringify($scope.selectedseats));
                            return;
                        }
                        if ($scope.seats[x][y] == 0) {
                            $scope.seats[x][y] = 1;
                            $scope.selected += 1;
                            $scope.seats[x][y] = 1;
                            $scope.selectedseats.push($scope.seattexts[x][y]);
                            console.log($scope.selectedseats);
                            $(element).attr("selectedseats", JSON.stringify($scope.selectedseats));
                            return;
                        }
                    }
                    else {
                        if ($scope.seats[x][y] == 1) {
                            $scope.seats[x][y] = 0;
                            $scope.selected -= 1;
                            $scope.selectedseats.remove($scope.seattexts[x][y]);
                        }
                        else {
                            // sweetAlert("You have exceeded the number of seats selectable");
                            swal("You have exceeded the number of seats selectable","", "info");
                            //document.getElementById("alertbox").style.display = "block";
                            // alert("You have exceeded the number of seats selectable");
                        }
                    }
                }
            },
            transclude: true
        }
    });

    function getseatarray(width, height, linear, noofseats, seatcapacity) {
        // debugger;
        console.log(linear);
        console.log(width + ":" + height + ":" + linear + ":" + noofseats + ":" + seatcapacity);
        width = width || 4;
        var rows = height || 0;
        if (rows == 0) while (rows * width < noofseats) rows++;
        var seats = [];
        console.log(width, height);
        for (var i = 0; i < width; i++) {
            seats.push([]);
            //alert(seats);
            for (var j = 0; j < rows; j++) {
                seats.last().push(0);
            }
        }
        var avoid = [];
        avoid.push({ X: 0, Y: width - 1 });
        if (width > 3) {
            if ((rows * width) - avoid.length > noofseats) avoid.push({ X: 0, Y: width - 2 });
            if ((rows * width) - avoid.length > noofseats) avoid.push({ X: 0, Y: 1 });
            if ((rows * width) - avoid.length > noofseats) avoid.push({ X: 1, Y: 0 });
            for (var i = 2; i <= rows - 2; i++) {
                if ((rows * width) - avoid.length > noofseats) avoid.push({ X: i, Y: 1 });
            }
        }
        for (var y = width - 1; y >= 0; y--) {
            for (var x = 0; x < rows; x++) {
                if (avoid.where('X', y).where('Y', x).count() > 0) seats[x][y] = -1;
                if (seatcapacity == 10) seats[1][3] = -1;
                if (seatcapacity == 6) {

                    seats[1][1] = -1;
                   seats[2][1] = -1;
                    seats[3][1] = -1;
                    //seats[1][3] = -1;
                    //seats[1][2] = -1;
                    seats[3][2] = -1;
                    seats[3][3] = -1;
                    //seats[2][2] = -1;
                }
                if (seatcapacity == 12) {
                    seats[1][4] = -1;
                    seats[1][1] = -1;
                }

                if (seatcapacity == 13) {
                    seats[1][1] = 0;
                    seats[1][4] = -1;
                }
                if (seatcapacity == 17) {
                    seats[0][5] = 2;
                    seats[1][5] = 2;
                    seats[2][5] = 2;
                    seats[3][5] = 2;
                    seats[1][4] = -1;
                    seats[1][5] = -1;
                }
            }

        }
        var seatcount = 0;
        for (var x = 0; x < rows; x++) {
            for (var y = width - 1; y >= 0; y--) {
                if (seats[y][x] == 0) {
                    seatcount++;
                    if (linear.indexOf(seatcount) < 0) seats[y][x] = 2;
                }

            }
        }

        console.log(JSON.stringify(seats));

        return seats;
    }
})();