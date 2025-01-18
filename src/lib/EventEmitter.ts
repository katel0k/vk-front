type EventData = any;

type EventCallback = (data?: EventData) => void

export interface IEventEmitter {
    /**
     * If no such callback was there before, adds it as a listener
     * @returns true if no such callback was present before
     */
    on: (event: string, callback: EventCallback) => boolean,
    /**
     * @returns number of callbacks called
     */
    emit: (event: string, data?: EventData) => number,
    /**
     * @returns true if callback was found and deleted, false otherwise
     */
    off: (event: string, callback: EventCallback) => boolean,
}

export class EventEmitter implements IEventEmitter {
    private callbackMap: {
        [event: string]: EventCallback[],
    } = {}
    public on(event: string, callback: EventCallback): boolean {
        if (event in this.callbackMap) {
            if (this.callbackMap[event].indexOf(callback) != -1) {
                return false;
            }
            this.callbackMap[event].push(callback);
        } else {
            this.callbackMap[event] = [callback];
        }
        return true;
    }
    public emit(event: string, data?: EventData): number {
        if (!(event in this.callbackMap)) {
            return 0;
        }
        this.callbackMap[event].forEach((callback: EventCallback) => callback(data));
        return this.callbackMap[event].length;
    }
    public off(event: string, callback: EventCallback): boolean {
        if (!(event in this.callbackMap)) {
            return false;
        }
        let index: number = this.callbackMap[event].indexOf(callback);
        if (index == -1) {
            return false;
        }
        this.callbackMap[event].splice(index, 1);
        return true;
    }
}
