pipeline{
    agent { label 'frontend-node' }
    tools { nodejs 'node-14.18.3' }
    
    environment {
        //Mandatory
        REPO_NAME = 'messagingapp-frontend' // repo-name
        PACKAGE_MANAGER = 'yarn' // yarn
        BUILD_COMMAND = 'yarn build'  // yarn generate
        //Enviroment Varibles below:
        
        //ENV_NAME = 'value'
				VUE_APP_BASE_URL='/messagingapp-frontend/'
				VUE_APP_API_URL='https://api.lcubestudios.io/master/messagingapp-api'
				VUE_APP_SITE_TITLE='Messaging App | Powered by LCube Studios'

        //SECRET ENV will need to be added to Jenkins to be able to use them
        
        //GOOGLE_ANALYTICS_TRACKING_ID = credentials('google-analytics') - Sample
        //ENV_NAME = credentials('jenkins_env_id')
        
        //Do not modify
        APACHE_DIR = '/var/www/html'
        SNYK_ID = 'lcube-snyk-token'
        JK_WORKSPACE = '/var/www/jenkins/workspace'
    }
   stages{
        stage("build") {
            steps {
                echo "building the application on ${NODE_NAME}."
                slackSend color: "warning", message: "Starting build process for ${REPO_NAME} from ${BRANCH_NAME} branch..."
                sh 'cd ${JK_WORKSPACE}/${REPO_NAME}_${BRANCH_NAME} && ${PACKAGE_MANAGER} && ${BUILD_COMMAND}'
                sh "if [ ! -d ${APACHE_DIR}/${BRANCH_NAME}/${REPO_NAME}/ ]; then mkdir -p ${APACHE_DIR}/${BRANCH_NAME}/${REPO_NAME}/; fi"
                sh "rsync -Puqr --delete-during ${JK_WORKSPACE}/${REPO_NAME}_${BRANCH_NAME}/dist/ ${APACHE_DIR}/${BRANCH_NAME}/${REPO_NAME}/"         
                slackSend color: "good", message: "Success building the application."
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

