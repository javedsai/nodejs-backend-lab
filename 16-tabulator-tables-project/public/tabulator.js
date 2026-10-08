//Build Tabulator
    var table = new Tabulator("#user-table", {
        ajaxURL:"http://localhost:3000/users",
        ajaxResponse:function(url, params, response){
        var data = response.data;
        return data;
        },
        layout:"fitColumns",
        //pagination
        pagination:true, //enable.
        paginationSize:10,
        paginationSizeSelector: [10, 25, 50, 100],
        placeholder:"No Data Set",
        //print options
        printAsHtml:true,
        printHeader:"<h1>Users Data<h1>",
        printFooter:"<h1>Users Data<h1>",        
        
        columns:[
            {title:"Name", field:"name", headerFilter:"input"},
            {title:"Email", field:"email", headerFilter:"input"},
            {title:"Age", field:"age"},
            {
                title: "Actions",
                formatter: function(cell) {
                    return `   
                    <button data-action="view">View</button>
                    <button data-action="update">Update</button>
                    <button data-action="delete">Delete</button>
                    `;
                },

                cellClick: (e, cell) => {
                    const id = cell.getRow().getData()._id;
                    const action = e.target.closest("button")?.dataset.action;

                    if (action === "view") {
                        viewUser(id);
                    } else if (action === "update") {
                        updateUser(id);
                    } else if (action === "delete") {
                        deleteUser(id);
                    }
                }
            }         
        ],
    });

    //print button
    document.querySelector("#print-table").addEventListener("click", () => {
        table.print(false, true);
    });

    //trigger download of data.csv file
    document.querySelector("#download-csv").addEventListener("click", () => {
        table.download("csv", "data.csv");
    });

    //trigger download of data.json file
    document.querySelector("#download-json").addEventListener("click", () => {
        table.download("json", "data.json");
    });

    //trigger download of data.xlsx file
    document.querySelector("#download-xlsx").addEventListener("click", () => {
        table.download("xlsx", "data.xlsx", {sheetName: "My Data"});
    });

    //trigger download of data.pdf file
    document.querySelector("#download-pdf").addEventListener("click", () => {
        table.download("pdf", "data.pdf", {
            orientation:"portrait", //set page orientation to portrait
            title:"Users Data"
        });
    });

    //trigger download of data.html file
    document.querySelector("#download-html").addEventListener("click", () => {
        table.download("html", "data.html", {style:true});
    });

    //Search Filter
    const fieldEl = document.getElementById("filter-field");
    const typeEl = document.getElementById("filter-type");
    const valueEl = document.getElementById("filter-value");

    const updateFilter = () => {
        const filterVal = fieldEl.value; // which column
        const typeVal = typeEl.value; // comparison operator
        const filter = valueEl.value; // typed text

        if (filterVal) {
            // pass your variable names, in this order: field, type, value
            table.setFilter(filterVal, typeVal, filter);
        }
    }

    valueEl.addEventListener("keyup", updateFilter);

    //view user method
    const viewUser = (id) => {
        console.log('View User Method', id);
    }

    //update user method
    const updateUser = (id) => {
        console.log('Update User Method', id);
    }

    //delete user method
    const deleteUser = (id) => {
        console.log('Delete User Method', id);
    }