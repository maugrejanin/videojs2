var Util = {
	getJsObj: function(param){
		return (typeof param == 'string')? document.getElementById(param) : param;
	},

	getJQueryObj: function(param){
		return (typeof param == 'string')? $("#"+param) : param;
	},

	objectToArray: function(obj){
		return Object.keys(obj).map(function (key) {return obj[key]});
	},

	clone: function(obj) {
	    var copy;

	    // Handle the 3 simple types, and null or undefined
	    if (null == obj || "object" != typeof obj) return obj;

	    // Handle Date
	    if (obj instanceof Date) {
	        copy = new Date();
	        copy.setTime(obj.getTime());
	        return copy;
	    }

	    // Handle Array
	    if (obj instanceof Array) {
	        copy = [];
	        for (var i = 0, len = obj.length; i < len; i++) {
	            copy[i] = this.clone(obj[i]);
	        }
	        return copy;
	    }

	    // Handle Object
	    if (obj instanceof Object) {
	        copy = {};
	        for (var attr in obj) {
	            if (obj.hasOwnProperty(attr)) copy[attr] = this.clone(obj[attr]);
	        }
	        return copy;
	    }

	    throw new Error("Unable to copy obj! Its type isn't supported.");
	},

	extractHiddenHtml: function(obj, html, remove){
		var $html = html? Util.getJQueryObj(html) : $(document);
		var $hiddens = $(".hidden-html", $html);
		remove = remove || true;

		$hiddens.each(function(){
			obj[$(this).attr("id")] = $(this).html();
		});

		if(remove)
			$hiddens.remove();
	},

	select: function(selector){
		return angular.element(document.querySelectorAll(selector));
	}
}