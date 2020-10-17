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
  }

  connectedCallback() {
      // browser calls this method when the element is added to the document
      // (can be called many times if an element is repeatedly added/removed)
      const shadow = this.attachShadow({mode: 'open'});
      let genre = this.getAttribute('genre');
      let npc;
      if (genre == "male")
          npc = new HarryPotterNPC(true);
      else
          npc = new HarryPotterNPC(false);
      let fragment = "<p>Create a " + genre +" NPC.</p>\n";
      fragment += npc.to_HTML();
      shadow.innerHTML = fragment;
  }
}
// let the browser know that <my-npc> is served by our new class
customElements.define("my-npc", NpcView);

