function a(entity) {
    if (!entity) {
        entity = {};
    }
    const _entity = {
        a: 'a'
    };
    return Object.assign(_entity, entity);
}

console.log(a({b:'b'}));
