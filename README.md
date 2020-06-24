# What is this?

An social network application, very similar to IG.

You can upload photos, like photos, comment on photos.

You can send friend requests, accept requests and delete friends.

You can also send Instant Messages to friends.

## How does it work?

Built using React, Node, Express.

Uses socket.io for Instant Messages.

Images are stored on AWS S3.

### How can i use it?

Check out the live version [here](http://3.24.180.28)

This is down 7 days a month, to reduce costs on AWS.

#### How can i run it locally?

Sign up for AWS S3 and get a key, and secret access key.
Create a PSQL db

Clone the repo

create a .env file with:

```
DEV_DATABASE_URL={url to your DB}
ACCESS_KEY_ID={S3 access key}
SECRET_ACCESS_KEY={s3 secret key}
```

```
npm install
cd client/
npm install
npm run build
cd ../
node seed.js
node server.js
```

The application can then be viewed at localhost:8000