#!/usr/bin/env groovy

pipeline {
    agent any
    stages {
        stage('build') {
            steps {
                build wait: false, job: 'docs'
            }
        }
    }
    options {
        disableConcurrentBuilds()
    }
}