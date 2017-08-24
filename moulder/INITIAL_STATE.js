import ExampleGraph from './ExampleGraph'

console.log(ExampleGraph)
const emptyGraph = {
	nodes: [
		{
			'nid': 1,
			'type': 'Start',
			'contentType': 'quest',
			'x': 400,
			'y': 300,
			'fields': {
				'in': [],
				'out': [
					{name: 'start', str: 'start'}
				]
			}
		}
	],
	connections: []
};
export default {

	selectedNode: -1,
	nodeKey: 2,
	// graph: {...ExampleGraph}
	graph: {...emptyGraph}
	// graph: {nodes: [], connections: []}

};
