import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PostsService } from '../../shared/posts.service';
import { switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { Post } from '../../shared/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPageComponent implements OnInit, OnDestroy {

  form!: FormGroup
  post!: Post
  submitted = false
  private unsubscribe$ = new Subject<void>()

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postsService: PostsService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.route.params.pipe(
      switchMap((params: Params) =>
        this.postsService.getById(params['id'])
      ),
      takeUntil(this.unsubscribe$)).subscribe((post: Post) => {
        this.post = post
        this.form = new FormGroup({
          title: new FormControl(post.title, Validators.required),
          text: new FormControl(post.text, Validators.required)
        })
        this.cdr.markForCheck()
      })
  }

  submit() {
    this.submitted = true
    this.postsService.update({
      ...this.form.getRawValue()
    }).pipe(tap(() => this.cdr.markForCheck), takeUntil(this.unsubscribe$)).subscribe(() => {
      this.router.navigate(['/admin', 'dashboard'])
      this.submitted = false
    })
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete()
  }
}
