import { State, Event, Listen, EventEmitter, Prop, Component, h } from '@stencil/core';

@Component({
  tag: 'was-this-helpful',
  styleUrl: 'was-this-helpful.css',
  assetsDirs: ['assets'],
  shadow: true,
})
export class WasThisHelpful {
  @Event() optionSelected: EventEmitter<any>;
  @State() submitted: boolean = false;
  @Prop() title: string = 'Was this page helpful?';
  @Prop() feedbackTitle: string = 'Any additional feedback?';
  @Prop() feedbackPlaceholder: string = 'Any additional feedback?';

  handleOptionSubmit(e) {
    e.preventDefault();
    this.optionSelected.emit(e.submitter.value);
    this.submitted = true;
  }

  handleFormSubmit(e) {
    e.preventDefault();
    console.log(e)
    this.optionSelected.emit(e.submitter.value);
    this.submitted = true;
  }

  @Listen('optionSelected')
  complete(event: CustomEvent) {
    console.log('Feedback Submitted: ', event);
  }

  render() {
    if (this.submitted) {
      return (
        <div class="was-this-helpful-container">
          <form onSubmit={e => this.handleFormSubmit(e)} class="was-this-helpful-container">
            <p class="was-this-helpful-title">{this.feedbackTitle}</p>
            <textarea id="about" name="about" rows={3} class="was-this-helpful-feedback-textarea" placeholder="you@example.com"></textarea>
            <div class="flex justify-end">
              <button
                type="submit" value="Submit"
                class="bg-white py-2 mr-1 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      );
    }

    return (
      <div class="was-this-helpful-container">
        <form onSubmit={e => this.handleOptionSubmit(e)}>
          <h4 class="was-this-helpful-title">{this.title}</h4>
          <div class="was-this-helpful-option-container">
            <button name="option" value="thumbs-up" class="was-this-helpful-option">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                />
              </svg>
            </button>
            <button name="option" value="thumbs-down" class="was-this-helpful-option">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    );
  }
}
