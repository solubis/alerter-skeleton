describe('basic', function () {

    it('should login to application', function () {

        browser.get('http://wfp-ci/dev/security#/?redirect_url=http://localhost:3000/dist/index.html');

        expect(browser.getTitle()).toBe('Logowanie');

        $('input[name="username"]').sendKeys('user');
        $('input[name="password"]').sendKeys('user');
        $('a.btn-login').click();

        browser.sleep(1000);

    });

});
