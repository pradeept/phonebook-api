import { createClient, type RedisClientType } from "redis";

let client: RedisClientType | null;

export const redis = async () => {
  if (client && client.isOpen) {
    return client;
  }

  client = createClient({ url: process.env.REDIS_URL! });

  client.on("error", (err) => {
    console.error(err);
    return null;
  });

  await client.connect();
  return client;
};

export const disconnectRedis = async ()=>{
    if(client ){
        client.close()
    }
  console.log('Redis connection closed');
}

