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
	}

}

