
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { Article } from '../Article';
import { ArticleService } from '../article.service.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ArticleFormDialogComponent } from '../article-form-dialog/article-form-dialog.component';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  public displayedColumns: string[] = ['id', 'updated_at', 'created_at'];
  public columnsToDisplay: string[] = [...this.displayedColumns, 'actions'];

  public columnsFilters = {};

  public dataSource: MatTableDataSource<Article> = new MatTableDataSource<Article>();
  private serviceSubscribe: Subscription = new Subscription;

  constructor(private articleService: ArticleService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Article>();
  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }



  edit(data: Article) {
    const dialogRef = this.dialog.open(ArticleFormDialogComponent, {
      width: '400px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.articleService.edit(result);
      }
    });
  }

  delete(id: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.articleService.remove(id);
      }
    });
  }

  add() {
    const dialogRef = this.dialog.open(ArticleFormDialogComponent, {
      width: '400px',
      data: {
        id: '',
        title: '',
        content: '',
        updated_at: '',
        created_at: ''
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.created_at = new Date().toISOString();
        this.articleService.add(result);
      }
    });
  }

  private filter() {
    this.dataSource.filter = JSON.stringify(this.columnsFilters);

  }
  /**
   * initialize data-table by providing articles list to the dataSource.
   */
  ngOnInit(): void {
    this.articleService.getAll();
    this.serviceSubscribe = this.articleService.articles$.subscribe(articles => {
      this.dataSource.data = articles;
    });

  }

  ngOnDestroy(): void {
    this.serviceSubscribe.unsubscribe();
  }
}