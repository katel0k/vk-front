import { EventEmitter } from "./EventEmitter";

test("Simple", () => {
    let emitter: EventEmitter = new EventEmitter();
    let closure: number = 1;
    let callback = () => {closure = 2};
    expect(emitter.on('event', callback)).toBe(true);
    expect(emitter.emit('event')).toBe(1);
    expect(emitter.off('event', callback)).toBe(true);

    expect(closure).toBe(2);
});

test("Double deletion", () => {
    let emitter: EventEmitter = new EventEmitter();
    let callback = () => {};
    expect(emitter.on('event', callback)).toBe(true);
    expect(emitter.off('event', callback)).toBe(true);
    expect(emitter.off('event', callback)).toBe(false);
});

test("Double insertion", () => {
    let emitter: EventEmitter = new EventEmitter();
    let callback = () => {};
    expect(emitter.on('event', callback)).toBe(true);
    expect(emitter.on('event', callback)).toBe(false);
});

test("Multiple callbacks", () => {
    let emitter: EventEmitter = new EventEmitter();
    let closure1: number = 1;
    let callback1 = () => {closure1 = 2;};
    let closure2: number = 1;
    let callback2 = () => {closure2 = 2;};
    expect(emitter.on('event', callback1)).toBe(true);
    expect(emitter.on('event', callback2)).toBe(true);
    expect(emitter.emit('event')).toBe(2);
    expect(closure1).toBe(2);
    expect(closure2).toBe(2);
})

test("Multiple events", () => {
    let emitter: EventEmitter = new EventEmitter();
    let closure1: number = 1;
    let callback1 = () => {closure1 = 2;};
    let closure2: number = 1;
    let callback2 = () => {closure2 = 2;};
    expect(emitter.on('event1', callback1)).toBe(true);
    expect(emitter.on('event2', callback2)).toBe(true);
    expect(emitter.emit('event1')).toBe(1);
    expect(closure1).toBe(2);
    expect(closure2).toBe(1);
    expect(emitter.emit('event2')).toBe(1);
    expect(closure1).toBe(2);
    expect(closure2).toBe(2);
})
