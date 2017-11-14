function Form(form){
	form = Util.getJsObj(form);
	var form_data = new FormData(form);

	this.getData = function(){
		return form_data;
	}

	this.getForm = function(){
		return form;
	}

	this.append = function(name, value){
		this[name] = value;

		if(value instanceof Object && (value.constructor === {}.constructor || value.constructor === [].constructor))
			return Form.appendArray(form_data, value, name);
		else
			return form_data.append(name, value)
	}

}

Form.appendArray = function(form_data, values, name){
	if(!values)
		form_data.append(name, 0);
	else{
		if(typeof values == 'object'){
			for(key in values){
				if(typeof values[key] == 'object')
					Form.appendArray(form_data, values[key], name + '[' + key + ']');
				else
					form_data.append(name + '[' + key + ']', values[key]);
			}
		}
	}

	return form_data;
}