        /* global angular */

// create the module and name it scotchApp
	var scotchApp = angular.module('scotchApp', ['ngRoute']);
	// configure our routes
        scotchApp.run(['$rootScope', '$http', function($rootScope, $http) {
            
             $http({method: 'GET', url: 'https://transport-mk.herokuapp.com/data/rest/schedules'})
                        .success(function (data, status) {
                            $rootScope.lines = data;
                        })
                        .error(function (data, status) {
                            console.log("error");
                        });
        }]);
	scotchApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/home', {
                                title : 'Почетна | Транспорт МК',
				templateUrl : 'pages/home.html',
				controller  : 'mainController'
			})
                        .when('/linii', {
                                title : 'Почетна | Транспорт МК',
				templateUrl : 'pages/linii.html',
				controller  : 'linii'
			})
                        .when('/planner', {
                            title : 'Почетна | Транспорт МК',
				templateUrl : 'pages/planner.html',
				controller  : 'planner'
			})
                        
			// route for the about page
			.when('/taksi', {
				templateUrl : 'pages/taksi.html',
				controller  : 'taksi'
			})

			// route for the contact page
			.when('/kontakt', {
				templateUrl : 'pages/kontakt.html',
				controller  : 'kontakt'
			});
	});

	// create the controller and inject Angular's $scope
	scotchApp.controller('mainController', function($scope) {
	});
        scotchApp.controller('linii', ['$scope',
            function ($scope) {
                $scope.bgimg = '';
                $scope.currTime = new Date();
                $scope.time = function (vreme) {
                    $scope.lineTime = new Date(new Date().setHours(vreme[0] + vreme[1], vreme[3] + vreme[4]));
                    return ($scope.currTime <= $scope.lineTime);
                }
            }]);
        scotchApp.controller('planner', ['$scope', 
            function ($scope) {
                $scope.bgimg = 'img/background.jpg';
                if (navigator.geolocation) {
                    navigator.geolocation.watchPosition(function (position) {
                        $scope.$apply(function () {
                            
                            lat = parseInt(position.coords.latitude);
                            lon = parseInt(position.coords.longitude);
                            if (lat === 41 && lon === 21) {
                                $scope.startDestination = "22";
                                $scope.endDestination = "CITYBUS";
                            }
                            else
                            {
                                $scope.startDestination = "19";
                                $scope.endDestination = "CITYBUS";
                            }
                        });
                    });
                }
            }]);
        
	scotchApp.controller('kontakt', ['$scope', '$http',
            function ($scope) {
                if (navigator.geolocation) {
                    navigator.geolocation.watchPosition(function (position) {
                        $scope.$apply(function () {
                            $scope.lat = position.coords.latitude;
                            $scope.lon = position.coords.longitude;
                            var src = "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1482.5726492010515!2d" + position.coords.longitude + "!3d" + position.coords.latitude + "!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2smk!4v1433491062967";
                            var myEl = angular.element(document.querySelector('#map'));
                            console.log(position.coords.longitude + " " + position.coords.latitude);
                            myEl.attr('src', src);
                        });
                    });
                }
            }]);

	scotchApp.controller('taksi', ['$scope', '$http',
            function ($scope) {
            }])