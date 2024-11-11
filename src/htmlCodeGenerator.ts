import * as Blockly from "blockly/core";

const htmlCodeGenerator = new Blockly.Generator("HTML");

const transferTagBlockToCode = (tagName: string) => {
  htmlCodeGenerator.forBlock[tagName] = function (block) {
    const cssClass = "";
    const children = htmlCodeGenerator.statementToCode(block, "children");
    console.log(tagName, children);
    const code = `<${tagName} class="${cssClass}">\n${children}\n</${tagName}>`;
    return code;
  };
};

htmlCodeGenerator.forBlock["text"] = function (block) {
  const textContent = block.getFieldValue("TEXT");
  return textContent;
};

htmlCodeGenerator.scrub_ = function (block, code, thisOnly) {
  const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  if (nextBlock && !thisOnly) {
    return code + "\n" + htmlCodeGenerator.blockToCode(nextBlock);
  }
  return code;
};

transferTagBlockToCode("html");
transferTagBlockToCode("body");
transferTagBlockToCode("head");
transferTagBlockToCode("p");
transferTagBlockToCode("button");

export default htmlCodeGenerator;
