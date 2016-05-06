angular.module('jukebox', ['ui.router', 'angular-jwt', 'ui.bootstrap'])
.filter('trustAsResourceUrl', ['$sce', function($sce) {
    return function(val) {
        return $sce.trustAsResourceUrl(val);
    };
}])
