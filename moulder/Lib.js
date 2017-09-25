export default {
	parseText(nodes, str) {
		const pat = /\{(.+?)\}/g;
		return str.replace(pat, this.replaceText.bind(null, nodes));

	},

	// not done
	replaceText(nodes, str) {
		const a = str.substring(1, str.length - 1).split('.');
		let newText = str;
		if (a.length > 1) {
			const nid = parseInt(a[0]);
			const node = nodes.find(n => n.nid === nid);
			if (node) {
				if (node.data) {
					if (node.data[a[1]]) {
						newText = node.data[a[1]];
					} else {
						newText = '{missing param}';
					}
				} else {
					newText = '{missing data}';
				}
			} else {
				newText = '{missing node}';
			}
		} else {
			newText = '{not enough params}';
		}
		return newText;
	},

	setMainText(nodes, nodeObj, text) {
		return {
			...nodeObj,
			type: this.parseText(nodes, text),
			data: {
				...nodeObj.data,
				text
			}
		};
	},

	setOutText(nodes, nodeObj, index, text) {
		const outs = [...nodeObj.fields.out];
		outs[index] = {
			...nodeObj.fields.out[index],
			str: this.parseText(nodes, text),
			strRaw: text
		};
		return {
			...nodeObj,
			fields: {
				...nodeObj.fields,
				out: [...outs]
			}
		};
	},

	parseAllNames(graphNodes) {
		let nodes = JSON.parse(JSON.stringify(graphNodes));
		nodes = nodes.map(node => {
			const type = this.parseText(nodes, node.type);
			const outs = node.fields.out.map(out => {
				const str = this.parseText(nodes, out.strRaw);
				return {
					...out,
					str
				};
			});

			return {
				...node,
				type,
				fields: {
					...node.fields,
					out: [...outs]
				}
			}
		});
		return nodes;

	},

	// TODO: test it
	stepByChoice(nid, outIndex, graph) {
		const parent = graph.nodes.find(node => node.nid === nid);
		if (!parent || parent.fields.out.length === 0 || !parent.fields.out[outIndex]) {
			return nid;
		}
		const out = parent.fields.out;

		const parentOutName = out[outIndex].name;
		const connection = graph.connections.find(con => con.from_node === nid && con.from === parentOutName);
		return !connection ? null : connection.to_node;

	}

}

