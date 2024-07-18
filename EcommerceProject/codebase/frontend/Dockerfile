# # Fetching the latest node image on apline linux
# FROM node:18-alpine AS builder

# RUN mkdir -p /usr/src/app

# # Setting up the work directory
# WORKDIR /usr/src/app

# # Installing dependencies
# COPY ./package*.json ./
# RUN npm install
# RUN npm install react-scripts@latest -g

# # Copying all the files in our project
# COPY . .

# # Building our application
# RUN npm run build

# # Fetching the latest nginx image
# FROM nginx

# # Copying built assets from builder
# COPY --from=builder /usr/src/app/build /usr/share/nginx/html

# # Copying our nginx.conf
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]

FROM node:18-alpine


RUN mkdir -p /srv/app/admin-client
WORKDIR /srv/app/admin-client


COPY package.json /srv/app/admin-client
COPY package-lock.json /srv-app/admin-client

RUN npm install --silent
RUN npm install react-scripts@3.3.1 -g --silent


COPY . /srv/app/admin-client

EXPOSE 3000

CMD [ "npm", "start" ]