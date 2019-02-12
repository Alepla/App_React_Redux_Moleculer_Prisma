FROM node:8

#ENV NODE_ENV=production

RUN mkdir /app
WORKDIR /app

COPY . .

RUN cd frontend && npm install && npm run build 

RUN cp -r frontend/build backend/build  

RUN npm config set unsafe-perm true

RUN cd backend/resources && npm install -g prisma && prisma generate

RUN cd backend && npm install

WORKDIR /app/backend

CMD ["npm", "start"]