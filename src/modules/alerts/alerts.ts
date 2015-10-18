/// <reference path="../../typings/types.d.ts" />

import AlertService from './class/AlertService';
import AlertListController from './class/AlertListController';
import AlertViewController from './class/AlertViewController';
import AlertEditController from './class/AlertEditController';
import AlertEditDialog from './class/AlertEditDialog';

var module = angular

    .module('modules.alerts', [])

    .config(($stateProvider) => {

        $stateProvider
            .state('alerts', {
                parent: 'app',
                url: '/alerts/list?{query:dynamicQuery}',
                templateUrl: 'modules/alerts/html/alert-list.html',
                controller: 'AlertListController as ctrl',
                access: {
                    requiredPermissions: ['ALERTER_ALERT_LIST']
                }
            })

            .state('view', {
                parent: 'app',
                url: '/alerts/view/:id',
                views: {
                    '': {
                        templateUrl: 'modules/alerts/html/alert-view.html',
                        controller: 'AlertViewController as ctrl',
                        resolve: {
                            alert: ($stateParams, $alerts) => $alerts.get($stateParams.id)
                        }
                    }
                }
            });
    })

    .run(($rootScope, $state, $toast, $timeout, $security) => {
        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
            if (toState.name == 'view') {
                $toast.warning('Alert {0} not found or no access to it', toParams.id);
                event.preventDefault();
            }

            if (!$security.isAuthenticated()) {
                $security.redirectToLogin();
            }
        });
    })

    .controller('AlertListController', AlertListController)
    .controller('AlertEditController', AlertEditController)
    .controller('AlertViewController', AlertViewController)
    .service('$alerts', AlertService)
    .service('$alertDialog', AlertEditDialog)

export default module;
