(function(module) {
  mifosX.controllers = _.extend(module, {
 CreateAssetController: function(scope, resourceFactory, location) {
        scope.assetTypeDropdowns = [];
        scope.modelDropdowns = [];
        resourceFactory.assetTemplateResource.get(function(data) {
            scope.assetTypeDropdowns = data.assetTypeDropdown;
             scope.modelDropdowns = data.modelDropdown;
            
        });
        
        scope.submit = function() {  
            this.formData.locale='en'; 
            resourceFactory.assetResource.save(this.formData,function(data){
            location.path('/viewasset/' + data.resourceId);
          });
        };
    }
  });
  mifosX.ng.application.controller('CreateAssetController', ['$scope', 'ResourceFactory', '$location', mifosX.controllers.CreateAssetController]).run(function($log) {
    $log.info("CreateAssetController initialized");
  });
}(mifosX.controllers || {}));