import { DuneEventEmitter } from '../types';
export interface DuneState {
    setState(newState: object): void;
    getState(): object;
    subscribe(callback: (state: object) => void): void;
    unsubscribe(callback: (state: object) => void): void;
    clearState(): void;
    _eventEmitter: DuneEventEmitter;
}
