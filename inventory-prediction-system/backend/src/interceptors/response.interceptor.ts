// response.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Response<T> {
  ack: string;
  data: T;
  error: {
    code: string;
    internal_message: string;
    moreInfo: any[];
  };
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({
        ack: 'Success',
        data,
        error: {
          code: '',
          internal_message: '',
          moreInfo: [],
        },
      })),
    );
  }
}
