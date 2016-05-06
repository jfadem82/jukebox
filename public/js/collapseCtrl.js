angular.module('jukebox')
  .controller('CollapseDemoCtrl', CollapseDemoCtrl)

//CollapseDemoCtrl.$inject = ['$q']
function CollapseDemoCtrl($q) {
  vm = this
  vm.isCollapsed = false;
}
// angular.module('jukebox').controller('CollapseDemoCtrl', function ($scope, $q) {
//   $scope.isCollapsed = false;
// });
