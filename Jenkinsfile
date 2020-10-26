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
            }
        }

        stage('Tests') {
            steps {
                echo 'Connecting to postgreSQL . . .'
                def postgresHost = sh(returnStdout: true, script: "docker inspect --format '{{ .NetworkSettings.IPAddress }}' ${c.id}").trim()
                echo "PostgreSQL container IP address: ${postgresHost}"
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