angular.module('groupApp', ['checklist-model', 'controllers'])

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
