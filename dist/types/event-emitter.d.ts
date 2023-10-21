export interface DuneEventEmitter {
    on(eventName: string, listener: Function): void;
    off(eventName: string, listener: Function): void;
    emit(eventName: string, ...args: any[]): void;
}
