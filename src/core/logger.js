const loggger = {
    _prefix: '[bigger player]:',
    info(msg) {
        console.info(this._prefix, msg);
    },
    warn(msg) {
        console.warn(this._prefix, msg);
    }
};

export default loggger;