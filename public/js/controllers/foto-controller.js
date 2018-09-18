angular.module('alurapic')
    .controller('FotoController', function($scope, $resource, $routeParams, recursoFoto){ 

        $scope.foto = {};
        $scope.mensagem = '';
        // var recursoFoto = $resource('/v1/fotos/:fotoId', null, { update : {method:'PUT'} });
        recursoFoto.get({fotoId : $routeParams.id}, function(foto) {
            $scope.foto = foto;
        }, function(erro) {
            $scope.mensagem = 'Não foi possível obter a foto!'
        });

        // if($routeParams.id) {
        //     $http.get('/v1/fotos/' + $routeParams.id)
        //     .success(function(foto) {
        //         $scope.foto = foto;
        //     })
        //     .error(function(erro) {
        //         $scope.mensagem = 'Não foi possível obter a foto!'
        //     });
        // }

        $scope.submeter = function() {

            if($scope.formulario.$valid) {

                recursoFoto.update({fotoId : $scope.foto._id}, $scope.foto, function() {
                    $scope.mensagem = 'Foto alterada com sucesso!'
                }, function(error) {
                    $scope.mensagem = 'Erro! Foto não alterada!'
                });

                // if($routeParams.id) {
                //     $http.put('/v1/fotos/' + $scope.foto._id, $scope.foto)
                //     .success(function(){
                //         $scope.mensagem = 'Foto alterada com sucesso!'
                //     })
                //     .error(function(error){
                //         $scope.mensagem = 'Erro! Foto não alterada!'
                //     });
                // }

                recursoFoto.save($scope.foto, function() {
                    $scope.foto = {};
                    $scope.mensagem = 'Foto cadastrada com sucesso!';
                }, function(erro) {
                    $scope.mensagem = 'Erro ao cadastrar!';
                    console.log(erro);
                });

                // $http.post('v1/fotos', $scope.foto)
                // .success(function() {
                //     $scope.foto = {};
                //     $scope.mensagem = 'Foto cadastrada com sucesso!';
                // })
                // .error(function(erro) {
                //     $scope.mensagem = 'Erro ao cadastrar!';
                //     console.log(erro);
                    
                // });
            }
            
        }

    });