import { Component, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'bc-not-found-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="row">
      <h4>404: Not Found</h4>
      <div>
        <p>Hey! It looks like this page doesn't exist yet.</p>
      </div>
      <div>
        <button md-raised-button color="primary" routerLink="/">Take Me Home</button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      text-align: center;
    }
  `]
})
export class NotFoundPageComponent { }
