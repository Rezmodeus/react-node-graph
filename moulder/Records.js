export default {

	questText: {
		nid: 0,
		type: '',
		contentType: '',
		data: {
			text: ''
		},
		x: 0,
		y: 0,
		fields: {
			in: [{name: '->'}],
			out: [
				{name: '1', str: 'some string', strRaw:'some string'},
				{name: '2', str: 'some other string', strRaw:'some other string'}
			]
		}
	},

	response: {
		nid: 0,
		type: '',
		contentType: '',
		data: {
			text: ''
		},
		x: 0,
		y: 0,
		fields: {
			in: [{name: '->'}],
			out: [{name: '1', str: '->', strRaw: '->'}]
		}
	},

	condition: {
		nid: 0,
		type: '',
		contentType: '',
		data: {
			text: ''
		},
		x: 0,
		y: 0,
		fields: {
			in: [{name: '->'}],
			out: [
				{name: '1', str: 'true value', strRaw:'true value'},
				{name: '2', str: 'false', strRaw:'false'}
			]
		}
	},

	entity: {
		nid: 0,
		type: '',
		contentType: '',
		data: {
			name: '',
			type: '',
		},
		x: 0,
		y: 0,
		fields: {
			in: [],
			out: []
		}
	},

	npc: {
		nid: 0,
		type: '',
		contentType: '',
		data: {
			name: '',
			type: 'npc',
		},
		x: 0,
		y: 0,
		fields: {
			in: [],
			out: []
		}
	},

	item: {
		nid: 0,
		type: '',
		contentType: '',
		data: {
			name: '',
			type: 'item',
		},
		x: 0,
		y: 0,
		fields: {
			in: [],
			out: []
		}
	},

	location: {
		nid: 0,
		type: '',
		contentType: '',
		data: {
			name: '',
			type: 'location',
		},
		x: 0,
		y: 0,
		fields: {
			in: [],
			out: []
		}
	},

	choice: {
		name: '',
		str: 'test',
		rawStr: 'test'
	}

}
