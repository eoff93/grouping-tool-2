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
      {"id": 7, "url": "berkeley.edu", "color": "Goldenrod", "groups": ["Blogs"]},
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
  vm.sites = getData.sites;
  vm.groups = getData.groups;
  vm.isCreating = false;
  vm.isEditing = false;
  vm.currentGroup = null;
  vm.newSite = {};

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

  /*
    ================
    Create, Edit, Delete
    ================
  */
  vm.resetCreateForm = function() {
    vm.newSite = {
      id: '',
      url: '',
      color: '',
      groups: ''
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

  vm.createSite = function() {
    vm.newSite.id = vm.sites.length + 1;
    vm.sites.push(vm.newSite);
    vm.addSiteToGroups(vm.newSite);
    vm.resetCreateForm();
    vm.selectedGroups = [];
  }

})
