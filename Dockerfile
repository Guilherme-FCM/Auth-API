# Usar Node.js LTS
FROM node:22-alpine

# Diretório de trabalho
WORKDIR /usr/src/app

# Copiar package.json e instalar dependências
COPY package*.json ./
RUN npm install

# Copiar código fonte
COPY . .

# Expor a porta
EXPOSE 3000

# Comando de inicialização
CMD ["./init.sh"]
