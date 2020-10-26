pipeline {
    agent any

    options {
        buildDiscarder(logRotator(numToKeepStr: '2'))
    }

    stages {
        stage('Setup env') {
            steps {
                sh 'node --version'
                sh 'npm --version'
                script {
                    docker.image('postgres:lts').withRun('"-e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=test postgres" -p 5423:5432') { c ->
						echo 'PostgreSQL sterted'
                    }
                    sleep(time: 5, unit: "SECONDS")
                }
            }
        }
    
        stage('Build') {
            steps {
                echo 'Building . . .'
                sh 'npm install'
                sleep(time: 5, unit: "SECONDS")
            }
        }

        stage('Tests') {
            steps {
                echo 'Testing . . .'
                sh 'npm run server'
                //sh 'npm run tests'
            }
        }
    }

    post {
        always {
            deleteDir()
        }
    }
}
