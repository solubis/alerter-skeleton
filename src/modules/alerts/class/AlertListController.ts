/// <reference path="../../../typings/types.d.ts" />

import Alert from './Alert';
import AlertService from './AlertService';

/*@ngInject*/
class AlertListController {
    /*
     Remember params to use it when return from another state
     */
    static params = {
        total: 0,
        page: 1,
        count: 50,
        sorting: {
            modificationDate: 'desc'
        },
        filter: null
    };

    static saveParams(params) {
        AlertListController.params = {
            total: params.total(),
            sorting: params.sorting(),
            page: params.page(),
            count: params.count(),
            filter: params.filter()
        }
    }

    private tableParams: any;
    private isLoading = true;
    private isStarting = true;
    private data: any[] = [];
    private filter: any;
    private total: number;
    private lastRecordNumber: number;
    private firstRecordNumber: number;
    private allSelected;

    constructor(
        private $scope,
        private $q,
        private $alerts: AlertService,
        private $security,
        private $timeout,
        private $ask,
        private $alertDialog,
        private $dialog,
        private $sidebar,
        private $toast,
        private $error,
        private $format,
        private ngTableParams) {

        $scope.$on('$alerts:update', (event, alert) => {
            this.data.forEach((item) => {
                if (item.id === alert.id) {
                    angular.extend(item, alert);
                }
            })
        });

        $scope.$on('$alerts:add', (event, alert) => {
            this.data.unshift(alert);
        });

        $scope.$on('$alerts:remove', (event, alert) => {
            this.data.splice(this.data.indexOf(alert), 1);
        });

        $scope.$on('$alerts:reload', (event, data) => {
            this.reload();
        });

        this.tableParams = new ngTableParams();

        this.setTableParams();
    }

    getData = ($defer, params) => {
        var page = params.page() - 1;
        var count = params.count();
        var filter = params.filter();
        var sorting = params.sorting();

        this.isLoading = true;

        this.$alerts
            .get({ page: page, itemsPerPage: count, filter: filter, sort: sorting })
            .then((result) => {
                params.total(result.totalElements);

                this.data = result.content;
                this.total = result.totalElements;
                this.firstRecordNumber = result.number * result.size + 1;
                this.lastRecordNumber = this.firstRecordNumber + result.numberOfElements - 1;

                $defer.resolve(this.data);
            })
            .finally(() => {
                this.isLoading = false;
                this.isStarting = false;

                AlertListController.saveParams(params);
            });
    };

    setTableParams() {
        this.tableParams.settings({
            counts: [10, 50, 100],
            total: AlertListController.params.total,
            filterDelay: 0,
            getData: this.getData
        });

        this.tableParams.parameters(AlertListController.params);
    }

    hasPermissionToEdit(alert) {
        return !alert.finalized && (
            this.$security.authorize('ALERTER_ALERT_EDIT_FOREIGN') ||
            (this.$security.authorize('ALERTER_ALERT_EDIT_OWN') && this.$security.owner(alert.assignee.userLogin))
        )
    }

    edit(alert) {
        this.$alertDialog.open(alert);
    }

    reload() {
        this.tableParams.reload();
    }
}

export default AlertListController;
