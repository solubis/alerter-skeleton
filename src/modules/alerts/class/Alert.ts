/// <reference path="../../../typings/types.d.ts" />

const DEFAULT_PRIORITY_CODE = '10';

interface Assignee {
    userLogin:  string;
    groupId:  number;
    hierarchyId:  number;
    userFullName?:  string;
    groupName?:  string;
    hierarchyName?:  string;
}

class Alert {

    id:  number;
    title:  string;
    assignee:  Assignee;
    description:  string;
    creationDate:  number;
    modificationDate:  number;

    constructor(data) {

        data = data || {
            priority: DEFAULT_PRIORITY_CODE
        };

        angular.extend(this, data);
    }

    isNew() {

        return !this.id;
    }
}

export default Alert;
