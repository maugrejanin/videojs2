var Diplomat = {
	$http: null,
	$mdDialog: null,
	$window: null,
	$location:null,
	init: function($http, $mdDialog, $window, $location){
		Diplomat.$http = $http;
		Diplomat.$mdDialog = $mdDialog;
		Diplomat.$window = $window;
		Diplomat.$location = $location;
	},
	request: function(data){

		var data_request = this.loadFinalData(data);
		function makeRequest(){
			return Diplomat.$http(data_request).then(data_request.success, data_request.error);
		}

		if(data_request.confirm){
			if(!data_request.confirm instanceof Array || data_request.confirm.length != 3)
				throw Error('"confirm" parameter needs to be a Array of length equal 3');

			var $mdDialog = typeof data_request.confirm[1] == 'object'? data_request.confirm.pop(): data_request.confirm.shift();
			var title = data_request.confirm.shift();
			var message = data_request.confirm.pop();

			var confirm = $mdDialog.confirm()
				.title(title)
				.textContent(message)
				.ariaLabel('Lucky day')
				.ok('Confirmar')
				.cancel('Cancelar');

			$mdDialog.show(confirm).then(function() {
				return makeRequest();
			}, function() {
				return;
			});

			return;
		}

		return makeRequest();
	},
	fastRequest: function(success, post, get){
		var action = typeof post == 'string'? post: post.__action;

		Diplomat.request({
			url: this.getDefaultUrl(action),
			data: post,
			success: success,
			get: get
		});
	},
	getDefaultUrl: function(action){
		return Loader.getCurrentPage() + "/" + (action || 'init');
	},
	loadDefaultData: function(programmer_data){
		var data_default = {};

		data_default.method = 'POST';
		data_default.data = {};
		data_default.dataType = "json";

		if(programmer_data.data instanceof FormData){
			data_default.headers = {
				'Content-Type': undefined
			};
			
        	data_default.transformRequest = angular.identity;
		}

		return data_default;
	},
	loadFinalData: function(programmer_data){
		var token = Diplomat.$window.localStorage[TOKEN_INDEX];
		//---------------------------------------------------------------------------------------
		
		var default_data = this.loadDefaultData(programmer_data);
		var final_data = angular.extend(default_data, programmer_data);

		if(typeof final_data.data == "string")
			final_data.data = {
				__action: final_data.data
			};

		if(programmer_data.data instanceof FormData)
			final_data.data.append(TOKEN_INDEX, token);
		else
			final_data.data[TOKEN_INDEX] = token;

		//---------------------------------------------------------------------------------------

		final_data.success = this.getCompleteSuccess(final_data);
		final_data.error = this.getCompleteError(final_data);
		final_data.complete = this.getComplete(final_data);

		//---------------------------------------------------------------------------------------

		if(!final_data.url)
			final_data.url = this.getDefaultUrl(final_data.action || final_data.data.__action);

		final_data.url += final_data.get? '/' + (
			final_data.get instanceof Array? final_data.get.join('/'): final_data.get

		): '';

		final_data.url = (final_data.client_side? CONFIG_CLIENT_URI: CONFIG_SERVER_URI) + final_data.url;
		
		//---------------------------------------------------------------------------------------

		return final_data;
	},
	handleTreatError: function(server_data, final_data){
		console.log('Server captured error: ' + server_data.data.__message);
		console.log(server_data);

		var typeerror = server_data.data.__typeerror;
		switch(typeerror){
			case 'validate':
				var validationError = final_data.validationError || this.validationError;
				validationError(server_data.data);
			break;
			// case 'databank':
			// 	var databankError = config.databankError || this.databankError;
			// 	databankError(success_data);
			// break;
			case 'user':
				var userError = final_data.userError || this.userError;
				userError(server_data.data);
			break;
			case 'permit':
				var permitError = final_data.permitError || this.permitError;
				permitError(server_data.data);
			break;
			// case 'generic':
			// 	var genericError = config.genericError || this.genericError;
			// 	genericError(success_data);
			// break;
			// case 'detail':
			// 	var detailError = config.detailError || this.detailError;
			// 	detailError(success_data);
			// break;
			case 'authentication':
				var authenticationError = final_data.authenticationError || this.authenticationError;
				authenticationError(server_data.data);
			break;
			// case 'error':
			// 	var realError = config.realError || this.realError;
			// 	realError(success_data);
			// break;
			case 'specific': 
				var specificError = final_data.specificError || this.specificError;
				specificError(server_data.data.__code, server_data.data);
			break;
			default: 
				console.log('Categoria do erro: ' + typeerror + ' - data: %o', server_data);
		}

		if(final_data.fail)
			final_data.fail(server_data.data, server_data.data.__typeerror);
	},
	specificError:function(code, message){
		throw new Error("Exceção específica("+code+") não tratada");
	},
	userError:function(server_data){
		if(Diplomat.$mdDialog)
			showDialogMessage(Diplomat.$mdDialog, 'Atenção', server_data.__message);
		else
			alert(server_data.__message);
	},
	getCompleteSuccess: function(final_data){
		var user_success = final_data.success? final_data.success : null;
		var that = this;

		return function(server_data){
			if(typeof server_data.data.__status == 'undefined' || server_data.data.__status)
				user_success(server_data.data);
			else
				that.handleTreatError(server_data, final_data);
		};
	},
	getCompleteError: function(final_data){
		return function(server_data){
			// if(!server_data.error)
			// 	return;

			console.log('Server NOT captured error: ');
			console.log(JSON.stringify(server_data));

			if(final_data.fail)
				final_data.fail(server_data);
		}
	},

	getComplete: function(data){//o complete padrão chama um complete passado pelo programador, se ele passar, mas independente disso remove o loading que foi iniciado no começo da requisição
		var that = this;
		var user_complete = data.complete;

		return function(){
			if(user_complete)
			user_complete();

			if(data.loading)
			removeLoad(data.loading);
		};
	},

	validationError:function(server_data){

		showDialogMessage(Diplomat.$mdDialog, "Atenção", "Preencha todos os campos corretamente para prosseguir.");
	},
	authenticationError:function(server_data){
		Diplomat.$location.path('login/true');
	},
	permitError:function(server_data){
		console.log("Erro de permissão não tratado: ");
		console.log(server_data);
	}

}

