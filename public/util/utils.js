export function isEmptyObject(obj) {
	for (var v in obj) {
		if (obj.hasOwnProperty(v)) {
			return false;
		}
	}
	return true;
}
