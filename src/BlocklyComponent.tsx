import "blockly/blocks";

import * as Blockly from "blockly/core";
import * as Ko from "blockly/msg/ko";

import { useEffect, useState } from "react";

import htmlCodeGenerator from "./htmlCodeGenerator";

Blockly.setLocale(Ko);

const customTheme = Blockly.Theme.defineTheme("custom", {
  name: "custom",
  base: Blockly.Themes.Classic,
  componentStyles: {
    workspaceBackgroundColour: "#fafafa",
    toolboxBackgroundColour: "blackBackground",
    flyoutBackgroundColour: "#123213",
    flyoutForegroundColour: "#ccc",
    flyoutOpacity: 1,
    scrollbarColour: "#000000",
    insertionMarkerColour: "#fff",
    insertionMarkerOpacity: 0.3,
    scrollbarOpacity: 0.001,
    cursorColour: "#d0d0d0",
  },
});

Blockly.Blocks["html"] = {
  init: function () {
    this.appendDummyInput().appendField("html");
    this.appendValueInput("css class")
      .setCheck("CSS-CLASS")
      .appendField("css class");
    this.appendStatementInput("children").appendField("children");
    this.setColour(230);
  },
};

Blockly.Blocks["head"] = {
  init: function () {
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.appendEndRowInput().appendField("head");
    this.appendValueInput("css class")
      .setCheck("CSS-CLASS")
      .appendField("css class");
    this.appendStatementInput("children").appendField();
    this.setColour(120);
  },
};

Blockly.Blocks["body"] = {
  init: function () {
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.appendEndRowInput().appendField("body");
    this.appendValueInput("css class")
      .setCheck("CSS-CLASS")
      .appendField("css class");
    this.appendStatementInput("children").appendField();
    this.setColour(300);
  },
};

Blockly.Blocks["p"] = {
  init: function () {
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.appendEndRowInput().appendField("p");
    this.appendValueInput("css class")
      .setCheck("CSS-CLASS")
      .appendField("css class");
    this.appendStatementInput("children").appendField();
    this.setColour(180);
  },
};

Blockly.Blocks["button"] = {
  init: function () {
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.appendEndRowInput().appendField("button");
    this.appendValueInput("css class")
      .setCheck("CSS-CLASS")
      .appendField("css class");
    this.appendStatementInput("children").appendField();
    this.setColour(280);
  },
};

Blockly.Blocks["text"] = {
  init: function () {
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.appendDummyInput()
      .appendField("text")
      .appendField(new Blockly.FieldTextInput(), "TEXT");
    this.setColour(40);
  },
};

export const BlocklyComponent = () => {
  const [workspace, setWorkspace] = useState<Blockly.WorkspaceSvg | null>(null);
  const [htmlCode, setHtmlCode] = useState<string>("");
  useEffect(() => {
    const newWorkspace = Blockly.inject("blocklyDiv", {
      renderer: "zelos",
      toolbox: {
        kind: "categoryToolbox",
        contents: [
          {
            kind: "category",
            name: "html",
            contents: [
              {
                kind: "block",
                type: "html",
              },
              {
                kind: "block",
                type: "head",
              },
              {
                kind: "block",
                type: "body",
              },
              {
                kind: "block",
                type: "p",
              },
              {
                kind: "block",
                type: "button",
              },
              {
                kind: "block",
                type: "text",
              },
            ],
          },
        ],
      },
      theme: customTheme,
    });
    setWorkspace(newWorkspace);
    return () => {
      newWorkspace.dispose();
    };
  }, []);

  const generateHtmlCode = () => {
    if (!workspace) {
      return;
    }
    const code = htmlCodeGenerator.workspaceToCode(workspace);
    console.log(code);
    setHtmlCode(code);
  };

  return (
    <>
      <div id="blocklyDiv" style={{ width: "700px", height: "800px" }}></div>
      <button onClick={generateHtmlCode}>클릭</button>
      <p>{htmlCode}</p>
      <iframe srcDoc={htmlCode} width="600" height="600"></iframe>
    </>
  );
};
