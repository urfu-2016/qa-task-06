exports.config = {
    user: 'alexander1095',//process.env.BROWSERSTACK_USER,
    key: 'eaQ9LiJKybpRc6Xbjzqj',//process.env.BROWSERSTACK_KEY,
    specs: [
        './tests/*.js'
    ],
    exclude: [],
    maxInstances: 5,
    capabilities: [
        {
            browserName: 'chrome',
            name: 'chrome tests',
        },
        {
            browserName: 'firefox',
            name: 'firefox tests'
        }
    ],
    sync: true,
    logLevel: 'command',
    coloredLogs: true,
    bail: 0,
    screenshotPath: './errorShots',
    baseUrl: 'http://urfu-2016-testing.herokuapp.com/',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    services: ['browserstack'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 30000
    }
}
