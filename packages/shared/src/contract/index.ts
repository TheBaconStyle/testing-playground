import { initContract } from '@ts-rest/core';
import { habitsContract } from './habits';

const c = initContract();

export const habbinsContract = c.router({
  habits: habitsContract
})