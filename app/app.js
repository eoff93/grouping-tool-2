angular.module('groupApp', ['checklist-model'])
.factory('getData', function() {
  return {
    groups: [
      {"id": 1,"name": "Social sites", "color": "Red", "sites": ["shop-pro.jp", "scribd.com"] },
      {"id": 2,"name": "Search engines", "color": "", "sites": ["google.com", "linkedin.com"] },
      {"id": 3,"name": "Blogs", "color": "Green", "sites": ["live.com", "berkeley.edu", "hibu.com"] },
      {"id": 4,"name": "Learning sites", "color": "Orange", "sites": ["shop-pro.jp"] },
      {"id": 5,"name": "Entertainment", "color": "Red", "sites": null }
    ],

    sites: [
      {"id": 1, "url": "shop-pro.jp", "color": "Red","groups": ["Social sites", "Learning sites"]},
      {"id": 2, "url": "desdev.cn", "color": "Blue", "groups": null},
      {"id": 3, "url": "live.com", "color": "Orange", "groups": ["Blogs"]},
      {"id": 4, "url": "microsoft.com", "color": "Red", "groups": null},
      {"id": 5, "url": "scribd.com", "color": "Yellow", "groups": ["Social sites"]},
      {"id": 6, "url": "linkedin.com", "color": "", "groups": ["Search engines"]},
      {"id": 7, "url": "berkeley.edu", "color": "Goldenrod", "groups": ["Blogs"]},
      {"id": 8, "url": "google.com", "color": "Blue", "groups": ["Search engines"]},
      {"id": 9, "url": "clickbank.net", "color": "", "groups": null},
      {"id": 10, "url": "cam.ac.uk", "color": "Green", "groups": null},
      {"id": 11, "url": "hibu.com", "color": "Blue", "groups": ["Blogs"]},
      {"id": 12, "url": "over-blog.com", "color": "Yellow", "groups": null},
      {"id": 13, "url": "cafepress.com", "color": "Green", "groups": null}
    ]
  }
})
.controller('MainController', function() {
  var vm = this;
})
