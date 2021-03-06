import { Component, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BackendService } from '../core/backend/backend.service';
import { ErrorHandlerService } from '../core/error-handler/error-handler.service';
import { EventBusService } from '../core/event-bus/event-bus.service';

const sharredOptions = {
	search: true
};

@Component({
	selector: 'app-docs-page',
	templateUrl: './docs-page.component.html',
	styleUrls: ['./docs-page.component.scss']
})
export class DocsPageComponent {

	private fragment: string;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private backendService: BackendService,
		private eventBusService: EventBusService,
		private errorHandlerService: ErrorHandlerService
	) {
		this.eventBusService.emitChangeSharedOptions(sharredOptions);
	}
	
	ngAfterViewInit() {
		this.route.fragment.subscribe(fragment => {
			this.fragment = fragment; 
			try {
				this.scrollToEl();
			} catch (e) { }
		});
	}

	scrollToEl() {
		document.querySelector('#' + this.fragment).scrollIntoView();
	}
}
