/// <reference path="../../../typings/types.d.ts" />

import Alert from './Alert';
import AlertService from './AlertService';

const KEY_EDIT = 'e';
const KEY_ALERT_LIST = 'esc';

/*@ngInject*/
class AlertViewController {

    private token: any;
    private isLoading: boolean;

    constructor(
        private $scope,
        private $timeout,
        private $dialog,
        private $translate,
        private $state,
        private $error,
        private $toast,
        private $alerts,
        private $security,
        private $alertDialog,
        private alert,
        private $hotkeys,
        private ngTableParams) {

        /*
        * Scope
        */

        this.token = $security.getAccessToken();

        this.bindHotkeys();

        this.bindEvents();
    }

    private bindHotkeys() {

        if (this.hasPermissionToEdit()) {
            if (!this.$hotkeys.get(KEY_EDIT)) {
                this.$hotkeys.bindTo(this.$scope)
                    .add({
                        combo: KEY_EDIT,
                        description: this.$translate('Edit current alert'),
                        callback: () => this.edit()
                    });
            }
        } else {
            this.$hotkeys.del(KEY_EDIT);
        }

    }

    /* TODO Refactor to call this.refresh() after changes - it is no longer possible to maintain changes without interaction w. server*/
    private bindEvents() {
        this.$scope.$on('$alerts:update', (event, data) => {
            if (data && (this.alert.id === data.id)) {
                angular.extend(this.alert, data);
            }
        });

        this.$scope.$watch(() => this.alert.finalized, () => {
            this.bindHotkeys()
        })
    }

    hasPermissionToEdit() {
        return !this.alert.finalized && (
            this.$security.authorize('ALERTER_ALERT_EDIT_FOREIGN') || (
                this.$security.authorize('ALERTER_ALERT_EDIT_OWN') &&
                this.$security.owner(this.alert.assignee.userLogin)
            )
        );
    }

    edit() {
        this.$alertDialog.open(this.alert);
    }

    refresh(){
        this.$alerts.get(<any>this.alert.id).then((result) => this.alert = result);
    }

    back() {
        this.$state.go('alerts');
    }
}

export default AlertViewController;
