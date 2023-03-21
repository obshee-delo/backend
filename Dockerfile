###############################
# BUILD FOR LOCAL DEVELOPMENT #
###############################

FROM node:18-alpine As development

WORKDIR /od/api

COPY --chown=node:node package*.json ./

RUN npm ci
RUN npm rebuild bcrypt

COPY --chown=node:node . .

USER node

########################
# BUILD FOR PRODUCTION #
########################

FROM node:18-alpine As build

WORKDIR /od/api

COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=development /od/api/node_modules ./node_modules
COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV production

# Running `npm ci` removes the existing node_modules directory.
# Passing in --only=production ensures that only the production dependencies are installed.
# This ensures that the node_modules directory is as optimized as possible.
RUN npm ci --only=production && npm cache clean --force
RUN npm rebuild bcrypt

USER node

##############
# PRODUCTION #
##############

FROM node:18-alpine As production

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /od/api/node_modules ./node_modules
COPY --chown=node:node --from=build /od/api/dist ./dist

CMD [ "node", "dist/main.js" ]
