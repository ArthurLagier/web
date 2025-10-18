# Utilise une image Node légère
FROM node:20-alpine

# Crée le dossier de travail
WORKDIR /app

# Copie seulement les manifests pour profiter du cache Docker
COPY package*.json ./

# Installe les deps (production + dev si tu utilises nodemon en dev)
RUN npm ci

# Copie le reste du code
COPY . .

# Expose le port du serveur (ajuste si besoin)
EXPOSE 9090

# Démarrage en prod (change la commande si tu as un script différent)
CMD ["npm", "run", "dev"]