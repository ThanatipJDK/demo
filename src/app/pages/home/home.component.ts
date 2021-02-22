import { Component, OnInit }from'@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
interface ItemData {
  id: number;
  from : {name: string,email: string,substr:string}
  body: string;
  subject: string;
}

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn | null;
}
interface DataItem {
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  initLoading = true; // bug
  loadingMore = false;
  data: any[] = [];
  list: Array<{ loading: boolean; name: any }> = [];
  evOver: any ;
  datas : Array<ItemData> = [];
 
  listOfColumns: ColumnItem[] = [
    {
      name: 'Name',
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name),
      listOfFilter: [
        { text: 'All', value: 'All' },
        { text: 'Read', value: 'Read' },
        { text: 'Unread', value: 'Unread' },
      ],
      filterFn: (list: string[], item: DataItem) => list.some(name => item.name.indexOf(name) !== -1)
    },
    
  ];

  hoverIndex:number = -1;
  substring : any;
  checked :boolean = false;
  indeterminate: boolean= false;
  setOfCheckedId = new Set<number>();

  constructor(private http: HttpClient) { 
    
  }

  ngOnInit(): void {
    this.listMail();
    
  }
  
  listMail():void {
    const datas = [
      {
        id: 1,
        from : {
          name : "Now TV",
          email : "nowtv@test.com"
        },
        subject : "Grab another Pass, you need to be watchingthis...",
        body : "Oscar winners Sir Anthony Hopkins and Ed Harris join an impressive cast boasting the likes of Thandie Newton,James Marsden and Jeffrey Wright."
      },
      {
        id: 2,
        from : {
          name : "Investopedia Terms",
          email : "investopedia@test.com"
        },
        subject : "What is 'Fibonanci Retracement'?",
        body : "Fibonacci retracement is a term used in technical analysis that refers to areas of support (pricestops going lower) or resistance (price stops going higher)."
      },
      {
        id: 3,
        from : {
          name : "ASICS Greater Manchester Marathon ",
          email : "events@human-race.co.uk"
        },
        subject : "Your chance to take on the marathon",
        body : "Do you feel inspired to take on one of Europe's most highly regarded and popular marathons?"
      },
      {
        id: 4,
        from : {
          name : "ASICS Greater Manchester Marathon ",
          email : "events@human-race.co.uk"
        },
        subject : "Your chance to take on the marathon",
        body : "Do you feel inspired to take on one of Europe's most highly regarded and popular marathons?"
      },
      {
        id: 5,
        from : {
          name : "ASICS Greater Manchester Marathon ",
          email : "events@human-race.co.uk"
        },
        subject : "Your chance to take on the marathon",
        body : "Do you feel inspired to take on one of Europe's most highly regarded and popular marathons?"
      }
    ]
    for (const a of datas) {
      const substr = a.from.name.substring(0,1)
      this.datas.push({...a,from:{...a.from,substr:substr}})
    }
  }

  onHover(i:number):void{
    // this.hoverIndex = i;
    this.hoverIndex = i;
  }
  trackByName(_: number, item: ColumnItem): string {
    return item.name;
  }
  
  action(type:string,index:number):void {
    alert(type+' '+index)
  }
  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      alert('checked ' +id)
      this.setOfCheckedId.add(id);
      
    } else {
      alert('unchecked ' +id)
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
   
    this.datas.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: Array<ItemData>): void {
    this.datas = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.datas.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.datas.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }
}
