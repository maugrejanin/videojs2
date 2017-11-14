Date.prototype.yyyymmdd = function() {
	var mm = this.getMonth() + 1; // getMonth() is zero-based
	var dd = this.getDate();

	return [this.getFullYear(), PHP.str_pad(mm, 2, 0, 'STR_PAD_LEFT'), PHP.str_pad(dd, 2, 0, 'STR_PAD_LEFT')].join('-'); // padding
};