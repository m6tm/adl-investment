import { DataTable } from "simple-datatables";

document.addEventListener("DOMContentLoaded", function () {
  const roleTable = document.querySelector("#roleTable");

  if (roleTable) {
    const dataTable = new DataTable("#roleTable", {
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
            let className = "datatable-input input input-bordered placeholder:text-slate-400 min-w-[70%] font-light data-custom"
            if (index == 1) name = 'permission'
            if (index == 2) name = 'description'
            if (index == 3) return {
              nodeName: "TH",
              childNodes: []
            }
            let placeholder = `Search by ${name} ...`
            if (index == 0) {
              placeholder = 'ID'
              name = 'ID'
              className = "datatable-input input input-bordered placeholder:text-slate-400 w-12 p-0 font-light data-custom text-center"
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
  }
});
