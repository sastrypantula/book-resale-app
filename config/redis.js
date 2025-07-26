
const createClient=require('redis').createClient;

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: process.env.REDIS_HOST || 'redis-19209.c61.us-east-1-3.ec2.redns.redis-cloud.com',
        port: process.env.REDIS_PORT || 19209
    }
});

module.exports = redisClient;