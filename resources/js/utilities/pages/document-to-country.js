import { DataTable } from "simple-datatables";

document.addEventListener("DOMContentLoaded", () => {
  const documentToCountryTables = document.querySelectorAll("#documentToCountryTable");
  // biome-ignore lint/complexity/noForEach: <explanation>
  documentToCountryTables.forEach((documentToCountryTable) => {
      const dataTable = new DataTable(documentToCountryTable, {
        perPageSelect: [5, 10, 15, ["All", -1]],
        columns: [
          {
            select: 2,
            sortSequence: ["desc", "asc"],
          },
          {
            select: 3,
            sortSequence: ["desc"],
          },
          {
            select: 4,
            cellClass: "green",
            headerClass: "red",
          },
        ],
        tableRender: (_data, table, type) => {
          if (type === "print") {
            return table;
          }
          const tHead = table.childNodes[0];
          const filterHeaders = {
            nodeName: "TR",
            childNodes: tHead.childNodes[0].childNodes.map((_th, index) => {
              let name = ''
              let className = "datatable-input input input-bordered bg-white dark:bg-[#313d4a] placeholder:text-slate-400 min-w-[70%] font-light data-custom"
              let placeholder = "Type something ..."
              if (index === 2) return {
                nodeName: "TH",
                childNodes: []
              }
              if (index === 0) {
                placeholder = 'ID'
                name = 'ID'
                className = "datatable-input input input-bordered bg-white dark:bg-[#313d4a] placeholder:text-slate-400 w-12 p-0 font-light data-custom text-center"
              }
              return {
                  nodeName: "TH",
                  childNodes: [
                    {
                      nodeName: "INPUT",
                      attributes: {
                        class: className,
                        placeholder,
                        type: "search",
                        "data-columns": `[${index}]`,
                      },
                    },
                  ],
                }
            }),
          };
          tHead.childNodes.push(filterHeaders);
          return table;
        },
      });
  });
});
