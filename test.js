var insertQuery = require('./index')
var should = require('should')

describe('creates an insert query and prepares an array of values', function () {
	it('from a javascript object', function () {
		var result = insertQuery('myTable', { a: 1, b: '2', c: false })
		result.should.have.property('query', 'INSERT INTO myTable (a,b,c) VALUES (?,?,?)')
		result.should.have.property('values')
		result.values.should.eql([1, '2', false])
	})

	it('from a javascript object with field restriction', function () {
		var result = insertQuery('myTable', { a: 1, b: '2', c: false }, ['a', 'b', 'd'])
		result.should.have.property('query', 'INSERT INTO myTable (a,b) VALUES (?,?)')
		result.should.have.property('values')
		result.values.should.eql([1, '2'])
	})

	it('from a javascript object with one property', function () {
		var result = insertQuery('myTable', { a: 1 })
		result.should.have.property('query', 'INSERT INTO myTable (a) VALUES (?)')
		result.should.have.property('values')
		result.values.should.eql([1])	
	})

	it('from a javascript object using static custom value placeholder', function () {
		var result = insertQuery('myTable', { a: 1, b: '2', c: false }, '%')
		result.should.have.property('query', 'INSERT INTO myTable (a,b,c) VALUES (%,%,%)')
		result.should.have.property('values')
		result.values.should.eql([1, '2', false])
	})

	it('from a javascript object using dynamic custom value placeholder', function () {
		var result = insertQuery('myTable', { a: 1, b: '2', c: false }, function(i) {
			return '%' + (i + 1)
		})

		result.should.have.property('query', 'INSERT INTO myTable (a,b,c) VALUES (%1,%2,%3)')
		result.should.have.property('values')
		result.values.should.eql([1, '2', false])
	})

	it('but throws an error if no values or fields can be included', function () {
		(function () {
			insertQuery('myTable', {})
		}).should.throw('missing values. the object might have no properties of field restriction does not include any of the existing properties');

		(function () {
			insertQuery('myTable', { a: 1 }, ['b'])
		}).should.throw('missing values. the object might have no properties of field restriction does not include any of the existing properties');			
	})	
})