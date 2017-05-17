exports.config = {
    
    //
    // =================
    // Service Providers
    // =================
    // WebdriverIO supports Sauce Labs, Browserstack, and Testing Bot (other cloud providers
    // should work too though). These services define specific user and key (or access key)
    // values you need to put in here in order to connect to these services.
    //
    user: "georgy",
    key: "2d20cd62-cd70-4418-9d23-5e112520341c",

    specs: [
        './tests/*.js'
    ],

    exclude: [
    ],

    maxInstances: 10,

    capabilities: [
        {
			browserName: 'firefox',
			name: 'firefox mongomart tests'
        },
        {
            browserName: 'chrome',
            name: 'chrome mongomart tests'
        }],

    sync: true,

    logLevel: 'command',
 
    coloredLogs: true,

    bail: 0,

    screenshotPath: './errorShots/',

    baseUrl: 'http://urfu-2016-testing.herokuapp.com',

    waitforTimeout: 10000,

    connectionRetryTimeout: 90000,

    connectionRetryCount: 3,
  
    services: ['sauce'],
   
    framework: 'mocha',
   
    reporters: ['spec'],
    
 
    mochaOpts: {
        ui: 'bdd',
        timeout: 30000
    }
}
