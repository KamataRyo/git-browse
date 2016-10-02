var should = require('should')
var exec = require('child_process').exec
var meta = require('../package.json')

should()
var gitBrowse = './bin.js'

describe('version command', () => {
  it('should show version', done => {
    var cmd = `${gitBrowse}`
    exec(cmd, (err, stdout) => {
      stdout.should.be.a.String()
        .and.match(new RegExp(meta.verison))
      done()
    })
  })

  it('should export completion scripts', done => {
    var cmd = `${gitBrowse} --completion`
    exec(cmd, (err, stdout) => {
      stdout.should.be.a.String()
        .and.match(/_git-browse\(\)/)
      done()
    })
  })

  it('should exec open with single argument', done => {
    var cmd = `${gitBrowse} git-browse`
    exec(cmd, (err, stdout) => {
      should(err, null)
      stdout.should.be.a.String()
        .and.match(/github\.com\/kamataryo\/git-browse/i)
      done()
    })
  })


  it('should exec open with 2 arguments', done => {
    var cmd = `${gitBrowse} kamataryo git-browse`
    exec(cmd, (err, stdout) => {
      should(err, null)
      stdout.should.be.a.String()
        .and.match(/github\.com\/kamataryo\/git-browse/i)
      done()
    })
  })

})
