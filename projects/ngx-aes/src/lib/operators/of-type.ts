import { filter, Observable } from 'rxjs';
import { IEvent, Type } from '../interfaces';

export function ofType<TInput extends IEvent, TOutput extends IEvent>(
  ...types: Type<TOutput>[]
) {
  const isInstanceOf = (event: IEvent): event is TOutput =>
    !!types.find((classType) => event instanceof classType);

  return (source: Observable<TInput>): Observable<TOutput> =>
    source.pipe(filter(isInstanceOf));
}
