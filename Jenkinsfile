pipeline {
    agent any

    options {
        buildDiscarder(logRotator(numToKeepStr: '2'))
    }

    stages {
        stage('Setup env') {

            agent { 
                docker { 
                    image 'node:12.13.0-alpine' 
                }
            }
            
            steps {

                sh 'npm install'

                timeout(5) {
				    echo 'timeout after build server . . .'
			    }

                sh 'npm run pm'

                timeout(5) {
				    echo 'timeout after build server . . .'
			    }

                sh 'npm run prod'

                timeout(5) {
				    echo 'timeout after build server . . .'
			    }

                sh 'npm run tests'
            }
               
        }
    }

    post {
        always {
            deleteDir()
        }
    }
}
