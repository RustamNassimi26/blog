import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PostsService } from '../../shared/posts.service';
import { Post } from '../../shared/interfaces';
import { take, tap } from 'rxjs';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent implements OnInit {

  posts: Post[] = []
  searchStr = ''

  constructor(
    private postsService: PostsService,
    private alertService: AlertService,
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.postsService.getAll().pipe(tap(() => this.cdr.markForCheck()), take(1)).subscribe(posts => this.posts = posts
    )
  }

  remove(id: string) {
    this.postsService.remove(id).pipe(
      tap(() => this.alertService.danger('Пост был удален')), take(1)).subscribe(() => {
        this.cdr.markForCheck()
        this.posts = this.posts.filter(post => post.id !== id)
      })
  }

}