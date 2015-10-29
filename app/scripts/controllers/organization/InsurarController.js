(function(module) {
  mifosX.controllers = _.extend(module, {
InsurarController: function(scope, resourceFactory, routeParams, location,dateFilter) {
        scope.assetDropdowns = [];
        scope.insurarDropdowns = [];
        scope.modelDropdowns=[];
        scope.first = {};
        scope.first.date = new Date();
        scope.restrictDate = new Date();
        resourceFactory.insurarTemplateResource.get(function(data) {
            scope.assetDropdowns = data.assetDropdown;
             scope.insurarDropdowns = data.insurarDropdown;
             scope.modelDropdowns=data.modelDropdown;
             scope.loanId = routeParams.id;
        });
        
        scope.submit = function() {  
            this.formData.locale='en';
                 var reqDate = dateFilter(scope.first.date,'dd MMMM yyyy');
                 this.formData.dateFormat = 'dd MMMM yyyy';
                 this.formData.insuredDate=reqDate;
            resourceFactory.insurarResource.save({ loanId:routeParams.id},this.formData,function(data){
           location.path('viewloanaccount/'+routeParams.id);
          });
        };
    }
  });
  mifosX.ng.application.controller('InsurarController', ['$scope', 'ResourceFactory','$routeParams', '$location','dateFilter', mifosX.controllers.InsurarController]).run(function($log) {
    $log.info("InsurarController initialized");
  });
}(mifosX.controllers || {}));