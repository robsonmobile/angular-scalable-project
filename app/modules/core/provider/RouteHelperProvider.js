(function () {
    'use strict';

    define([], function () {
        routerHelperProvider.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
        /* @ngInject */
        function routerHelperProvider($locationProvider, $stateProvider, $urlRouterProvider) {
            /* jshint validthis:true */
            this.$get = RouterHelper;

            $locationProvider.html5Mode(true);

            RouterHelper.$inject = ['$state'];
            /* @ngInject */
            function RouterHelper($state) {
                var hasOtherwise = false;

                var service = {
                    configureStates: configureStates,
                    getStates: getStates
                };

                return service;

                ///////////////

                function configureStates(states, otherwisePath) {
                    states.forEach(function (state) {
                        $stateProvider.state(state.state, state.config);
                    });
                    if (otherwisePath && !hasOtherwise) {
                        hasOtherwise = true;
                        $urlRouterProvider.otherwise(otherwisePath);
                    }
                }

                function getStates() {
                    return $state.get();
                }
            }
        }

        angular
            .module('SeniorHCMApp.core')
            .provider('routerHelper', routerHelperProvider);
    });


})();