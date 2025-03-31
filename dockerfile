FROM node:22

WORKDIR /tests

COPY package*.json ./

RUN npm ci

RUN npx playwright install --with-deps

COPY . .

ENV HEADLESS=false
ENV PORT=9000

EXPOSE 9000

CMD ["npx", "playwright", "test"]