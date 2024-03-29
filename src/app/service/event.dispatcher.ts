export class EventDispatcher<TData> {
    private _subscriptions: Array<(data: TData) => void> = new Array<(data: TData) => void>();
 
    subscribe(fn: (data: TData) => void): void {
        if (fn) {
            this._subscriptions.push(fn);
        }
    }

    unsubscribe(fn: (data: TData) => void): void {
        const i = this._subscriptions.indexOf(fn);
        if (i > -1) {
            this._subscriptions.splice(i, 1);
        }
    }
 
    dispatch(data: TData): void {
        for (const handler of this._subscriptions) {
            handler(data);
        }
    }
}