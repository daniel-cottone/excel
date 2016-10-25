'use strict';

/**
 * @ngdoc service
 * @name excelApp.Excel
 * @description
 * # Excel
 * Factory in the excelApp.
 */
angular.module('excelApp')
  .factory('Excel', function ($resource) {

    return $resource('https://t0t4byup33.execute-api.us-east-1.amazonaws.com/prod', {}, {
      'query': { method: 'GET', params: { action: 'read', format: '.json' }, isArray: false },
      'update': { method: 'PUT', params: { action: 'update', format: '.json' } }
    });

  });
