import ExampleGraph from './ExampleGraph'
console.log(ExampleGraph)
const emptyGraph = {nodes:[],connections:[]};
export default {

	selectedNode: -1,
	nodeKey: 1000,
	//graph: {...ExampleGraph}
	graph: {...emptyGraph}

};
