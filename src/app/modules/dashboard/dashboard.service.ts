import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * This function returns groups.
   */
  getGroups() {
    return this.http.get('http://localhost:1995/api/modules');
  }

  /**
   * This function calls the server API to save a module.
   * @param module Can be group|storm
   * @param item the item itself what we want to save
   */
  save(module, item, module_id = null) {
    let url;
    if (module === 'storm') {
      url = `http://localhost:1995/api/modules/${module_id}/storm`;
    }
    if (module === 'group') {
      url = `http://localhost:1995/api/modules`;
    }
    return this.http.post(url,
      {
        module,
        item
      });
  }

  /**
   * This function calls the server API to delete a module.
   * @param module Can be group|storm
   * @param item the item itself what we want to delete
   */
  delete(module_id) {
    return this.http.delete(`http://localhost:1995/api/modules/${module_id}`);
  }


}
