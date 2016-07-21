angular.module('controllers')

.controller('GroupController', function(getData) {
  var vm = this;
  vm.sites = getData.sites;
  vm.groups = getData.groups;

  /*
  * Create, Delete and Update groups
  */
  vm.oldEditedGroup = {};
  vm.newGroup = {};
  vm.editedGroup = {};

  vm.createGroup = function(group) {
    group.id = vm.groups.length + 1;
    group.sites = [];
    vm.groups.push(group);
    vm.resetCreateGroupForm();
  }

  vm.deleteGroup = function(group) {
    var index = -1;
    var groupArr = eval(vm.groups);
    for (var i = 0; i < groupArr.length; i++) {
      if (groupArr[i].id === group.id) {
        index = i;
        break;
      }
    }
    vm.removeGroupFromSites(group);
    vm.groups.splice(index, 1);
    vm.updateGroupIds();
  }

  vm.addGroupToSites = function(group) {
    for (var i = 0; i < group.sites.length; i++) {
      for (var j = 0; j < vm.sites.length; j++) {
        if (group.sites[i] === vm.sites[j].url) {
          vm.sites[j].groups.push(group.name);
        }
      }
    }
  }

  vm.removeGroupFromSites = function(group) {
    for (var i = 0; i < vm.sites.length; i++) {
      for (var j = 0; j < vm.sites[i].groups.length; j++) {
        if (vm.sites[i].groups[j] === group.name) {
          vm.sites[i].groups.splice(j, 1);
        }
      }
    }
  }

  vm.setEditedGroup = function(group) {
    vm.editedGroup = angular.copy(group);
    vm.oldEditedGroup = angular.copy(group);
  }

  vm.updateGroup = function(group) {
    var oldName = group.name;
    var index = -1;
    var groupArr = eval(vm.groups);
    for (var i = 0; i < groupArr.length; i++) {
      if (groupArr[i].id === group.id) {
        index = i;
        break;
      }
    }
    vm.groups[index] = group;
    // removes the old group name and adds the new group to sites
    vm.removeGroupFromSites(vm.oldEditedGroup);
    vm.addGroupToSites(group);
    // this was done because submit kept adding new groups to the site
    vm.setEditedGroup(group);
  }

  vm.updateGroupIds = function() {
    for (var i = 0; i < vm.groups.length; i++) {
      vm.groups[i].id = i + 1;
    }
  }

  vm.resetCreateGroupForm = function() {
    vm.newGroup = {
      name: '',
      color: ''
    }
  }

})
