const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");
const util = require("util");
const EventEmitter = require("events").EventEmitter;

const UPLOAD_URL = "https://store1.gofile.io/uploadFile";
const LINK_PREFIX = "https://store1.gofile.io/download/";
const QR_URL = "https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=";
const POLL_MAX_COUNT = 10;
const POLL_INTERVAL = 2;

const sleep = (seconds) => {
    return new Promise((resolve) => {
        setTimeout(resolve, seconds * 1000);
    });
};

const Gofile = function (parameters) {
    if (!parameters) {
        parameters = {};
    }

    this.token = parameters.token.trim();
    this.path = parameters.path.trim();
    if (!fs.existsSync(this.path)) {
        throw new Error("Could not find file at " + this.path);
    }

    // Create the required form fields
    this.formData = {
        token: this.token,
        file: fs.createReadStream(this.path),
    };

    // Append the optional parameters to the formData
    ["token"].forEach((key) => {
        if (parameters[key]) {
            this.formData[key] = parameters[key];
        }
    });
};

Gofile.prototype.execute = async function () {
    try {
        const data = new FormData();
        for (var key in this.formData) {
            data.append(key, this.formData[key]);
        }

        const config = {
            headers:
                data.getHeaders() /* { 'Content-Type': 'multipart/form-data' } */,
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
        };

        const response = await axios.post(UPLOAD_URL, data, config);

        this.job = response.data.job;

        this.poll.bind(this)();
    } catch (error) {
        this.emit("error", new Error(error));
    }
};

Gofile.prototype.poll = function (pollCount) {
    if (pollCount > POLL_MAX_COUNT) {
        this.emit("error", new Error("Timed out polling for job completion"));
        return;
    }

    sleep(POLL_INTERVAL)
        .then(
            function (response) {
                try {
                    switch (response.data.status) {
                        case "ok":
                            if (response.data.link) {
                                const DOWNLOAD_URL =
                                    LINK_PREFIX +
                                    response.data.fileId +
                                    "/" +
                                    response.data.fileName;

                                this.emit(
                                    "complete",
                                    DOWNLOAD_URL,
                                    QR_URL + DOWNLOAD_URL
                                );
                            } else {
                                this.emit(
                                    "error",
                                    new Error(
                                        "Failed to get link from success response"
                                    )
                                );
                            }
                            return;
                        case 2001:
                            // Nothing, this just means poll again
                            break;
                        default:
                            this.emit(
                                "error",
                                new Error(
                                    "Error in status response - " +
                                        response.data.message
                                )
                            );
                            return;
                    }
                    this.poll(pollCount + 1);
                } catch (err) {
                    this.emit("error", new Error(err));
                    return;
                }
            }.bind(this)
        )
        .catch(
            function (error) {
                this.emit("error", new Error(error));
            }.bind(this)
        );
};

util.inherits(Gofile, EventEmitter);

module.exports = Gofile;
