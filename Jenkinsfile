pipeline {
    agent { label 'lcubes-demo-server' }

    options {
    buildDiscarder(logRotator(numToKeepStr: '5'))
    }

    environment {
        DOCKER_CRED = credentials('lcubestudio-docker')
    }
    stages {
        stage('Init') {
            steps{
                echo "initiation"
               
            }        
        }
        stage('Build') {
            steps{
                echo "building"
            }        
        }
        stage('Jenkins') {
            steps{
                echo "jenkins"
                sh 'if [ ! -d /var/www/html/dev/intouch-frontend/ ]; then mkdir -p /var/www/html/dev/intouch-frontend/; fi'
                sh "rsync -uqr --delete-during /var/www/jenkins/workspace/intouch-frontend_dev/ /var/www/html/dev/intouch-frontend/"
                sh 'docker exec apache2 /bin/bash -ci "yarn install && cd /var/www/html/dev/intouch-frontend/ && yarn && yarn build"'
                //sh "chmod 755 -R /var/www/html/dev/intouch-frontend/"
            }        
        }
    }
    post {
        always{
            echo 'Login Out of the Account'
        }
    }
}
