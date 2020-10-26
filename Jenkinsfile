pipeline {
    agent { docker { image 'node:12.18.0-alpine' } }

    options {
        buildDiscarder(logRotator(numToKeepStr: '2'))
    }

    stages {
        stage('Setup env') {
            steps {
                sh 'node --version'
                sh 'npm --version'
                sleep(time: 5, unit: "SECONDS")
            }
        }
    
        stage('Build') {
            steps {
                echo 'Building . . .'
                sh 'npm install'
                sleep(time: 5, unit: "SECONDS")
                sh 'npm run server'
                sleep(time: 5, unit: "SECONDS")
            }
        }

        stage('Tests') {
            steps {
                echo 'Start testing . . .'
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