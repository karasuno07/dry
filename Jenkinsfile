@Library('jenkins-pipeline-library@latest')

pipeline {
  options {
    timestamps()
  }
  stages {
    stage('Build') {
      steps {
        cleanWs()
        checkout scm
      }
    }
  }
}