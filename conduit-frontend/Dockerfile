FROM node:20-alpine AS build

ARG FRONTEND_API_URL=http://localhost:8000/api
ENV FRONTEND_API_URL=${FRONTEND_API_URL}

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN sed -i "s|__API_URL__|${FRONTEND_API_URL}|g" src/environments/environment.ts \
    && npm run build

FROM nginx:alpine

COPY --from=build /app/dist/angular-conduit /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]