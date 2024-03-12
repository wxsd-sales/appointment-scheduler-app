#sudo docker build -t appointment-scheduler-app .
#sudo docker run -i -t appointment-scheduler-app

#aws ecr get-login-password --region us-west-1 | docker login --username AWS --password-stdin 191518685251.dkr.ecr.us-west-1.amazonaws.com
#docker tag appointment-scheduler-app 191518685251.dkr.ecr.us-west-1.amazonaws.com/appointment-scheduler-app
#docker push 191518685251.dkr.ecr.us-west-1.amazonaws.com/appointment-scheduler-app

#I think this only has to be done 1 time.
#aws ecr create-repository --repository-name appointment-scheduler-app

#aws eks --region us-west-1 update-kubeconfig --name bdm-cluster
#kubectl cluster-info

#kubectl apply -f appointment-scheduler-app.yaml

FROM node:18.15.0

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

#overwrite default environment variables
COPY prod.env .env

CMD [ "npm", "start" ]
