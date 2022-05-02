pipeline{
    agent { label 'frontend-node' }
    tools { nodejs 'node-14.18.3' }
    
    environment {
        REPO_NAME = 'intouch-frontend'
        
        //Frontend
        NODE_ENV='${BRANCH_NAME}'
        BASE_URL='https://${BRANCH_NAME}.lcubestudios.io/${REPO_NAME}/dist/'
                
        //Static
        //Extra Configs
        APACHE_DIR = '/var/www/html'
        SNYK_ID = 'lcube-snyk-token'
        JK_WORKSPACE = '/var/www/jenkins/workspace'
    }
   stages{
        stage("build") {
            steps {
                echo "building the application on ${NODE_NAME}."
                slackSend color: "warning", message: "Starting build process for ${REPO_NAME} from ${BRANCH_NAME} branch..."
                sh "if [ ! -d ${APACHE_DIR}/${BRANCH_NAME}/${REPO_NAME}/ ]; then mkdir -p ${APACHE_DIR}/${BRANCH_NAME}/${REPO_NAME}/; fi"
                sh "rsync -Puqr --delete-during ${JK_WORKSPACE}/${REPO_NAME}_${BRANCH_NAME}/ ${APACHE_DIR}/${BRANCH_NAME}/${REPO_NAME}/"
                sh "cd ${APACHE_DIR}/${BRANCH_NAME}/${REPO_NAME} && yarn && yarn generate"
                slackSend color: "good", message: "Success building the application."
            }
        }
        stage("scan") {
            steps {
                echo 'Scanning code for vulnerabilities.'
                slackSend color: "warning", message: "Scanning code for vulnerabilities on ${REPO_NAME}/${BRANCH_NAME}..."
                snykSecurity(
                    snykInstallation: 'snyk-latest',
                    snykTokenId: "${SNYK_ID}",
                    failOnIssues: "false",
                )
                slackSend color: "good", message: "Success scanning the code."
            }
        }
        stage("deploy") {
            when{
                expression{
                    BRANCH_NAME == "master"
                }
            }
            steps {
                echo 'deploying the application.'
                slackSend color: "warning", message: "Deploying the application..."
            }
        }
        // stage("scan") {
        //     steps {
        //         echo 'Scanning code for vulnerabilities.'
        //         slackSend color: "warning", message: "Scanning code for vulnerabilities on ${REPO_NAME}/${BRANCH_NAME}..."
        //         snykSecurity(
        //             snykInstallation: 'snyk-latest',
        //             snykTokenId: "${SNYK_ID}",
        //             failOnIssues: "false",
        //         )
        //         slackSend color: "good", message: "Success scanning the code."
        //     }
        // }
    }
    post {
        success {
            echo 'The pipeline completed successfully.'
            slackSend color: "good", message: "The pipeline completed successfully. https://${BRANCH_NAME}.lcubestudios.io/${REPO_NAME}/dist/"
        }
        failure {
            echo 'pipeline failed, at least one step failed'
            slackSend color: "danger", message: "Pipeline failed, at least one step failed. Check Jenkins console https://jenkins.lcubestudios.io/job/${REPO_NAME}/job/${BRANCH_NAME}/"
        }
    }      
}

