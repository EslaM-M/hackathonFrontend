node {
  def IMAGE_NAME = 'planning-dashboard'
  def REPO_URL = 'https://github.com/swvl/planning-dashboard.git'
  def ECR_REGISTRY_BASE = '129141569043.dkr.ecr.us-east-1.amazonaws.com'

  def app
  def commitHash


  def cleanLocalEcrImage = { imageName, tag ->
    sh "docker rmi -f ${ECR_REGISTRY_BASE}/${imageName}:${tag} || true"
  }

  def cleanLocalImage = { imageName, tag ->
    sh "docker rmi -f ${imageName}:${tag} || true"
  }
  
  stage('Clone repository') {
    git (credentialsId: '4418050b-5274-4441-a6b6-80a8bd26ae91', url: REPO_URL, branch: env.BRANCH_NAME)
    commitHash = sh (script: "git rev-parse --short HEAD", returnStdout: true).replaceAll('\n', '')
    currentBuild.displayName = "#${env.BUILD_NUMBER} (${commitHash})"
    currentBuild.description = commitHash
  }
    stage('Run Tests') {
       wrap([$class: 'Xvfb', autoDisplayName: true, debug: true, displayNameOffset: 1, log: true, timeout: 15 , screen: '1024x758x24', parallelBuild: true]) {
        sh (script: "npm install", returnStdout: true)
        sh (script: "DEBUG=cypress:* node_modules/.bin/cypress run")
       }
  }
  stage('Build image') {
    app = docker.build("${IMAGE_NAME}:${commitHash}")
  }

  stage('Push image') {
    docker.withRegistry("https://${ECR_REGISTRY_BASE}/swvl", 'ecr:us-east-1:ecr') {
      app.push("dev-${commitHash}")
      if (env.BRANCH_NAME == 'master') {
        app.push("prod-${commitHash}")
        app.push("latest")
      }
    }
  }


  stage('Remove local images') {
    if (env.BRANCH_NAME == 'master') {
      cleanLocalEcrImage(IMAGE_NAME, "prod-${commitHash}")
      cleanLocalEcrImage(IMAGE_NAME, "latest")
    }
    cleanLocalEcrImage(IMAGE_NAME, "dev-${commitHash}")
  }

}
