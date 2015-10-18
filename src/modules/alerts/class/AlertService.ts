/// <reference path="../../../typings/types.d.ts" />

import Alert from './Alert';

interface PagingOptions {
    page: number,
    itemsPerPage: number,
    filter?: any,
    sort?: any
}

/*@ngInject*/
class AlertService {

    constructor(private $rootScope,
        private $rest,
        private $utils) {
    }

    createAlert(data) {
        var alert: Alert = new Alert(data);

        return alert;
    }

    get(options: PagingOptions = { page: 0, itemsPerPage: 100 }): ng.IPromise<any> {
        var request;

        if (angular.isObject(options)) {
            let params: any = {
                number: options.page || 0,
                size: options.itemsPerPage || 100
            };

            angular.extend(params, options.filter);

            if (options.sort && Object.keys(options.sort).length) {
                params.orderBy = Object.keys(options.sort)[0];
                params.orderDirection = options.sort[params.orderBy];
            }

            request = this.$rest
                .get({
                    command: 'alert',
                    params: params
                })
                .then((result: any) => {
                    result.content = result.content.map((item) => this.createAlert(item));

                    return result;
                });

        } else {
            request = this.$rest
                .get({
                    command: 'alert' + '/' + options
                })
                .then((result) => this.createAlert(result));
        }

        return request;
    }

    update(id, alert) {
        var request;

        request = this.$rest
            .put({
                command: 'alert/' + id,
                data: alert
            })
            .then((result) => {
                var alert = this.createAlert(result);

                this.broadcast('update', alert);

                return alert;
            });

        return request;
    }

    add(alert) {
        var request;

        request = this.$rest
            .post({
                command: 'alert',
                data: alert
            })
            .then((result) => {
                var alert = this.createAlert(result);

                this.broadcast('add', alert);

                return alert;
            });

        return request;
    }

    broadcast(message, data = undefined) {
        this.$rootScope.$broadcast(`$alerts:${message}`, data);
    }

}

export default AlertService;
