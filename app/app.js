'use strict';

angular.module('groupApp',['checklist-model'])
  .factory('getData', function() {
    var data = {sites: [], groups: []};

    return data;
  })

  .controller('TabController', function(getData) {
    var vm = this;
    vm.tab = 0;
    vm.activeGroup = vm.tab - 1;

    vm.setActiveGroup = function() {
      vm.activeGroup = vm.tab - 1;
    }

    // changes vm.tab to the id of a clicked group
    vm.selectTab = function(setTab) {
      vm.tab = setTab;
    };

    // checks which tab is selected and then use it to set a class
    vm.isSelected = function(checkTab) {
      return vm.tab === checkTab;
    };
  })

  .controller('GroupController', function(getData, $timeout) {
    var vm = this;
    vm.data = getData;
    vm.groups = getData.groups;
    vm.groupToEdit = {};

    // adds a group from a modal and resets the forms
    vm.addGroup = function() {
      vm.groups.push({
        id: vm.groups.length + 1,
        name: vm.name,
        color: vm.color,
        sites: []
      });
      vm.name = '';
      vm.color = '';
    }

    vm.setGroupToEdit = function(index) {
      vm.groupToEdit = vm.groups[index];
    }

    vm.removeGroup = function(activeGroup, group) {
      vm.removeGroupFromSites(group);
      vm.groups.splice(activeGroup, 1);
      vm.updateGroupIds();
    }

    // cycles through sites and removes the parameter group
    vm.removeGroupFromSites = function(group) {
      var sites = getData.sites;
      for (var i = 0; i < sites.length; i++) {
        for (var j = 0; j < sites[i].groups.length; j++) {
          if (sites[i].groups[j] === group) {
            sites[i].groups.splice(j, 1);
          }
        }
      }
    }

    // updates group ids starting from 1
    vm.updateGroupIds = function() {
      for (var i = 0; i < vm.groups.length; i++) {
        vm.groups[i].id = i + 1;
      }
    }

    // check if a currently selected group has websites
    vm.hasSites = function(index) {
      var numberOfGroups = vm.groups.length;
      var groupExists = index <= vm.groups.length - 1;

      if (numberOfGroups && groupExists) {
          return (vm.groups[index].sites.length > 0) ? true:false;
      }
    }

    // only removes a website from its group, not from all websites
    vm.removeFromGroupOnly = function(activeGroup, index) {
      vm.groups[activeGroup].sites.splice(index, 1);
    }

  })
  .controller('AppController', function(getData) {
    var vm = this;
    vm.data = getData;
    vm.sites = vm.data.sites;
    vm.groups = vm.data.groups;
    vm.groupToEdit = {};
    vm.selectedGroups = [];
    vm.siteToEdit;
    vm.tab = 0;

    vm.setGroupToEdit = function(index) {
      vm.groupToEdit = vm.groups[index];
    }

    // adds a website from a modal and resets the forms
    vm.addSite = function() {
      vm.sites.push({
        id: vm.sites.length + 1,
        url: vm.url,
        color: vm.color,
        groups: vm.selectedGroups
      });

      // add sites to picked groups
      for (var i = 0; i < vm.selectedGroups.length; i++) {
        for (var j = 0; j < vm.groups.length; j++) {
          if (vm.selectedGroups[i] === vm.groups[j].name) {
            vm.groups[j].sites.push(vm.url);
          }
        }
      }

      // reset forms and selected groups
      vm.url = '';
      vm.color = '';
      vm.selectedGroups = [];
    }

    vm.updateSiteIds = function() {
      for (var i = 0; i < vm.sites.length; i++) {
        vm.sites[i].id = i + 1;
      }
    }

    vm.setSiteToEdit = function(index) {
      vm.siteToEdit = vm.sites[index];
    }

    // dynamically removes a table row and site from vm.sites
    vm.removeSite = function(url) {
      var index = -1;
      var siteArr = eval(vm.sites);
      for (var i = 0; i < siteArr.length; i++) {
        if (siteArr[i].url === url) {
          index = i;
          break;
        }
      }
      vm.removeFromGroup(url);
      vm.sites.splice(index, 1);
      vm.updateSiteIds();
    }

    // finds all occurences of a website in groups and deletes it
    vm.removeFromGroup = function(site) {
      for (var i = 0; i < vm.groups.length; i++) {
        for (var j = 0; j < vm.groups[i].sites.length; j++) {
          if (vm.groups[i].sites[j] === site) {
            vm.groups[i].sites.splice(j, 1);
          }
        }
      }
    }

    // adds a group from a modal and resets the forms
    vm.addGroup = function() {
      vm.groups.push({
        id: vm.groups.length + 1,
        name: vm.name,
        color: vm.color,
        sites: []
      });
      vm.name = '';
      vm.color = '';
    }
  });
