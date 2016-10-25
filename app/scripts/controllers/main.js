'use strict';

/**
 * @ngdoc function
 * @name excelApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the excelApp
 */
angular.module('excelApp')
  .controller('MainCtrl', function ($scope, Excel, $http) {

    var excelId = '85b965f8-9944-44dc-b69d-13cd082d559e';
    var excel = Excel.query({ id: excelId }, function (response) {
      $scope.swimlanes = response.Item.swimlanes;
    });

    $scope.getSelectedItemsIncluding = function(list, item) {
      item.selected = true;
      return list.items.filter(function(item) { return item.selected; });
    };

    $scope.onDragstart = function(list, event) {
       list.dragging = true;
       if (event.dataTransfer.setDragImage) {
         var img = new Image();
         img.src = 'framework/vendor/ic_content_copy_black_24dp_2x.png';
         event.dataTransfer.setDragImage(img, 0, 0);
       }
    };

    $scope.onDrop = function(list, items, index) {
      angular.forEach(items, function(item) { item.selected = false; });
      list.items = list.items.slice(0, index)
                  .concat(items)
                  .concat(list.items.slice(index));
      return true;
    };

    $scope.onMoved = function(list) {
      list.items = list.items.filter(function(item) { return !item.selected; });
    };

    // Model to JSON for demo purpose
    $scope.$watch('swimlanes', function(model) {
      if (excel.$resolved) {
        var updated = new Excel();
        updated.TableName = 'excel';
        updated.Key = { id: excelId };
        updated.UpdateExpression = 'SET swimlanes = :value';
        updated.ExpressionAttributeValues = { ':value': $scope.swimlanes };
        updated.$update();
      }
      //$scope.swimlanesAsJson = angular.toJson(model, true);
    }, true);

  });
