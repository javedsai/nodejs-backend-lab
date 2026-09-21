$(document).ready(function () {
        $('#userTable').DataTable({
                ajax: {
                url: 'http://localhost:3000/users',
                dataSrc: 'data'
            },
                columns: [
                {
                    data: null,
                    title: 'Sr.No',
                    render: function (data, type, row, meta) {
                        return meta.row + 1;
                    }
                },    
                {data: 'name'},
                {data: 'email'},
                {data: 'age'},
                {
                    data: '_id',
                    render: function (data, type, row) {
                        return `
                        <button onClick="viewUser('${data}')">View</button>
                        <button onClick="updateUser('${data}')">Update</button>
                        <button onClick="deleteUser('${data}')">Delete</button>
                        `
                    }
                }
            ],
            layout: {
                topStart: {
                    buttons: ['excelHtml5','pdfHtml5','csvHtml5','copyHtml5']
                }
	        }
        })    
});