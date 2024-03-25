import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Post } from '../../shared/interfaces';
import { PostsService } from 'src/app/shared/posts.service';
import { AlertService } from '../shared/services/alert.service';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { take } from 'rxjs';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePageComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private postsService: PostsService,
    private alert: AlertService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required)
    })
  }

  submit() {
    const post: Post = {
      ...this.form.getRawValue(),
      date: new Date()
    }

    this.postsService.create(post).pipe(take(1)).subscribe(() => {
      this.form.reset()
      this.alert.success('Пост был создан')
    })
  }

}
