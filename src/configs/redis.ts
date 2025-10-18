import { createClient, type RedisClientType } from "redis";

let client: RedisClientType | null;

// init redis
export const redis = async () => {
  // if there is an existing connection return it
  if (client && client.isOpen) {
    return client;
  }

  // create a new client 
  client = createClient({ url: process.env.REDIS_URL! });

  client.on("error", (err) => {
    console.error(err);
    return null;
  });

  // connect to the client
  await client.connect();
  return client;
};

// disconnect from redis
export const disconnectRedis = async ()=>{
    if(client ){
        client.destroy()
    }
  console.log('Redis connection closed');
}

