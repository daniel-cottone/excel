'use strict';

/**
 * @ngdoc function
 * @name excelApp.controller:ItemModalCtrl
 * @description
 * # ItemModalCtrl
 * Controller of the excelApp
 */
angular.module('excelApp')
  .controller('ItemModalCtrl', function ($scope, $uibModalInstance, item) {

    $scope.item = angular.copy(item);

    $scope.ok = function() {
      $uibModalInstance.close($scope.item);
    };

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };

  });
