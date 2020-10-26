pipeline {
    agent any

    options {
        buildDiscarder(logRotator(numToKeepStr: '2'))
    }

    stages {
        stage('Setup env') {
            steps {
                script {
                    docker.image('postgres').withRun('"-e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=test postgres" -p 5423:5432 --name postgres') { c ->
						echo 'PostgreSQL sterted'
                    }
                    timeout(5) {
				        echo 'timeout . . .'
			        }
                }
               
            }

        }
    
        stage('Build') {
            agent { 
                dockerfile { 
                    filename './pipeline.dockerfile' 
                } 
            }
            steps {
                echo 'installid server'
                sh 'node --version'
                sh 'npm --version'
                sh 'npm install'
                sh 'npm run server'
                timeout(5) {
				    echo 'timeout . . .'
			    }
            }
            
        }
    }
    post {
        always {
            deleteDir()
        }
    }
}
