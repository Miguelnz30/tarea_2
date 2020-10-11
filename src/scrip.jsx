import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery'

$(document).ready(function () {
    $('#dtBasicExample').DataTable({
    "searching": false // false to disable search (or any other option)
    });
    $('.dataTables_length').addClass('bs-select');
    });