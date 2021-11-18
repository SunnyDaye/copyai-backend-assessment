
const axios = require('axios');
const app = require('../src/app');
const request = require('supertest');
const { expect, assert } = require('chai');
const isInOrder = require('./utils/isInOrder');
const elementsHaveCorrectTags = require('./utils/elementsHaveCorrectTags');

describe('GET /api/posts', () => {
    it('Should return a list of posts in default order(ascending) by the default field(id)', async () => {
        //request
        const response = await request(app).get('/api/posts?tags=health,tech');
        expect(response.body).to.have.property('posts');
        expect(isInOrder((a,b)=>a < b,'id',response.body.posts)).to.be.true;
        expect(elementsHaveCorrectTags(['health','tech'], response.body.posts)).to.be.true;
    });

    it('Should return a list of posts in descending order by id', async () => {
        const response = await request(app).get('/api/posts?tags=history,culture&sortBy=id&direction=desc');
        expect(response.body).to.have.property('posts');
        expect(isInOrder((a,b)=>a > b,'id',response.body.posts)).to.be.true;
        expect(elementsHaveCorrectTags(['history','culture'], response.body.posts)).to.be.true;
        
    });

    it('Should return a list of posts in ascending order by the reads field', async () => {
        const response = await request(app).get('/api/posts?tags=startups&sortBy=reads&direction=asc');
        expect(response.body).to.have.property('posts');
        expect(isInOrder((a,b)=>a < b,'reads',response.body.posts)).to.be.true;
        expect(elementsHaveCorrectTags(['startups'], response.body.posts)).to.be.true;
    });

    it('Should return a list of posts in descending order by the reads field', async () => {
        const response = await request(app).get('/api/posts?tags=startups&sortBy=reads&direction=desc');
        expect(response.body).to.have.property('posts');
        expect(isInOrder((a,b)=>a > b,'reads',response.body.posts)).to.be.true;
        expect(elementsHaveCorrectTags(['startups'], response.body.posts)).to.be.true;
    });

    it('Should return a list of posts in ascending order by the likes field', async () => {
        const response = await request(app).get('/api/posts?tags=design,science&sortBy=likes&direction=asc');
        expect(response.body).to.have.property('posts');
        expect(isInOrder((a,b)=>a < b,'likes',response.body.posts)).to.be.true;
        expect(elementsHaveCorrectTags(['design','science'], response.body.posts)).to.be.true;
    });

    it('Should return a list of posts in descending order by the likes field', async () => {
        const response = await request(app).get('/api/posts?tags=design,science&sortBy=liked&direction=desc');
        expect(response.body).to.have.property('posts');
        expect(isInOrder((a,b)=>a > b,'likes',response.body.posts)).to.be.true;
        expect(elementsHaveCorrectTags(['design','science'], response.body.posts)).to.be.true;
    });

    it('Should return a list of posts in ascending order by the popularity field', async () => {
        const response = await request(app).get('/api/posts?tags=politics&sortBy=popularity&direction=asc');
        expect(response.body).to.have.property('posts');
        expect(isInOrder((a,b)=>a < b,'popularity',response.body.posts)).to.be.true;
        expect(elementsHaveCorrectTags(['politics'], response.body.posts)).to.be.true;
    });

    it('Should return a list of posts in descending order by the popularity field', async () => {
        const response = await request(app).get('/api/posts?tags=politics&sortBy=popularity&direction=desc');
        expect(response.body).to.have.property('posts');
        expect(isInOrder((a,b)=>a > b,'popularity',response.body.posts)).to.be.true;
        expect(elementsHaveCorrectTags(['politics'], response.body.posts)).to.be.true;
    });
    it('Should return an error message with status code 400 if tags query parameter is missing', async () => {
        //request
        const response = await request(app).get('/api/posts?tags=health,tech');
        expect(response.body).to.have.property('error');
        expect(response.status).to.equal(400);
    });
    it('Should return an error message with status code 400 if sortBy query parameter is invalid', async () => {
        //request
        const response = await request(app).get('/api/posts?tags=health,tech');
        expect(response.body).to.have.property('error');
        expect(response.status).to.equal(400);
       
    });
    it('Should return an error message with status code 400 if direction query parameter is invalid', async () => {
        //request
        const response = await request(app).get('/api/posts?tags=health,tech');
        expect(response.body).to.have.property('error');
        expect(response.status).to.equal(400);
    });
});