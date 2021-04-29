const helpers = require("./stark-testing/helpers");

/**
 * Load karma config from Stark
 */
const defaultKarmaConfig = require("./stark-testing/karma.conf.js").rawKarmaConfig;

const customReportsConfig = { ...defaultKarmaConfig.coverageIstanbulReporter["report-config"] };
let packageName;

if (helpers.currentFolder === "stark") {
	const args = process.argv.slice(2);
	for (const arg of args) {
		if (arg.match(/^stark-\w+$/)) {
			packageName = arg;
		}
	}
} else if (helpers.currentFolder.match(/^stark-\w+$/)) {
	packageName = helpers.currentFolder;
} else {
	console.error("No stark package defined!");
	exit(1);
}

// change the path of the reports to put them all in the same parent folder
// this makes it easier to make all adaptations needed for Coveralls later on (see combine-packages-coverage.js)
for (const report of Object.keys(customReportsConfig)) {
	customReportsConfig[report].subdir = `coverage/packages/${packageName}`;
}

// start customizing the KarmaCI configuration from stark-testing
const starkPackagesSpecificConfiguration = {
	...defaultKarmaConfig,
	// add missing files due to "@nationalbankbelgium/stark-*" imports used in mock files of the testing sub-package
	coverageIstanbulReporter: {
		...defaultKarmaConfig.coverageIstanbulReporter,
		dir: helpers.currentFolder === "stark" ? helpers.root("reports") : helpers.root("../../reports"),
		"report-config": customReportsConfig
	}
};

// export the configuration function that karma expects and simply return the stark configuration
module.exports = {
	default: function (config) {
		return config.set(starkPackagesSpecificConfiguration);
	},
	rawKarmaConfig: starkPackagesSpecificConfiguration
};
