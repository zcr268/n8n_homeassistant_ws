export declare class SocketConnection<T> {
    private obj;
    close(): void;
    private isReady;
    private isClosed;
    private isError;
    private observers;
    private rejectors;
    constructor(obj: T);
    get_unsafe(): Promise<T>;
    get(): Promise<T>;
    then<TResult1 = T>(observer: ((value: T) => TResult1 | PromiseLike<TResult1>)): Promise<TResult1>;
    ready(): void;
    error(error: string): void;
}
