FROM neoxdelta/amc-server
WORKDIR /server

COPY package*.json ./

RUN npm i -g typescript && npm i

COPY . ./

CMD docker-compose run
CMD npm start


EXPOSE 8080