class EventingManagerService {
    constructor() {
      this.eventRegistry = {};
    }
  
    subscribe(eventName, someFunction) {
      if (!this.eventRegistry[eventName]) {
        this.eventRegistry[eventName] = [someFunction];
      } else {
        this.eventRegistry[eventName].push(someFunction);
      }
    }
  
    publish(eventName, data) {
      if (this.eventRegistry[eventName]) {
        this.eventRegistry[eventName].forEach((listener) => {
          listener(data);
        });
      }
    }
  
    unsubscribeAll() {
      this.eventRegistry = {};
    }
  
    unsubscribe(eventName, someFunction) {
      if (this.eventRegistry[eventName]) {
        this.eventRegistry[eventName] = this.eventRegistry[eventName].filter((func) => func !== someFunction);
      }
    }
  }
  
  let sharedInstance;
  
  const getEventingManagerInstance = (key) => {
    if (key === 'pubsub') {
      if (!sharedInstance) {
        sharedInstance = new EventingManagerService();
        global.EventingManagerService = sharedInstance;
      }
      return sharedInstance;
    } else {
      return new EventingManagerService();
    }
  };

  module.exports = { getEventingManagerInstance, EventingManagerService };

  