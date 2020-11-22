/********************************************
 * Event bus
 * Author: rey.olivier@gmail.com
 * License: GPL V3
 * Date: November 22 2020
 * --------------
 * Note : this code is specific to the browser
 *******************************************/
"use strict";


/*-------------------------------------------------------
 * This class is the basic event manager that enables web
 * components to communicate together.
 *-------------------------------------------------------*/
class EventBus {
    constructor() {
        this._bus = document.createElement('div');
    }
    
    register(event, callback) {
        this._bus.addEventListener(event, callback);
    } 
    
    remove(event, callback) {
        this._bus.removeEventListener(event, callback);
    }

    fire(event, detail = {}) {
        this._bus.dispatchEvent(new CustomEvent(event, { detail }));
    }
}

// BUS will be the web components event manager
const BUS = new EventBus();

