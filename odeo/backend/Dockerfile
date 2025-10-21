# Utilise une image Node légère
FROM node:20-alpine

# Crée le dossier de travail
WORKDIR /app

# Copie seulement les manifests pour profiter du cache Docker
COPY package*.json ./

# Installe les deps (production + dev pour nodemon)
RUN npm ci

# Copie le reste du code
COPY . .

# Expose le port du serveur 
EXPOSE 9090

# Démarrage en prod
CMD ["npm", "run", "dev"]