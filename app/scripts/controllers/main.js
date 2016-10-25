'use strict';

/**
 * @ngdoc function
 * @name excelApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the excelApp
 */
angular.module('excelApp')
  .controller('MainCtrl', function ($scope, Excel, $uibModal) {

    var excelId = '85b965f8-9944-44dc-b69d-13cd082d559e';
    var excel = Excel.query({ id: excelId }, function (response) {
      $scope.swimlanes = response.Item.swimlanes;
    });

    $scope.getSelectedItemsIncluding = function (list, item) {
      item.selected = true;
      return list.items.filter(function (item) { return item.selected; });
    };

    $scope.onDragstart = function (list, event) {
       list.dragging = true;
       if (event.dataTransfer.setDragImage) {
         var img = new Image();
         img.src = 'images/drag.png';
         event.dataTransfer.setDragImage(img, 0, 0);
       }
    };

    $scope.onDrop = function (list, items, index) {
      angular.forEach(items, function(item) { item.selected = false; });
      list.items = list.items.slice(0, index)
        .concat(items)
        .concat(list.items.slice(index));
      return true;
    };

    $scope.onMoved = function (list) {
      list.items = list.items.filter(function (item) { return !item.selected; });
    };

    // Update backend on swimlane changed
    $scope.$watch('swimlanes', function (model) {
      if (excel.$resolved) {
        var updated = new Excel();
        updated.TableName = 'excel';
        updated.Key = { id: excelId };
        updated.UpdateExpression = 'SET swimlanes = :value';
        updated.ExpressionAttributeValues = { ':value': $scope.swimlanes };
        updated.$update();
      }
    }, true);

    $scope.openModal = function (item) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'views/item.modal.html',
        controller: 'ItemModalCtrl',
        size: null,
        resolve: {
          item: function () {
            return item;
          }
        }
      });

      modalInstance.result.then(function (updatedItem) {
        if (!item) {
          $scope.swimlanes[0].items.push(updatedItem);
        } else {
          item.label = updatedItem.label;
        }
      });
    };

    $scope.delete = function (list, index) {
      list.items.splice(index, 1);
    };

  });
