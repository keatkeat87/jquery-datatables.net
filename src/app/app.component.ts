import { Component, AfterViewInit, OnInit } from '@angular/core';

import * as $ from 'jquery';
require( 'datatables.net' );

interface Item {
    location : 'MY' | 'SG',
    name : string,
    salary : number 
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  items : Item[] = [
      { name : 'xinyao', salary : 5000, location : 'MY' },
      { name : 'keatkeat', salary : 3000, location : 'MY' },
      { name : 'ah you', salary : 3500, location : 'MY' },
      { name : 'kelly', salary : 9000, location : 'SG' },
      { name : 'xiao ming', salary : 1233, location : 'SG' },
      { name : 'ali', salary : 4456, location : 'SG' },
  ]
    
  ngOnInit(){

  }

  ngAfterViewInit() {
    $('#keatkeat').html('hello world');
       
    var groupColumn = 0;
    $('#table').DataTable({
        // columnDefs: [
        //     { "visible": false, "targets": groupColumn }
        // ],
        order: [[ groupColumn, 'asc' ]],
        pageLength : 10,        
        drawCallback: function ( settings ) {
            var api = this.api();
            var rows = api.rows( {page:'current'} ).nodes();
            var last=null;
 
            api.column(groupColumn, {page:'current'} ).data().each( function ( group, i ) {
                if ( last !== group ) {
                    $(rows).eq( i ).before(
                        '<tr class="group"><td colspan="5">'+group+' data type '+ $(rows).eq(i).data('type') +'</td></tr>'
                    ); 
                    last = group;
                }
            } );
        }
    } );

  }

}
