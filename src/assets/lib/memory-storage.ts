// replaces localStorage
// support for safari when in private browsing mode

export class MemoryStorage {

  storage = {};

  setItem(name, value) {
    this.storage['key'] = value;
  }

  getItem(name) {
    return this.storage['key'];
  }

  removeItem(name) {
    delete this.storage['key'];
  }

      
    
}
