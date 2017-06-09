class Provider {
    private message: string;
    public show() {
        this.message = 'Provider';
    }
}

export const {
    show,
} = new Provider();