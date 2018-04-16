declare module 'optionull' {
    export class Optional<T> {
        static empty<T>(): Optional<T>;
        static ofNullable<T>(value: T): Optional<T>;

        getOrElse(fn: (value: T) => T): T;
        getOrElse(defaultValue: T): T;
        get(): T;

        isDefined(): boolean;
        isNotNull(): boolean;
        isPresent(): boolean;

        ifPresent(fn: (value: T) => any): void;
        ifPresentOrElse(fn: (value: T) => any, elseFn: () => any): void;

        map<U>(fn: (value: T) => U): Optional<U>;
        flatMap<U>(fn: (value: T) => any): Optional<U>;

        filter(fn: (value: T) => boolean): Optional<T>;
        filter(val: any): Optional<T>;
    }
}