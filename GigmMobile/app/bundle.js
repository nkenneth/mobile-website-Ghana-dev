(function() {
	'use strict';

	var app = angular.module('gigm');

	// Collect the routes
	app.constant('routes', getRoutes());

	// Configure the routes and route resolvers
	//app.config(['$routeProvider', 'routes', routeConfigurator]);


/*	app.config(function ($stateProvider, $urlRouterProvider) {

	    $urlRouterProvider.otherwise('/home');

	    $stateProvider.state('home', {
	        url: '/home',
	        templateUrl: '../app/views/home.html'
	    }).state('booking', {
	        url: '/booking',
	        controller: function () {
	           // console.log('reloaded!');
	          // $route.reload();
	        },
	        templateUrl: '../app/views/booking.html'
	    }).state('selection', {
	        url: '/selection',
	        templateUrl: '../app/views/bus-selection.html'
	    });


	});*/

	function routeConfigurator($routeProvider, routes) {

		routes.forEach(function(r) {
			$routeProvider.when(r.url, r.config);
		});
		$routeProvider.otherwise({
			redirectTo : '/'
		});
	}

	// Define the routes
	function getRoutes() {

	    return [
            {
                url: '/',
                config: {
                    title: 'Home',
                    templateUrl: '../app/views/home.html'
                }
            },
			{
					url : '/booking',
					config: {
					    title: 'Booking',
					    templateUrl: '../app/views/booking.html'
					}
				},
				{
					url : '/selection',
					config : {
						title : '',
						templateUrl: '../app/views/bus-selection.html',
					}
				},
			 ];
	}
})();
(function () {
    'use strict';
    
    angular.module('common').factory('logger', ['$log', logger]);

    function logger($log) {
        var service = {
            getLogFn: getLogFn,
            log: log,
            logError: logError,
            logSuccess: logSuccess,
            logWarning: logWarning
        };

        return service;

        function getLogFn(moduleId, fnName) {
            fnName = fnName || 'log';
            switch (fnName.toLowerCase()) { // convert aliases
                case 'success':
                    fnName = 'logSuccess'; break;
                case 'error':
                    fnName = 'logError'; break;
                case 'warn':
                    fnName = 'logWarning'; break;
                case 'warning':
                    fnName = 'logWarning'; break;
            }

            var logFn = service[fnName] || service.log;
            return function (msg, data, showToast) {
                logFn(msg, data, moduleId, (showToast === undefined) ? true : showToast);
            };
        }

        function log(message, data, source, showToast) {
            logIt(message, data, source, showToast, 'info');
        }

        function logWarning(message, data, source, showToast) {
            logIt(message, data, source, showToast, 'warning');
        }

        function logSuccess(message, data, source, showToast) {
            logIt(message, data, source, showToast, 'success');
        }

        function logError(message, data, source, showToast) {
            logIt(message, data, source, showToast, 'error');
        }

        function logIt(message, data, source, showToast, toastType) {
            var write = (toastType === 'error') ? $log.error : $log.log;
            source = source ? '[' + source + '] ' : '';
            write(source, message, data);
            if (showToast) {
                if (toastType === 'error') {
                    toastr.error(message);
                } else if (toastType === 'warning') {
                    toastr.warning(message);
                } else if (toastType === 'success') {
                    toastr.success(message);
                } else {
                    toastr.info(message);
                }
            }
        }
    }
})();
(function () {
    'use strict';

    var app = angular.module('gigm');

    console.log("herer ");

    // Configure Toastr
    toastr.options.timeOut = 4000;
    toastr.options.positionClass = 'toast-bottom-right';

    // For use with the HotTowel-Angular-Breeze add-on that uses Breeze
    var remoteServiceName = 'breeze/Breeze';

    var events = {
        controllerActivateSuccess: 'controller.activateSuccess',
        spinnerToggle: 'spinner.toggle'
    };

    var config = {
        appErrorPrefix: '[UD Error] ', //Configure the exceptionHandler decorator
        docTitle: 'GIGM: ',
        events: events,
        remoteServiceName: remoteServiceName,
        version: '2.1.0'
    };

    app.value('config', config);

    app.config(['$logProvider', function ($logProvider) {
        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
    }]);

    //#region Configure the common services via commonConfig
    app.config(['commonConfigProvider', function (cfg) {
        cfg.config.controllerActivateSuccessEvent = config.events.controllerActivateSuccess;
        cfg.config.spinnerToggleEvent = config.events.spinnerToggle;
    }]);

   
    //#endregion

    console.log("here again");
})();
//// Include in index.html so that app level exceptions are handled.
//// Exclude from testRunner.html which should run exactly what it wants to run
//(function () {
//    'use strict';
    
//    var app = angular.module('gigm');

//    // Configure by setting an optional string value for appErrorPrefix.
//    // Accessible via config.appErrorPrefix (via config value).

//    app.config(['$provide', function ($provide) {
//        $provide.decorator('$exceptionHandler',
//            ['$delegate', 'config', 'logger', extendExceptionHandler]);
//    }]);
    
//    // Extend the $exceptionHandler service to also display a toast.
//    function extendExceptionHandler($delegate, config, logger) {
//        var appErrorPrefix = config.appErrorPrefix;
//        var logError = logger.getLogFn('app', 'error');
//        return function (exception, cause) {
//            $delegate(exception, cause);
//            if (appErrorPrefix && exception.message.indexOf(appErrorPrefix) === 0) { return; }

//            var errorData = { exception: exception, cause: cause };
//            var msg = appErrorPrefix + exception.message;
//            //logError(msg, errorData, true);
//        };
//    }
//})();
(function () {
    'use strict';

    // Define the common module 
    // Contains services:
    //  - common
    //  - logger
    //  - spinner
    var commonModule = angular.module('common', []);

    // Must configure the common service and set its 
    // events via the commonConfigProvider
    commonModule.provider('commonConfig', function () {
        this.config = {
            // These are the properties we need to set
            //controllerActivateSuccessEvent: '',
            //spinnerToggleEvent: ''
        };

        this.$get = function () {
            return {
                config: this.config
            };
        };
    });

    commonModule.factory('common',
        ['$q', '$rootScope', '$timeout', 'commonConfig', 'logger', common]);

    function common($q, $rootScope, $timeout, commonConfig, logger) {
        var throttles = {};

        var service = {
            // common angular dependencies
            $broadcast: $broadcast,
            $q: $q,
            $timeout: $timeout,
            // generic
            activateController: activateController,
            createSearchThrottle: createSearchThrottle,
            debouncedThrottle: debouncedThrottle,
            isNumber: isNumber,
            logger: logger, // for accessibility
            textContains: textContains,
            isAfter:isAfter
        };

        return service;

        function activateController(promises, controllerId) {
            return $q.all(promises).then(function (eventArgs) {
                var data = { controllerId: controllerId };
                $broadcast(commonConfig.config.controllerActivateSuccessEvent, data);
            });
        }

        function $broadcast() {
            return $rootScope.$broadcast.apply($rootScope, arguments);
        }

        function createSearchThrottle(viewmodel, list, filteredList, filter, delay) {
            // After a delay, search a viewmodel's list using 
            // a filter function, and return a filteredList.

            // custom delay or use default
            delay = +delay || 300;
            // if only vm and list parameters were passed, set others by naming convention 
            if (!filteredList) {
                // assuming list is named sessions, filteredList is filteredSessions
                filteredList = 'filtered' + list[0].toUpperCase() + list.substr(1).toLowerCase(); // string
                // filter function is named sessionFilter
                filter = list + 'Filter'; // function in string form
            }

            // create the filtering function we will call from here
            var filterFn = function () {
                // translates to ...
                // vm.filteredSessions 
                //      = vm.sessions.filter(function(item( { returns vm.sessionFilter (item) } );
                viewmodel[filteredList] = viewmodel[list].filter(function(item) {
                    return viewmodel[filter](item);
                });
            };

            return (function () {
                // Wrapped in outer IFFE so we can use closure 
                // over filterInputTimeout which references the timeout
                var filterInputTimeout;

                // return what becomes the 'applyFilter' function in the controller
                return function(searchNow) {
                    if (filterInputTimeout) {
                        $timeout.cancel(filterInputTimeout);
                        filterInputTimeout = null;
                    }
                    if (searchNow || !delay) {
                        filterFn();
                    } else {
                        filterInputTimeout = $timeout(filterFn, delay);
                    }
                };
            })();
        }

        function debouncedThrottle(key, callback, delay, immediate) {
            // Perform some action (callback) after a delay. 
            // Track the callback by key, so if the same callback 
            // is issued again, restart the delay.

            var defaultDelay = 1000;
            delay = delay || defaultDelay;
            if (throttles[key]) {
                $timeout.cancel(throttles[key]);
                throttles[key] = undefined;
            }
            if (immediate) {
                callback();
            } else {
                throttles[key] = $timeout(callback, delay);
            }
        }

        function isNumber(val) {
            // negative or positive
            return /^[-]?\d+$/.test(val);
        }

        function textContains(text, searchText) {
            return text && -1 !== text.toLowerCase().indexOf(searchText.toLowerCase());
        }

        function isAfter(start, end) {
            console.log(moment(new Date(start)).isAfter(moment(new Date(end))));
            return moment(new Date(start)).isAfter(moment(new Date(end)));
        }
    }
})();
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
                    seats[1][3] = -1;
                    seats[2][2] = -1;
                }
                if (seatcapacity == 12) {
                    seats[1][4] = -1;
                    seats[1][1] = -1;
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
/**
 * dirPagination - AngularJS module for paginating (almost) anything.
 *
 *
 * Credits
 * =======
 *
 * Daniel Tabuenca: https://groups.google.com/d/msg/angular/an9QpzqIYiM/r8v-3W1X5vcJ
 * for the idea on how to dynamically invoke the ng-repeat directive.
 *
 * I borrowed a couple of lines and a few attribute names from the AngularUI Bootstrap project:
 * https://github.com/angular-ui/bootstrap/blob/master/src/pagination/pagination.js
 *
 * Copyright 2014 Michael Bromley <michael@michaelbromley.co.uk>
 */

(function () {

    /**
     * Config
     */
    var moduleName = 'angularUtils.directives.dirPagination';
    var DEFAULT_ID = '__default';

    /**
     * Module
     */
    angular.module(moduleName, [])
        .directive('dirPaginate', ['$compile', '$parse', 'paginationService', dirPaginateDirective])
        .directive('dirPaginateNoCompile', noCompileDirective)
        .directive('dirPaginationControls', ['paginationService', 'paginationTemplate', dirPaginationControlsDirective])
        .filter('itemsPerPage', ['paginationService', itemsPerPageFilter])
        .service('paginationService', paginationService)
        .provider('paginationTemplate', paginationTemplateProvider)
        .run(['$templateCache', dirPaginationControlsTemplateInstaller]);

    function dirPaginateDirective($compile, $parse, paginationService) {

        return {
            terminal: true,
            multiElement: true,
            priority: 100,
            compile: dirPaginationCompileFn
        };

        function dirPaginationCompileFn(tElement, tAttrs) {

            var expression = tAttrs.dirPaginate;
            // regex taken directly from https://github.com/angular/angular.js/blob/v1.4.x/src/ng/directive/ngRepeat.js#L339
            var match = expression.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);

            var filterPattern = /\|\s*itemsPerPage\s*:\s*(.*\(\s*\w*\)|([^\)]*?(?=\s+as\s+))|[^\)]*)/;
            if (match[2].match(filterPattern) === null) {
                throw 'pagination directive: the \'itemsPerPage\' filter must be set.';
            }
            var itemsPerPageFilterRemoved = match[2].replace(filterPattern, '');
            var collectionGetter = $parse(itemsPerPageFilterRemoved);

            addNoCompileAttributes(tElement);

            // If any value is specified for paginationId, we register the un-evaluated expression at this stage for the benefit of any
            // dir-pagination-controls directives that may be looking for this ID.
            var rawId = tAttrs.paginationId || DEFAULT_ID;
            paginationService.registerInstance(rawId);

            return function dirPaginationLinkFn(scope, element, attrs) {

                // Now that we have access to the `scope` we can interpolate any expression given in the paginationId attribute and
                // potentially register a new ID if it evaluates to a different value than the rawId.
                var paginationId = $parse(attrs.paginationId)(scope) || attrs.paginationId || DEFAULT_ID;
                // In case rawId != paginationId we deregister using rawId for the sake of general cleanliness
                // before registering using paginationId
                paginationService.deregisterInstance(rawId);
                paginationService.registerInstance(paginationId);

                var repeatExpression = getRepeatExpression(expression, paginationId);
                addNgRepeatToElement(element, attrs, repeatExpression);

                removeTemporaryAttributes(element);
                var compiled = $compile(element);

                var currentPageGetter = makeCurrentPageGetterFn(scope, attrs, paginationId);
                paginationService.setCurrentPageParser(paginationId, currentPageGetter, scope);

                if (typeof attrs.totalItems !== 'undefined') {
                    paginationService.setAsyncModeTrue(paginationId);
                    scope.$watch(function () {
                        return $parse(attrs.totalItems)(scope);
                    }, function (result) {
                        if (0 <= result) {
                            paginationService.setCollectionLength(paginationId, result);
                        }
                    });
                } else {
                    paginationService.setAsyncModeFalse(paginationId);
                    scope.$watchCollection(function () {
                        return collectionGetter(scope);
                    }, function (collection) {
                        if (collection) {
                            var collectionLength = (collection instanceof Array) ? collection.length : Object.keys(collection).length;
                            paginationService.setCollectionLength(paginationId, collectionLength);
                        }
                    });
                }

                // Delegate to the link function returned by the new compilation of the ng-repeat
                compiled(scope);

                // When the scope is destroyed, we make sure to remove the reference to it in paginationService
                // so that it can be properly garbage collected
                scope.$on('$destroy', function destroyDirPagination() {
                    paginationService.deregisterInstance(paginationId);
                });
            };
        }

        /**
         * If a pagination id has been specified, we need to check that it is present as the second argument passed to
         * the itemsPerPage filter. If it is not there, we add it and return the modified expression.
         *
         * @param expression
         * @param paginationId
         * @returns {*}
         */
        function getRepeatExpression(expression, paginationId) {
            var repeatExpression,
                idDefinedInFilter = !!expression.match(/(\|\s*itemsPerPage\s*:[^|]*:[^|]*)/);

            if (paginationId !== DEFAULT_ID && !idDefinedInFilter) {
                repeatExpression = expression.replace(/(\|\s*itemsPerPage\s*:\s*[^|\s]*)/, "$1 : '" + paginationId + "'");
            } else {
                repeatExpression = expression;
            }

            return repeatExpression;
        }

        /**
         * Adds the ng-repeat directive to the element. In the case of multi-element (-start, -end) it adds the
         * appropriate multi-element ng-repeat to the first and last element in the range.
         * @param element
         * @param attrs
         * @param repeatExpression
         */
        function addNgRepeatToElement(element, attrs, repeatExpression) {
            if (element[0].hasAttribute('dir-paginate-start') || element[0].hasAttribute('data-dir-paginate-start')) {
                // using multiElement mode (dir-paginate-start, dir-paginate-end)
                attrs.$set('ngRepeatStart', repeatExpression);
                element.eq(element.length - 1).attr('ng-repeat-end', true);
            } else {
                attrs.$set('ngRepeat', repeatExpression);
            }
        }

        /**
         * Adds the dir-paginate-no-compile directive to each element in the tElement range.
         * @param tElement
         */
        function addNoCompileAttributes(tElement) {
            angular.forEach(tElement, function (el) {
                if (el.nodeType === 1) {
                    angular.element(el).attr('dir-paginate-no-compile', true);
                }
            });
        }

        /**
         * Removes the variations on dir-paginate (data-, -start, -end) and the dir-paginate-no-compile directives.
         * @param element
         */
        function removeTemporaryAttributes(element) {
            angular.forEach(element, function (el) {
                if (el.nodeType === 1) {
                    angular.element(el).removeAttr('dir-paginate-no-compile');
                }
            });
            element.eq(0).removeAttr('dir-paginate-start').removeAttr('dir-paginate').removeAttr('data-dir-paginate-start').removeAttr('data-dir-paginate');
            element.eq(element.length - 1).removeAttr('dir-paginate-end').removeAttr('data-dir-paginate-end');
        }

        /**
         * Creates a getter function for the current-page attribute, using the expression provided or a default value if
         * no current-page expression was specified.
         *
         * @param scope
         * @param attrs
         * @param paginationId
         * @returns {*}
         */
        function makeCurrentPageGetterFn(scope, attrs, paginationId) {
            var currentPageGetter;
            if (attrs.currentPage) {
                currentPageGetter = $parse(attrs.currentPage);
            } else {
                // If the current-page attribute was not set, we'll make our own.
                // Replace any non-alphanumeric characters which might confuse
                // the $parse service and give unexpected results.
                // See https://github.com/michaelbromley/angularUtils/issues/233
                var defaultCurrentPage = (paginationId + '__currentPage').replace(/\W/g, '_');
                scope[defaultCurrentPage] = 1;
                currentPageGetter = $parse(defaultCurrentPage);
            }
            return currentPageGetter;
        }
    }

    /**
     * This is a helper directive that allows correct compilation when in multi-element mode (ie dir-paginate-start, dir-paginate-end).
     * It is dynamically added to all elements in the dir-paginate compile function, and it prevents further compilation of
     * any inner directives. It is then removed in the link function, and all inner directives are then manually compiled.
     */
    function noCompileDirective() {
        return {
            priority: 5000,
            terminal: true
        };
    }

    function dirPaginationControlsTemplateInstaller($templateCache) {
        $templateCache.put('angularUtils.directives.dirPagination.template', '<ul class="pagination" ng-if="1 < pages.length || !autoHide"><li ng-if="boundaryLinks" ng-class="{ disabled : pagination.current == 1 }"><a href="" ng-click="setCurrent(1)">&laquo;</a></li><li ng-if="directionLinks" ng-class="{ disabled : pagination.current == 1 }"><a href="" ng-click="setCurrent(pagination.current - 1)">&lsaquo;</a></li><li ng-repeat="pageNumber in pages track by tracker(pageNumber, $index)" ng-class="{ active : pagination.current == pageNumber, disabled : pageNumber == \'...\' || ( ! autoHide && pages.length === 1 ) }"><a href="" ng-click="setCurrent(pageNumber)">{{ pageNumber }}</a></li><li ng-if="directionLinks" ng-class="{ disabled : pagination.current == pagination.last }"><a href="" ng-click="setCurrent(pagination.current + 1)">&rsaquo;</a></li><li ng-if="boundaryLinks"  ng-class="{ disabled : pagination.current == pagination.last }"><a href="" ng-click="setCurrent(pagination.last)">&raquo;</a></li></ul>');
    }

    function dirPaginationControlsDirective(paginationService, paginationTemplate) {

        var numberRegex = /^\d+$/;

        var DDO = {
            restrict: 'AE',
            scope: {
                maxSize: '=?',
                onPageChange: '&?',
                paginationId: '=?',
                autoHide: '=?'
            },
            link: dirPaginationControlsLinkFn
        };

        // We need to check the paginationTemplate service to see whether a template path or
        // string has been specified, and add the `template` or `templateUrl` property to
        // the DDO as appropriate. The order of priority to decide which template to use is
        // (highest priority first):
        // 1. paginationTemplate.getString()
        // 2. attrs.templateUrl
        // 3. paginationTemplate.getPath()
        var templateString = paginationTemplate.getString();
        if (templateString !== undefined) {
            DDO.template = templateString;
        } else {
            DDO.templateUrl = function (elem, attrs) {
                return attrs.templateUrl || paginationTemplate.getPath();
            };
        }
        return DDO;

        function dirPaginationControlsLinkFn(scope, element, attrs) {

            // rawId is the un-interpolated value of the pagination-id attribute. This is only important when the corresponding dir-paginate directive has
            // not yet been linked (e.g. if it is inside an ng-if block), and in that case it prevents this controls directive from assuming that there is
            // no corresponding dir-paginate directive and wrongly throwing an exception.
            var rawId = attrs.paginationId || DEFAULT_ID;
            var paginationId = scope.paginationId || attrs.paginationId || DEFAULT_ID;

            if (!paginationService.isRegistered(paginationId) && !paginationService.isRegistered(rawId)) {
                var idMessage = (paginationId !== DEFAULT_ID) ? ' (id: ' + paginationId + ') ' : ' ';
                if (window.console) {
                    console.warn('Pagination directive: the pagination controls' + idMessage + 'cannot be used without the corresponding pagination directive, which was not found at link time.');
                }
            }

            if (!scope.maxSize) { scope.maxSize = 9; }
            scope.autoHide = scope.autoHide === undefined ? true : scope.autoHide;
            scope.directionLinks = angular.isDefined(attrs.directionLinks) ? scope.$parent.$eval(attrs.directionLinks) : true;
            scope.boundaryLinks = angular.isDefined(attrs.boundaryLinks) ? scope.$parent.$eval(attrs.boundaryLinks) : false;

            var paginationRange = Math.max(scope.maxSize, 5);
            scope.pages = [];
            scope.pagination = {
                last: 1,
                current: 1
            };
            scope.range = {
                lower: 1,
                upper: 1,
                total: 1
            };

            scope.$watch('maxSize', function (val) {
                if (val) {
                    paginationRange = Math.max(scope.maxSize, 5);
                    generatePagination();
                }
            });

            scope.$watch(function () {
                if (paginationService.isRegistered(paginationId)) {
                    return (paginationService.getCollectionLength(paginationId) + 1) * paginationService.getItemsPerPage(paginationId);
                }
            }, function (length) {
                if (0 < length) {
                    generatePagination();
                }
            });

            scope.$watch(function () {
                if (paginationService.isRegistered(paginationId)) {
                    return (paginationService.getItemsPerPage(paginationId));
                }
            }, function (current, previous) {
                if (current != previous && typeof previous !== 'undefined') {
                    goToPage(scope.pagination.current);
                }
            });

            scope.$watch(function () {
                if (paginationService.isRegistered(paginationId)) {
                    return paginationService.getCurrentPage(paginationId);
                }
            }, function (currentPage, previousPage) {
                if (currentPage != previousPage) {
                    goToPage(currentPage);
                }
            });

            scope.setCurrent = function (num) {
                if (paginationService.isRegistered(paginationId) && isValidPageNumber(num)) {
                    num = parseInt(num, 10);
                    paginationService.setCurrentPage(paginationId, num);
                }
            };

            /**
             * Custom "track by" function which allows for duplicate "..." entries on long lists,
             * yet fixes the problem of wrongly-highlighted links which happens when using
             * "track by $index" - see https://github.com/michaelbromley/angularUtils/issues/153
             * @param id
             * @param index
             * @returns {string}
             */
            scope.tracker = function (id, index) {
                return id + '_' + index;
            };

            function goToPage(num) {
                if (paginationService.isRegistered(paginationId) && isValidPageNumber(num)) {
                    var oldPageNumber = scope.pagination.current;

                    scope.pages = generatePagesArray(num, paginationService.getCollectionLength(paginationId), paginationService.getItemsPerPage(paginationId), paginationRange);
                    scope.pagination.current = num;
                    updateRangeValues();

                    // if a callback has been set, then call it with the page number as the first argument
                    // and the previous page number as a second argument
                    if (scope.onPageChange) {
                        scope.onPageChange({
                            newPageNumber: num,
                            oldPageNumber: oldPageNumber
                        });
                    }
                }
            }

            function generatePagination() {
                if (paginationService.isRegistered(paginationId)) {
                    var page = parseInt(paginationService.getCurrentPage(paginationId)) || 1;
                    scope.pages = generatePagesArray(page, paginationService.getCollectionLength(paginationId), paginationService.getItemsPerPage(paginationId), paginationRange);
                    scope.pagination.current = page;
                    scope.pagination.last = scope.pages[scope.pages.length - 1];
                    if (scope.pagination.last < scope.pagination.current) {
                        scope.setCurrent(scope.pagination.last);
                    } else {
                        updateRangeValues();
                    }
                }
            }

            /**
             * This function updates the values (lower, upper, total) of the `scope.range` object, which can be used in the pagination
             * template to display the current page range, e.g. "showing 21 - 40 of 144 results";
             */
            function updateRangeValues() {
                if (paginationService.isRegistered(paginationId)) {
                    var currentPage = paginationService.getCurrentPage(paginationId),
                        itemsPerPage = paginationService.getItemsPerPage(paginationId),
                        totalItems = paginationService.getCollectionLength(paginationId);

                    scope.range.lower = (currentPage - 1) * itemsPerPage + 1;
                    scope.range.upper = Math.min(currentPage * itemsPerPage, totalItems);
                    scope.range.total = totalItems;
                }
            }
            function isValidPageNumber(num) {
                return (numberRegex.test(num) && (0 < num && num <= scope.pagination.last));
            }
        }

        /**
         * Generate an array of page numbers (or the '...' string) which is used in an ng-repeat to generate the
         * links used in pagination
         *
         * @param currentPage
         * @param rowsPerPage
         * @param paginationRange
         * @param collectionLength
         * @returns {Array}
         */
        function generatePagesArray(currentPage, collectionLength, rowsPerPage, paginationRange) {
            var pages = [];
            var totalPages = Math.ceil(collectionLength / rowsPerPage);
            var halfWay = Math.ceil(paginationRange / 2);
            var position;

            if (currentPage <= halfWay) {
                position = 'start';
            } else if (totalPages - halfWay < currentPage) {
                position = 'end';
            } else {
                position = 'middle';
            }

            var ellipsesNeeded = paginationRange < totalPages;
            var i = 1;
            while (i <= totalPages && i <= paginationRange) {
                var pageNumber = calculatePageNumber(i, currentPage, paginationRange, totalPages);

                var openingEllipsesNeeded = (i === 2 && (position === 'middle' || position === 'end'));
                var closingEllipsesNeeded = (i === paginationRange - 1 && (position === 'middle' || position === 'start'));
                if (ellipsesNeeded && (openingEllipsesNeeded || closingEllipsesNeeded)) {
                    pages.push('...');
                } else {
                    pages.push(pageNumber);
                }
                i++;
            }
            return pages;
        }

        /**
         * Given the position in the sequence of pagination links [i], figure out what page number corresponds to that position.
         *
         * @param i
         * @param currentPage
         * @param paginationRange
         * @param totalPages
         * @returns {*}
         */
        function calculatePageNumber(i, currentPage, paginationRange, totalPages) {
            var halfWay = Math.ceil(paginationRange / 2);
            if (i === paginationRange) {
                return totalPages;
            } else if (i === 1) {
                return i;
            } else if (paginationRange < totalPages) {
                if (totalPages - halfWay < currentPage) {
                    return totalPages - paginationRange + i;
                } else if (halfWay < currentPage) {
                    return currentPage - halfWay + i;
                } else {
                    return i;
                }
            } else {
                return i;
            }
        }
    }

    /**
     * This filter slices the collection into pages based on the current page number and number of items per page.
     * @param paginationService
     * @returns {Function}
     */
    function itemsPerPageFilter(paginationService) {

        return function (collection, itemsPerPage, paginationId) {
            if (typeof (paginationId) === 'undefined') {
                paginationId = DEFAULT_ID;
            }
            if (!paginationService.isRegistered(paginationId)) {
                throw 'pagination directive: the itemsPerPage id argument (id: ' + paginationId + ') does not match a registered pagination-id.';
            }
            var end;
            var start;
            if (angular.isObject(collection)) {
                itemsPerPage = parseInt(itemsPerPage) || 9999999999;
                if (paginationService.isAsyncMode(paginationId)) {
                    start = 0;
                } else {
                    start = (paginationService.getCurrentPage(paginationId) - 1) * itemsPerPage;
                }
                end = start + itemsPerPage;
                paginationService.setItemsPerPage(paginationId, itemsPerPage);

                if (collection instanceof Array) {
                    // the array just needs to be sliced
                    return collection.slice(start, end);
                } else {
                    // in the case of an object, we need to get an array of keys, slice that, then map back to
                    // the original object.
                    var slicedObject = {};
                    angular.forEach(keys(collection).slice(start, end), function (key) {
                        slicedObject[key] = collection[key];
                    });
                    return slicedObject;
                }
            } else {
                return collection;
            }
        };
    }

    /**
     * Shim for the Object.keys() method which does not exist in IE < 9
     * @param obj
     * @returns {Array}
     */
    function keys(obj) {
        if (!Object.keys) {
            var objKeys = [];
            for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                    objKeys.push(i);
                }
            }
            return objKeys;
        } else {
            return Object.keys(obj);
        }
    }

    /**
     * This service allows the various parts of the module to communicate and stay in sync.
     */
    function paginationService() {

        var instances = {};
        var lastRegisteredInstance;

        this.registerInstance = function (instanceId) {
            if (typeof instances[instanceId] === 'undefined') {
                instances[instanceId] = {
                    asyncMode: false
                };
                lastRegisteredInstance = instanceId;
            }
        };

        this.deregisterInstance = function (instanceId) {
            delete instances[instanceId];
        };

        this.isRegistered = function (instanceId) {
            return (typeof instances[instanceId] !== 'undefined');
        };

        this.getLastInstanceId = function () {
            return lastRegisteredInstance;
        };

        this.setCurrentPageParser = function (instanceId, val, scope) {
            instances[instanceId].currentPageParser = val;
            instances[instanceId].context = scope;
        };
        this.setCurrentPage = function (instanceId, val) {
            instances[instanceId].currentPageParser.assign(instances[instanceId].context, val);
        };
        this.getCurrentPage = function (instanceId) {
            var parser = instances[instanceId].currentPageParser;
            return parser ? parser(instances[instanceId].context) : 1;
        };

        this.setItemsPerPage = function (instanceId, val) {
            instances[instanceId].itemsPerPage = val;
        };
        this.getItemsPerPage = function (instanceId) {
            return instances[instanceId].itemsPerPage;
        };

        this.setCollectionLength = function (instanceId, val) {
            instances[instanceId].collectionLength = val;
        };
        this.getCollectionLength = function (instanceId) {
            return instances[instanceId].collectionLength;
        };

        this.setAsyncModeTrue = function (instanceId) {
            instances[instanceId].asyncMode = true;
        };

        this.setAsyncModeFalse = function (instanceId) {
            instances[instanceId].asyncMode = false;
        };

        this.isAsyncMode = function (instanceId) {
            return instances[instanceId].asyncMode;
        };
    }

    /**
     * This provider allows global configuration of the template path used by the dir-pagination-controls directive.
     */
    function paginationTemplateProvider() {

        var templatePath = 'angularUtils.directives.dirPagination.template';
        var templateString;

        /**
         * Set a templateUrl to be used by all instances of <dir-pagination-controls>
         * @param {String} path
         */
        this.setPath = function (path) {
            templatePath = path;
        };

        /**
         * Set a string of HTML to be used as a template by all instances
         * of <dir-pagination-controls>. If both a path *and* a string have been set,
         * the string takes precedence.
         * @param {String} str
         */
        this.setString = function (str) {
            templateString = str;
        };

        this.$get = function () {
            return {
                getPath: function () {
                    return templatePath;
                },
                getString: function () {
                    return templateString;
                }
            };
        };
    }
})();

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
            getDestinationTerminals: getDestinationTerminals,
            loadBusForDay: loadBusForDay,
            signIn: signIn,
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
            getTripByRoute:getTripByRoute
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

            return $http.get(baseUrl + 'Data/getRoutes').then(function (d) {
                console.log(d);
                terminals = d.data.Object;
                console.log(terminals);

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

                console.log(d.data.Object);

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
                return d.data;
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
            var resonse = {};

            return $http.get(baseUrl + 'Data/getBookingDetails?refcode=' + refcode).then(function (d) {
   
                return d.data.Item1;
            }, function (err) {

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

                swal("error occured on server, pls try again", "", "error");
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
(function() {
    'use strict';

    var app = angular.module('gigm');

    app.directive('ccImgPerson', ['config', function (config) {
        //Usage:
        //<img data-cc-img-person="{{s.speaker.imageSource}}"/>
        var basePath = config.imageSettings.imageBasePath;
        var unknownImage = config.imageSettings.unknownPersonImageSource;
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            attrs.$observe('ccImgPerson', function(value) {
                value = basePath + (value || unknownImage);
                attrs.$set('src', value);
            });
        }
    }]);


    app.directive('ccSidebar', function () {
        // Opens and clsoes the sidebar menu.
        // Usage:
        //  <div data-cc-sidebar>
        // Creates:
        //  <div data-cc-sidebar class="sidebar">
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            var $sidebarInner = element.find('.sidebar-inner');
            var $dropdownElement = element.find('.sidebar-dropdown a');
            element.addClass('sidebar');
            $dropdownElement.click(dropdown);

            function dropdown(e) {
                var dropClass = 'dropy';
                e.preventDefault();
                if (!$dropdownElement.hasClass(dropClass)) {
                    hideAllSidebars();
                    $sidebarInner.slideDown(350);
                    $dropdownElement.addClass(dropClass);
                } else if ($dropdownElement.hasClass(dropClass)) {
                    $dropdownElement.removeClass(dropClass);
                    $sidebarInner.slideUp(350);
                }

                function hideAllSidebars() {
                    $sidebarInner.slideUp(350);
                    $('.sidebar-dropdown a').removeClass(dropClass);
                }
            }
        }
    });


    app.directive('ccWidgetClose', function () {
        // Usage:
        // <a data-cc-widget-close></a>
        // Creates:
        // <a data-cc-widget-close="" href="#" class="wclose">
        //     <i class="fa fa-remove"></i>
        // </a>
        var directive = {
            link: link,
            template: '<i class="fa fa-remove"></i>',
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            attrs.$set('href', '#');
            attrs.$set('wclose');
            element.click(close);

            function close(e) {
                e.preventDefault();
                element.parent().parent().parent().hide(100);
            }
        }
    });

    app.directive('ccWidgetMinimize', function () {
        // Usage:
        // <a data-cc-widget-minimize></a>
        // Creates:
        // <a data-cc-widget-minimize="" href="#"><i class="fa fa-chevron-up"></i></a>
        var directive = {
            link: link,
            template: '<i class="fa fa-chevron-up"></i>',
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            //$('body').on('click', '.widget .wminimize', minimize);
            attrs.$set('href', '#');
            attrs.$set('wminimize');
            element.click(minimize);

            function minimize(e) {
                e.preventDefault();
                var $wcontent = element.parent().parent().next('.widget-content');
                var iElement = element.children('i');
                if ($wcontent.is(':visible')) {
                    iElement.removeClass('fa fa-chevron-up');
                    iElement.addClass('fa fa-chevron-down');
                } else {
                    iElement.removeClass('fa fa-chevron-down');
                    iElement.addClass('fa fa-chevron-up');
                }
                $wcontent.toggle(500);
            }
        }
    });

    app.directive('ccScrollToTop', ['$window',
        // Usage:
        // <span data-cc-scroll-to-top></span>
        // Creates:
        // <span data-cc-scroll-to-top="" class="totop">
        //      <a href="#"><i class="fa fa-chevron-up"></i></a>
        // </span>
        function ($window) {
            var directive = {
                link: link,
                template: '<a href="#"><i class="fa fa-chevron-up"></i></a>',
                restrict: 'A'
            };
            return directive;

            function link(scope, element, attrs) {
                var $win = $($window);
                element.addClass('totop');
                $win.scroll(toggleIcon);

                element.find('a').click(function (e) {
                    e.preventDefault();
                    // Learning Point: $anchorScroll works, but no animation
                    //$anchorScroll();
                    $('body').animate({ scrollTop: 0 }, 500);
                });

                function toggleIcon() {
                    $win.scrollTop() > 300 ? element.slideDown(): element.slideUp();
                }
            }
        }
    ]);

    app.directive('ccSpinner', ['$window', function ($window) {
        // Description:
        //  Creates a new Spinner and sets its options
        // Usage:
        //  <div data-cc-spinner="vm.spinnerOptions"></div>
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            scope.spinner = null;
            scope.$watch(attrs.ccSpinner, function (options) {
                if (scope.spinner) {
                    scope.spinner.stop();
                }
                scope.spinner = new $window.Spinner(options);
                scope.spinner.spin(element[0]);
            }, true);
        }
    }]);

    app.directive('ccWidgetHeader', function() {
        //Usage:
        //<div data-cc-widget-header title="vm.map.title"></div>
        var directive = {
            link: link,
            scope: {
                'title': '@',
                'subtitle': '@',
                'rightText': '@',
                'allowCollapse': '@'
            },
            templateUrl: '/app/layout/widgetheader.html',
            restrict: 'A',
        };
        return directive;

        function link(scope, element, attrs) {
            attrs.$set('class', 'widget-head');
        }
    });
})();
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
   "Terminal":"Yaba (Central Park) Terminal",
   "Address": "Yaba Central Park, Opp. Psychiatric Hospital, Yaba, Lagos.",
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
   "Terminal":"Kaduna Terminal",
   "Address": "Lagos garage, Mando, Kaduna.",
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








(function () {
    'use strict';
    var controllerId = 'booking';
    angular.module('gigm').controller(controllerId,
			['$route', '$localstorage',  '$scope','common','datacontext', booking]);

   
    //location.reload();

    function booking($route, $localstorage,$scope, common, datacontext) {
      
        var vm = this;

        vm.departureTerminals = [];

        vm.arrivalTerminals = [];

        vm.booking = {};

        vm.loading = false;
        vm.booking.TripType = 0;
        vm.isLoggedIn = false;

        activate();

        function activate() {
            var promises = [loadDepartures()];

            try {
                var user = $localstorage.getObject('user');
                vm.isLoggedIn = user.Item1.Object.IsActive ? true : false;

               // console.log(vm.isLoggedIn);
            } catch (e) {
               // console.log(e);
                vm.isLoggedIn = false;
            }
        }

       
        vm.title = 'Boking';

        function loadDepartures() {
            vm.loading = true;
            datacontext.getDepartureTerminals().then(function (resp) {
                //console.log(resp);

                try {
                    vm.departureTerminals = resp.Items;
                }catch(exception){
                    swal("pls try again later!");
                }

               
               // console.log(vm.departureTerminals[0]);
                vm.loading = false;
            }, function (err) {
                console.log(err);
                vm.loading = false;
            });
        }

        function loadArrivals(terminalId) {
            vm.loading = true; 
            datacontext.getDestinationTerminals(terminalId).then(function (resp) {
               // console.log("arrivals ",resp);
                vm.arrivalTerminals = resp;
                vm.loading = false;
               
            }, function (err) {
                console.log(err);
                vm.loading = false;
            });
        }

        vm.onDepartureSelected = function (item, model) {
             loadArrivals(model.TerminalId);
        }

      
   
        this.initMdb = function () {
            $(function () {
               $("#week2").prop("checked", true);
               $("#week2").attr('checked', 'checked');
               document.getElementById('hide').style.display = 'none';
               // document.getElementById('hide').style.display = 'block';
            })
        }


        vm.data = {
            availableOptions: [
              { id: '1', name: '1' },
              { id: '2', name: '2' },
              { id: '3', name: '3' },
              { id: '4', name: '4' },
              { id: '5', name: '5' },
              { id: '6', name: '6' },
              { id: '7', name: '7' },
              { id: '8', name: '8' },
              { id: '9', name: '9' },
              { id: '10', name: '10' },
              { id: '11', name: '11' },
              { id: '12', name: '12' },
              { id: '13', name: '13' }
            ],
            childOptions: [
              { id: '0', name: '0' },
              { id: '1', name: '1' },
              { id: '2', name: '2' },
              { id: '3', name: '3' }
            ],
            selectedOption: { id: '1', name: '1' }, //This sets the default value of the select in the ui

            selectedOption_: { id: '0', name: '0' } 
        };

        vm.next = function () {
            console.log($('#mySelect').val());
            //console.log(vm.data.selectedOption);

            var result = {};

            //console.log($('#date-picker-example').val());
            try {
                result = {
                    DepartureDate: $('#date-departure').val(),
                    ReturnDate: $('#date-arrival').val(),
                    NumberOfAdults: $('#mySelect').val() == 0 ? 1 : $('#mySelect').val(),
                    NumberOfChildren:  $('#mySelect1').val() || 0 ,
                    DepartureTerminalId: vm.terminal.selected.TerminalId,
                    DestinationTerminalId: vm.terminal.selected2.TerminalId,
                    TripType: +vm.booking.TripType
                }
              /* console.log((moment($('#date-departure').val()).isAfter(monent($('#date-arrival').val()))));
                if (moment($('#date-departure').val()).isAfter(monent($('#date-arrival').val()))) {

                }*/

                if ((+result.NumberOfAdults + +result.NumberOfChildren) > 13   ) {
                    swal("You cannot select more than 13 passengers in total", "", "error");

                    return;
                }

                if (!result.DepartureDate) {
                    swal("Please select depature date", "", "error");
                    return;
                }

                if (!result.ReturnDate && vm.TripType == 1) {
                    swal("Please select return date", "", "error");
                    return;
                }
            } catch (e) {
                console.log(e);
                swal("Error!", "Please select all fields!", "error");
                //swal({ text: "Please select all fields", title: "Error", icon:"error" });
                return true;
            }

           // debugger;
            if (result.TripType == 1) {
                if (!result.DepartureDate || !result.ReturnDate || !result.DepartureTerminalId || !result.DestinationTerminalId) {
                    swal("Please select all fields!", "", "error");
                    return;
                }

                if (common.isAfter(result.DepartureDate, result.ReturnDate) || result.DepartureDate == result.ReturnDate) {
                    swal("Departure date must be before the arrival date!", "", "error");
                    return;
                }
            }else{
                if (!result.DepartureDate || !result.DepartureTerminalId || !result.DestinationTerminalId) {
                    swal("Error!", "Please select all fields!", "error");
                    return;
                }
            }


            result.DepartureDate = moment(result.DepartureDate).format("MMMM DD, YYYY");

            if (result.ReturnDate) {
                result.ReturnDate = moment(result.ReturnDate).format("MMMM DD, YYYY");
            }

         
            vm.loading = true;
           
           // console.log("num", result.NumberOfChildren);
            datacontext.loadBusForDay(result).then(function (d) {
                
                vm.loading = false;
                console.log(+result.NumberOfAdults + +result.NumberOfChildren);
        
                $localstorage.set("max-pax", +result.NumberOfChildren + +result.NumberOfAdults);
                $localstorage.set("adults", +result.NumberOfAdults);
                $localstorage.set("children", +result.NumberOfChildren);
 
              //  console.log("res", d);

                $localstorage.setObject("bus-data", d);

                try {
                    if (d.Departures.length < 1) {
                        swal("Not Available!", "No bus available for the selected route, please chose another route or try again later", "info");
                    }
                } catch (e) {
                    swal("Not Available!", "No bus available for the selected route, please chose another route or try again later", "info");

                    return;
                }
                window.location.href = 'SelectBus';
          
            }, function (err) {
                console.log(err);
                vm.loading = false;
            });
        }
        this.initMdb();

        $scope.$watch('vm.data.selectedOption', function (newVal) {
            console.log(newVal.id);
        });


        vm.indexChanged = function () {

            var childOptions = [
                { id: '0', name: '0' },
                { id: '1', name: '1' },
                { id: '2', name: '2' },
                { id: '3', name: '3' }
            ];

            var selectedValue = $("#mySelect").val();

            console.log("changed...", childOptions.indexOf( getIndexInArray(childOptions, '2')));
            if (+selectedValue < 11 && vm.data.childOptions.length < 3) {
                vm.data.childOptions = childOptions;
            }

            if (+selectedValue == 11 && vm.data.childOptions.length < 3) {
             //   vm.data.childOptions.push({ id: "1", value: "1" });
             //   vm.data.childOptions.push({ id: "2", value: "2" });

               // vm.data.childOptions = childOptions;
            }

            if (+selectedValue == 12 && vm.data.childOptions.length < 3) {
                //vm.data.childOptions.push({ id: "2", value: "2" });
               // vm.data.childOptions.push({ id: "2", value: "2" });
               // vm.data.childOptions = childOptions;
            }


            if (+selectedValue == 13 && vm.data.childOptions.length < 3) {
               // vm.data.childOptions.push({ id: "1", value: "1" });
               // vm.data.childOptions.push({ id: "2", value: "2" });
               // vm.data.childOptions = childOptions;
            }


        }


        function getIndexInArray(list, id) {
            var index = list.where(x => x.id == id);
            console.log("index",index);

            var item = {};
            item.isFound = false;



            $.grep(list, function (e) {
                if (e.id == id) {
                    console.log(e);
                    item.obj = e;
                    item.isFound = true;
                    return e;
                }
            });
            console.log(item.isFound);

            console.log(item.obj);
            return item;
        }

        $("#mySelect").change(function (e) {
            var selectedValue = $("#mySelect").val();

            if (+selectedValue == 11) {


                if (getIndexInArray(vm.data.childOptions, '2').isFound) {
                    vm.data.childOptions.splice(vm.data.childOptions.indexOf(getIndexInArray(vm.data.childOptions, '2')), 1);
                }

                if (getIndexInArray(vm.data.childOptions, '3').isFound) {
                    vm.data.childOptions.splice(vm.data.childOptions.indexOf(getIndexInArray(vm.data.childOptions, '3')), 1);
                }

            } else if (+selectedValue == 12) {
               // vm.data.childOptions.splice(indexOf({id:"2", name: "2"}), 1);
               // vm.data.childOptions.splice(indexOf({id:"3", name: "3"}), 1);

                if (getIndexInArray(vm.data.childOptions, '2').isFound) {
                    vm.data.childOptions.splice(vm.data.childOptions.indexOf(getIndexInArray(vm.data.childOptions, '2')), 1);
                }

                if (getIndexInArray(vm.data.childOptions, '3').isFound) {
                    vm.data.childOptions.splice(vm.data.childOptions.indexOf(getIndexInArray(vm.data.childOptions, '3')), 1);
                }

              

            } else if (+selectedValue == 13) {

                if (getIndexInArray(vm.data.childOptions, '1').isFound) {
                    vm.data.childOptions.splice(vm.data.childOptions.indexOf(getIndexInArray(vm.data.childOptions, '1')), 1);
                }
              
                if (getIndexInArray(vm.data.childOptions, '2').isFound) {
                    vm.data.childOptions.splice(vm.data.childOptions.indexOf(getIndexInArray(vm.data.childOptions, '2')), 1);
                }

                if (getIndexInArray(vm.data.childOptions, '3').isFound) {
                    vm.data.childOptions.splice(vm.data.childOptions.indexOf(getIndexInArray(vm.data.childOptions, '3')), 1);
                }
            }

           


        });

        

    };


})();
(function () {
    'use strict'

    var controllerId = "bookonhold";

    angular.module('gigm').controller(controller, ['$localstorage', bookonhold]);

    function bookonhold() {

        var vm = this;

        vm.booking = {};

        activate();

        function activate() {
            try {
                vm.booking = $localStorage.getObject('psm');
                console.log(vm.booking);

                console.log(vm.booking.PaymentType);
            } catch (e) {
                console.log(e);
            }
        }
    }





})();

(function () {
    'use strict';
    var controllerId = 'select_bus';
    angular.module('gigm').controller(controllerId,
			['$localstorage','datacontext','common', select_bus]);

    function select_bus($localstorage, datacontext, common) {


        console.log("here");
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.title = 'Select Bus';

        vm.tripDetails = {};

        vm.maxPax = undefined;

        vm.showReturn = false;

        vm.isArrival = false;

        vm.user = {};

        var isUserLoggedIn = false;
         
        vm.memberDiscount = 0;
        activate();

        function activate() {
            // console.log($localstorage.getObject("bus-data"));
            vm.maxPax = $localstorage.get("max-pax");
            try {
                vm.tripDetails = $localstorage.getObject("bus-data");
            } catch (e) {
                vm.tripDetails = {};
            }


            $(function () {
                $('.panel').hide();
                $('#arrival').hide();
            });

            $localstorage.setObject('selectedDepartureTrip', {});
            $localstorage.setObject('selectedArrivalTrip', {});

        
            try {
                var user = $localstorage.getObject('user');
                vm.isLoggedIn = isUserLoggedIn = user.Item1.Object.IsActive ? true : false;
                //console.log(vm.isLoggedIn);
            } catch (e) {
                console.log(e);
                vm.isLoggedIn = false;
                vm.user = {};
            }
 
            console.log("max-pax", vm.maxPax);
        }


        $('#flip').click(function () {
            console.log("flipped!!");
            this.toggle();
        });

        vm.viewSeats = function (id, trip) {

           // console.log(trip);

            var num = trip == 0 ? id + 1 : id + 11;

            var panelId = "#panel" + num;
            console.log(panelId);
            //console.log("flipping", "panel" + num);
            $(panelId).toggle();
        }

        vm.continue = function (id, trip, type) {
   
            //console.log(id, trip);

            var selectedSeats = [];

            selectedSeats = $('#selected_seats' + id).val();


            if (selectedSeats == undefined || selectedSeats.length < 1) {
                var alert = "You must select " + vm.maxPax + " seat(s) to continue!";

                swal(alert, "", "error" );
                return;
            }



            selectedSeats = stringToArray(selectedSeats);

            //console.log(selectedSeats);

            //console.log($('#selected_seats' + id).val());

           // console.log(selectedSeats.length, vm.maxPax);


            if ( selectedSeats.length != +vm.maxPax) {
                var  alert = "You must select " + vm.maxPax + " seat(s) to continue!";

                swal( alert,"", "warning" );

                //console.log(swal);
            } else {
                //if trip has return
                if (vm.tripDetails.TripType == 1 && selectedSeats.length == +vm.maxPax) {
                    console.log(".............");
                    if (type == 0) {
                        console.log("departure");
                        var _data = {};
                        _data.trip = trip;
                        _data.seats = [] = selectedSeats;
                        $localstorage.setObject('selectedDepartureTrip', _data);
                        vm.showReturn = true;
                        $(".departure-trip").hide();
                        $(".arrival-trip").show();
                        $('#departure').hide(100);
                        $('#arrival').show();
                       // debugger;
                        vm.isArrival = true;
                        if (_data.trip.HasPickup) {

                            try {
                                datacontext.getPickupRoutes(_data.trip.TripId).then(function (d) {
                                   // console.log(d);
                                    vm.picupRoutes = d;
                                    _data.trip.pickup = d;

                                    $localstorage.setObject("selectedDepartureTrip", _data)

                                   // console.log("pickup", d);
                                    //sUserLoggedIn ? window.location.href = "Passenger" : $('#showModal').trigger('click');
                                }, function (err) {
                                   // isUserLoggedIn ? window.location.href = "Passenger" : $('#showModal').trigger('click');
                                    console.log(err);
                                });
                            } catch (ex) {
                                console.log(ex);
                            }
                          
                        } else {
                            // isUserLoggedIn ? window.location.href = "Passenger" : $('#showModal').trigger('click');
                        }
                        
                    }
                    else {
                       // console.log("arrival");

                       /// main - selected - departure 
                        var _data = {};
                        _data.trip = trip;
                        _data.seats = [] = selectedSeats;
                        $localstorage.setObject('selectedArrivalTrip', _data);
                        
                        if (_data.trip.HasPickup) {
                            try {
                                datacontext.getPickupRoutes(_data.trip.TripId).then(function (d) {
                                    console.log(d);
                                    vm.picupRoutes = d;
                                    _data.trip.pickup = d;

                                    $localstorage.setObject("selectedArrivalTrip", _data)

                                    console.log("pickup", d);
                                    isUserLoggedIn ? window.location.href = "Passenger" : $('#showModal').trigger('click');
                                }, function (err) {
                                    console.log(err);
                                    isUserLoggedIn ? window.location.href = "Passenger" : $('#showModal').trigger('click');
                                });
                               // isUserLoggedIn ? window.location.href = "Passenger" : $('#showModal').trigger('click');
                            } catch (ex) {
                                console.log(ex);
                            }
                        } else {
                            isUserLoggedIn ? window.location.href = "Passenger" : $('#showModal').trigger('click');
                        }
                       
                      //  window.location.href = 'Passenger';
                      
                    }
                } else {
                    if (vm.tripDetails.TripType == 0) {
                       // console.log("departure");
                        var _data = {};
                        _data.trip = trip;
                        _data.seats = [] = selectedSeats;
                        $localstorage.setObject('selectedDepartureTrip', _data);

                        if (_data.trip.HasPickup) {
                            try {
                                datacontext.getPickupRoutes(_data.trip.TripId).then(function (d) {
                                   // console.log(d);
                                    vm.picupRoutes = d;
                                    _data.trip.pickup = d;

                                    $localstorage.setObject("selectedDepartureTrip", _data);

                                    vm.showReturn = true;
                                    isUserLoggedIn ? window.location.href = "Passenger" : $('#showModal').trigger('click');

                                    console.log("pickup", d);
                                }, function (err) {
                                    console.log(err);
                                    vm.showReturn = true;
                                    isUserLoggedIn ? window.location.href = "Passenger" : $('#showModal').trigger('click');
                                });

                                // vm.showReturn = true;
                                //isUserLoggedIn ? window.location.href = "Passenger" : $('#showModal').trigger('click');
                            } catch (ex) {
                                console.log(ex);
                            }
                        } else {
                            isUserLoggedIn ? window.location.href = "Passenger" : $('#showModal').trigger('click');
                        }

                    }

                }

                vm.memberDiscount = getMemberDiscount();

             
            }

           
        }

        function stringToArray(stringArray) {
            console.log(stringArray.replace(/['"]+/g, ''));
            return stringArray.replace('[', '').replace(']', '').replace(/['"]+/g, '').split(',');
        }

        vm.logout = function () {
            $localstorage.setObject("user", {});
            window.location.href = "/";
        }


        vm.hasMoreLegRoom  = function(busname) {

            if (busname.toLowerCase() == 'sprinter' || busname.toLowerCase() == 'prime')
                return true;
            else
                return false;
        }

        function getMemberDiscount() {
            try {
                var departure = $localstorage.getObject('selectedDepartureTrip').trip;
                var maxPax = +$localstorage.get('max-pax');

                var memberDiscount = (departure.FarePrice - departure.MemberFare);


                console.log("discount", memberDiscount);

                console.log(departure.HasReturn);

                if (vm.tripDetails.TripType == 1 ) {
                    memberDiscount = memberDiscount * 2;
                    console.log("discount return", memberDiscount);
                }
                console.log("discount", memberDiscount);

                $("#discount").text(memberDiscount);
                return memberDiscount;

            } catch (ex) {
                console.log(ex);
            }
        }
    }
})();
(function () {

    'use strict';
    var controllerId = 'hire_bus';
    angular.module('gigm').controller(controllerId, ['common','datacontext','$localstorage', hire_bus])


    function hire_bus(common, datacontext, $localstorage) {

        var vm = this;

        vm.tripType = "1";

        vm.retain = "";
        vm.loading = false;
        vm.distance = "";
        vm.bussesForHire = {}; 

        vm.bussesForHireList = [];

        activate();

        function activate() {

            try {
                vm.bussesForHire = $localstorage.getObject('hireBusses');
                vm.distance = $localstorage.getObject('distance').distanceInKiloMeter;

                console.log(vm.bussesForHire);

            } catch (e) {
                console.log(e);
            }
        }

        vm.continue = function () {

            var result = {
                DestinationPoint: $('#HireDestinationPoint').val()  || "",
                DeparturePoint: $('#HireDeparturePoint').val() || "",
                DepartureDate: $('#hireDepart').val() || "",
                ReturnDate: $('#hireReturn').val() || "",
                TripType: vm.tripType,
                RetainOvernight: vm.retain == "yes" ? true : false
            }



           

            if (result.DepartureDate != "" && result.DepartureDate != undefined) {
                result.DepartureDate = moment(result.DepartureDate).format("MMMM DD, YYYY");
            }

            if (result.ReturnDate != "" && result.ReturnDate != undefined) {
                result.ReturnDate = moment(result.ReturnDate).format("YYYY-MM-DD");
            }

           

            var isAfter = common.isAfter(result.DepartureDate, result.ReturnDate);


            console.log("what?", isAfter);

            if (result.TripType == "1") {
                result.ReturnDate = "";
            } else {
                if (!result.ReturnDate) {
                    swal("Departure date must be selected for a round trip!", "", "error");
                    return;
                }
                if (isAfter) {
                    swal("Departure date must be before or equal to the arrival date!", "", "error");
                    return;
                }
            }

            vm.loading = true;

            $localstorage.setObject("hbr", result);

            datacontext.processGoogleMap(result).then(function (d) {
                vm.loading = false;
                if (d.data.Item3 && d.data.Item3.Object.Departures.length < 1) {
                    swal("No bus available for that at the moment, pls try again", "", "info");
                }
                else {
                    console.log(d.data);
                    $localstorage.setObject("hireBusses", d.data.Item3.Object);
                    $localstorage.setObject("distance", d.data.Item1);
                    window.location.href = d.data.Item2;
                }
            }, function (err) {
                console.log(err);
                swal("Error occured, pls try again", "", "error");
                vm.loading = false;
            });

            console.log(result);
        }

        vm.hireBus = function () {

            if (vm.bussesForHireList.length > 0) {
                $localstorage.setObject("selectedBusses", vm.bussesForHireList);
                window.location.href = "/pages/HirePassenger";
            } else {
                swal('A bus at least must be selected to proceed', '', 'info');
            }
        }



        vm.update = function (bus, index) {
            var result = {
                Id: bus.VehicleModelId,
                Quantity: $('#quantity' + (+index + 1)).val(),
                Price: bus.FarePrice,
                BusName: bus.VehicleModelName,
                SleepOverPrice: bus.SleepOverPrice
            }

            var isFound = false;

            if (result.Quantity > 0) {
                vm.bussesForHireList.find(function (obj) {
                    if (obj.Id == result.Id) {
                        console.log(obj);
                        isFound = true;
                        return;
                    }
                });


                if (!isFound) {
                    vm.bussesForHireList.add(result);
                }

              
                console.log(vm.bussesForHireList);
            }


        }


        
        $(function () {
            $('#hireArrive').hide();
        });
    }

})();
(function () {
    'use strict'
    var controllerId = "busBookerPay";

    angular.module('gigm').controller(controllerId, ['$q', '$timeout','$scope', '$localstorage', 'datacontext', busBookerPay]);


    function busBookerPay($q, $timeout, $scope, $localstorage, datacontext) {

        var vm = this;

        vm.distance = 0;
        vm.hireRequest = {};
        vm.busPrototype = {};
        vm.hireBusses = {};
        vm.selectedBusses = [];
        vm.fares = {};
        vm.fares.total = 0;
        vm.fares.sleepOver = 0;
        vm.fares.priceWithoutSleepOver = 0;


        vm.user = {};


        activate();


        vm.gender = {
            availableOptions: [
                { id: '0', name: 'Male' },
                { id: '1', name: 'Female' },
            ],

            selectedOption: { id: '0', name: vm.user.Gender || 'Male' }, //This sets the default value of the select in the ui

        };

        vm.processPay = function (paymentMethod) {
            
            if ($scope.informationStatus !== true) {
                swal("Pls fill in all reqired information to proceed", "", "error");
                $scope.submited = true;

                return;
            }
            var vehicleHireRequest = {};

            var vehicleObjectList = [];

            angular.forEach(vm.selectedBusses, function (bus) {
                console.log(bus);
                var vehicleObj = {
                    FarePrice: bus.Price,
                    NoOfBookedVehicle: bus.Quantity,
                    SleepOverPrice: bus.SleepOverPrice,
                    VehicleModelId: bus.Id
                }

                vehicleObjectList.add(vehicleObj);
            });

            vehicleHireRequest.Address = vm.user.Address;
            vehicleHireRequest.FullName = vm.user.FirstName;
            vehicleHireRequest.Gender = +vm.user.Gender == 0? 'Male' :'Female';
            vehicleHireRequest.Email = vm.user.Email;
            vehicleHireRequest.PhoneNumber = vm.user.PhoneNumber;
            vehicleHireRequest.NextOfKinPhoneNumber = vm.user.NextOfKinPhone;
            vehicleHireRequest.NextOfKinName = vm.user.NextOfKinName;
            vehicleHireRequest.HiredServiceType = 0;
            vehicleHireRequest.OnewayPickupLocation = vm.busPrototype.OnewayPickupLocation;
            vehicleHireRequest.OneWayDropoffLocation = vm.busPrototype.OneWayDropoffLocation;
            vehicleHireRequest.OnewayDistanceApart = vm.distance;
            vehicleHireRequest.OnewayPickupDate = vm.hireRequest.DepartureDate;
            vehicleHireRequest.paymentMethod = paymentMethod;
            vehicleHireRequest.IsSleepOver = vm.busPrototype.IsSleepOver;
            vehicleHireRequest.Amount = vm.fares.total;


            if (+vm.hireRequest.TripType == 2) {
                vehicleHireRequest.ReturnDropoffLocation = vm.hireRequest.DestinationPoint;
                vehicleHireRequest.ReturnPickupLocation = vm.hireRequest.DeparturePoint;
                vehicleHireRequest.ReturnPickupDate = vm.hireRequest.ReturnDate;
                vehicleHireRequest.ReturnDistanceApart = vm.busPrototype.ReturnDistanceApart;
                vehicleHireRequest.HiredServiceType = 1;

            }

            vehicleHireRequest.HireVehicleDetail = vehicleObjectList;

            var request = {};

            if (+vm.hireRequest.TripType == 2) 
                request = vehicleHireRequest;
            else 
                request = vehicleHireRequest;
            
                
            vm.loading = true;
            datacontext.postHireBooking(request, +vm.hireRequest.TripType).then(function (res) {
                vm.loading = false;
                if (+vehicleHireRequest.paymentMethod == 5 && !res.Item2) {
                    $localstorage.setObject("phr", res.Item3);
                    window.location.href = res.Item1;
                } else if (res.Item1 == "failed" && res.Item2) {
                    swal(res.Item2, "", "error");
                } else if (+vehicleHireRequest.paymentMethod == 12 ) {
                    window.location.href = res;
                }
            }, function (err) {
                console.log(err);
                vm.loading = false;
            });
        }

        function activate() {
            try {
                vm.selectedBusses = $localstorage.getObject('selectedBusses');
                vm.hireBusses = $localstorage.getObject('hireBusses');
                vm.busPrototype = vm.hireBusses.Departures[0];
                vm.distance = $localstorage.getObject('distance').distanceInKiloMeter;
                vm.hireRequest = $localstorage.getObject('hbr');

                console.log(vm.selectedBusses);
               
                console.log(vm.hireBusses.Departures[0]);
                angular.forEach(vm.selectedBusses, function (bus) {
                    if (+vm.hireRequest.TripType == 2) {
                       
                        if (+vm.hireRequest.RetainOvernight == true) {
                            vm.fares.total = vm.fares.total + (bus.Price * bus.Quantity * 2) + bus.SleepOverPrice * bus.Quantity;
                            vm.fares.sleepOver = vm.fares.sleepOver + bus.SleepOverPrice * bus.Quantity;
                            vm.fares.priceWithoutSleepOver = vm.fares.priceWithoutSleepOver + (bus.Price * bus.Quantity * 2);
                           
                        } else {
                            vm.fares.total = vm.fares.total + (bus.Price * bus.Quantity * 2);
                           // vm.fares.priceWithoutSleepOver = vm.fares.priceWithoutSleepOver + (bus.Price * bus.Quantity);
                        }
                    } else {
                        vm.fares.total = vm.fares.total + (bus.Price * bus.Quantity);
                    }


                    //vm.SleepOverPrice + bus
                    
                });


                vm.user = $localstorage.getObject("user").Item1.Object;
                console.log(vm.fares);
            } catch (e) {
                console.log(e);
            }
        }

        $scope.$watch('booker.$valid', function (newVal) {
            console.log('form state', newVal);
            $scope.informationStatus = newVal;
        });

    }


})();

(function () {
    'use strict';
    var controllerId = 'home';
    angular.module('gigm').controller(controllerId,
        ['common', '$localstorage','datacontext', terminal]);

    function terminal(common, $localstorage,datacontext) {

        
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.title = 'Home';

        vm.isLoggedIn = false;

        vm.refcode = "";

        vm.bookings = [];

        vm.user = {};

        vm.loading = false;

        vm.currentPage = 1;
        vm.pageSize = 5;

        activate();

        function activate() {

            try {
                var user = $localstorage.getObject('user');
                vm.isLoggedIn = user.Item1.Object.IsActive ? true : false;
                vm.user = user.Item1.Object;

                vm.bookings = $localstorage.getObject("bookings");
              
            } catch (e) {
                console.log(e);
                vm.isLoggedIn = false;
            }

            try {
                vm.bookingDetails = $localstorage.getObject('booking-details');
                console.log(vm.bookingDetails);
            } catch (e) {
                console.log(e);
            }
           
            
        }

        vm.checkStatus = function () {
            vm.loading = true;
            $localstorage.setObject("booking-details", {});

            datacontext.getBookingStatus(vm.refcode).then(function (d) {
                if (d.Object) {
                    vm.loading = false;
                    window.location.href = "/Pages/BookingStatus";
                    $localstorage.setObject("booking-details", d.Object)

                } else {
                    vm.loading = false;
                    swal(d.ShortDescription, "", "error");
                }
               // console.log(d);
            }, function (err) {
                console.log(err);
                swal("Error occured, pls try again", "", "error");
                vm.loading = false;
            });
        }

        vm.logout = function () {
            $localstorage.setObject("user", {});
            window.location.href = "/";
        }

        vm.showAuth = function () {

        }

        vm.getHistory = function () {
            vm.loading = true;
           // console.log(vm.user.PhoneNumber, vm.user);
            datacontext.getHistory(vm.user.PhoneNumber).then(function (d) {
                vm.loading = true;
                console.log(d.Object);
                $localstorage.setObject("bookings", d.Object);
                window.location.href = "/Pages/Account";
            }, function (err) {
                vm.loading = true;
                console.log(err);
            });
        }


        vm.convertDate = function (date) {

            let options = {
                //  weekday: 'long',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                // hour: '2-digit',
                //  minute: '2-digit'
            };

            //console.log(date, new Date(date).toLocaleString('en-us', options));

            try {
                return new Date(date).toLocaleString('en-us', options) || date;
            } catch (e) {

            }

           
        }

        vm.isAfter = function (start, end) {
            console.log(moment(new Date(start)).isAfter(new Date(end)));
            return moment(new Date(start)).isAfter(new Date(end));
        }

    };


})();
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
(function () {
    'use stricts'

    var controllerId = "passengerDetails";

    angular.module('gigm').controller(controllerId, ['$q', '$timeout', '$localstorage', '$scope', 'datacontext', 'common', passenger]);

    function passenger($q, $timeout, $localstorage, $scope, datacontext, common) {
        {
            var vm = this;

            var beneficiary = [];

            vm.user = {
                'Gender': 0
            };

            //vm.user.Gender = 0;



            vm.title = "Submit";

            vm.adultArr = [];

            vm.childArr = [];

            vm.guest = {};

            vm.data = {};

            vm.departureTrip = {};
            vm.arrivalTrip = {};
            vm.trips = {};

            vm.fares = {};

            vm.departureseats = "";
            vm.arrivalseats = "";

            vm.picupRoutes = [];

            vm.bookingResponse = {};
            var minorfare = 0;
            var rtminorfare = 0;

            vm.isLoggedIn = false;
            vm.loading = false

            vm.booking = {};



            var discountedFare = "";
            var discountedMember = "";

            vm.gender = {
                availableOptions: [
                    { id: '0', name: 'Male' },
                    { id: '1', name: 'Female' },
                ],

                selectedOption: { id: '0', name: vm.user.Gender || 'Male' }, //This sets the default value of the select in the ui

            };

            vm.pickup = {};

            vm.pickup.options = [];

            vm.pickup.selectedOption = {
                PickupPointId: 0,
                PickupPointName: "Select Pickup location",
                PickUpPointAndTime: "Select Pickup location",

            }

            vm.picupSelected = {};


            vm.bookingModel = {};


            vm.isPickUp = false;


            activate();


        }
        function activate() {

            


            var promises = [getData().then(function (d) {
                {
                    //console.log(d);

                    try {
                        vm.user = d.user.Item1 ? d.user.Item1.Object : vm.user;
                    } catch (e) {
                        console.log(e);
                    }

                    // vm.user.PhoneNumber = +d.user.Item1.Object.PhoneNumber || "";
                    //  vm.user.NextOfKinName = "";
                    //  vm.user.NextOfKinPhone = "";
                    vm.data = d;

                    vm.departureTrip = d.departure;
                    vm.arrivalTrip = d.arrival;

                    var returntripfare = 0;
                    var returndiscfare = 0;
                    var returnmemdiscfare = 0;
                    var depatureFare = vm.departureTrip.FarePrice;
                    var fareperpax = vm.departureTrip.AdultFare;

                    if (vm.departureTrip.HasPickup) {
                        vm.pickup.options = vm.departureTrip.pickup;

                        vm.pickup.options.unshift(vm.pickup.selectedOption);
                    }

                    if (vm.data.trips.TripType === 1) {
                        returntripfare = vm.arrivalTrip.AdultFare;

                        if (vm.data.numOfChildren > 0) {
                            minorfare = vm.departureTrip.ChildFare;
                            rtminorfare = vm.arrivalTrip.ChildFare;
                        }

                        if (vm.user && vm.user.IsActive) {
                            returnmemdiscfare = vm.arrivalTrip.ReturnFare;
                            returndiscfare = returnmemdiscfare;
                            fareperpax = vm.departureTrip.MemberFare;
                            vm.isLoggedIn = true;
                        }
                        else {
                            returndiscfare = vm.arrivalTrip.FarePrice;
                        }
                    } else {

                        fareperpax = vm.departureTrip.FarePrice;

                        if (vm.data.numOfChildren > 0) {
                            minorfare = vm.departureTrip.ChildFare;
                        }
                        if (vm.user && vm.user.IsActive) {
                            vm.isLoggedIn = true;
                            fareperpax = vm.departureTrip.MemberFare;
                        }
                    }

                }

                //double mainfarebeforediscount = (Convert.ToDouble(farebeforediscount) * paxno) + (Convert.ToDouble(returntripfare) * paxno);
                //double priceperadult = farebeforediscount + returntripfare;
                //double adultbeforediscount = (Convert.ToDouble(farebeforediscount) * adultnum) + (Convert.ToDouble(returntripfare) * adultnum);
                //double totalperpax = Convert.ToDouble(Convert.ToDouble(fareperpax) + Convert.ToDouble(returndiscfare));
                //double adultpaxtotal = Convert.ToDouble(Convert.ToDouble(fareperpax) * adultnum) + (Convert.ToDouble(returndiscfare) * adultnum);
                //var childamount = Convert.ToDouble(Convert.ToDouble(minorfare) + Convert.ToDouble(rtminorfare)) * numofChildren;
                //var totalchilddicount = Convert.ToDouble((Convert.ToDouble(priceperadult) * numofChildren) - childamount);
                //var totaladultfare = Convert.ToDouble(Convert.ToDouble(adultpaxtotal) * Convert.ToDouble(adultnum));
                //var totaladultbd = Convert.ToDouble(Convert.ToDouble(priceperadult) * Convert.ToDouble(adultnum));
                //var totaltopay = Math.Round(Convert.ToDouble(Convert.ToDouble(adultpaxtotal) + childamount));
                 //var totalbeforediscount = (Convert.ToDouble(priceperadult) * (Convert.ToInt32(paxno)));
                //var totaladultdiscount = totaladultbd - adultpaxtotal;
                 //var totaldiscount = (totalbeforediscount - totaltopay);
                vm.fares.mainfarebeforediscount = (depatureFare * +d.maxPax) + (returntripfare * +d.maxPax);
                vm.fares.priceperadult = depatureFare + returntripfare
                vm.fares.adultbeforediscount = (depatureFare * +d.numOfAdults) + (returntripfare * +d.numOfAdults);
                vm.fares.totalperpax = fareperpax + returndiscfare;
                vm.fares.adultpaxtotal = fareperpax * vm.data.numOfAdults + returndiscfare * vm.data.numOfAdults;
                vm.fares.childamount = (minorfare + rtminorfare) * vm.data.numOfChildren;
                vm.fares.totalchildiscount = (vm.fares.priceperadult * vm.data.numOfChildren) - vm.fares.childamount;
                vm.fares.totaladultfare = vm.fares.adultpaxtotal * vm.data.numOfAdults;
                vm.fares.totaladultbd = vm.fares.priceperadult * vm.data.numOfAdults;
                vm.fares.totaltopay = vm.fares.adultpaxtotal + vm.fares.childamount;
                vm.fares.totalbeforediscount = vm.fares.priceperadult * vm.data.maxPax;
                vm.fares.totaladultdiscount = vm.fares.totaladultbd - vm.fares.adultpaxtotal;
                vm.fares.totaldiscount = vm.fares.totalbeforediscount - vm.fares.totaltopay;


                vm.trips = d.trips;
                console.log(d);

                angular.forEach(vm.data.departureSeats, function (seat, i) {
                    vm.departureseats = vm.departureseats + seat

                    console.log(i);

                    if (i < vm.data.departureSeats.length - 1) {
                        vm.departureseats += ","
                    }
                });



                angular.forEach(vm.data.arrivalSeats, function (seat, i) {
                    vm.arrivalseats += seat;
                    console.log(i);
                    if (i < vm.data.arrivalSeats.length - 1) {
                        vm.arrivalseats += ","
                    }
                });

                console.log("dept", vm.departureseats);

                console.log("data", vm.data);
                console.log("seats", vm.data.departureSeats);
                //vm.guest.email = vm.data.user.Item1.Object.Email;

                for (var i = 0; i < vm.data.numOfAdults - 1; i++) {
                    vm.adultArr.push(i);
                }

                for (var i = 0; i < vm.data.numOfChildren; i++) {
                    vm.childArr.push(i);
                }
            }, function (err) {
                console.log(err);
            })];


            try {
                var user = $localstorage.getObject('user');
                vm.isLoggedIn = user.Item1.Object.IsActive ? true : false;



                console.log(vm.isLoggedIn);
            } catch (e) {
                console.log(e);
                vm.isLoggedIn = false;
                vm.user = {};
            }


            console.log("fare-obj", vm.fares);

        }

        function getData() {
            var data = {};

            vm.user = $localstorage.getObject('user');

            data.user = vm.user;

            data.trips = $localstorage.getObject('bus-data');

            data.maxPax = +$localstorage.get('max-pax');
            data.numOfAdults = +$localstorage.get('adults');
            data.numOfChildren = +$localstorage.get('children');

            data.departure = $localstorage.getObject('selectedDepartureTrip').trip;
            data.arrival = $localstorage.getObject('selectedArrivalTrip').trip;

            data.departureSeats = $localstorage.getObject('selectedDepartureTrip').seats;
            data.arrivalSeats = $localstorage.getObject('selectedArrivalTrip').seats;

            try {
                data.pickup = $localstorage.getObject('pickup');
            } catch (ex) {
                data.pickup = {};
            }



            console.log(data.departure.seats);

            return $q.when(data);
        }

        function validateRequest() {

            console.log(booker);
            var pickupLoc = $('#pickupLocation_').val();
            console.log(vm.departureTrip.HasPickup, pickupLoc, vm.booking.PickUp);
            if (vm.departureTrip.HasPickup && vm.booking.PickUp == "1" && +pickupLoc == 0) {
                console.log(vm.pickup.selectedOption)
                swal("Pls select a pickup location", "", "error");
                return false;
            } else {
                vm.picupSelected = vm.pickup.options.selectWhere("PickupPointId", +pickupLoc)[0];

                $localstorage.setObject("pickup", vm.picupSelected);
                console.log(vm.picupSelected);

            }
            console.log(!vm.user.NextOfKinName || !vm.user.NextOfKinPhone || !vm.user.Email || !vm.user.FirstName || !vm.user.PhoneNumber);

            if (!vm.user.NextOfKinName || !vm.user.NextOfKinPhone || !vm.user.Email || !vm.user.FirstName || !vm.user.PhoneNumber) {
                swal("Pls supply contact details", "", "error");
                return false
            }

            return true;

        }

        function processGigmRequest(paymentType) {
 
            if ($scope.informationStatus !== true) {
                swal("Pls fill in all reqired information to proceed", "", "error");
                $scope.submited = true;
                return;
            }

            beneficiaryList = [];

            beneficiary.clear();


            for (var i = 1; i <= vm.data.numOfChildren; ++i) {
                beneficiary.push($('#form' + i).serializeArray());
            }

            console.log("xxxx", beneficiary);


            for (var i = 1; i <= vm.data.numOfAdults; ++i) {
                console.log(i);
                beneficiary.push($('#_form' + i).serializeArray());
            }

            console.log("yyy", beneficiary);


            console.log("bene:", beneficiary);
            var isError = false;
            angular.forEach(beneficiary, function (value, index) {
                var benef = {};

                try {
                    if (index != beneficiary.length - 1) {
                        console.log("value", value[1]);
                        benef.PassengerType = +value[0].value;
                        benef.FullName = value[1].value;
                        if (!benef.FullName || benef.FullName.length < 3) {
                            benef.PassengerType == 1 ? swal("Passenger(child)'s name required", "", 'error')
                                : swal("Passenger(adult)'s name required", "", 'error');
                            isError = true;
                            return false;
                        }

                        benef.Gender = value[2].value;
                        if (benef.Gender !== "0" && benef.Gender !== "1") { //throw Error()
                            benef.PassengerType == 1 ? swal("Passenger(child)'s gender required", "", 'error') : swal("Passenger(adult)'s gender required", "", 'error');
                            isError = true
                            return false;
                        }

                        benef.SeatNumber = vm.departureseats.trim().split(',')[index + 1];
                        beneficiaryList.push(benef);
                    }
                } catch (ex) {
                    swal("Check bebeficiary's details", "", "error");
                    console.log(ex);
                }

            });

            if (isError) {
                return;
            }

            if (!validateRequest()) {

                return;

            }

            vm.loading = true;

            var mainPassenger = {};

            mainPassenger.PassengerType = 1;
            mainPassenger.FullName = vm.user.FirstName;
            mainPassenger.Gender = !$('#paxGender').val() ? 0 : $('#paxGender').val();
            mainPassenger.SeatNumber = vm.departureseats.trim().split(',')[0].trim();

            //beneficiaryList.add(mainPassenger);

            var postSearchModel = {};

            console.log(vm.data.departure);

            postSearchModel.TripType = vm.data.trips.TripType;
            postSearchModel.BookingType = 2;
            postSearchModel.PaymentMethod = paymentType;
            postSearchModel.PosReference = "";
            postSearchModel.Beneficiaries = beneficiaryList;
            postSearchModel.SeatRegistrations = vm.data.departure.VehicleTripRegistrationId + ":" + vm.departureseats.trim();
            postSearchModel.FirstName = vm.user.FirstName;
            postSearchModel.Gender = mainPassenger.Gender;
            postSearchModel.Amount = vm.fares.totaltopay.toFixed(0);
           // postSearchModel.Discount = vm.fares.totaldiscount.toFixed(0);
            postSearchModel.Email = vm.user.Email;
            postSearchModel.PhoneNumber = vm.user.PhoneNumber;
            postSearchModel.NextOfKinName = vm.user.NextOfKinName;
            postSearchModel.NextOfKinPhone = vm.user.NextOfKinPhone;
            postSearchModel.IsLoggedIn = vm.isLoggedIn;

          
            if (vm.departureTrip.HasPickup && vm.isPickUp) {
                postSearchModel.PickUpId = +$('#pickupLocation_').val();

            }

            if (vm.data.departure.isSub) {
                postSearchModel.isSub = true;
            } else
                postSearchModel.isSub = false;
            if (vm.data.trips.TripType == 1 && vm.data.arrival.isSubReturn) {
                postSearchModel.isSubReturn = vm.data.arrival.isSubReturn;
                postSearchModel.RouteIdReturn = vm.data.arrival.RouteIdReturn;
            }

            if (vm.data.trips.TripType == 1) {
                postSearchModel.SeatRegistrations += ";" + vm.data.arrival.VehicleTripRegistrationId + ":" + vm.arrivalseats.trim();
            }


            postSearchModel.RouteId = vm.data.departure.RouteId;

            vm.bookingModel = postSearchModel;

            console.log("final list", beneficiaryList);

            console.log("psm", postSearchModel);

            $localstorage.setObject('psm', postSearchModel);

            if (paymentType == 12 || paymentType == 11 || paymentType == 10 || paymentType == 2) {

            }


            datacontext.postBoking(postSearchModel).then(function (res) {
                vm.bookingResponse = res;
                vm.loading = false;



                if (!res) {
                    swal("Error occured, please try again", "", "error");
                    $timeout(function () {
                        window.location.href = "/Pages/Booking";
                    }, 3000);

                    return;
                }
                if (postSearchModel.PaymentMethod == 5) {
                    if (res) {
                        window.location.href = res;
                    } else {
                        swal("Error occured, please try again", "", "error");
                        $timeout(function () {
                            window.location.href = "/Pages/Booking";
                        }, 3000);
                        
                    }
                } else if (postSearchModel.PaymentMethod == 8) {
                    processFlutterWave(res);
                } else //book on hold
                    if (postSearchModel.PaymentMethod == 7 || postSearchModel.PaymentMethod == 12
                        || postSearchModel.PaymentMethod == 10 || postSearchModel.PaymentMethod == 14) {
                     window.location.href = res;
                }
                console.log("booking response", res);
            }, function (err) {
                console.log(err);
                swal("Error", "Error occured, please try again", "error");
            });
        }

        vm.getInputs = function () {
            processGigmRequest();
        }

        vm.processPay = function (paymentType) {
           
            processGigmRequest(paymentType);
        }

        processFlutterWave = function (res) {
            
            var PBFPubKey = "FLWPUBK - 865c4665eee6ba09ed0df9ebae80878e-X";
            var PBFSecKey = "FLWSECK-7937608537d36ad6747ae2429474886f-X";
            var PBFPubKey_ = "FLWPUBK-b56fcd0ebeac1413e2adc7872da6339d-X";
            var PBFSecKey_ = "FLWSECK-7937608537d36ad6747ae2429474886f-X";
            var amount = vm.bookingModel.Amount;
            var redirectUrl = res.Item3;
            var txref = res.Item1;

            console.log("amount--", amount);

            console.log(res.Item2);

            var readyStateCheckInterval = setInterval(function () {
                if (document.readyState === "complete") {
                    clearInterval(readyStateCheckInterval);

                    getpaidSetup({
                        customer_email: vm.user.Email,
                        amount: amount.split(".")[0],
                        currency: 'NGN',
                        country: 'NG',
                        payment_method: 'card',
                        txref: res.Item1,
                        PBFPubKey: 'FLWPUBK-b56fcd0ebeac1413e2adc7872da6339d-X',
                        integrity_hash: res.Item2,
                        // normalize: '<%= normalize.Text %>',
                        redirect_url: redirectUrl,
                        redirect_no_json: 1,
                        onclose: function loadUrl() {
                            window.location.assign(redirectUrl);
                        }
                    }
                    );



                }
            }, 10);
        }
        processGtbUssd = function () {
            swal("Comming Soon!", "", "info");
        }

        processFbnUssd = function () {
            swal("Comming Soon!", "", "info");
        }

        $scope.$watch('booker.$valid', function (newVal) {
            //$scope.valid = newVal;
            console.log("state", newVal);
            $scope.informationStatus = newVal;
        });


        vm.hidePickUp = function () {
            console.log("...");
            vm.isPickUp = false;
        }

        vm.showPickUp = function () {
            console.log("..");
            vm.isPickUp = true;
        }

       vm.showHideSummary = function() {
            console.log("showHideSummary");
            $('#trippanel').toggle();
        }

        $('#hideShow').click(function (e) {
            console.log(e);
            $('#trippanel').toggle();
        });

        $(function myfunction() {
            console.log($('#hideShow'));
        });
    }
})();
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