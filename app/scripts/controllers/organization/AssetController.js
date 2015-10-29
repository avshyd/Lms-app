(function(module) {
  mifosX.controllers = _.extend(module, {
    AssetController: function(scope, resourceFactory) {
        scope.assets = [];
        resourceFactory.assetResource.getAllAssets(function(data) {
            scope.assets = data;
        });
    }
  });
  mifosX.ng.application.controller('AssetController', ['$scope', 'ResourceFactory', mifosX.controllers.AssetController]).run(function($log) {
    $log.info("AssetController initialized");
  });
}(mifosX.controllers || {}));
