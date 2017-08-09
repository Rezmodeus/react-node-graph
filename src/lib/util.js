/* not bound to style, should be computed */

export function computeInOffsetByIndex(x,y,index) {
	let outx = x + 15;
	let outy = y + 47 + (index * 20)+(100-23);

	return {x:outx, y:outy};
}

export function computeOutOffsetByIndex(x,y,index) {

	let outx = x + 166;
	let outy = y + 49 + (index * 22)+(100-23);

	return {x:outx, y:outy};

}