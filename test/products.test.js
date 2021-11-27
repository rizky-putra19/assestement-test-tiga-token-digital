const app = require('../server');
const supertest = require('supertest');

test('POST /v1/product', async () => {
    const dataProduct = {
        name: 'Samsung Galaxy 9',
        qty: 100,
        picture: 'https://res.cloudinary.com/dejongos/image/upload/v1637437182/cover/cat6_prod3-500x500_yp2mg3.jpg',
        expiredAt: '2025-11-27'
    }

    await supertest(app)
        .post('/v1/product')
        .send(dataProduct)
        .expect(200)
        .then((res) => {
            expect(res.body.dataProduct.name).toBe(dataProduct.name)
            expect(res.body.dataProduct.qty).toBe(dataProduct.qty)
            expect(res.body.dataProduct.picture).toBe(dataProduct.picture)
            expect(res.body.dataProduct.expiredAt).toBe(dataProduct.expiredAt)
        })
});

test('GET /v1/product', async () => {
    await supertest(app)
        .get('v1/product')
        .expect(200)
        .then((res) => {
            expect(Array.isArray(res.body.data)).toBeTruthy();
        });
});

test('GET /v1/product/:id', async () => {
    await supertest(app)
        .get('v1/product/1')
        .expect(200)
        .then((res) => {
            expect(typeof res.body).toBe('object');
        });
});

test('DELETE /v1/items/:id', async () => {
    const dataProduct = {
        name: 'test-delete',
        qty: 100,
        picture: 'https://res.cloudinary.com/dejongos/image/upload/v1637437182/cover/cat6_prod3-500x500_yp2mg3.jpg',
        expiredAt: '2025-11-27',
    }

    const createData = await supertest(app)
        .post('/v1/product')
        .send(dataProduct);

    await supertest(app)
        .delete('/v1/product/' + createData.body.dataProduct.id)
        .expect(200)
        .then((res) => {
            expect(res.body.status).toBe('success')
        });
});

test('PUT /v1/product/:id', async () => {
    const updateData = {
        name: 'test-update'
    };

    await supertest(app)
    .put('/v1/product/1')
    .send(updateData)
    .expect(200)
    .then((res) => {
        expect(typeof res.body).toBe('object')
    })
});
