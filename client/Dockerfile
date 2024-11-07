FROM node:20 as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ENV VITE_API_URL http://api.mythical-dispute.duckdns.org/api
RUN npm run build

FROM nginx:alpine
COPY default.conf ./etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]