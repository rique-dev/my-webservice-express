import Model from '../api/thing/base/thing.model';

export function mock() {
    Model.find({})
        .remove()
        .then(() => {
            Model.create(
                {
                    name: 'Frio'
                }, {
                    name: 'Free'
                }, {
                    name: 'Quente'
                }, {
                    name: 'Veg'
                }, {
                    name: 'Fatia'
                }
            );
        });
}
