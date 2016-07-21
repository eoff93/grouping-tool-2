angular.module('controllers')

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
  vm.oldEditedSite = {};

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
    vm.oldEditedSite = angular.copy(site);
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
    vm.removeSiteFromGroups(vm.oldEditedSite);
    vm.addSiteToGroups(site);
  }
})
