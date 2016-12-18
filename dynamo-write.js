
const AWS = require('aws-sdk');
const DynamoDBWriteStream = require('./lib/dynamodb-write-stream');
const Uuid = require('uuid');

const writeStream = new DynamoDBWriteStream({
    docClient: new AWS.DynamoDB.DocumentClient(),
    tableName: 'ryuichi-test-db'
});

writeStream.on('error', err => {
    console.error(err.stack);
});
writeStream.on('finish', () => {
    console.log('finished');
});

getMockData().forEach((item, i) => {
    const newItem = Object.assign({}, item, {id: Uuid.v4()});
    console.log(`write ${i}: ${writeStream.write(newItem)}`);
});

function getMockData() {
    return [
        {data: 'item-00'},
        {data: 'item-01'},
        {data: 'item-02'},
        {data: 'item-03'},
        {data: 'item-04'},
        {data: 'item-05'},
        {data: 'item-06'},
        {data: 'item-07'},
        {data: 'item-08'},
        {data: 'item-09'},
        {data: 'item-10'},
        {data: 'item-11'},
        {data: 'item-12'},
        {data: 'item-13'},
        {data: 'item-14'},
        {data: 'item-15'},
        {data: 'item-16'},
        {data: 'item-17'},
        {data: 'item-18'},
        {data: 'item-19'},
        {data: 'item-20'},
        {data: 'item-21'},
        {data: 'item-22'},
        {data: 'item-23'},
        {data: 'item-24'},
        {data: 'item-25'},
        {data: 'item-26'},
        {data: 'item-27'},
        {data: 'item-28'},
        {data: 'item-29'},
        {data: 'item-30'},
        {data: 'item-31'},
        {data: 'item-32'},
        {data: 'item-33'},
        {data: 'item-34'},
        {data: 'item-35'},
        {data: 'item-36'},
        {data: 'item-37'},
        {data: 'item-38'},
        {data: 'item-39'},
        {data: 'item-40'},
        {data: 'item-41'},
        {data: 'item-42'},
        {data: 'item-43'},
        {data: 'item-44'},
        {data: 'item-45'},
        {data: 'item-46'},
        {data: 'item-47'},
        {data: 'item-48'},
        {data: 'item-49'},
        {data: 'item-50'},
        {data: 'item-51'},
        {data: 'item-52'},
        {data: 'item-53'},
        {data: 'item-54'},
        {data: 'item-55'},
        {data: 'item-56'},
        {data: 'item-57'},
        {data: 'item-58'},
        {data: 'item-59'},
        {data: 'item-60'},
        {data: 'item-61'},
        {data: 'item-62'},
        {data: 'item-63'},
        {data: 'item-64'},
        {data: 'item-65'},
        {data: 'item-66'},
        {data: 'item-67'},
        {data: 'item-68'},
        {data: 'item-69'},
        {data: 'item-70'},
        {data: 'item-71'},
        {data: 'item-72'},
        {data: 'item-73'},
        {data: 'item-74'},
        {data: 'item-75'},
        {data: 'item-76'},
        {data: 'item-77'},
        {data: 'item-78'},
        {data: 'item-79'},
        {data: 'item-80'},
        {data: 'item-81'},
        {data: 'item-82'},
        {data: 'item-83'},
        {data: 'item-84'},
        {data: 'item-85'},
        {data: 'item-86'},
        {data: 'item-87'},
        {data: 'item-88'},
        {data: 'item-89'},
        {data: 'item-90'},
        {data: 'item-91'},
        {data: 'item-92'},
        {data: 'item-93'},
        {data: 'item-94'},
        {data: 'item-95'},
        {data: 'item-96'},
        {data: 'item-97'},
        {data: 'item-98'},
        {data: 'item-99'}
    ];
}
