///////////////////////////////////////////////////////////////////////
//  Layer
///////////////////////////////////////////////////////////////////////
/**
 * Layer constructor.  Layers are tied to their own canvas element and are used
 * to contain groups or shapes
 * @constructor
 * @augments Kinetic.Container
 * @augments Kinetic.Node
 * @param {Object} config
 */
Kinetic.Layer = function(config) {
    this.className = 'Layer';
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.canvas.style.position = 'absolute';
    this.transitions = [];
    this.transitionIdCounter = 0;

    // call super constructors
    Kinetic.Container.apply(this, []);
    Kinetic.Node.apply(this, [config]);
};
/*
 * Layer methods
 */
Kinetic.Layer.prototype = {
    /**
     * public draw children
     */
    draw: function() {
        this._draw();
    },
    /**
     * clear layer
     */
    clear: function() {
        var context = this.getContext();
        var canvas = this.getCanvas();
        context.clearRect(0, 0, canvas.width, canvas.height);
    },
    /**
     * get layer canvas
     */
    getCanvas: function() {
        return this.canvas;
    },
    /**
     * get layer context
     */
    getContext: function() {
        return this.context;
    },
    /**
     * add node to layer
     * @param {Node} node
     */
    add: function(child) {
        this._add(child);
    },
    /**
     * remove a child from the layer
     * @param {Node} child
     */
    remove: function(child) {
        this._remove(child);
    },
    /**
     * private draw children
     */
    _draw: function() {
        this.clear();
        if(this.visible) {
            this._drawChildren();
        }
    },
    /**
     * clear transition if one is running
     */
    _clearTransition: function(node) {
        for(var n = 0; n < this.transitions.length; n++) {
            var transition = this.transitions[n];
            if(transition.node.id === node.id) {
                Kinetic.GlobalObject._removeTransition(transition);
            }
        }
    }
};
// Extend Container and Node
Kinetic.GlobalObject.extend(Kinetic.Layer, Kinetic.Container);
Kinetic.GlobalObject.extend(Kinetic.Layer, Kinetic.Node);
