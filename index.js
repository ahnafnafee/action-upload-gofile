const core = require("@actions/core");
const Gofile = require("./gofile.js");

async function run() {
    try {
        const parameters = {
            token: core.getInput("token"),
            path: core.getInput("file"),
        };

        const gofileCommand = new Gofile(parameters)
            .on("complete", function (url, qrcode) {
                console.log("url: " + url);
                console.log("qrcode: " + qrcode);
                core.setOutput("url", url);
                core.setOutput("qrcode", qrcode);
            })
            .on("error", function (error) {
                console.error("Failed: ", error);
                core.setFailed(error.message);
                process.exit(1);
            });

        if (!core.getInput("dry-run")) {
            gofileCommand.execute();
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
