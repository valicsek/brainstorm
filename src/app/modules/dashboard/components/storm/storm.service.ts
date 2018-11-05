import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StormService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * This function calls an API call for delete a storm with an id.
   * @param module_id the group id
   * @param storm_id the storm id
   */
  delete(module_id, storm_id) {
    return this.http.delete(`http://localhost:1995/api/modules/${module_id}/storm/${storm_id}`);
  }
}
