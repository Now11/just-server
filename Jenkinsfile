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
				    echo 'timeout after installing dependencies . . .'
			    }

                sh 'ENV=TEST npm run all'

                timeout(5) {
				    echo 'timeout after tests . . .'
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
