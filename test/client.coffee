FrstClient = require("../lib")
chai = require "chai"
should = chai.should()

describe 'the client', ->
        it 'should be instantiatable', ->
                frst = new FrstClient()
                should.exist(frst)