/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { Vouchers } from '../models/vouchers';
import { vouchersControllerFindAll } from '../fn/vouchers-controller/vouchers-controller-find-all';
import { VouchersControllerFindAll$Params } from '../fn/vouchers-controller/vouchers-controller-find-all';
import { vouchersControllerFindOne } from '../fn/vouchers-controller/vouchers-controller-find-one';
import { VouchersControllerFindOne$Params } from '../fn/vouchers-controller/vouchers-controller-find-one';
import { vouchersControllerRemove } from '../fn/vouchers-controller/vouchers-controller-remove';
import { VouchersControllerRemove$Params } from '../fn/vouchers-controller/vouchers-controller-remove';

@Injectable({ providedIn: 'root' })
export class VouchersControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `vouchersControllerFindAll()` */
  static readonly VouchersControllerFindAllPath = '/api/vouchers';

  /**
   * Get all vouchers.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `vouchersControllerFindAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  vouchersControllerFindAll$Response(params?: VouchersControllerFindAll$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Vouchers>>> {
    return vouchersControllerFindAll(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all vouchers.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `vouchersControllerFindAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  vouchersControllerFindAll(params?: VouchersControllerFindAll$Params, context?: HttpContext): Observable<Array<Vouchers>> {
    return this.vouchersControllerFindAll$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Vouchers>>): Array<Vouchers> => r.body)
    );
  }

  /** Path part for operation `vouchersControllerFindOne()` */
  static readonly VouchersControllerFindOnePath = '/api/vouchers/{id}';

  /**
   * Get a voucher by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `vouchersControllerFindOne()` instead.
   *
   * This method doesn't expect any request body.
   */
  vouchersControllerFindOne$Response(params: VouchersControllerFindOne$Params, context?: HttpContext): Observable<StrictHttpResponse<Vouchers>> {
    return vouchersControllerFindOne(this.http, this.rootUrl, params, context);
  }

  /**
   * Get a voucher by ID.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `vouchersControllerFindOne$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  vouchersControllerFindOne(params: VouchersControllerFindOne$Params, context?: HttpContext): Observable<Vouchers> {
    return this.vouchersControllerFindOne$Response(params, context).pipe(
      map((r: StrictHttpResponse<Vouchers>): Vouchers => r.body)
    );
  }

  /** Path part for operation `vouchersControllerRemove()` */
  static readonly VouchersControllerRemovePath = '/api/vouchers/{id}';

  /**
   * Delete a voucher by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `vouchersControllerRemove()` instead.
   *
   * This method doesn't expect any request body.
   */
  vouchersControllerRemove$Response(params: VouchersControllerRemove$Params, context?: HttpContext): Observable<StrictHttpResponse<Vouchers>> {
    return vouchersControllerRemove(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete a voucher by ID.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `vouchersControllerRemove$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  vouchersControllerRemove(params: VouchersControllerRemove$Params, context?: HttpContext): Observable<Vouchers> {
    return this.vouchersControllerRemove$Response(params, context).pipe(
      map((r: StrictHttpResponse<Vouchers>): Vouchers => r.body)
    );
  }

}
