/* global describe it */
const chai = require('chai')
const plantumlEncoder = require('../lib/plantuml-encoder')

const expect = chai.expect
const puml = `@startuml

Some -> (Object)

@enduml`

describe('plantuml-encoder', function () {
  describe('#encode()', function () {
    it('should encode "A -> B: Hello"', function () {
      const encoded = plantumlEncoder.encode('A -> B: Hello')
      expect(encoded).to.equal('UDfpLD2rKt2oKl18pSd91m0KGWDz')
    })
    it('should encode UTF-8 "A -> B: Hello/你好"', function () {
      const encoded = plantumlEncoder.encode('A -> B: Hello/你好')
      expect(encoded).to.equal('UDfpLD2rKt2oKl18pSd9rt-oTy7JfNi1FZK8D000')
    })
    it('should encode puml', function () {
      const encoded = plantumlEncoder.encode(puml)
      expect(encoded).to.equal('UDfpA2v9B2efpStXuWhEpqrLqBLJqF1FoafDBj7aud98pKi1IW40sPqBaG00')
    })
  })

  describe('#decode()', function () {
    it('should decode "A -> B: Hello"', function () {
      const plain = 'A -> B: Hello'
      const crypt = 'UDfpLD2rKt2oKl18pSd91m0KGWDz'
      const decoded = plantumlEncoder.decode(crypt)
      expect(decoded).to.equal(plain)
    })
    it('should decode UTF-8 "A -> B: Hello/你好"', function () {
      const decoded = plantumlEncoder.decode('UDfpLD2rKt2oKl18pSd9rt-oTy7JfNi1FZK8D000')
      expect(decoded).to.equal('A -> B: Hello/你好')
    })
    it('should decode puml', function () {
      const decoded = plantumlEncoder.decode('UDfpA2v9B2efpStXuWhEpqrLqBLJqF1FoafDBj7aud98pKi1IW40sPqBaG00')
      expect(decoded).to.equal(puml)
    })
  })
})
