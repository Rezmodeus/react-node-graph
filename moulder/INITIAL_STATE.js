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
					{name: 'prolog', str: 'prolog'},
					{name: 'started', str: 'started'},
					{name: 'end', str: 'end'},
					{name: 'failure', str: 'failure'},
					{name: 'reward', str: 'reward'},
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
