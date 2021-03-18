## radiostats-ui

A static site built in [Next.js](https://nextjs.org/) to display the RAJAR data output from radiostats-ingest.  It takes a GraphQL feed from MongoDB Realm and creates static paths for each station in the database at build time (revalidated on page load).

To run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.
