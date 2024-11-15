const express = require('express');
const app = express();
const port = 5000;

const redis = require('ioredis-rejson');
// Creating a Redis client
const redis_client = new redis({
    host: 'redis-12857.c305.ap-south-1-1.ec2.redns.redis-cloud.com', // Redis host
    port: 12857,        // Redis port
    password: 'PDdegTEgy2q9ArFuwCpuOVz6h6GZEQhM', // Uncomment and set if using password-protected Redis
  });
// Log a message when the Redis connection is successfully established
redis_client.on('connect', () => {
    console.log('✅ Connected to Redis successfully!');
  });
redis_client.on('error', () => {
    console.log('Error to connect Redis!');
  });



// Set the redis data for the string datatype.
const setStringData = async(key,value) => {
    const redis_key = key;
    const redis_value = value;
    const set_data = await redis_client.set(redis_key, redis_value);
    // console.log(set_data);
}
setStringData('redis:key:1', 'Hello this is my first redis project');


// Get the redis data for string datatype
const getStringData = async() => {
    const get_data = await redis_client.get('redis:key:1');
    // console.log(get_data);
}
getStringData();
  

// Set the data in the redis with JSON datatype
const setJsonData = async () => {
    const key = "json_key:1"
    const json_data = {
        "name": 'John Doe',
        "age": 30,
        "city": 'New York',
        "hobbies": ['reading', 'painting', 'coding'],
        "address": {
            "street": '123 Main St',
            "city": 'New York',
            "state": 'NY'
        },
        "achivements": {
            "certificate" : {
                "udemey" : 'Node Js Certificate'
            }
        }
    };
    const set_json_data = await redis_client.json_set(key, "$" ,json_data);
    // console.log(set_json_data);
}
setJsonData();

// Get the data from redis with JSON datatype
const getJsonData = async () => {
    const key = "json_key:1"
    const get_json_data = await redis_client.json_get(key, "$");
    // console.log(get_json_data);
}
getJsonData();

// Update the particular Json feild in redis
const updateJsonKey = async() => {
    const key = "json_key:1"
    const value = ["medals","award","internship"];
    const updated_json_data = await redis_client.json_set(key , "$.achivements.certificate", value);
    // console.log(updated_json_data);
}
updateJsonKey();


app.use(() => {
   console.log('Server is running on port 5000');
})
