interface IExempleService {
    funcPublic(value: number): string;
}

export class ExempleService implements IExempleService {
    constructor() {
    }

    public funcPublic(value: number) {
        const aString: string = 'test';
        this.funcPrivate();
        return aString;
    }

    private funcPrivate(): void {
        return;
    }

    static FuncStatic(value: string) {
        const aNumber: number = 1;
        return aNumber;
    }

    async set() {
    }

    get() {
        return {};
    }
}