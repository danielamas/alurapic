angular.module('alurapic')
    .controller('FotoController', function($scope, $http, $routeParams){ 

        $scope.foto = {};
        $scope.mensagem = '';
    
        if($routeParams.id) {
            $http.get('/v1/fotos/' + $routeParams.id)
            .success(function(foto) {
                $scope.foto = foto;
            })
            .error(function(erro) {
                $scope.mensagem = 'Não foi possível obter a foto!'
            });
        }

        $scope.submeter = function() {

            if($scope.formulario.$valid) {

                if($routeParams.id) {
                    $http.put('/v1/fotos/' + $scope.foto._id, $scope.foto)
                    .success(function(){
                        $scope.mensagem = 'Foto alterada com sucesso!'
                    })
                    .error(function(error){
                        $scope.mensagem = 'Erro! Foto não alterada!'
                    });
                }

                $http.post('v1/fotos', $scope.foto)
                .success(function() {
                    $scope.foto = {};
                    $scope.mensagem = 'Foto cadastrada com sucesso!';
                })
                .error(function(erro) {
                    $scope.mensagem = 'Erro ao cadastrar!';
                    console.log(erro);
                    
                });
            }
            
        }

    });