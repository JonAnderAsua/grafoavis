FROM node:16

# Direktorioa sortu
WORKDIR /usr/src/app

#Dependentziak instalatu
COPY package.json ./
RUN npm install

#Kodea kopiatu
COPY . .

CMD ["npm","start"]
