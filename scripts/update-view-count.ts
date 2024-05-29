const { MongoClient } = require('mongodb');
require('dotenv').config();

async function updateViewCount() {
    const url = process.env.DATABASE_URL;

    if (!url) {
        throw new Error("DATABASE_URL environment variable is not set.");
    }

    const client = new MongoClient(url);

    try {
        await client.connect();
        const database = client.db('just_a_photo');
        const posts = database.collection('Post');

        const result = await posts.updateMany(
            {},
            { $set: { viewCount: 0 } }
        );

        console.log(`${result.matchedCount} documents matched the query criteria.`);
        console.log(`${result.modifiedCount} documents were updated.`);
    } finally {
        await client.close();
    }
}

updateViewCount().catch(console.error);


// ts-node scripts/update-view-count.ts