/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Vouchers } from '../../models/vouchers';

export interface VouchersControllerRemove$Params {
  id: string;
}

export function vouchersControllerRemove(http: HttpClient, rootUrl: string, params: VouchersControllerRemove$Params, context?: HttpContext): Observable<StrictHttpResponse<Vouchers>> {
  const rb = new RequestBuilder(rootUrl, vouchersControllerRemove.PATH, 'delete');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Vouchers>;
    })
  );
}

vouchersControllerRemove.PATH = '/api/vouchers/{id}';
