(function(module) {
  mifosX.controllers = _.extend(module, {
    MainController: function(scope, location, sessionManager, translate,$rootScope,localStorageService) {
        scope.activity = {};
        scope.activityQueue = [];
        if(localStorageService.get('Location')){
            scope.activityQueue = localStorageService.get('Location');
        }
        scope.$watch(function() {
            return location.path();
        }, function() {
            scope.activity= location.path();
            scope.activityQueue.push(scope.activity);
            localStorageService.add('Location',scope.activityQueue);
        });

        scope.leftnav = false;
        scope.$on("UserAuthenticationSuccessEvent", function(event, data) {
        scope.currentSession = sessionManager.get(data);
        location.path('/home').replace();
      });

      scope.search = function(){
          location.path('/search/' + scope.search.query );
      };
        scope.text =    '<span>Mifos X is designed by the <a href="http://www.openmf.org/">Mifos Initiative</a>.'+
                        '<a href="http://mifos.org/community"> A global community </a> thats aims to speed the elimination of poverty by enabling Organizations to more effectively and efficiently deliver responsible financial services to the world’s poor and unbanked </span><br/>'+
                        '<span>Sounds interesting?<a href="http://mifos.org/community/news/how-you-can-get-involved"> Get involved!</a></span>';

        scope.logout = function() {
        scope.currentSession = sessionManager.clear();
        location.path('/').replace();
      };

      scope.langs = mifosX.models.Langs;
        if(localStorageService.get('Language')){
            var temp=localStorageService.get('Language');
            for(var i in mifosX.models.Langs){
                if(mifosX.models.Langs[i].code == temp.code){
                    scope.optlang = mifosX.models.Langs[i];
                }
            }
        } else{
            scope.optlang = scope.langs[0];
        }
        translate.uses(scope.optlang.code);


      scope.isActive = function (route) {
          if(route == 'clients'){
              var temp = ['/clients','/groups','/centers'];
              for(var i in temp){
                  if(temp[i]==location.path()){
                      return true;
                  }
              }
          }
          else if(route == 'acc'){
              var temp1 = ['/accounting','/freqposting','/accounting_coa','/journalentry','/accounts_closure','/Searchtransaction','/accounting_rules'];
              for(var i in temp1){
                  if(temp1[i]==location.path()){
                      return true;
                  }
              }
          }
          else if(route == 'rep'){
              var temp2 = ['/reports/all','/reports/clients','/reports/loans','/reports/funds','/reports/accounting'];
              for(var i in temp2){
                  if(temp2[i]==location.path()){
                      return true;
                  }
              }
          }
          else if(route == 'admin'){
              var temp3 = ['/users/','/organization','/system','/products','/global'];
              for(var i in temp3){
                  if(temp3[i]==location.path()){
                      return true;
                  }
              }
          }
          else
          {
          var active = route === location.path();
          return active;
          }
      };

      scope.changeLang = function (lang) {
          translate.uses(lang.code);
          localStorageService.add('Language',lang);
      };

      sessionManager.restore(function(session) {
        scope.currentSession = session;
      });
    }
  });
  mifosX.ng.application.controller('MainController', [
    '$scope',
    '$location',
    'SessionManager',
    '$translate',
    '$rootScope',
    'localStorageService',
    mifosX.controllers.MainController
  ]).run(function($log) {
    $log.info("MainController initialized");
  });
}(mifosX.controllers || {}));
