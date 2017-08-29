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
			const node = nodes.find(n => n.nid === nid) || {};
			if (node[a[1]]) {
				newText = node[a[1]];
			}
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
	}

}

