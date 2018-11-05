import React, { Component } from 'react';
import { TreeTable } from '../../components/treetable/TreeTable';
import { ContextMenu } from '../../components/contextmenu/ContextMenu';
import { Growl } from '../../components/growl/Growl';
import { Column } from "../../components/column/Column";
import { NodeService } from '../service/NodeService';
import { TreeTableSubmenu } from '../../showcase/treetable/TreeTableSubmenu';

export class TreeTableContextMenuDemo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
            expandedKeys: {},
            selectedNodeKey: null,
            menu: [
                {
                    label: 'View Key',
                    icon: 'pi pi-search',
                    command: () => {
                        this.growl.show({severity: 'success', summary: 'Node Key', detail: this.state.selectedNodeKey});
                    }
                },
                {
                    label: 'Toggle',
                    icon: 'pi pi-cog',
                    command: () => {
                        let expandedKeys = {...this.state.expandedKeys};
                        if (expandedKeys[this.state.selectedNodeKey])
                            delete expandedKeys[this.state.selectedNodeKey];
                        else
                            expandedKeys[this.state.selectedNodeKey] = true;

                        this.setState({expandedKeys: expandedKeys});
                    }
                }
            ]
        };
        this.nodeservice = new NodeService();
    }

    componentDidMount() {
        this.nodeservice.getTreeTableNodes().then(data => this.setState({nodes: data}));
    }

    render() {
        return (
            <div>
                <TreeTableSubmenu />

                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>TreeTable - ContextMenu</h1>
                        <p>TreeTable has exclusive integration with ContextMenu.</p>
                    </div>
                </div>

                <div className="content-section implementation">
                    <Growl ref={(el) => this.growl = el} />

                    <ContextMenu model={this.state.menu} ref={el => this.cm = el} onHide={() => this.setState({selectedNodeKey: null})}/>

                    <TreeTable value={this.state.nodes}  expandedKeys={this.state.expandedKeys} onToggle={e => this.setState({expandedKeys: e.value})}
                        contextMenuSelectionKey={this.state.selectedNodeKey} onContextMenuSelectionChange={event => this.setState({selectedNodeKey: event.value})} 
                        onContextMenu={event => this.cm.show(event.originalEvent)}>
                        <Column field="name" header="Name" expander></Column>
                        <Column field="size" header="Size"></Column>
                        <Column field="type" header="Type"></Column>
                    </TreeTable>
                </div>
            </div>
        )
    }
}