/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const {
  db,
  models: { User, product, order, orderItem }
} = require('../db');
const seed = require('../../script/seed');
const app = require('../app');

describe('Product routes', () => {
  // beforeEach(async () => {
  //   await seed();
  // });

  describe('GET /api/products', () => {
    // Test GET route
    it('returns all products', async () => {
      seed();
      const res = await request(app).get('/api/products').expect(200);

      expect(res.body).to.be.an('array');
      expect(res.body.length).to.equal(2);
    });

    it('returns product with current id', async () => {
      const res = await request(app).get('/api/products/1').expect(200);
      expect(res.body).to.be.an('object');
      expect(res.body.id).to.equal(1);
    });

    it('should return null if product id does not exist', async () => {
      const res = await request(app).get('/api/products/57').expect(200);
      expect(res.body).to.be.null;
    });
  }); // end describe('GET /api/products')

  describe('POST /api/products', () => {
    it('should post a new product', async () => {
      const newProduct = {
        name: 'test',
        description: 'a test',
        imageUrl:
          'https://m3placement.com/wp-content/uploads/2021/03/image-placeholder-350x350-1.png',
        price: 350,
        stock: 350,
        category: 'test'
      };

      const res = await request(app)
        .post('/api/products')
        .send(newProduct)
        .expect(200);

      expect(res.body).to.be.an('object');
      expect(res.body.name).to.equal('test');
      expect(res.body.description).to.equal('a test');
      expect(res.body.price).to.equal(350);
      expect(res.body.stock).to.equal(350);
      expect(res.body.category).to.equal('test');

      seed();
    });

    it('should fail if missing properties', async () => {
      const newProduct = {
        description: 'missing name',
        imageUrl:
          'https://m3placement.com/wp-content/uploads/2021/03/image-placeholder-350x350-1.png',
        price: 350,
        stock: 350,
        category: 'test'
      };

      const res = await request(app)
        .post('/api/products')
        .send(newProduct)
        .expect(500);
    });
  }); // end describe('POST /api/products')
}); // end describe('Product routes')
