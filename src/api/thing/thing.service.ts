class Service {
    private message: string;

    public show() {
        this.message = 'Service';
    }
}

export const {
    show,
} = new Service();
