
const Context = require('./lib/context');
const argv = require('minimist')(process.argv.slice(2));
const fs = require('fs');

const config = JSON.parse(fs.readFileSync(argv.config, 'utf8'));

const context = new Context({
    mongoConnectionString: config['from-mongodb'].connection,
    mongoCollectionName: config['from-mongodb'].collectionName,
    dynamoRegion: config['to-dynamodb'].region,
    dynamoTableName: config['to-dynamodb'].tableName,
    userIdMap: config['replace-fields'].userId
});

const fromRepo = context.getMongoDBRepo();
const toRepo = context.getDynamoDBRepo();
const transformer = context.getDoneItemTransformStream();

fromRepo.getAllAsStream().then(readStream => {
    return new Promise((resolve, reject) => {
        readStream
            .pipe(transformer)
            .pipe(toRepo.provideWriteStream())
            .on('finish', resolve)
            .on('error', reject);
    });
}).then(
    () => {
        fromRepo.closeConnection();
    },
    e => {
        fromRepo.closeConnection();
        setTimeout(() => {
            throw e;
        });
    }
);
