angular.module('jukebox')
  .controller('CollapseDemoCtrl', CollapseDemoCtrl)

function CollapseDemoCtrl() {
  vm = this
  vm.isCollapsed = true;
}
// angular.module('jukebox').controller('CollapseDemoCtrl', function ($scope, $q) {
//   $scope.isCollapsed = false;
// });
