/// <reference path="../../../typings/types.d.ts" />

import Alert from './Alert';
import AlertService from './AlertService';

/*@ngInject*/
class AlertEditController {

    private options: any;

    constructor(
        private $scope,
        private $log,
        private $timeout,
        private $toast,
        private $state,
        private $q,
        private $utils,
        private $alerts: AlertService,
        private $security,
        private alert: Alert) {
    }

    isValid(form) {
        return this.$utils.isReadyToSave(this.$scope.form);
    }

    submitForm(form) {
        let changes = this.$utils.formChanges(form, this.alert);

        angular.extend(changes, {
            product: 'CFD',
            category: 'INF',
            assignee: {
                groupId: -36,
                hierarchyId: 9
            }
        });

        if (this.alert.isNew()) {
            return this.$alerts.add(changes);
        } else {
            return this.$alerts.update(this.alert.id, changes);
        }
    }

    saveChanges(form) {
        this.submitForm(form)
            .then((result) => {
                this.$scope.$close();
                this.$toast.info('Alert {0} saved', `<a href="#/alerts/view/${result.id}">${result.id}</a>`);
            });
    }

}

export default AlertEditController;
