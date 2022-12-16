import {expectType} from 'tsd'

import zafClient from "../..";
import { Response } from './get';

const z = zafClient.get("ticket");

// replace any with the actual response object
expectType<Response<"ticket">>(z)
