angular.module('groupApp', ['checklist-model'])
.factory('getData', function() {
  return {
    groups: [
      {"id": 1,"name": "Social sites", "color": "red", "sites": ["shop-pro.jp", "scribd.com"] },
      {"id": 2,"name": "Search engines", "color": "", "sites": ["google.com", "linkedin.com"] },
      {"id": 3,"name": "Blogs", "color": "green", "sites": ["live.com", "berkeley.edu", "hibu.com"] },
      {"id": 4,"name": "Learning sites", "color": "orange", "sites": ["shop-pro.jp"] },
      {"id": 5,"name": "Entertainment", "color": "red", "sites": null }
    ],

    sites: [
      {"id": 1, "url": "shop-pro.jp", "color": "red","groups": ["Social sites", "Learning sites"]},
      {"id": 2, "url": "desdev.cn", "color": "blue", "groups": null},
      {"id": 3, "url": "live.com", "color": "orange", "groups": ["Blogs"]},
      {"id": 4, "url": "microsoft.com", "color": "red", "groups": null},
      {"id": 5, "url": "scribd.com", "color": "yellow", "groups": ["Social sites"]},
      {"id": 6, "url": "linkedin.com", "color": "", "groups": ["Search engines"]},
      {"id": 7, "url": "berkeley.edu", "color": "Goldenrod", "groups": ["Blogs"]},
      {"id": 8, "url": "google.com", "color": "blue", "groups": ["Search engines"]},
      {"id": 9, "url": "clickbank.net", "color": "", "groups": null},
      {"id": 10, "url": "cam.ac.uk", "color": "green", "groups": null},
      {"id": 11, "url": "hibu.com", "color": "blue", "groups": ["Blogs"]},
      {"id": 12, "url": "over-blog.com", "color": "yellow", "groups": null},
      {"id": 13, "url": "cafepress.com", "color": "green", "groups": null}
    ]
  }
})
.controller('MainController', function(getData) {
  var vm = this;
  vm.sites = getData.sites;
  vm.groups = getData.groups;

  vm.currentGroup = null;

  vm.setCurrentGroup = function(group) {
    vm.currentGroup = group;
  }

  vm.isCurrentGroup = function(group) {
    return vm.currentGroup !== null && group.name === vm.currentGroup.name;
  }
})
