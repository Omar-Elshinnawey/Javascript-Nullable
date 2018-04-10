declare module 'optional' {
    export class Optional<T> {
        static empty<T>(): Optional<T>;
        static ofNullable<T>(value: T): Optional<T>;

        getOr(fn: (value: T) => T): T;
        getOr(defaultValue: T): T;
        get(): T;

        isDefined(): boolean;
        isNotNull(): boolean;
        isPresent(): boolean;

        map<U>(fn: (value: T) => U): Optional<U>;
    }
}