import { filter, Observable } from 'rxjs';

import { Event, Type } from '../interfaces';

export function ofType<TInput extends Event, TOutput extends Event>(
  ...types: Type<TOutput>[]
) {
  const isInstanceOf = (event: Event): event is TOutput =>
    !!types.find((classType) => event instanceof classType);

  return (source: Observable<TInput>): Observable<TOutput> =>
    source.pipe(filter(isInstanceOf));
}
