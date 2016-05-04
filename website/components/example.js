/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";

import Megadraft from "../../src/Megadraft";
import {editorStateToJSON, editorStateFromRaw} from "../../src/utils";

import styles from "../App.css";

import Tabs from "material-ui/Tabs/tabs";
import Tab from "material-ui/Tabs/tab";
import FontIcon from "material-ui/FontIcon";

import getMuiTheme from "material-ui/styles/getMuiTheme";

var Colors = require("material-ui/styles/colors");


import INITIAL_CONTENT from "./contentExample";



const muiTheme = getMuiTheme({
  fontFamily: "Roboto, sans-serif",
  tabs: {
    textColor: Colors.grey300,
    selectedTextColor: Colors.grey900
  },
  palette: {
    primary1Color: Colors.white,
    accent1Color: Colors.indigo500
  }
});


class Example extends React.Component {
  //childContextTypes : {
  //  muiTheme: React.PropTypes.object,
  //},

  getChildContext() {
    return {muiTheme: getMuiTheme(muiTheme)};
  }

  constructor(props) {
    super(props);
    const content = editorStateFromRaw(INITIAL_CONTENT);
    this.state = {
      value: content,
      activeTab: "a"
    };
  }



  handleChange = (tab) => {
    this.setState({
      activeTab: tab
    });
  };

  onChange(value) {
    this.setState({
      value
    }
    );
  }

  render() {


    return (
        <Tabs tab={this.state.activeTab} onChange={this.handleChange}>
          <Tab label="Editor"
               tab="a"
               icon={<FontIcon className="material-icons">mode_edit</FontIcon>}>

            <div className="tab-container-editor">
              <Megadraft
                  editorState={this.state.value}
                  onChange={::this.onChange} />
            </div>
          </Tab>
          <Tab label="Content JSON"
               value="b"
               icon={<FontIcon className="material-icons">code</FontIcon>}>
            <div className="tab-container-json">
              <textarea
                  value={editorStateToJSON(this.state.value)}
                  readOnly={true}
                  className={styles.jsonpreview}/>
            </div>
          </Tab>
        </Tabs>



    );
  }
}


Example.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};

export default Example;