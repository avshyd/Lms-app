(function(module) {
  mifosX.controllers = _.extend(module, {
 EditAssetController: function(scope, routeParams, resourceFactory, location) {
        scope.assetTypeDropdowns = [];
        scope.modelDropdowns = [];
        scope.formData=[];
        scope.alldata=[];
 resourceFactory.assetResource.get({assetId: routeParams.id} , function(data) {
            scope.assetTypeDropdowns = data.assetTypeDropdown;
             scope.modelDropdowns = data.modelDropdown;
             scope.alldata=data;
              scope.formData= {
              assetType : data.assetType,
              model: data.model,
              assetCode : data.assetCode,
              assetDescription : data.assetDescription,
              make: data.make,
              purchaseValue : data.purchaseValue,
              saleValue : data.saleValue, 
            };

        });
        
        scope.submit = function() {  
            this.formData.locale='en'; 
            resourceFactory.assetResource.update({'assetId': routeParams.id},this.formData,function(data){
            location.path('/viewasset/' + data.resourceId);
          });
        };
    }
  });
  mifosX.ng.application.controller('EditAssetController', ['$scope', '$routeParams', 'ResourceFactory', '$location', mifosX.controllers.EditAssetController]).run(function($log) {
    $log.info("EditAssetController initialized");
  });
}(mifosX.controllers || {}));