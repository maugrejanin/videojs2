var Validator = {
	setError: function (field_name, error, index) {
		var $target = this.getTarget(field_name, index);
		var message_str = this.getMessage(field_name, error, $target, index);
		var message_elmt = "<span class='help-block with-errors'><ul class='list-unstyled'><li>" + message_str + "</li></ul></span>";

		this.removeError(field_name);
		$target.after(message_elmt);//.after(glyphicon);
	},

	getMessage: function(field_name, error, $target, index){
		var label = Util.select('label[for=' + field_name + ']').html();

		switch(error){
			case 'required':
				return 'O campo <b>' + label + '</b> é obrigatório';
			break;
			case 'email':
				return 'O campo <b>' + label + '</b> requer um e-mail válido';
			break;
			case 'maxlength':
				return 'O campo <b>' + label + '</b> está muito extenso';
			break;
		}
	},

	removeError: function (field_name) {
		var $target = this.getTarget(field_name);
		// 	$form_group = $target.parents(".form-group");

		$target.next(".help-block.with-errors").remove();

		// if($form_group.length > 0)
		// 	$form_group.eq(0).removeClass("has-error");
		// else
		// 	$target.removeClass("with-errors");
	},

	valid: function(form){
		
	},

	treat: function (form, errors) {
		this.form = form;
		this.cleanForm(form);

		for(i in errors){
			if(typeof errors[i] == 'object'){
				for(var j in errors[i]){
					this.setError(i, errors[i][j], j);
				}
			}else
				this.setError(i, errors[i]);
		}

		//Dialog.alert("Formulário inválido, favor corrigir os campos marcados em vermelho.");

		return true;
	},

	getTarget: function (field_name, index) {
		var $target;

		if(field_name instanceof Object){
			$target = Util.getJQueryObj(field_name);
		}else{
			if(index){
				var $targets = Util.select("input[name='" + field_name + "[]']");
				if($targets.length > 0)
					$target = $targets.eq(index);
				else
					$target = Util.select("input[name='" + field_name + "[" + index + "]']");
			}else{
				$target = Util.select("input[name='" + field_name + "']").eq(0);

				if($target.length == 0)
					$target = Util.select("#"+field_name);
			}
		}

		return $target;
	},

	cleanForm: function () {
		// $container = Util.getJQueryObj(form_obj);
		// if($container.length == 0)
		// $container = Util.select(document);

		// var that = this;

		// $container.find(":input:not(button, [type=button])").each(function(){
		// 	that.removeError(this);
		// });
	}
}