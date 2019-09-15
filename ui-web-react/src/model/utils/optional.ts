export declare type mapper<A, B> = (a: A) => B;

export interface Optional<T> {
    readonly map: <P>(func: mapper<T, P>) => Optional<P>;
    readonly chain: <P>(func: mapper<T, Optional<P>>) => Optional<P>;
    readonly getNullable: () => T | null;
    readonly getOrElse: (defaultValue: T) => T;
    readonly getOrUndefined: () => T | undefined;
    readonly isSome: () => boolean;
    readonly isNone: () => boolean;
    readonly isEqual: (another: Optional<T>) => boolean;
    readonly ifPresent: (func: (value: T) => void) => void;
    readonly alt: (another: Optional<T>) => Optional<T>;
}

class Some<T> implements Optional<T> {
    readonly value: T;

    constructor(value: T) {
        this.value = value;
    }

    map<P>(func: mapper<T, P>): Optional<P> {
        return new Some(func(this.value));
    }

    chain<P>(func: mapper<T, Optional<P>>): Optional<P> {
        return func(this.value);
    }

    getNullable(): T | null {
        return this.value;
    }

    getOrElse(defaultValue: T): T {
        return this.value;
    }

    getOrUndefined(): T | undefined {
        return this.value;
    }

    isSome(): boolean {
        return true;
    }

    isNone(): boolean {
        return false;
    }

    isEqual(another: Optional<T>): boolean {
        return another.map(anotherValue => this.value === anotherValue).getOrElse(false);
    }

    ifPresent(func: (value: T) => void): void {
        func(this.value);
    }

    alt(another: Optional<T>): Optional<T> {
        return this;
    }

}

class None<T> implements Optional<T> {
    map<P>(func: mapper<T, P>): Optional<P> {
        return this as any;
    }

    chain<P>(func: mapper<T, Optional<P>>): Optional<P> {
        return this as any;
    }

    getNullable(): T | null {
        return null;
    }

    getOrElse(defaultValue: T): T {
        return defaultValue;
    }

    getOrUndefined(): T | undefined {
        return undefined;
    }

    isSome(): boolean {
        return false;
    }

    isNone(): boolean {
        return true;
    }

    isEqual(another: Optional<T>): boolean {
        return another.isNone();
    }
    ifPresent(func: (value: T) => void): void {
        // do nothing
    }

    alt(another: Optional<T>): Optional<T> {
        return another;
    }

}

export const none: None<any> = new None<any>();
export const some = <T> (value: T) => new Some<T>(value);
export const fromNullable = <T>(value?: T): Optional<T> => value ? some(value) : none;