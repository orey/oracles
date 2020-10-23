# Oracles for RPG

This set of tools is a work in progress to create a client side application that generates, records and renders NPCs.

The tools use web components, a classic simple MVC pattern and an event bus linked to the components.

## Technical notes

### Templates

The use of `<template>` was abandonned because templates are linked to a page and not to the component. Moreover their use is very complex if you have to render complex objects in them while respecting the MVC pattern (search for slots and redo all the work manually).

That's why the chosen approach is simpler: the custom tag knows how to create the view with its style

### Refresh mechanisms

When the object inside the view is set, for the first time or after, the component sends a refresh event to itself.

Currently in case of change of the model itself, there is no component refresh. This can be done through a Proxy on the object. The fact is our model is not changing once generated.
