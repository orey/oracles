/********************************************
 * NPC web component
 * Author: rey.olivier@gmail.com
 * License: GPL V3
 * Date: October 17 2020
 * --------------
 * Note : this code is specific to the browser
 *******************************************/
"use strict";

const DEFAULT_SHADOW = "<p>Nothing</p>";
const REFRESH_EVENT = "_refresh";


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


/*-------------------------------------------------------
 * This class is the root class of all our web components. It defined the data bindings
 * and reusable mechanisms of the shadow DOM.
 * MyHTMLElements is a View.
 *-------------------------------------------------------*/
class MyHTMLElement extends HTMLElement {
    constructor(){
        super();
        this._data = undefined;
        this._shadow = this.attachShadow({mode: 'open'});
        this._rendered = false;
        this._tagname = "";
        this._refreshEventName = "" // this._tagname + REFRESH_EVEN
    }

    connectedCallback() {
        this.render();
    }

    /*
     * Data is the model, a MyHTMLElement being a view. The vioew points to the model.
     * data is a javascript object.
     */
    set data(dat){
        this._data = dat;
        this._rendered = false;
    }

    get data(){
        return this._data;
    }

    /*
     * Method to overload
     */
    render(){
        this._shadow.innerHTML = DEFAULT_SHADOW;
    }

}


/*-------------------------------------------------------
 * This class is a View for NPC class
 * This class is not using _rendered anymore
 *-------------------------------------------------------*/
class NpcView extends MyHTMLElement {
    static TagName = "my-npc";
    static RefreshEvent = NpcView.TagName + REFRESH_EVENT;

    constructor(){
        super();
        BUS.register(NpcView.RefreshEvent, (evt) => {
            let e = document.querySelector(NpcView.TagName);
            e.render();
        });
    }

    set data(dat){
        this._data = dat;
        BUS.fire(NpcView.RefreshEvent);
    }
    
    render(){
        if (this._data == undefined)
        {
            console.log("No data in view");
            this._shadow.innerHTML = "";
            return;
        }
        this._shadow.innerHTML = this._data.to_HTML();
    }
    
}

// let the browser know that <my-npc> is served by our new class
customElements.define(NpcView.TagName, NpcView);



/*-------------------------------------------------------
 * This class is a View for NPC class
 *-------------------------------------------------------*/
const TMPL_M1 =`
<style>
* {
  box-sizing: border-box;
}

/* Create two equal columns that floats next to each other */
.column {
  float: left;
  width: 50%;
  padding: 10px;
  /* height: 300px; /* Should be removed. Only for demonstration */*/
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}
</style>
<h3>`;
const TMPL_M2 = `
</h3>
<div class="row">
  <div class="column">`;
const TMPL_M3 = `</div>
  <div class="column">`;
const TMPL_M4 = `</div></div>`;

const TMPL_T1 = `<table>
              <tr>
                <th>Caractéristiques</th>
                <th>Valeur</th>
              </tr>`;
const TMPL_T2 = "</table>";



class NpcView2 extends MyHTMLElement {
    render(){
        if (this._data == undefined)
        {
            console.log("No data in view");
            // do nothing
            return;
        }
        if (this._rendered) {
            console.log("Already rendered");
            return;
        }

        // parsing this._data;
        let fragment = TMPL_M1 + "Nom : " + this._data.name + " " + this._data.surname + TMPL_M2;
        fragment += TMPL_T1;
        for (var c in this._data.traits)
            fragment += "<tr><td>" + c + "</td><td>" + this._data.traits[c] + "</td></tr>\n";
        fragment += TMPL_T2 + TMPL_M3 + TMPL_T1;
        for (var c in this._data.others)
            fragment += "<tr><td>" + c + "</td><td>" + this._data.others[c] + "</td></tr>\n";
        fragment += TMPL_T2 + TMPL_M4;
      
        //this._shadow.innerHTML = this._data.to_HTML();
        this._shadow.innerHTML = fragment;
        this._rendered = true;
    }
    
}

// let the browser know that <my-npc> is served by our new class
customElements.define("my-npc2", NpcView2);

BUS.register("my-npc2-refresh", (evt) => {
    let e = document.querySelector("my-npc2");
    e.render();
});

