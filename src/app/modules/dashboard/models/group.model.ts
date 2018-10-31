import { Storm } from './storm.model';

/**
 * This class represents the subject itself.
 * It contains the storm. The storm is the information what the user wants to remember.
 */
export class Group {
  id: number;
  title: string;
  stormArray: Storm[];

  constructor(title: string, stormArray: Storm[]) {
    this.title = title;
    this.stormArray = stormArray;
  }
}
