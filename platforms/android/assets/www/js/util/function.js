function parseBoolean(value){
	if(value instanceof Array)
		if(value.length == 0)
			return false;
		else
			return true;

	if(typeof value != 'undefined')
		switch(value.toString().toLowerCase().trim()){
			case "true": case "yes": case "1":
				return true;
			case "false": case "no": case "0": case null:
				return false;
			default:
				return Boolean(value);
		}
	else
		return false;
}

function imgUrlToData(src, callback, outputFormat) {
	var img = new Image();
	img.crossOrigin = 'Anonymous';
	img.onload = function() {
		var canvas = document.createElement('CANVAS');
		var ctx = canvas.getContext('2d');
		var dataURL;
		canvas.height = this.height;
		canvas.width = this.width;
		ctx.drawImage(this, 0, 0);
		dataURL = canvas.toDataURL(outputFormat);
		callback(dataURL);
	};

	img.src = src;
	if (img.complete || img.complete === undefined) {
		img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
		img.src = src;
	}
}

function loadAvatar(nm_avatar_imagem, ds_sexo, DIR_AVATAR){
	return DIR_AVATAR + (nm_avatar_imagem || 
					((!ds_sexo || ds_sexo == 'M')? AVATAR_MALE_DEFAULT_IMAGE_FILE_NAME: AVATAR_FEMALE_DEFAULT_IMAGE_FILE_NAME));
}

 //Função utilizada para conversão do formato de data do JavaScript para o formato do MySQL
function mysqlDateFormat(date){
	// console.log('BEGIN FORMATING');

	// console.log('data de entrada');
	// console.log(date);
	
	if (typeof date == "string")
		date = new Date(date);

	date.setDate(date.getDate() + 1);
    var format = DataTreat.date(date);

	// console.log('data de saída');
	// console.log(format);

	// console.log('END FORMATING');

    return format;
}


//Função utilizada para formatação de data JS
function dateFormat(date){

	if (typeof date == "string") {
		date = new Date(date);
	};

    format = date.getFullYear() + '-';
    format += (date.getMonth()) + '-';
    format += ((date.getDate() +1) < 10 ? '0' + (date.getDate()+1) : date.getDate()+1) ;
    return format;
}

//Função utilizada para conversão do formato de data do JavaScript para o padrão BR
function brDateFormat(date){
	// console.log('BEGIN FORMATING');

	// console.log('data de entrada');
	// console.log(date);
	
	if (typeof date == "string")
		date = new Date(date);

	date.setDate(date.getDate() + 1);
    var format = UserTreat.date(date);

	// console.log('data de saída');
	// console.log(format);

	// console.log('END FORMATING');

    return format;
}

function showDialogMessage($mdDialog, title, message) {
    $mdDialog.show(
      $mdDialog.alert()
        .clickOutsideToClose(true)
        .title(title)
        .textContent(message)
        .ok('Ok')
    );
};

//Retorna true quando o usuario estiver relacionado a apenas um condomínio
function countCondominios(user_log){
	var qtdCondominios = Object.keys(user_log.condominios).length;
	user_log.simpleOwner = qtdCondominios < 1 ? true : false;
	return user_log;
};

function getUserPerfil($window){
	return JSON.parse($window.localStorage.user_log).id_role;
}

function getUserCondominio($window){

	if (typeof $window.localStorage.user_log == "undefined") {
		return null;
	} else {
		var user_log = JSON.parse($window.localStorage.user_log);
		return user_log.condominios[user_log.id_condominio]['nm_condominio'];
	}
}

function getUserLog($window){
	return JSON.parse($window.localStorage.user_log);
}

function setUserLog($window, user_log){
	$window.localStorage.user_log = JSON.stringify(user_log)
}

function getAllowedAction($window){
	if (!$window.localStorage.nm_permissions || $window.localStorage.nm_permissions == 'undefined') {
		return false;	
	}
	return (JSON.parse($window.localStorage.nm_permissions));
}

function checkTypeOf(){
	return function(item){
		return typeof item;	
	}	
}

function loadMore(dir, $scope, vars_index, vars_index_full, method){
	if (dir == "bottom") {
		if (typeof $scope.no_more_data == "undefined") $scope.no_more_data = false;
		var end = $scope[vars_index].length + 5;
		if (($scope[vars_index_full].length - end) <= 20 && !$scope.no_more_data) {
			Diplomat.request({
				url: method,
				beforeSend: function(){
					$scope.requesting = true;
				},
				complete: function(){
					$scope.requesting = false;
				},
				success: function(server_data){
					if (typeof server_data[vars_index] == "undefined")
						server_data[vars_index] = server_data;
					

					if (server_data[vars_index].length < 100) 
						$scope.no_more_data = true;
				}
			});
		}
		
		$scope[vars_index] = $scope[vars_index_full].slice(0, end);	
		$scope.$apply();
	}
}