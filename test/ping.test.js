const app = require('../src/app');
const request = require('supertest');
const { expect, assert } = require('chai');

describe('GET /api/ping', () => {
    it('Should return json with the key-value pair of success=true', async () => {
        const response = await request(app).get('/api/ping');
        //Make sure body is a json obj
        assert.typeOf(response.body, 'object');
        //Ensure that the body appropiate key(s)
        expect(response.body).to.have.property('success');
        //Check if key has appropiate value
        expect(response.body.success).to.be.true;
    })
})
