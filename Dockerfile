# Use uma imagem base de Node.js para construir a aplicação
FROM node:14 AS build

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos package.json
COPY package.json ./

# Instale as dependências da aplicação
RUN npm install

# Copie o restante dos arquivos da aplicação para o contêiner
COPY . .

# Construa a aplicação
RUN npm run build

# Use uma imagem base de Nginx para servir a aplicação
FROM nginx:alpine

# Copie os arquivos construídos para o diretório de conteúdo estático do Nginx
COPY --from=build /app/public /usr/share/nginx/html

# Exponha a porta 80 para acesso à aplicação
EXPOSE 80

# Inicie o servidor Nginx
CMD ["nginx", "-g", "daemon off;"]
