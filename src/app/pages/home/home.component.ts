import { Component, OnInit }from'@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
interface ItemData {
  id: number;
  name: string;
  age: number;
  address: string;
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
const count = 5;
const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';
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
  datas :any = []
  listOfData: ItemData[] = [];
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
  listOfSelection = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.onAllChecked(true);
      }
    },
    {
      text: 'Select Odd Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 !== 0));
        this.refreshCheckedStatus();
      }
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 === 0));
        this.refreshCheckedStatus();
      }
    }
  ];
  hoverIndex:number = -1;
  substring : any;
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: ReadonlyArray<ItemData> = [];
  setOfCheckedId = new Set<number>();
  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: ReadonlyArray<ItemData>): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }
  constructor(private http: HttpClient) { 
    
  }

  ngOnInit(): void {
    this.listMail();
    
    // this.getData((res: any) => {
    //   this.data = res.results;
    //   this.list = res.results;
    //   this.initLoading = false;
    // });
  }
  
  listMail():void {
    const datas = [
      {
        from : {
          name : "Now TV",
          email : "nowtv@test.com"
        },
        subject : "Grab another Pass, you need to be watchingthis...",
        body : "Oscar winners Sir Anthony Hopkins and Ed Harris join an impressive cast boasting the likes of Thandie Newton,James Marsden and Jeffrey Wright."
      },
      {
        from : {
          name : "Investopedia Terms",
          email : "investopedia@test.com"
        },
        subject : "What is 'Fibonanci Retracement'?",
        body : "Fibonacci retracement is a term used in technical analysis that refers to areas of support (pricestops going lower) or resistance (price stops going higher)."
      },
      {
        from : {
          name : "ASICS Greater Manchester Marathon ",
          email : "events@human-race.co.uk"
        },
        subject : "Your chance to take on the marathon",
        body : "Do you feel inspired to take on one of Europe's most highly regarded and popular marathons?"
      }
    ]
    for (const a of datas) {
      console.log(a);
      
      const substr = a.from.name.substring(0,1)
      this.datas.push({...a,from:{...a.from,substr:substr}})
    }
    console.log(this.datas);
  }

  onHover(i:number){
    this.hoverIndex = i;
  }
  trackByName(_: number, item: ColumnItem): string {
    return item.name;
  }
  
  getData(callback: (res: any) => void): void {
    this.http.get(fakeDataUrl).subscribe((res: any) => callback(res));
  }

  onLoadMore(): void {
    this.loadingMore = true;
    this.list = this.data.concat([...Array(count)].fill({}).map(() => ({ loading: true, name: {} })));
    this.http.get(fakeDataUrl).subscribe((res: any) => {
      this.data = this.data.concat(res.results);
      this.list = [...this.data];
      this.loadingMore = false;
    });
  }

  edit(item: any): void {
    alert('Edit')
    // this.msg.success(item.email);
  }
  // over(data:any, ev:boolean, index :number):void {
  //   // console.log('over==> ',index);
  //   const findIndex = this.datas.findIndex((item:any) => {
  //     return data.from.name === item.from.name
  //   })
  //   const find = this.datas.find((item:any) => {
  //     return data.from.name === item.from.name
  //   })
 
  //   if (findIndex === index) {
  //     this.evOver = ev
  //   }
    
  // }
  // out(data:any, ev:boolean,index :number): void  {
  //   // console.log('out==> ',index);
  //   const findIndex = this.datas.findIndex((item:any) => {
  //     return data.from.name === item.from.name
  //   })
    
  //   if (findIndex === index) {
  //     this.evOver = ev
  //   }
  // }

}
