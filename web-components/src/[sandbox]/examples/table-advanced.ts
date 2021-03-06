import "@/components/table-advanced/TableAdvanced";
import { customElement, html, internalProperty, LitElement } from "lit-element";
import { TableAdvancedMock } from "./table-advanced-mock";
import { ShortkeyTable, DefaultAdvancedTable } from "../sandbox.mock";

@customElement("default-table-advanced-sandbox")
export class DefaultTableAdvanced extends LitElement {
  @internalProperty() litProp = "$";

  render() {
    return html`
      ${this.renderComplexTable()}
      <br /><br />
      ${this.renderShortkeyTable()}
      <br /><br />
    `;
  }

  renderComplexTable() {
    // data
    const rnd = (max: number) => Math.round(Math.random() * (max - 1) + 1) + "";
    const DATA = TableAdvancedMock.ComplexTable.data;
    if ("list2d" in DATA) {
      for (let i = 0; i < 6; i++) {
        DATA.list2d.push([rnd(2), "2", "3", "4", "5", "6", "7"]);
      }
    }

    // templates
    const CONF = TableAdvancedMock.ComplexTable.config;
    CONF.cellTemplates = {
      _tmp_: {
        templateName: "tmp1"
      },
      _tmp2_: {
        contentUse: "replace",
        templateName: "tmp2",
        contentCb: ({ content, insertIndex }) => {
          return content.substring(0, insertIndex) + " hide " + content.substring(insertIndex);
        },
        templateCb: p => {
          const span = p.fragment.querySelector<HTMLElement>(".sp")!;
          span.innerText = `${p.content}[${p.row},${p.col}]`;

          const btn = p.fragment.querySelector<HTMLButtonElement>("button")!;
          btn.addEventListener("click", () => {
            this.litProp = "will not work";
            this.requestUpdate();
            console.log("EVT");
          });
        }
      }
    };

    return html`
      <md-table-advanced .config=${CONF} .data=${DATA}>
        <template id="tmp1">
          [OK]
        </template>

        <template id="tmp2">
          ${this.litProp}
          <span class="sp"></span>
          <button @click=${() => console.log("will not work")}>BTN</button>
        </template>
      </md-table-advanced>
    `;
  }

  // --------

  renderShortkeyTable() {
    const conf = ShortkeyTable.config;
    conf.cellTemplates = {
      _info_: { templateName: "tmp1" },
      _warn_: { templateName: "tmp2" },
      _error_: { templateName: "tmp3" }
    };

    return html`
      <md-table-advanced .config=${conf} .data=${ShortkeyTable.data}>
        <template id="tmp1">
          <md-icon class="warn-icon" name="warning_20" color="blue"></md-icon>
        </template>

        <template id="tmp2">
          <md-icon class="warn-icon" name="warning_20" color="yellow"></md-icon>
        </template>

        <template id="tmp3">
          <md-icon class="warn-icon" name="error_20" color="red"></md-icon>
        </template>
      </md-table-advanced>
    `;
  }
}

@customElement("custom-table-advanced-sandbox")
export class CustomTableAdvanced extends LitElement {
  render() {
    return html`
      <md-table-advanced .config=${DefaultAdvancedTable.config} .data=${DefaultAdvancedTable.data}> </md-table-advanced>
    `;
  }
}

export const tableAdvancedTemplate = html`
  <br />
  <div style="height: 400px; width: 100%; overflow: auto">
    <h2>ShortKey Table</h2>
    <default-table-advanced-sandbox></default-table-advanced-sandbox>
  </div>
  <br />
  <div style="height: 400px; width: 100%; overflow: auto">
    <h2>Default Advanced Table</h2>
    <custom-table-advanced-sandbox></custom-table-advanced-sandbox>
  </div>
`;
