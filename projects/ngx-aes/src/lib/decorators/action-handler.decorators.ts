import 'reflect-metadata';
import { v4 } from '@lukeed/uuid';

import { Action } from '../interfaces';
import { ACTION_HANDLER_METADATA, ACTION_METADATA } from './constants';

export const ActionsHandler = (action: Action): ClassDecorator => {
  return (target: object) => {
    if (!Reflect.hasMetadata(ACTION_METADATA, action)) {
      Reflect.defineMetadata(ACTION_METADATA, { id: v4() }, action);
    }

    Reflect.defineMetadata(ACTION_HANDLER_METADATA, action, target);
  };
};
