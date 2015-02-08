var util = require('util')

module.exports = function(table, object, fields, valuePlaceholder) {
	var query = 'INSERT INTO ' + table + ' ('

	// handle calls like siq('table', {...}, '$')
	if (typeof fields === 'string') {
		var _valuePlaceholder = fields
		valuePlaceholder = function () { return _valuePlaceholder }
		fields = undefined
	}

	// handle calls like siq('table', {...}, function () { ... })
	if (typeof fields === 'function') {
		valuePlaceholder = fields
		fields = undefined
	}

	valuePlaceholder = valuePlaceholder || defaultPlaceholder
	fields = fields || Object.keys(object)

	var values = []

	// gather the values and concat the field names for them
	for (var i = 0; i < fields.length; i++) {
		var field = fields[i]
		var value = object[field]

		if (value !== undefined) {
			if (values.length > 0) {
				query += ','
			}

			query += field
			values.push(value)
		}
	}

	if (values.length === 0) {
		throw new Error('missing values. the object might have no properties of field restriction does not include any of the existing properties')
	}

	// create the values placeholder part of the query
	query += ') VALUES ('

	for (var i = 0; i < values.length; i++) {
		if (i > 0) {
			query += ','
		}

		query += valuePlaceholder(i)
	}

	query += ')'


	return {
		query: query,
		values: values
	}
}

function defaultPlaceholder() {
	return '?'
}