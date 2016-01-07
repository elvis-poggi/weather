angular.module('starter.controllers', ['ionic'])
    .constant('FORECASTIO_KEY', '5e73a9c36d869780766ac05263d1d3d7')
    .controller('HomeCtrl', function ($scope, $state, Weather, DataStore, $rootScope) {

        function update() {

            $scope.city = DataStore.city;
            var latitude = DataStore.latitude;
            var longitude = DataStore.longitude;

            //call getCurrentWeather method in factory ‘Weather’
            Weather.getCurrentWeather(latitude, longitude).then(function (resp) {
                $scope.current = resp.data;
                console.log('GOT CURRENT', $scope.current);
                //debugger;
            }, function (error) {
                alert('Unable to get current conditions');
                console.error(error);
            });
        }

        $rootScope.$on('city_changed', update);
        
        update();
    })

    .controller('LocationsCtrl', function ($scope, $state, Cities, DataStore, $rootScope) {
        $scope.cities = Cities.all();

        $scope.changeCity = function (cityId) {
            console.log("locationsCtrl.changeCity", cityId);
            //get lat and longitude for seleted location
            var lat = $scope.cities[cityId].lat; //latitude
            var lgn = $scope.cities[cityId].lgn; //longitude
            var city = $scope.cities[cityId].name; //city name

            DataStore.setCity(city);
            DataStore.setLatitude(lat);
            DataStore.setLongitude(lgn);

            $state.go('tab.home');
            $rootScope.$emit('city_changed');
        }
    })
    .controller('SettingsCtrl', function ($scope) {
        //manages app settings
    });