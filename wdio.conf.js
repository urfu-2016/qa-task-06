exports.config = {
	host: 'hub-cloud.browserstack.com',
    port: 4444,
    path: '/wd/hub',
    user: 'xeniapeter1',
    key:  'o7gL4AgWtLzsHnqGekue',
    //
    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the directory
    // from which `wdio` was called. Notice that, if you are calling `wdio` from an
    // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
    // directory is where your package.json resides, so `wdio` will be called from there.
    //
    specs: [
        'tests/**'
    ],


    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://docs.saucelabs.com/reference/platforms-configurator
    //
    capabilities: [
		{
			browserName: 'chrome'
		},
		{
			browserName: 'firefox',
		}
	],

    screenshotPath: 'shots',

    baseUrl: 'http://urfu-2016-testing.herokuapp.com/',

    waitforTimeout: 1000,

    framework: 'mocha'
};