import request from 'supertest';
import app from '../../../app';

describe('User Login', () => {

    /**
     * sample test
     */
    it('shoudl throw an error when email is empty', (done) => {
        return request(app)
            .get('/api/v1/test')
            .set('accept', 'application/json') 
            .end((err, res) => {
                expect(res.body).toEqual({
                    status: 'error',
                    message: 'this is a test endpoint'
                  })
                err && done(err)
                done()
            })
    });
    
})