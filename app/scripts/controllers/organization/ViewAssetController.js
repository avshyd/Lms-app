(function(module) {
  mifosX.controllers = _.extend(module, {
    ViewAssetController: function(scope, routeParams, route, location, resourceFactory, $modal ) {
        scope.asset = [];
        resourceFactory.assetResource.get({assetId: routeParams.id} , function(data) {
            scope.asset = data;
        });

       scope.deleteasset = function (){
            $modal.open({
                templateUrl: 'deleteasset.html',
                controller: AssetDeleteCtrl
            });
        };
      
        var AssetDeleteCtrl = function ($scope, $modalInstance) {
            $scope.delete = function () {
                resourceFactory.assetResource.delete({assetId: routeParams.id} , {} , function(data) {
                    location.path('/assets');
                    // added dummy request param because Content-Type header gets removed
                    // if the request does not contain any data (a request body)
                });
                $modalInstance.close('delete');
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };

    }
  });
  mifosX.ng.application.controller('ViewAssetController', ['$scope', '$routeParams','$route', '$location', 'ResourceFactory','$modal', mifosX.controllers.ViewAssetController]).run(function($log) {
    $log.info("ViewAssetController initialized");
  });
}(mifosX.controllers || {}));
