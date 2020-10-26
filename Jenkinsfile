pipeline {
  agent { docker { image 'node:12.18.0-alpine' } }
  stages {
    stage('Setup env') {
      steps {
        sh 'node --version'
        sh 'npm --version'
      }
    }

    stage('Test') {
      steps {
        echo 'tests complete'
      }
    }

    stage('deploy') {
      steps {
        echo 'deployed'
      }
    }

  }
}