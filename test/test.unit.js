var lib    = require('../lib')
var should = require('should')

should()

describe('test of searchRepos', () => {
    it('the function should return a instance of Promise', () => {
        lib.searchRepos().should.be.instanceof(Promise)
    })
})
