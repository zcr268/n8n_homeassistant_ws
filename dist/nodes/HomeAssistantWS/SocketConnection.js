"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketConnection = void 0;
class SocketConnection {
    close() {
        this.isClosed = true;
        this.observers = [];
        this.rejectors.forEach(reject => reject(new Error('SocketConnection is closed')));
        this.rejectors = [];
    }
    constructor(obj) {
        this.obj = obj;
        this.isReady = false;
        this.isClosed = false;
        this.isError = null;
        this.observers = [];
        this.rejectors = [];
    }
    get_unsafe() {
        return Promise.resolve(this.obj);
    }
    get() {
        if (this.isReady) {
            return Promise.resolve(this.obj);
        }
        else if (this.isClosed) {
            return Promise.reject(new Error('SocketConnection is closed'));
        }
        else if (this.isError) {
            return Promise.reject(new Error(this.isError));
        }
        else {
            return new Promise((resolve, reject) => {
                this.observers.push(resolve);
                this.rejectors.push(reject);
            });
        }
    }
    then(observer) {
        return this.get().then(observer);
    }
    ready() {
        this.isReady = true;
        this.observers.forEach(observer => observer(this.obj));
        this.observers = [];
        this.rejectors = [];
    }
    error(error) {
        this.isError = error;
        this.rejectors.forEach(observer => observer(new Error(error)));
        this.observers = [];
        this.rejectors = [];
    }
}
exports.SocketConnection = SocketConnection;
//# sourceMappingURL=SocketConnection.js.map