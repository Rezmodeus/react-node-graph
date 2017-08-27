export default {

	questText: {
		nid: 0,
		type: '',
		contentType: '',
		x: 0,
		y: 0,
		fields: {
			in: [{name: '->'}],
			out: [
				{name: '1', str: 'some string'},
				{name: '2', str: 'some other string'}
			]
		}
	},

	response: {
		nid: 0,
		type: '',
		contentType: '',
		x: 0,
		y: 0,
		fields: {
			in: [{name: '->'}],
			out: [{name: '1', str: '->'}]
		}
	},

	condition: {
		nid: 0,
		type: '',
		contentType: '',
		x: 0,
		y: 0,
		fields: {
			in: [{name: '->'}],
			out: [
				{name: '1', str: 'true value'},
				{name: '2', str: 'false'}
			]
		}
	},

	choice: {
		name: '',
		str: 'test'
	}

}
