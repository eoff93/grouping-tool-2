angular.module('controllers')

.controller('TabController', function() {
  var vm = this;
  vm.currentGroup = null;

  /** Takes in an group object and sets currentGroup to it */
  vm.setCurrentGroup = function(group) {
    vm.currentGroup = group;
  }

  /** Checks if param is currentGroup */
  vm.isCurrentGroup = function(group) {
    return vm.currentGroup !== null && group.name === vm.currentGroup.name;
  }

})
