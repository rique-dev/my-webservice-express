function fun() {
    return new Promise((resolve, reject) => {
        resolve(true);
        // throw new Error('asdasd');
    });
}

const a = async() => {
    try {
        const f = await fun();
        return Promise.resolve(`try ${f}`);
    } catch (error) {
        throw error;
    }
}
async function b() {
    try {
        const c = await a();
        return Promise.resolve(c);
    } catch (error) {
        return Promise.resolve(error);
    }
}
async function v() {
    try {
        console.log(await b())
    } catch (error) {
        console.log(error);
    }
}
v();
