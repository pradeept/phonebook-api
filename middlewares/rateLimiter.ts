import type { NextFunction, Request, Response } from "express";
import { redis } from "../configs/redis.ts";

/*
    Rate limiter to limit the number of requests made by an IP at 
    a particular time window.
    ALLOWING: 5 requests withing 60 seconds time window. 
             Max connections - 10.  
*/

const store = await redis();
const SERVER_MAX_TOKENS = 10;
const USER_MAX_TOKEN = 5;
const KEY_PATTERN = `rate-limit:`;
const TTL_WINDOW = 60; //60 seconds

export const rateLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userIp = req.ip;

  const key = `${KEY_PATTERN}${userIp}`;

  // check if server has reached max token limit
  const getAllKeys = await store.KEYS(`${KEY_PATTERN}*`);
  if (getAllKeys.length >= SERVER_MAX_TOKENS) {
    return res.status(503).send("Server is busy, try again after sometime!");
  }
  if (!userIp) {
    return res.status(400).send("Bad request");
  }

  // check if the key exists - returns 0 or 1
  const entry = await store.EXISTS(key!);

  if (!entry) {
    // set userIp to USER_MAX_TOKEN tokens and TTL to  minutes
    await store.SET(key, USER_MAX_TOKEN, {
      expiration: { type: "EX", value: TTL_WINDOW },
    });
    next();
  } else {
    const remainingTokens = await store.GET(key);
    if (remainingTokens && Number(remainingTokens) > 0) {
      // decrese total tokens by 1
      await store.DECR(key);
      next();
    } else {
      return res.status(429).send("Too many requests");
    }
  }
};