/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";

import Megadraft from "../../src/Megadraft";
import {editorStateToJSON, editorStateFromRaw} from "../../src/utils";

import styles from "../App.css";


const INITIAL_CONTENT = {
  "entityMap": {
    "0": {
      "type": "image",
      "mutability": "IMMUTABLE",
      "data": {
        "src": "http://www.renatadavies.com.br/wp-content/uploads/2012/04/ruiva-ruiva.jpg",
        "featured": "big"
      }
    }
  },
  "blocks": [
    {
      "key": "ag6qs",
      "text": "",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": []
    },
    {
      "key": "1srai",
      "text": "🍺",
      "type": "atomic",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [
        {
          "offset": 0,
          "length": 1,
          "key": 0
        }
      ]
    },
    {
      "key": "b3d25",
      "text": "Hello World!",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [
        {
          "offset": 0,
          "length": 12,
          "style": "BOLD"
        },
        {
          "offset": 6,
          "length": 6,
          "style": "ITALIC"
        }
      ],
      "entityRanges": []
    }
  ]
};

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    const content = editorStateFromRaw(INITIAL_CONTENT);
    this.state = {value: content};
  }

  onChange(value) {
    this.setState({value});
  }

  render() {
    return (
      <div className={styles.example}>
        <div className={styles.box}>
          <h2>Default editor behavior:</h2>
          <Megadraft
            editorState={this.state.value}
            onChange={::this.onChange}/>
        </div>
        <div className={styles.divider} ></div>
        <div className={styles.box}>
          <h2>Content JSON: </h2>
          <textarea
            value={editorStateToJSON(this.state.value)}
            readOnly={true}
            className={styles.jsonpreview}/>
        </div>
      </div>
    );
  }
}
