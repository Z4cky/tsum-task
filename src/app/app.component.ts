import { Component, OnDestroy, OnInit } from "@angular/core";
import { tree } from "./data";
import { HttpClient } from "@angular/common/http";
import { DataService } from "./services/data-service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {
  name = "Angular";
  constructor(
    private http: HttpClient,
    private treeService: DataService
  ) {
  }
  // data = tree;
  public mainStream;
  public treeData;
  public treeSortedData;

  ngOnInit(): void {
  //   this.mainStream = this.treeService.getFolders().subscribe(
  //     ((json) => {
  //       this.sortTree(json.tree);
  //       this.treeData = json.tree;
  //       // console.log(`%c this sorted data is ${JSON.stringify(this.treeData)}`, `font-size:30px;`);
  //     }),
  //     (error) => {
  //       console.log("oops", error);
  //     });
  // }

  // public sortTree(tree: any): void {
  //   if (Array.isArray(tree)) {
  //     this.sortAsc(tree);
  //     for (const branch of tree) {
  //       this.sortTree(branch);
  //     }
  //   } else {
  //     this.sortAsc(tree.children);
  //   }
  // }

  // private sortAsc(data: any): void {
  //   data.sort((a: any, b) => {
  //     if (a.type > b.type) { return -1; }
  //     if (a.type < b.type) { return 1; }
  //      return a.name.localeCompare(b.name);
  //   });
  }

  ngOnDestroy(): void {
    this.mainStream.unsubscribe();
  }
}
