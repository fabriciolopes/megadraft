/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import Radium from "radium";
import React, {Component} from "react";
import {Entity, EditorState, SelectionState, Modifier} from "draft-js";

import icons from "../icons";
import MediaStyle from "../styles/components/MediaStyle";
import MediaControls from "../components/MediaControls";
import MediaCaption from "../components/MediaCaption";


export default @Radium
class Media extends Component {
  constructor(props) {
    super(props);
    this.remove = ::this.remove;
    this.onChange = this.props.blockProps.onChange;
    this.block = this.props.block;
    this.entityKey = this.block.getEntityAt(0);

    this.dropdownItems = [
      {"key": "small", "icon": icons.MediaSmallIcon, "label": "MENOR DESTAQUE"},
      {"key": "medium", "icon": icons.MediaMediumIcon, "label": "MÉDIO DESTAQUE"},
      {"key": "big", "icon": icons.MediaBigIcon, "label": "MAIOR DESTAQUE"}
    ];
    this.actionsItems = [
      {"key": "crop", "icon": icons.CropIcon, "action": ""},
      {"key": "edit", "icon": icons.EditIcon, "action": ""},
      {"key": "delete", "icon": icons.DeleteIcon, "action": this.remove}
    ];
    this.defaultFeatured = "medium";
  }

  refresh() {
    const {editorState} = this.props.blockProps;
    this.onChange(editorState);
  }

  remove() {
    const {editorState} = this.props.blockProps;
    const content = editorState.getCurrentContent();
    const targetRange = new SelectionState({
      anchorKey: this.block.key,
      anchorOffset: 0,
      focusKey: this.block.key,
      focusOffset: this.block.getLength()
    });

    const withoutMedia = Modifier.removeRange(content, targetRange, "backward");
    const resetBlock = Modifier.setBlockType(
      withoutMedia,
      withoutMedia.getSelectionAfter(),
      "unstyled"
    );

    const newState = EditorState.push(editorState, resetBlock, "remove-range");
    const newEditorState = EditorState.forceSelection(
      newState, resetBlock.getSelectionAfter()
    );
    this.onChange(newEditorState);
  }

  setFeatured(key) {
    Entity.mergeData(this.entityKey, {"featured": key});
    // FIXME
    this.refresh();
  }

  render() {
    const entity = Entity.get(this.entityKey);
    const data = entity.getData();
    const type = entity.getType();
    const plugins = this.props.blockProps.plugins;
    for (let plugin of plugins) {
      if (type === plugin.type) {
        const Block = plugin.blockComponent;
        return (
          <div style={MediaStyle.blockHover}>
            <div style={MediaStyle.blockWrapper}>
              <MediaControls
                refresh={::this.refresh}
                dropdownItems={this.dropdownItems}
                actionsItems={this.actionsItems}
                selectedFeatured={data.featured || this.defaultFeatured}
                setFeatured={::this.setFeatured} />
              <Block style={MediaStyle.block} data={data} />
              <MediaCaption />
            </div>
          </div>
        );
      }
    }
  }
}
