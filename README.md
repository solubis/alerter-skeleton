#  Skeleton UI [![Build Status](http://wfp-ci/buildStatus/icon?job=sqr-ui-build)](http://wfp-ci/view/Build/job/sqr-ui-build/)

## Getting Started

To use this application clone or fork this repository from Gitlab

    $ git clone git@code.solubis.com:-components/skeleton.git
    $ cd alerter

To install dependencies:

    $ npm install

To run development server:

    $ grunt server

(If browser is not automatically openened then go to URL: http://localhost:3000/src/index.html)

** WARNING ** : You need to start OAUTH Server (https://code.solubis.com//security/tree/develop) and REST Server (https://code.solubis.com/squealer/rest/tree/develop) before UI.

To develop  UI and/or iQ Security frameworks link their folders to `lib/ui` and/or `lib/core` respectively.

To build distribution version:

    $ grunt

To build distribution version after modification to  UI and/or iQ Security:

    $ grunt complete

To run distribution version:

(If browser is not automatically openened then go to URL: http://localhost:3000/dist/index.html)

    $ grunt server:dist

To install webdriver for Protractor tests:

    $ npm run update-webdriver

To run E2E protractor tests:

    $ grunt e2e

To run Karma unit tests

    $ grunt unit

## Configuration file

You can configure various settings in Squeler using in window.IQ_CONFIG variable.
It can be set in script tag or loaded from external file named `config.js` in index.html (this is default behaviour)

The contents are:
```
window.IQ_CONFIG = {
    'version': '0.15.0', // DO NOT CHANGE! it is changed during build
    'restURL': 'http://wfp-ci/dev', // REST Server URL
    'loginURL': 'http://wfp-ci/dev/security', // Login application URL
    'publicKey': '-----BEGIN PUBLIC KEY----- ......', // Public key to verify token signature
    'maxFileAttachmentSize': 10485760 // maximum size for file attachments (should be coordinated with server settings)
};
```

## Dependencies

Squealer depends on following libraries:

-  UI Framework (https://code.solubis.com/-components/ui/tree/develop)
-  Core Framework (https://code.solubis.com/-components/core/tree/develop)

## Containerize installation

Build image:

    $ clean deploy -Pdock

Run containers:
Please refer to system's [README.md](https://code.solubis.com/squealer/system/blob/master/README.md)

## Bugs and Issues (JIRA)

Have a bug or an issue? [Open a new issue](https://jira.solubis.com/browse/)

## Copyright and License

Copyright 2015 IMPAQ
