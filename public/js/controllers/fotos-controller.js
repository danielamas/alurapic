angular.module('alurapic').controller('FotosController', function($scope, $resource, recursoFoto) {
	
	$scope.fotos = [];
	$scope.filtro = '';
	$scope.mensagem = '';

	// var recursoFoto = $resource('/v1/fotos/:fotoId');
	recursoFoto.query(function(fotos){
		$scope.fotos = fotos;
	}, function(erro){
		console.log(erro);
	});

	// $http.get('/v1/fotos')
	// .success(function(retorno) {
	// 	$scope.fotos = retorno; // não precisa fazer retorno.data
	// })
	// .error(function(erro) {
	// 	console.log(erro);
	// });

	$scope.remover = function(foto) {

		recursoFoto.delete( {fotoId : foto._id}, function() {
			let indiceDaFoto = $scope.fotos.indexOf(foto);
            $scope.fotos.splice(indiceDaFoto, 1);
            $scope.mensagem = 'Foto ' + foto.titulo + ' removida com sucesso!';
		}, function(erro) {
			console.log(erro);
			$scope.mensagem = 'Não foi possível apagar a foto ' + foto.titulo;
		});

        // $http.delete('/v1/fotos/' + foto._id)
        // .success(function() {
		// 	var indiceDaFoto = $scope.fotos.indexOf(foto);
        //     $scope.fotos.splice(indiceDaFoto, 1);
        //     $scope.mensagem = 'Foto ' + foto.titulo + ' removida com sucesso!';

        // })
        // .error(function(erro) {
        //     $scope.mensagem = 'Não foi possível apagar a foto ' + foto.titulo;
        // });
    };

});