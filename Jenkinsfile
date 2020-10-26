pipeline {
    agent any

    options {
        buildDiscarder(logRotator(numToKeepStr: '2'))
    }

    stages {
        stage('Setup env') {
            steps {

                sh 'docker run -d --name pg -p 5423:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=test'
                
                 timeout(5) {
				    echo 'timeout . . .'
			    }

                sh 'docker build -f ./server.dockerfile . -t server'

                timeout(5) {
				    echo 'timeout after build server . . .'
			    }

                sh 'docker run -d -p 3001:3001 --name server server'

            }
               
        }

    }

    post {
        always {
            deleteDir()
        }
    }
}
