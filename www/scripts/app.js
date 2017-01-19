var app = angular.module('myapp', []);

(function() {
    var $http = angular.injector(['ng']).get('$http');
    $http.get('/api/clientConfig').then(function (response) {
        app.constant('clientConfigAsync', response.data);
        angular.element(document).ready(function() {
            angular.bootstrap(document, ['myapp']);
        });
    });
})(); 

app.service('clientConfigAsync', ['$q', '$http', function($q, $http){
    var clientConfigPromise = null;

    this.clientConfig = function(){
        if (clientConfigPromise == null){
            var deferred = $q.defer();
            $http.get('/api/clientConfig').then(
                function(success){
                    deferred.resolve(success.data);
                }, 
                function(error){
                    deferred.reject();
                }
            );
            clientConfigPromise = deferred.promise;
        }

        return clientConfigPromise;
    }
}]);

app.controller('testController', ['clientConfigAsync', '$scope', function(clientConfigAsync, $scope){
    var timesResolved = 0;
    function fetchConfig(){
        clientConfigAsync.clientConfig().then(function(config){
            $scope.testProperty = "Config property resolved (" + ++timesResolved + ") as: " + config.configProp;
        });
    }

    function init(){
        fetchConfig();
    }

    $scope.again = function(){
        fetchConfig();
    }

    init();
}]);