angular.module('groupApp', ['checklist-model'])
.factory('getData', function() {
  return {
    groups: [],
    sites: []
  }
})

.directive('addGroupModal', function() {
  return {
    restrict: 'E',
    templateUrl: './templates/add-group-modal.template.html'
  }
})

.directive('editGroupModal', function() {
  return {
    restrict: 'E',
    templateUrl: './templates/edit-group-modal.template.html'
  }
})

.directive('addSiteModal', function() {
  return {
    restrict: 'E',
    templateUrl: './templates/add-site-modal.template.html'
  }
})

.directive('editSiteModal', function() {
  return {
    restrict: 'E',
    templateUrl: './templates/edit-site-modal.template.html'
  }
})

.directive('groupList', function() {
  return {
    restrict: 'E',
    templateUrl: './templates/group-list.template.html'
  }
})

.directive('controls', function() {
  return {
    restrict: 'E',
    templateUrl: './templates/controls.template.html'
  }
})

.directive('allAndUngroupedBtns', function() {
  return {
    restrict: 'E',
    templateUrl: './templates/all-and-ungrouped-btns.template.html'
  }
})

.directive('noWebsites', function() {
  return {
    restrict: 'E',
    templateUrl: './templates/no-websites.template.html'
  }
})

.directive('searchSelectForm', function() {
  return {
    restrict: 'E',
    templateUrl: './templates/search-select-form.template.html'
  }
})

.directive('mainTable', function() {
  return {
    restrict: 'E',
    templateUrl: './templates/main-table.template.html'
  }
})

.directive('ungroupedTable', function() {
  return {
    restrict: 'E',
    templateUrl: './templates/ungrouped-table.template.html'
  }
})

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

.controller('MainController', function(getData) {
  // Initial variables
  var vm = this;
  vm.showJson = false;
  vm.data = getData;
  vm.sites = vm.data.sites;
  vm.groups = vm.data.groups;
  vm.dataToShow = {id: 2, value:10};
  vm.dataToShowOptions = [{id:1, value: 5}, {id:2, value:10}, {id: 3, value:20},
                          {id:4, value:50}, {id:5, value:100}];


  /** Returns the number of ungrouped sites */
  vm.getUngroupedSites = function() {
    var ungrouped = 0;
    for (var i = 0; i < vm.sites.length; i++) {
      if (vm.sites[i].groups.length === 0) {
        ungrouped++;
      }
    }
    return ungrouped;
  }

  /** Toggles the value that displays JSON */
  vm.toggleShowJson = function() {
    (vm.showJson) ? vm.showJson = false : vm.showJson = true;
  }

  /** Checks if a site has groups, used for filtering */
  vm.byEmptyGroup = function(site) {
    return site.groups.length === 0;
  }


  /**
  * Create, Delete and Update sites
  */
  vm.newSite = {groups: []};
  vm.editedSite = {};

  vm.createSite = function(site) {
    site.id = vm.sites.length + 1;
    vm.sites.push(site);
    vm.addSiteToGroups(site);
    vm.resetCreateForm();
  }

  vm.deleteSite = function(site) {
    var index = -1;
    var siteArr = eval(vm.sites);
    for (var i = 0; i < siteArr.length; i++) {
      if (siteArr[i].id === site.id) {
        index = i;
        break;
      }
    }
    vm.sites.splice(index, 1);
    vm.removeSiteFromGroups(site);
    vm.updateSiteIds();
  }

  vm.updateSiteIds = function() {
    for (var i = 0; i < vm.sites.length; i++) {
      vm.sites[i].id = i + 1;
    }
  }

  vm.resetCreateForm = function() {
    vm.newSite = {
      id: '',
      url: '',
      color: '',
      groups: []
    }
  }

  vm.addSiteToGroups = function(site) {
    for (var i = 0; i < site.groups.length; i++) {
      for (var j = 0; j < vm.groups.length; j++) {
        if (site.groups[i] === vm.groups[j].name) {
          vm.groups[j].sites.push(site.url);
        }
      }
    }
  }

  vm.removeSiteFromGroups = function(site) {
    for (var i = 0; i < vm.groups.length; i++) {
      for (var j = 0; j < vm.groups[i].sites.length; j++) {
        if (vm.groups[i].sites[j] === site.url) {
          vm.groups[i].sites.splice(j, 1);
        }
      }
    }
  }

  vm.setEditedSite = function(site) {
    vm.editedSite = angular.copy(site);
  }

  vm.updateSite = function(site) {
    var index = -1;
    var siteArr = eval(vm.sites);
    for (var i = 0; i < siteArr.length; i++) {
      if (siteArr[i].id === site.id) {
        index = i;
        break;
      }
    }
    vm.sites[index] = site;
    vm.removeSiteFromGroups(site);
    vm.addSiteToGroups(site);
  }
})
