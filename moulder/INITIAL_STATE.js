import ExampleGraph from './ExampleGraph'

console.log(ExampleGraph)
const emptyGraph = {
	nodes: [
		{
			'nid': 1,
			'type': 'Start',
			'contentType': 'quest',
			data: {
				test: 'Derp'
			},
			'x': 100,
			'y': 100,
			'fields': {
				'in': [],
				'out': [
					{name: 'start', str: 'start', strRaw: 'start'}
				]
			}
		}
	],
	connections: []
};
export default {
	view: 'graph',
	questPlayerCurrentNid: 2,

	selectedNode: -1,
	nodeKey: 2,
	// graph: {...ExampleGraph}
	graph: {...emptyGraph}
	// graph: {nodes: [], connections: []}

};
