/********************************************
 * NPC web component
 * Author: rey.olivier@gmail.com
 * License: GPL V3
 * Date: October 17 2020
 * --------------
 * Note : this code is specific to the browser
 *******************************************/
"use strict";

class NpcView extends HTMLElement {
    constructor() {
        super();
        // element created
        this._npc = undefined;
        this._rendered = false;
        this.shadow = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
    }

    get npc() {
        return this._npc;
    }

    set npc(anpc) {
        this._npc = anpc;
    }

    // This method was refreshing the component by changing an attribute
    // It works but the event bus seems better
    
    /*  static get observedAttributes() {
        return ['render'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log("Attribute " + name + " changed.");
        this.render();
    }*/

    render(){
        if (this._npc == undefined)
            // do nothing
            return;
        if (this._rendered) {
            // remove
            this.shadow.innerHTML = "<p>Removed!</p>"
            this._rendered = false;
        }
        else {
            // add
            this.shadow.innerHTML = this._npc.to_HTML();
            this._rendered = true;
        }
    }
    
}
// let the browser know that <my-npc> is served by our new class
customElements.define("my-npc", NpcView);

BUS.register("my-npc-refresh", (evt) => {
    let e = document.querySelector("my-npc");
    e.render();
});

