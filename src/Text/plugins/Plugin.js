// @flow
/* eslint-disable no-unused-vars */
import React, { Component } from "react";

/**
 * @class this is the base class for slate plugins
 */
export default class Plugin {
  /**
   * @member a unique identifier of the plugin
   */
  name;

  /**
   * @member the nodes to be added to the schema
   */
  nodes = {};

  /**
   * @member the marks to be added to the schema
   */
  marks = {};

  /**
   * @member the slate plugins added to the editor
   */
  plugins = [];

  /**
   * @member serialize a plugin's state to html
   */
  serialize;

  /**
   * @member serialize a plugin's state from html
   */
  deserialize;

  /**
   * This handler is called when any key is pressed
   *
   * @param e the keydown event
   * @param data utilities for hotkey logic
   * @param state the current editor state
   * @returns the new editor state if the plugin handles the hotkey
   */
  onKeyDown = (e, data, state) => null;

  /**
   * @member the buttons to be added to the hover menu
   */
  hoverButtons = [];

  /**
   * @member the buttons to be added to the global toolbar
   */
  toolbarButtons = [];
}
