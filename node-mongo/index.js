const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const url = 'mongodb://localhost:27017/'
const dbname = 'conFusion'

MongoClient.connect(url, (err, client) => {
    assert.equal(err, null)
    console.log('Connected correctly to the server')

    const db = client.db(dbname)
    const collection = db.collection('dishes')

    collection.insertOne({ "name": "Uthapizza", "description": "test again" }, (err, result) => {
        //error checking
        assert.equal(err, null)

        //result
        console.log('After Insert:\n')
        console.log(result.acknowledged)
        console.log(result.insertedId)

        collection.find({}).toArray((err, docs) => {
            //error checking
            assert.equal(err, null)

            //result (part of line 18)
            console.log('Found:\n')
            console.log(docs)

            db.dropCollection('dishes', (err, result) => {
                //error checking
                assert.equal(err, null)

                //result(part of line 18 and 27)
                client.close()
            })
        })
    })
})