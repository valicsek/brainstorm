import { DataSet, Network, NodeOptions, EdgeOptions } from 'vis';

export class MindMap {

  nodes: any;
  edges: any;
  data: any;
  options: any;

  network: Network;

  /**
   * This function represents an event.
   * This event calls when user modify the mindmap
   */
  onDataChanged: Function;

  constructor(firstNodeName: string, data: any = null) {
    this.onDataChanged = null;
    // create an array with nodes
    this.nodes = new DataSet([
      {
        id: 0,
        label: firstNodeName,
        color: {
          border: 'red',
          background: 'red',
        },
        font: {
          color: 'white'
        }
      }
      // { id: 2, label: 'Second node' },
    ]);

    // create an array with edges
    this.edges = new DataSet([
      // { from: 1, to: 3, dashed: true },
      // { from: 1, to: 2 }
    ]);

    if (data) {
      /**
       * The saving is not save as an object.
       * That is why add some more bullshit
       */
      /** https://stackoverflow.com/questions/38824349/how-to-convert-an-object-to-an-array-of-key-value-pairs-in-javascript */

      this.nodes = new DataSet(Object.values(data.nodes._data));
      this.edges = new DataSet(Object.values(data.edges._data));
    }

    // create a network
    this.data = {
      nodes: this.nodes,
      edges: this.edges
    };

    /** Documentation: http://visjs.org/docs/network/nodes.html# */
    this.options = {
      /**
       * It was very disturbing that when I scrolled down
       * I was left struggled by the mindmap.
       */
      clickToUse: true,
      physics: {
        enabled: true,
        repulsion: {
          centralGravity: 0.1,
          springLength: 100,
          springConstant: 0.05,
          nodeDistance: 10,
          damping: 0.09
        }
      },
      layout: {
        hierarchical: {
          // Strict setting
          enabled: false,
          // direction,
          levelSeparation: 10,
        }
      },
      configure: {
        enabled: false,
        filter: 'nodes,edges,physics'
      },
      nodes: {
        shadow: true,
        scaling: {
          label: true
        },
        shape: 'box',
      },
      interaction: {
        multiselect: true,
        keyboard: {
          enabled: false,
          bindToWindow: true
        }
      },
      manipulation: {
        initiallyActive: true,
        addNode: (nodeData: NodeOptions, callback) => {
          const label = prompt('Name of the new node', '');
          nodeData.label = label;
          nodeData.color = this.getRandomColor();
          this.onDataChanged(new MindMap('', this.data));
          callback(nodeData);
        },
        editEdge: (nodeData: NodeOptions, callback) => {
          this.onDataChanged(new MindMap('', this.data));
          callback(nodeData);
        },
        /*
        editNode: (node: NodeOptions, callback) => {
          node.label = 'Almafa';
          callback(node);
        }
        */
        deleteNode: (nodeData: NodeOptions, callback) => {
          this.onDataChanged(new MindMap('', this.data));
          callback(nodeData);
        }
      }
    };
  }

  /**
   * This function builds the mindmap with the specific data.
   */
  public buildMap(container): Network {
    this.network = new Network(container, this.data, this.options);
    this.setupShortcuts(container);
    return this.network;
  }

  /**
   * This function setup the user shortcuts for mindmap
   * https://stackoverflow.com/questions/32765015/vis-js-modify-node-properties-on-click
   * List of Events:
   * http://visjs.org/examples/network/events/interactionEvents.html
   **/
  setupShortcuts(container: HTMLElement) {
    /**
     * This event helps the user to colorize a node.
     */
    this.network.on('oncontext', (params) => {
      params.event.preventDefault();
      if (params.nodes[0]) {
        const node: NodeOptions = this.nodes.get(params.nodes[0]);
        node.color = this.getRandomColor();
        this.nodes.update(node);
      }
    });

    this.network.on('doubleClick', (params) => {
      if (params.nodes.length > 0) {
        /** https://stackoverflow.com/questions/31865910/in-the-vis-javascript-library-how-do-i-get-the-node-from-its-node-id */
        const node: NodeOptions = this.nodes.get(params.nodes[0]);
        if (node) {
          const label = prompt('Name of the Node', node.label);
          if (label) {
            node.label = label;
            // node.color = this.getRandomColor();
            /** https://stackoverflow.com/questions/31183085/how-to-update-a-node-or-edge-property-of-visjs-using-angularjs */
            this.nodes.update(node);
          }
        }
      } else {
        /** https://stackoverflow.com/questions/49033684/vis-js-network-how-to-add-a-node-on-click-inside-the-canvas */
        const label = prompt('Name of the Node', '');
        if (label.length > 0) {
          this.nodes.add([{
            label: label,
            x: params.pointer.canvas.x,
            y: params.pointer.canvas.y,
            color: this.getRandomColor()
          }]);
        }
      }
      this.onDataChanged(new MindMap('', this.data));
    });

    /**
     * If the user moves the nodes, or connect a node to another one (create edge)
     * call the api the save it.
     */
    this.network.on('dragEnd', (params) => {
      this.onDataChanged(new MindMap('', this.data));
    });

  }

  /**
   * Generate a random hexadecimal color for nodes
   */
  private getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}
