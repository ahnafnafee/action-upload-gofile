const process = require("process");
const cp = require("child_process");
const path = require("path");

test("test runs", () => {
    process.env["GOFILE_TOKEN"] = "";
    const ip = path.join(__dirname, "index.js");
    console.log(cp.execSync(`node ${ip}`).toString());
});
