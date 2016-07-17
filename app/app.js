angular.module('groupApp', ['checklist-model'])
.factory('getData', function() {
  return {
    groups: [
      {"id": 1,"name": "Social sites", "color": "red", "sites": ["shop-pro.jp", "scribd.com"] },
      {"id": 2,"name": "Search engines", "color": "", "sites": ["google.com", "linkedin.com"] },
      {"id": 3,"name": "Blogs", "color": "green", "sites": ["live.com", "berkeley.edu", "hibu.com"] },
      {"id": 4,"name": "Learning sites", "color": "orange", "sites": ["shop-pro.jp"] },
      {"id": 5,"name": "Entertainment", "color": "red", "sites": [] }
    ],

    sites: [
      {"id": 1, "url": "shop-pro.jp", "color": "red","groups": ["Social sites", "Learning sites"]},
      {"id": 2, "url": "desdev.cn", "color": "blue", "groups": []},
      {"id": 3, "url": "live.com", "color": "orange", "groups": ["Blogs"]},
      {"id": 4, "url": "microsoft.com", "color": "red", "groups": []},
      {"id": 5, "url": "scribd.com", "color": "yellow", "groups": ["Social sites"]},
      {"id": 6, "url": "linkedin.com", "color": "", "groups": ["Search engines"]},
      {"id": 7, "url": "berkeley.edu", "color": "green", "groups": ["Blogs"]},
      {"id": 8, "url": "google.com", "color": "blue", "groups": ["Search engines"]},
      {"id": 9, "url": "clickbank.net", "color": "", "groups": []},
      {"id": 10, "url": "cam.ac.uk", "color": "green", "groups": []},
      {"id": 11, "url": "hibu.com", "color": "blue", "groups": ["Blogs"]},
      {"id": 12, "url": "over-blog.com", "color": "yellow", "groups": []},
      {"id": 13, "url": "cafepress.com", "color": "green", "groups": []}
    ]
  }
})
.controller('MainController', function(getData) {
  var vm = this;
  vm.data = getData;
  vm.sites = vm.data.sites;
  vm.groups = vm.data.groups;
  vm.isCreating = false;
  vm.isEditing = false;
  vm.currentGroup = null;

  vm.startCreating = function() {
    vm.isCreating = true;
    vm.isEditing = false;
  }

  vm.cancelCreating = function() {
    vm.isCreating = false;
  }

  vm.startEditing = function() {
    vm.isEditing = true;
    vm.isCreating = false;
  }

  vm.cancelEditing = function() {
    vm.isEditing = false;
  }

  vm.shouldShowCreating = function() {
    return vm.currentGroup && !vm.isEditing;
  }

  vm.shouldShowEditing = function() {
    return vm.isEditing && !vm.isCreating;
  }

  vm.setCurrentGroup = function(group) {
    vm.currentGroup = group;
  }

  vm.isCurrentGroup = function(group) {
    return vm.currentGroup !== null && group.name === vm.currentGroup.name;
  }

  vm.getUngroupedSites = function() {
    var ungrouped = 0;
    for (var i = 0; i < vm.sites.length; i++) {
      if (vm.sites[i].groups.length === 0) {
        ungrouped++;
      }
    }
    return ungrouped;
  }

  vm.byEmptyGroup = function(site) {
    return site.groups.length === 0;
  }

  /*
    ================
    Create, Edit, Delete
    ================
  */
  vm.newSite = {groups: []};
  vm.editedSite = {};
  vm.newGroup = {};
  vm.editedGroup = {};

  vm.resetCreateGroupForm = function() {
    vm.newGroup = {
      name: '',
      color: ''
    }
  }

  vm.createGroup = function(group) {
    group.id = vm.groups.length + 1;
    group.sites = [];
    vm.groups.push(group);
    vm.resetCreateGroupForm();
  }

  vm.setEditedGroup = function(group) {
    vm.editedGroup = angular.copy(group);
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
  }

  vm.updateGroupIds = function() {
    for (var i = 0; i < vm.groups.length; i++) {
      vm.groups[i].id = i + 1;
    }
  }

  // cycles through sites and removes the parameter group
  vm.removeGroupFromSites = function(group) {
    for (var i = 0; i < vm.sites.length; i++) {
      for (var j = 0; j < vm.sites[i].groups.length; j++) {
        if (vm.sites[i].groups[j] === group.name) {
          vm.sites[i].groups.splice(j, 1);
        }
      }
    }
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

  vm.createSite = function(site) {
    site.id = vm.sites.length + 1;
    vm.sites.push(site);
    vm.addSiteToGroups(site);
    vm.resetCreateForm();
  }

  vm.updateSiteIds = function() {
    for (var i = 0; i < vm.sites.length; i++) {
      vm.sites[i].id = i + 1;
    }
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
