import { Component } from '@angular/core';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent {
  posts: any[] = [
    {
      id: 1,
      userId: 1,
      imageUrl: 'https://images.app.goo.gl/pZMMD4JSd9WmUyu47',
      description: 'This is a beautiful sunset.',
      likes: 100,
      shares: 5,
      comments: [
        {
          id: 1,
          userId: 2,
          text: 'This is indeed beautiful.',
          timestamp: '2023-11-25T10:00:00Z'
        },
        // More comments...
      ]
    },

    // More posts...
  ];


  likePost(post: any) {
    post.likes++;
  }
}
