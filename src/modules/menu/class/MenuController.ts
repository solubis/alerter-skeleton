/// <reference path="../../../typings/types.d.ts" />

import AlertService from '../../alerts/class/AlertService';

/*@ngInject*/
class MenuController {

    private permissions;
    private userFullName: string;

    constructor(
        private $state,
        private $alertDialog,
        private $dialog,
        private $toast,
        private $security,
        private $ask,
        private $hotkeys) {

        this.userFullName = $security.getUserFullName();
    }

    addAlert() {
        this.$alertDialog.open();
    }

    showHelp() {
        this.$hotkeys.toggleCheatSheet();
    }

    logout() {
        this.$ask('Logout', 'Czy chcesz się wylogować z aplikacji?')
            .then(() => {
                this.$security.logout();
            })
    }

    showProfile() {
        this.$dialog.open(
            /*@ngInject*/
            {
                templateUrl: 'modules/menu/html/profile.html',
                controller: function($scope, $security) {
                    this.userLogin = $security.getUserLogin();
                    this.userFullName = $security.getUserFullName();
                },
                controllerAs: 'ctrl'
            });
    }

    showSettings() {
        this.$dialog.open(
            /*@ngInject*/
            {
                templateUrl: 'modules/menu/html/settings.html',
                controller: function($scope, $security, $settings) {
                    let permissions = $security.getPermissions();

                    this.permissions = permissions && permissions.sort().join(',\n');
                },
                controllerAs: 'ctrl'
            });
    }
}

export default MenuController;
