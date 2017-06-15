class a {
    constructor(c) {
        this.b = c;
    }
    show() {
        console.log(this.b);
    }
}

class b extends a {
    show2(){
        console.log(this.b);
    }
}

const c = new b('asd');
c.show();
c.show2();
